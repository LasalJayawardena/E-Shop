import mongoose from "mongoose";

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch(error) {
        console.log(`Error: ${error.message}`);
        // Exist when error occurs
        process.exit(1);
    }
}

export default connectDb;