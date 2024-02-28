import mongoose from 'mongoose';

export default class MongoDb {
  constructor() {
    this.connectDb();
  }

  private async connectDb() {
    try {
      mongoose.set('strictQuery', false);
      await mongoose.connect(
        `mongodb://root:root@${process.env.NODE_ENV === 'production' ? 'mongo' : 'localhost'}:27017`,
        {
          ssl: false,
          dbName: 'restNotification'
        }
      );
      console.log('MongoDB connection successfully established');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }
}
