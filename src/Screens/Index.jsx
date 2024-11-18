import React, { useContext, useState } from "react";
import { Modal, Input, Button, Upload, Table } from "antd";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";


const Index = () => {

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

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create or Update Product
  const handleCreateProduct = () => {
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

  // Edit Product
  const handleEditProduct = (index) => {
    const product = products.find((_, i) => i === index);
    setFormData(product);
    setIsEditing(true);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  // Delete Product with Confirmation Modal
  const handleDeleteProduct = (index) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      onOk: () => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
      },
    });
  };

  // Delete All Products with Confirmation Modal
  const handleDeleteAll = () => {
    Modal.confirm({
      title: "Are you sure you want to delete all products?",
      onOk: () => setProducts([]),
    });
  };

  // Columns for Table
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
        <div className="flex gap-2">
          <Button
            icon={<FaEdit />}
            onClick={() => handleEditProduct(index)}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Edit
          </Button>
          <Button
            icon={<FaTrash />}
            onClick={() => handleDeleteProduct(index)}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    
    <div className="p-5 bg-gray-100 min-h-screen">

      {/* Action Buttons */}
      <div className="flex justify-between mb-5">
        <Button
          type="primary"
          icon={<FaPlus />}
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white flex items-center gap-2 hover:bg-green-600"
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

      {/* Modal for Creating/Editing Product */}
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

      {/* Product Table */}
      <Table
        dataSource={products}
        columns={columns}
        bordered
        pagination={{ pageSize: 4 }}
        rowKey={(record) => record.key}
        className="bg-white rounded-lg shadow"
      />
    </div>
  );
};

export default Index;
