import React, { useState } from "react";
import logo from "../assets/Logo-Furniro.png";
import heartIcon from "../assets/akar-icons_heart.svg";
import searchIcon from "../assets/akar-icons_search.svg";
import cartIcon from "../assets/ant-design_shopping-cart-outlined.svg";
import humanIcon from "../assets/human-icon.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full bg-white shadow-md p-5">
      <div className="p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="ml-4 mr-15">
          <img src={logo} alt="Furniro" className="w-28 sm:w-32 md:w-36" />
        </div>

        {/* Links (Desktop Only) */}
        <div className="hidden md:flex gap-18">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>

        {/* Icons */}
        <div className="flex gap-10 items-center mr-4">
          <img src={humanIcon} alt="" className="w-6 h-6 cursor-pointer" />
          <img src={searchIcon} alt="" className="w-6 h-6 cursor-pointer" />
          <img src={heartIcon} alt="" className="w-6 h-6 cursor-pointer" />
          <img src={cartIcon} alt="" className="w-6 h-6 cursor-pointer" />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 pb-4 bg-gray-50">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
