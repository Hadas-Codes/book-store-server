
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...'); 
        const conn = await mongoose.connect('mongodb+srv://hadasmalka2007_db_user:0yCjRkN1W9fkFMuz@cluster0.kiqvxkr.mongodb.net/?appName=Cluster0');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;