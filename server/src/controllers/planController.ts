import { Request,Response } from "express";
import pool from "../config/db";

export const getPlans =async(req:Request, res:Response)=>{
    try{
        const[rows] = await pool.query("SELECT * FROM plans");
        res.json(rows);
    }
    catch(error){
        res.status(500).json({
            message:"Failed to fetch plans"
        });

    }
}