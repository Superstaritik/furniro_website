import React, { useState } from "react";
import logo from "../assets/Logo-Furniro.png";
import heartIcon from "../assets/akar-icons_heart.svg";
import searchIcon from "../assets/akar-icons_search.svg";
import cartIcon from "../assets/ant-design_shopping-cart-outlined.svg";
import humanIcon from "../assets/human-icon.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full bg-white shadow-md">
      <div className="px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <img src={logo} alt="Furniro" className="w-24 sm:w-28 md:w-32" />
        </div>

        {/* Links (Desktop Only) */}
        <div className="hidden md:flex gap-8 lg:gap-12 text-gray-700 font-medium">
          <a href="#" className="hover:text-yellow-600">Home</a>
          <a href="#" className="hover:text-yellow-600">Shop</a>
          <a href="#" className="hover:text-yellow-600">About</a>
          <a href="#" className="hover:text-yellow-600">Contact</a>
        </div>

        {/* Icons */}
        <div className="hidden sm:flex gap-6 items-center">
          <img src={humanIcon} alt="User" className="w-6 h-6 cursor-pointer" />
          <img src={searchIcon} alt="Search" className="w-6 h-6 cursor-pointer" />
          <img src={heartIcon} alt="Wishlist" className="w-6 h-6 cursor-pointer" />
          <img src={cartIcon} alt="Cart" className="w-6 h-6 cursor-pointer" />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-3xl text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-gray-50 border-t border-gray-200">
          <a href="#" className="hover:text-yellow-600">Home</a>
          <a href="#" className="hover:text-yellow-600">Shop</a>
          <a href="#" className="hover:text-yellow-600">About</a>
          <a href="#" className="hover:text-yellow-600">Contact</a>
          {/* Icons inside mobile menu */}
          <div className="flex gap-6 mt-2">
            <img src={humanIcon} alt="User" className="w-6 h-6 cursor-pointer" />
            <img src={searchIcon} alt="Search" className="w-6 h-6 cursor-pointer" />
            <img src={heartIcon} alt="Wishlist" className="w-6 h-6 cursor-pointer" />
            <img src={cartIcon} alt="Cart" className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
