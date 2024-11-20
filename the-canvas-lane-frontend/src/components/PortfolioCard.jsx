import React from 'react';
import { FaHeart, FaShareAlt } from 'react-icons/fa';

const PortfolioCard = ({ mediaUrl, userName, userProfilePic }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg w-full h-[400px] flex flex-col justify-between overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Media Section */}
      <div className="relative w-full h-[60%]">
        <img
          src={mediaUrl}
          alt="Portfolio"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Info */}
      <div className="p-4 flex flex-col items-center">
        <img
          src={userProfilePic}
          alt={userName}
          className="w-12 h-12 rounded-full border-2 border-gray-300 mb-3"
        />
        <span className="font-semibold text-gray-800 text-lg">{userName}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center px-4 pb-4">
        <button className="flex items-center text-red-500 hover:text-red-700">
          <FaHeart className="text-xl" />
        </button>
        <button className="flex items-center text-blue-500 hover:text-blue-700">
          <FaShareAlt className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default PortfolioCard;
