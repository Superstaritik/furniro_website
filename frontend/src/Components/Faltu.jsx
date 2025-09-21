import React from 'react'
import filterIcon from "../assets/system-uicons_filtering.svg";
import gridIcon from "../assets/ci_grid-big-round.svg";
import listIcon from "../assets/bi_view-list.svg";

// Component renamed
const ProductControlBar = () => {
  return (
    <div>
      <div className="h-20 bg-[#f1e7cf] flex items-center justify-between px-8 shadow">

        {/* Left Section - All Filters and View Options */}
        <div className="flex items-center gap-6">
          {/* Filter */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={filterIcon} alt="Filter" className="h-6 w-6" />
            <h2 className="font-medium">Filter</h2>
          </div>

          {/* Grid & List Icons */}
          <div className="flex items-center gap-3">
            <img src={gridIcon} alt="Grid View" className="h-6 w-6 cursor-pointer" />
            <img src={listIcon} alt="List View" className="h-6 w-6 cursor-pointer" />
          </div>

          {/* Divider + Showing Results */}
          <div className="pl-6 border-l border-gray-400">
            <h2 className="text-gray-700 font-medium">Showing 1–16 of 32 Items</h2>
          </div>
        </div>

        {/* Center Section - Add New Product Button */}
        <div>
          <button className="px-5 py-2 bg-white text-[#c78437] font-bold shadow rounded hover:bg-[#c78437] hover:text-white transition">
            Add a New Item
          </button>
        </div>

        {/* Right Section - Display & Sorting Options */}
        <div className="flex items-center gap-8">
          {/* Show per page */}
          <div className="flex items-center gap-3">
            <h2 className="font-medium">Display</h2>
            <div className="h-10 w-16 flex items-center justify-center bg-white shadow rounded">
              16
            </div>
          </div>

          {/* Sort by */}
          <div className="flex items-center gap-3">
            <h2 className="font-medium">Order by</h2>
            <div className="h-10 w-32 flex items-center justify-center bg-white shadow rounded">
              Default
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductControlBar;