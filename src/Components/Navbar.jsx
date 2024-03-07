import React from 'react';
import { AiFillHome, AiOutlineShopping, AiOutlineTags } from 'react-icons/ai';

const Navbar = ({ setActivePage }) => {
  const handleTabClick = (page) => {
    setActivePage(page);
  };

  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 text-xl">
          <button
            className="flex items-center hover:font-bold"
            onClick={() => handleTabClick('dashboard')}
          >
            <AiFillHome className="mr-2" /> Dashboards
          </button>
          <button
            className="flex items-center hover:font-bold"
            onClick={() => handleTabClick('product')}
          >
            <AiOutlineShopping className="mr-2" /> Products
          </button>
          <button
            className="flex items-center hover:font-bold"
            onClick={() => handleTabClick('categories')}
          >
            <AiOutlineTags className="mr-2" /> Categories
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
