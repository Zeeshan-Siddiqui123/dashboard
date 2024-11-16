import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShopify } from 'react-icons/fa';
import { UserContext } from '../Screens/UserContext';

const Navbar = () => {


    return (
        <nav className="navbar flex justify-between items-center p-4 shadow-md">
            <div className='main-name flex items-center gap-2'>
                <FaShopify color='red' size='30' />
                <h1 className="text-xl font-bold">Best Store</h1>
            </div>
            <div className='nav-links flex gap-4'>
            </div>
            <div className='flex items-center gap-4'>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        isActive ? 'text-[#f97070] underline font-bold nav-link' : 'text-black font-bold nav-link'
                    }
                >
                    Home
                </NavLink>
                <Link to="/account" className='login-button text-blue-500 font-semibold'>
                    <b>Log in/Sign Up</b>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
