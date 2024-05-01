import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

export const connectDB = async()=>{
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
       console.log(`\n MongoDB CONNECTION SUCCESSFULLY !! DB HOST:: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED At DB Folder :: ", error);
        process.exit()
    }
}