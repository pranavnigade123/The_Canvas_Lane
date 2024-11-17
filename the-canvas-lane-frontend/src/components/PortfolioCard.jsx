import React from 'react';
import { FaHeart, FaShareAlt } from 'react-icons/fa';

const PortfolioCard = ({ mediaUrl, userName, userProfilePic }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs mx-auto hover:shadow-xl transition-shadow duration-300">
      {/* Media Image */}
      <img
        src={mediaUrl}
        alt="Portfolio"
        className="h-48 w-full object-cover rounded-t-lg"
        onError={(e) => {
          console.error('Failed to load image:', e.target.src);
          e.target.src = "https://via.placeholder.com/300"; // Fallback image
        }}
      />

      {/* User Info */}
      <div className="flex items-center mt-4">
        <img
          src={userProfilePic || "https://via.placeholder.com/40"}
          alt={userName || "User Profile"}
          className="w-10 h-10 rounded-full mr-3"
          onError={(e) => {
            console.error('Failed to load user profile image:', e.target.src);
            e.target.src = "https://via.placeholder.com/40"; // Fallback profile image
          }}
        />
        <span className="font-semibold text-gray-800">{userName || "Unknown User"}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button className="flex items-center text-red-500 hover:text-red-700">
          <FaHeart className="mr-1" /> Like
        </button>
        <button className="flex items-center text-blue-500 hover:text-blue-700">
          <FaShareAlt className="mr-1" /> Share
        </button>
      </div>
    </div>
  );
};

export default PortfolioCard;
