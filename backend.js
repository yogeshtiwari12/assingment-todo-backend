import "dotenv/config";
import express from "express";  
import cors from "cors";
import cookieParser from "cookie-parser";
// import { connectDB, prisma } from "./connectdb.js";
import mongoose from "mongoose";
import route from "./routes/route.js";


const app = express();

export const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, )
        .then(()=>{
            console.log("Connected to MongoDB");    
        })
        .catch((error)=>{   
            console.error("Error connecting to MongoDB:", error.message);            
        })   
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);              
    }
}


app.use(cookieParser())
app.use(express.json());


app.use(cors({
    origin: "hhttps://assingment-todo-frontend.vercel.app",
    credentials: true,
}))

app.use("/api", route);

const PORT = 4000;

connectDb().then(() => {
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
});
