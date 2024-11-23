import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import PortfolioCard from "../components/PortfolioCard";
import { useTheme } from "../context/ThemeContext"; // Import the theme hook

const MyProfile = () => {
  const { user } = useUser(); // Clerk user data
  const { theme } = useTheme(); // Access theme state from context
  const [userDetails, setUserDetails] = useState(null); // State for user details
  const [portfolios, setPortfolios] = useState([]); // State for user portfolios
  const [showModal, setShowModal] = useState(false); // Modal toggle
  const [updatedDetails, setUpdatedDetails] = useState({}); // State for updated details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { session } = await window.Clerk; // Clerk session
        const token = await session.getToken();

        // Fetch user details
        const userResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetch portfolios
        const portfolioResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user-portfolios`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserDetails(userResponse.data.user);
        setUpdatedDetails(userResponse.data.user); // Initialize form fields
        setPortfolios(portfolioResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const { session } = await window.Clerk;
      const token = await session.getToken();

      const payload = {
        bio: updatedDetails.bio,
        skills: updatedDetails.skills,
        phone: updatedDetails.contactDetails?.phone || "", // Safely include phone
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/update`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserDetails(userResponse.data.user); // Update the state with the latest user data
      setShowModal(false); // Close modal
    } catch (err) {
      console.error("Error saving user details:", err);
      setError("Failed to save user details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 ${theme === "dark" ? "bg-black-900" : "bg-white"}`}>
      <h1 className={`text-4xl font-bold mb-8 ${theme === "dark" ? "text-white" : "text-black"}`}>
        My Profile
      </h1>
      {loading ? (
        <p className={`text-${theme === "dark" ? "gray-400" : "gray-600"}`}>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-8">
          <div
            className={`shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6 ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
            }`}
          >
            <img
              src={
                userDetails?.profilePicture ||
                "https://via.placeholder.com/150/7D7D7D/FFFFFF?text=No+Image"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 shadow-lg"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/150/7D7D7D/FFFFFF?text=No+Image";
              }}
            />
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-semibold">{userDetails.username || "Unknown User"}</h2>
              <p>{userDetails.emailAddresses[0]}</p>
              <p>
                <strong>Bio:</strong> {userDetails.bio || "No bio added."}
              </p>
              <p>
                <strong>Skills:</strong>{" "}
                {userDetails.skills.length > 0
                  ? userDetails.skills.join(", ")
                  : "No skills added."}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {userDetails.contactDetails?.phone || "No phone number added."}
              </p>
              <button
                className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-md"
                onClick={() => setShowModal(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div
                className={`p-6 rounded-lg shadow-lg w-full max-w-md ${
                  theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              >
                <h3 className="text-2xl font-semibold mb-4">Edit Profile</h3>
                <div className="mb-4">
                  <label className="block font-medium mb-1">Bio:</label>
                  <textarea
                    name="bio"
                    value={updatedDetails.bio || ""}
                    onChange={handleInputChange}
                    className={`w-full border rounded p-2 ${
                      theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
                    }`}
                    rows="3"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-1">Skills:</label>
                  <input
                    type="text"
                    name="skills"
                    value={updatedDetails.skills?.join(", ") || ""}
                    onChange={(e) =>
                      handleInputChange({
                        target: {
                          name: "skills",
                          value: e.target.value.split(","),
                        },
                      })
                    }
                    className={`w-full border rounded p-2 ${
                      theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
                    }`}
                  />
                  <small className={`text-${theme === "dark" ? "gray-400" : "gray-600"}`}>
                    Separate skills with commas.
                  </small>
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-1">Phone:</label>
                  <input
                    type="text"
                    name="contactDetails.phone"
                    value={updatedDetails.contactDetails?.phone || ""}
                    onChange={(e) =>
                      setUpdatedDetails((prev) => ({
                        ...prev,
                        contactDetails: {
                          ...prev.contactDetails,
                          phone: e.target.value,
                        },
                      }))
                    }
                    className={`w-full border rounded p-2 ${
                      theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
                    }`}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <h2 className={`text-3xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
              My Portfolios
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.length > 0 ? (
                portfolios.map((portfolio) => (
                  <PortfolioCard
                    key={portfolio._id}
                    mediaUrl={
                      portfolio.media[0]?.url
                        ? `${import.meta.env.VITE_BACKEND_URL}/${portfolio.media[0].url}`
                        : "https://via.placeholder.com/300"
                    }
                    userName={userDetails.username || "Unknown User"}
                    userProfilePic={userDetails.profilePicture}
                    portfolioTitle={portfolio.title || "Untitled"}
                    portfolioDescription={portfolio.description || "No description"}
                  />
                ))
              ) : (
                <p className={`text-${theme === "dark" ? "gray-400" : "gray-600"}`}>
                  No portfolios found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
