
import React, { createContext, useState, useEffect } from 'react';

// Create a context for user information
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user from localStorage if logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  // Function to handle login and update context + localStorage
  const handleLogin = (userData) => {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    setUser(userData);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;