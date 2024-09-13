import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
      await mongoose.connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected...');
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      process.exit(1);
    }
  };