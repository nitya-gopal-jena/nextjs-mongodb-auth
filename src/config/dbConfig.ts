import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    await mongoose.connect(MONGO_URI);
    console.log('Connected to mongodb server successfully');
  } catch (error) {
    console.log('Failed to connect with mongodb server', error);
    throw error;
  }
};

export default connectDB;
