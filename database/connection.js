import mongoose from 'mongoose';

async function connection() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {dbName: 'Main'});
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    };
};

export default connection;