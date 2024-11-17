const getPortfoliosWithUserDetails = async (req, res) => {
    try {
      const portfolios = await Portfolio.find().populate('creator'); // Populate creator details if it's an ObjectId reference
      const userProfileCache = {};
  
      const enrichedPortfolios = await Promise.all(
        portfolios.map(async (portfolio) => {
          const userId = portfolio.creator?.clerkId; // Adjust based on actual structure
  
          console.log('Processing portfolio with creator userId:', userId);
  
          if (!userId) {
            console.warn(`No userId found for portfolio ${portfolio._id}`);
            return {
              ...portfolio.toObject(),
              userName: 'Unknown User',
              userProfilePic: 'https://via.placeholder.com/40',
            };
          }
  
          if (!userProfileCache[userId]) {
            const userProfile = await fetchUserProfileFromClerk(userId);
            console.log('Fetched userProfile for userId:', userId, userProfile);
  
            userProfileCache[userId] = userProfile
              ? { username: userProfile.username, profilePic: userProfile.profile_image_url }
              : { username: 'Unknown User', profilePic: 'https://via.placeholder.com/40' };
          }
  
          return {
            ...portfolio.toObject(),
            userName: userProfileCache[userId].username,
            userProfilePic: userProfileCache[userId].profilePic,
          };
        })
      );
  
      console.log('Final enriched portfolios:', enrichedPortfolios);
      res.status(200).json(enrichedPortfolios);
    } catch (error) {
      console.error('Error fetching portfolios with user details:', error);
      res.status(500).json({ message: 'Error fetching portfolios with user details' });
    }
  };
  