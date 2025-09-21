import React from 'react'
import callingIcon from '../assets/calling.svg';
import TrophyIcon from '../assets/highQuality.svg';
import warrantyIcon from '../assets/warrantyProtection.svg';
import shippingIcon from '../assets/freeShipping.svg';

// Component renamed to make it unique
const BrandFeatures = () => {
  return (
    <div className="bg-[#f2e7c3] border-t-4 border-[#c7a475] px-6 sm:px-10 lg:px-20 py-8 lg:p-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Feature 1: Top Notch Quality */}
        <div className="flex items-center gap-3">
          <img src={TrophyIcon} alt="High Quality" className="w-12 h-12" />
          <div>
            <p className="text-gray-800 text-lg sm:text-xl lg:text-2xl font-bold">Top Notch Quality</p>
            <p className="text-gray-500 text-sm sm:text-base">made from premium materials</p>
          </div>
        </div>

        {/* Feature 2: Solid Warranty */}
        <div className="flex items-center gap-3">
          <img src={warrantyIcon} alt="Warranty Protection" className="w-12 h-12" />
          <div>
            <p className="text-gray-800 text-lg sm:text-xl lg:text-2xl font-bold">Solid Warranty</p>
            <p className="text-gray-500 text-sm sm:text-base">Guaranteed for 2 years</p>
          </div>
        </div>

        {/* Feature 3: Quick Delivery */}
        <div className="flex items-center gap-3">
          <img src={shippingIcon} alt="Free Shipping" className="w-12 h-12" />
          <div>
            <p className="text-gray-800 text-lg sm:text-xl lg:text-2xl font-bold">Quick Delivery</p>
            <p className="text-gray-500 text-sm sm:text-base">on all orders over $150</p>
          </div>
        </div>

        {/* Feature 4: Customer Support */}
        <div className="flex items-center gap-3">
          <img src={callingIcon} alt="24/7 Support" className="w-12 h-12" />
          <div>
            <p className="text-gray-800 text-lg sm:text-xl lg:text-2xl font-bold">Customer Support</p>
            <p className="text-gray-500 text-sm sm:text-base">Always here to help</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BrandFeatures