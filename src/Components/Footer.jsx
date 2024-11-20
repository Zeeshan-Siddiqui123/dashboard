import React from 'react'
import { FaShopify } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="">
      <nav className=" flex justify-center flex-col items-center p-4 bg-gray-500 text-white shadow-lg">
        <div className="main-name flex items-center gap-2">
          <FaShopify color="white" size="30" />
          <h1 className="text-xl font-bold">Best Store</h1>
        </div>
        <div>
          <h2>Copyright © 2024 | Zeeshan Ahmed Siddiqui</h2>
        </div>
      </nav>
    </div>
  )
}

export default Footer
