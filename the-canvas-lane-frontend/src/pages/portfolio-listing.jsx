import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PortfolioCard from '../components/PortfolioCard';
import { useAuth } from '../context/authContext';

const PortfolioListing = () => {
    const { token } = useAuth(); // Token from authentication context
    const [portfolios, setPortfolios] = useState([]); // Portfolios state
    const [error, setError] = useState(null); // Error state
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        const fetchPortfolios = async () => {
            if (!token) {
                console.warn('[PortfolioListing] Token is not available yet. Waiting...');
                return; // Exit if token is not ready
            }

            setLoading(true); // Set loading state
            console.log('[PortfolioListing] Fetching portfolios with token:', token);

            try {
                // API call to fetch portfolios
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/portfolios/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in Authorization header
                    },
                    withCredentials: true, // Allow credentials
                });

                console.log('[PortfolioListing] Fetched portfolios:', response.data);

                // Check if response data is an array
                if (Array.isArray(response.data)) {
                    setPortfolios(response.data); // Update portfolios state
                } else {
                    console.error('[PortfolioListing] Unexpected response format:', response.data);
                    setError('Unexpected data format from server.');
                }
            } catch (err) {
                console.error('[PortfolioListing] Error fetching portfolios:', err);

                if (err.response) {
                    // Server-side error
                    setError(`Server error: ${err.response.status} - ${err.response.data.message || err.response.statusText}`);
                } else if (err.request) {
                    // Network error
                    setError('Failed to communicate with the server. Please check your network.');
                } else {
                    // Other errors
                    setError(`Unexpected error: ${err.message}`);
                }
            } finally {
                setLoading(false); // Reset loading state
            }
        };

        // Fetch portfolios when token is available
        if (token) {
            fetchPortfolios();
        }
    }, [token]); // Dependency array includes token

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-3xl font-bold text-center mb-6">Portfolios</h1>
            
            {/* Loading and Error States */}
            {loading && <p className="text-center">Loading portfolios...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            
            {/* Portfolio Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolios.length > 0 ? (
                    portfolios.map((portfolio) => (
                        <PortfolioCard
                            key={portfolio._id} // Use portfolio ID as key
                            mediaUrl={portfolio.media[0]?.url ? `${import.meta.env.VITE_BACKEND_URL}/${portfolio.media[0].url}` : "https://via.placeholder.com/300"} // Media URL
                            userName={portfolio.userName || "Unknown User"} // Fallback to "Unknown User"
                            userProfilePic={portfolio.userProfilePic || "https://via.placeholder.com/40"} // Fallback profile picture
                        />
                    ))
                ) : (
                    !loading && <p className="text-center text-gray-600">No portfolios available to display.</p>
                )}
            </div>
        </div>
    );
};

export default PortfolioListing;
