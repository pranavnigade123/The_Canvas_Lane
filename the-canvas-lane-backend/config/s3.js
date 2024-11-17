const { S3Client } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize S3 with credentials from environment variables
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // Loaded from .env
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  // Loaded from .env
  },
});

module.exports = s3;
