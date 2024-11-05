import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGOD_URI || ''; // Add your MongoDB URI to .env
const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 60000, // 60 seconds
  });
};

export default dbConnect;