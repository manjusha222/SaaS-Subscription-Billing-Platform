import { Server } from "node:http";
import app from "./app";
import pool from "./config/db";
import dotenv from "dotenv";
dotenv.config();
const port = 5000;
const startServer = async()=>{
    try{
    await pool.getConnection();
    console.log("database connected");

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});
}
catch(error){
    console.log(error);
}};
startServer();