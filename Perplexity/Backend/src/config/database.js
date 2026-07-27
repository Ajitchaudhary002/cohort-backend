
import mongoose from "mongoose";

export async function connectToDB() {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'perplexity'
    });
    // console.log(`MongoDB connected: ${connect.connection.host}`);
    console.log('connected to DB')
}

export default connectToDB;