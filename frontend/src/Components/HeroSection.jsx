import React from "react";
import heroImage from '../assets/hero-bg.png';
import vector from '../assets/Vector.svg';

// Component renamed
const BannerSection = () => {
  return (
    <div className="relative w-full">
      <img
        src={heroImage}
        className="w-full h-64 sm:h-96 md:h-[400px] object-cover"
        alt="Decorative banner background"
      />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center text-black z-10 px-4">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">Shop</h1>
        <h2 className="flex items-center justify-center gap-2 text-sm sm:text-lg mt-2">
          Main <img src={vector} alt="Arrow" className="w-2 sm:w-3" /> Shop
        </h2>
      </div>
    </div>
  );
};

export default BannerSection;