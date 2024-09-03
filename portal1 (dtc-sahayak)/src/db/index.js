import mongoose from "mongoose";
import {DB_NAME } from "../constants.js";

const connectDB = async () =>{

    try {
       const connectionInstances= await mongoose.connect(`${process.env.MONOGODB_URI}/${DB_NAME}`)

    console.log(`\n Mongodb connected to port DB HOST:${ connectionInstances.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error ",error);
        process.exit(1)
        
    }

}
export default connectDB