import mongoose from "mongoose";
const connectdb = async () => {
    mongoose.connection.on("connected", () => {
        console.log("MongoDB connection established successfully");
    });
    mongoose.connect(`${process.env.MONGO_URI}/expense-tracker`);
}
export default connectdb;