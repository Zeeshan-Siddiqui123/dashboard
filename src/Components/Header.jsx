import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShopify } from 'react-icons/fa';
import { UserContext } from '../Screens/UserContext';

const Navbar = () => {
  const { user, handleLogout } = useContext(UserContext); // Accessing user from context

  return (
    <nav className="navbar flex justify-between items-center p-4 bg-blue-500 text-white shadow-lg">
      <div className="main-name flex items-center gap-2">
        <FaShopify color="white" size="30" />
        <h1 className="text-xl font-bold">Best Store</h1>
      </div>

      <div className="nav-links flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'bg-red-500 px-4 py-2 rounded-md text-orange-300' : "bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 font-semibold"
          }
        >
          Home
        </NavLink>
        {user ? (
          <>
            <span className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 font-semibold">{`Hello, ${user.name}`}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/account" className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 font-semibold">
            <b>Log in/Sign Up</b>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
