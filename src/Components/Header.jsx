// src/Components/Navbar.jsx
import React, { useContext } from 'react';
// import './Components.css';
import { Link, NavLink } from 'react-router-dom';
// import { routes } from '../Routes';
import { FaShopify } from 'react-icons/fa';
// import { MdOutlineShoppingCart } from 'react-icons/md';
// import Toggle from './Toggle';
import { UserContext } from '../Screens/UserContext.jsx';
// import { CartContext } from '../Screens/CartContext.jsx';

const Navbar = () => {
    const { user, handleLogout } = useContext(UserContext);  // Use context for user and logout
    //   const { cart } = useContext(CartContext);

    return (
        <nav className="navbar">
            <div className='main-name'>
                <FaShopify color='red' size='30' />
                <h1>Dashboard</h1>
            </div>
            <div className='nav-links'>

                <NavLink to='/' className={({ isActive }) =>
                    isActive ? 'text-[#f97070] underline font-bold nav-link' : 'text-black font-bold nav-link'
                }>
                    Home
                </NavLink>

            </div>
            <div className='flex flex-row gap-1'>
                {/* <Link to="/cart" className='nav-link-cart'>
          <MdOutlineShoppingCart size='30' />
        </Link> */}
                <div className='w-[20px] h-[20px] bg-[red] text-white rounded-full text-center -ml-3 -mt-1'>{cart.length}</div>


                {user ? (
                    <div className='flex items-center space-x-2'>
                        <div className='login-name-btn'>
                            <span className='hello'>Hello,</span> {user.name} {/* Display user's name */}
                        </div>
                        <div>
                            <button onClick={handleLogout} className='login-button'>Logout</button>
                        </div>
                    </div>
                ) : (
                    <Link to="/account" className='login-button'>
                        <b>Log in/Sign Up</b>
                    </Link>
                )}


            </div>
        </nav>
    );
};

export default Navbar;