import { Request, Response } from "express";
import pool from "../config/db";
import  jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async(req:Request, res:Response)=>{
    try{
        const{email, password} = req.body;
        const[rows] :any =await pool.query(`SELECT * FROM users WHERE email=?`,[email]);
        const user =rows[0];
        if(!user){
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        // if(user.password !== user.password){
        //     return res.status(401).json({
        //         message:"Invalid password"
        //     });
        // }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid Credentials"
            });
        }
        const token = jwt.sign({
            id:user.id,
            email:user.email,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d",
        }
            
        );
        res.json({message: "Login successful",token, user:{
            id:user.id,
            name:user.name,
            email:user.email,
        }
        });
        }    
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Login Failed"
        });
    }

};

export const register = async(req:Request, res:Response)=>{
    try{
        const{name,email,password}=req.body;
        console.log(req.body);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                message:"Invalid Email"
            });
        }
        if(password.length<6){
            return res.status(400).json({
                message:"password must be minimum 6 characters"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10)
    await pool.query(`INSERT INTO users (name,email,password) VALUES (?,?,?)`,[name,email,hashedPassword]);
    
    res.json({message:"User Registered successfully",
        user: {name}
    });
}
catch(error){
    console.log(error);
    res.status(500).json({
        message:"Registration failed"
    });
}
};