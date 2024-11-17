const axios = require('axios');

const fetchUserProfileFromClerk = async (clerkUserId) => {
  try {
    const response = await axios.get(`https://api.clerk.dev/v1/users/${clerkUserId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile from Clerk:', error);
    return null;
  }
};

module.exports = fetchUserProfileFromClerk;
