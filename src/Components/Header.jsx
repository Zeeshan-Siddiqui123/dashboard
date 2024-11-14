// src/Components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShopify } from 'react-icons/fa';
import { UserContext } from '../Screens/UserContext';
// import { CartContext } from '../Screens/CartContext.jsx';

const Navbar = () => {
    // const { user, handleLogout } = useContext(UserContext);  // Use context for user and logout
    // const { cart } = useContext(CartContext);

    return (
        <nav className="navbar flex justify-between items-center p-4 shadow-md">
            <div className='main-name flex items-center gap-2'>
                <FaShopify color='red' size='30' />
                <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <div className='nav-links flex gap-4'>

                <NavLink 
                    to='/' 
                    className={({ isActive }) =>
                        isActive ? 'text-[#f97070] underline font-bold nav-link' : 'text-black font-bold nav-link'
                    }
                >
                    Home
                </NavLink>
                {/* Add more links as needed */}
            </div>
            <div className='flex items-center gap-4'>
                {/* Uncomment if cart functionality is implemented */}
                {/* <Link to="/cart" className='relative nav-link-cart'>
                    <MdOutlineShoppingCart size='30' />
                    {cart?.length > 0 && (
                        <div className='w-[20px] h-[20px] bg-red-500 text-white rounded-full text-center absolute top-0 right-0 -mt-1 -mr-1'>
                            {cart.length}
                        </div>
                    )}
                </Link> */}

                {/* {user ? (
                    <div className='flex items-center space-x-2'>
                        <span className='hello'>Hello, {user.name}</span>
                        <button 
                            onClick={handleLogout} 
                            className='login-button bg-red-500 text-white px-3 py-1 rounded'
                        >
                            Logout
                        </button>
                    </div>
                ) : ( */}
                    <Link to="/account" className='login-button text-blue-500 font-semibold'>
                        <b>Log in/Sign Up</b>
                    </Link>
                {/* )} */}
            </div>
        </nav>
    );
};

export default Navbar;
