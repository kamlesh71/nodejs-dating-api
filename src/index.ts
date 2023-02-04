import mongoose from 'mongoose';
import { app } from '@/app';

const boot = async () => {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(
      'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2/dating',
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('App running on port 3000');
  });
};

void boot();
