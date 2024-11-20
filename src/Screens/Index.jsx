import React, { useState, useEffect, useContext } from "react";
import { Modal, Input, Button, Upload, Table } from "antd";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { UserContext } from "./UserContext"; // Import UserContext
import { Navigate, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { user } = useContext(UserContext); // Access logged-in user

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products, isLoaded]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateProduct = () => {
    // Check if user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
    if (!loggedInUser) {
      // If not logged in, navigate to the login page
      Navigate('/account');
      return;
    }
  
    if (isEditing) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = formData;
      setProducts(updatedProducts);
      setIsEditing(false);
    } else {
      setProducts([...products, { ...formData, key: products.length }]);
    }
    setFormData({ name: "", price: "", description: "", image: "" });
    setIsModalOpen(false);
  };
  

  const handleEditProduct = (index) => {
    const product = products.find((_, i) => i === index);
    setFormData(product);
    setIsEditing(true);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (index) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      onOk: () => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
      },
    });
  };

  const handleDeleteAll = () => {
    Modal.confirm({
      title: "Are you sure you want to delete all products?",
      onOk: () => setProducts([]),
    });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Product" className="w-16 h-16 rounded-lg" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <span className="font-semibold">{name}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span className="text-green-500">${price}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record, index) => (
        <div className="flex gap-2 flex-wrap">
          <Button
            icon={<FaEdit />}
            onClick={() => handleEditProduct(index)}
            className="bg-blue-500 text-white hover:bg-blue-600"
          ></Button>
          <Button
            icon={<FaTrash />}
            onClick={() => handleDeleteProduct(index)}
            className="bg-red-500 text-white hover:bg-red-600"
          ></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5 bg-gray-100 min-h-screen max-w-screen-lg mx-auto">
      <div className="flex flex-wrap justify-between gap-3 mb-5">
        <Button
          type="primary"
          icon={<FaPlus />}
          onClick={() => {
            if (user) {
              setIsModalOpen(true);
            } else {
              Modal.warning({
                title: "Login Required",
                content: "Please log in to create a product.",
                onOk: () => {
                  navigate("/account"); // Navigate to the login page
                },
              });
            // onOk={Navigate('/account')}
              
            }
          }}
          className={`${
            user ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
          } text-white flex items-center gap-2`}
          // disabled={!user}
        > 
          Create Product
        </Button>
        <Button
          type="danger"
          icon={<FaTrash />}
          onClick={handleDeleteAll}
          disabled={products.length === 0}
          className="bg-red-500 text-white flex items-center gap-2 hover:bg-red-600"
        >
          Delete All
        </Button>
      </div>

      <Modal
        title={isEditing ? "Edit Product" : "Create Product"}
        open={isModalOpen}
        onOk={handleCreateProduct}
        onCancel={() => setIsModalOpen(false)}
        okText={isEditing ? "Update" : "Create"}
        cancelText="Cancel"
        centered
      >
        <div className="space-y-4">
          <Input
            placeholder="Enter Product Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Enter Product Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <Input.TextArea
            placeholder="Enter Product Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
          />
          <Upload
            beforeUpload={(file) => {
              setFormData({ ...formData, image: URL.createObjectURL(file) });
              return false;
            }}
            showUploadList={false}
          >
            <Button>Upload Image</Button>
          </Upload>
        </div>
      </Modal>

      <div className="overflow-x-auto">
        <Table
          dataSource={products}
          columns={columns}
          bordered
          pagination={{ pageSize: 4 }}
          rowKey={(record) => record.key}
          className="bg-white rounded-lg shadow"
        />
      </div>
    </div>
  );
};

export default Index;
