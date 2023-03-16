import mongoose from 'mongoose';
import { app } from '@/app';

const boot = async () => {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(`${process.env.MONGO_URL}/dating`);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }

  const PORT = process.env.PORT ?? 3000;

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
};

void boot();
