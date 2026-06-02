import { Response } from "express";
import pool from "../config/db";
import { AuthRequest } from "../middleware/authMiddleware";

// getProfile
export const getProfile = async(req:AuthRequest, res:Response)=>{
    try{
        const user_id = req.user?.id;
        const [rows]:any = await pool.query(`SELECT id,name,email FROM users WHERE id=?`,[user_id]);
        res.json(rows[0]);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server Error"
        });

    }
};

//  Update profile

export const updateProfile = async(req: AuthRequest, res:Response)=>{
    try{
        const user_id = req.user?.id;
        const{name, email} = req.body;

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                message: "Invalid Email"
            });
        }
        await pool.query(`Update users SET name=?,email=? WHERE id=?`, [name,email,user_id]);
        res.json({message: "Profile Updated successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Update Failed"
        });
    
}
}

    
