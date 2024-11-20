import React, { useState } from "react";
import { FaHeart, FaShareAlt } from "react-icons/fa";

const PortfolioCard = ({
  mediaUrl,
  userName,
  userProfilePic,
  portfolioTitle,
  portfolioDescription,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fallback for user profile picture
  const profilePicture =
    userProfilePic && userProfilePic !== "default"
      ? userProfilePic
      : "https://via.placeholder.com/40";

  return (
    <>
      {/* Portfolio Card */}
      <div className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Image Section */}
        <div
          className="relative group cursor-pointer"
          onClick={() => setIsModalOpen(true)} // Open modal on image click
        >
          <img
            src={mediaUrl}
            alt={portfolioTitle}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-white font-semibold">{portfolioTitle}</h3>
            <p className="text-gray-300 text-sm">{portfolioDescription}</p>
          </div>
        </div>

        {/* User Info & Actions */}
        <div className="p-4 flex justify-between items-center bg-white">
          {/* User Info */}
          <div className="flex items-center space-x-2">
            <img
              src={profilePicture}
              alt={userName}
              className="w-8 h-8 rounded-full border border-gray-300"
            />
            <span className="text-gray-700 font-medium">{userName}</span>
          </div>
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              className="text-pink-500 hover:text-pink-700 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation(); // Prevent modal from opening
                console.log("Liked!");
              }}
            >
              <FaHeart className="text-lg" />
            </button>
            <button
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation(); // Prevent modal from opening
                console.log("Shared!");
              }}
            >
              <FaShareAlt className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              &times;
            </button>
            {/* Modal Content */}
            <img
              src={mediaUrl}
              alt={portfolioTitle}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              {portfolioTitle}
            </h2>
            <p className="mt-2 text-gray-600">{portfolioDescription}</p>
            <div className="mt-4 flex items-center">
              <img
                src={profilePicture}
                alt={userName}
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <span className="ml-3 text-gray-700 font-medium">{userName}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioCard;
