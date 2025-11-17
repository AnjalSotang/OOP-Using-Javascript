import mongoose from "mongoose";
import { envConfig } from "./config";

async function connectToDB(){
    try{
        mongoose.connection.on("connected",()=>{
            console.log("Database Connection Successfull!!")
        })
        await mongoose.connect(envConfig.mongoConnectionString as string)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

export default connectToDB