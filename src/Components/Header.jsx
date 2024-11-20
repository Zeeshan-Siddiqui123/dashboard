import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShopify } from 'react-icons/fa';
import { UserContext } from '../Screens/UserContext';

const Navbar = () => {
  const { user, handleLogout } = useContext(UserContext); // Accessing user from context

  // Extract the first letter of the user's first name
  const firstName = user ? user.name.split(" ")[0] : ""; // Get the first word (first name)

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
            <div className="flex items-center gap-2">
              {/* Display the user's first letter inside a circle */}
              <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-semibold">
                {firstName[0]}
              </div>
              {/* Optionally show the full name next to the avatar */}
              {/* <span className="font-semibold">{firstName}</span> */}
            </div>
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
