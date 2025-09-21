import React, { useState } from "react";
import logo from "../assets/Logo-Furniro.png";
import heartIcon from "../assets/akar-icons_heart.svg";
import searchIcon from "../assets/akar-icons_search.svg";
import cartIcon from "../assets/ant-design_shopping-cart-outlined.svg";
import humanIcon from "../assets/human-icon.svg";

// Component renamed
const NavigationBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(1); 

  
  const handleCartClick = () => {

    alert(`You have ${cartItemCount} items in your cart.`);
  };

  return (
    <div className="w-full bg-white shadow-md">
      <div className="px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <div>
          <img src={logo} alt="Furniro" className="w-24 sm:w-28 md:w-32" />
        </div>

        {/* Navigation Links (Desktop Only) */}
        <div className="hidden md:flex gap-8 lg:gap-12 text-gray-700 font-medium">
          <a href="#" className="hover:text-yellow-600">Home</a>
          <a href="#" className="hover:text-yellow-600">Products</a>
          <a href="#" className="hover:text-yellow-600">Info</a>
          <a href="#" className="hover:text-yellow-600">Support</a>
        </div>

        {/* User Actions Icons */}
        <div className="hidden sm:flex gap-6 items-center">
          <img src={humanIcon} alt="Profile" className="w-6 h-6 cursor-pointer" />
          <img src={searchIcon} alt="Find" className="w-6 h-6 cursor-pointer" />
          <img src={heartIcon} alt="Saved" className="w-6 h-6 cursor-pointer" />
          {/* Cart Icon with Item Count */}
          <div className="relative cursor-pointer" onClick={handleCartClick}>
            <img src={cartIcon} alt="Basket" className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-3xl text-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-gray-50 border-t border-gray-200">
          <a href="#" className="hover:text-yellow-600">Home</a>
          <a href="#" className="hover:text-yellow-600">Products</a>
          <a href="#" className="hover:text-yellow-600">Info</a>
          <a href="#" className="hover:text-yellow-600">Support</a>
          {/* Icons inside mobile menu */}
          <div className="flex gap-6 mt-2">
            <img src={humanIcon} alt="Profile" className="w-6 h-6 cursor-pointer" />
            <img src={searchIcon} alt="Find" className="w-6 h-6 cursor-pointer" />
            <img src={heartIcon} alt="Saved" className="w-6 h-6 cursor-pointer" />
            {/* Cart Icon with Item Count for Mobile */}
            <div className="relative cursor-pointer" onClick={handleCartClick}>
              <img src={cartIcon} alt="Basket" className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;