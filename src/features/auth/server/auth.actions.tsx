"use server";

import { db } from "@/config";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";
import { LoginUserData, loginUserSchema, RegisterUserData, registerUserSchema } from "../auth.schema";

export const registrationAction = async (data: RegisterUserData) =>{
    try{
        const {data:validateData, error} = registerUserSchema.safeParse(data);
        if(error) return { status:"ERROR", message:error.issues[0].message };
        const {name, userName,email,password,role } = validateData;
        //console.log(Object.fromEntries(formData.entries()));
        const [user] = await db.select().from (users) .where(or(eq(users.email,email),eq(users.userName,userName)));
        if(user){
            if(user.email === email) 
                return{ status:"ERROR", message:"Email Already Exists" };
            else  
                return{ status:"ERROR", message:"UserName Already Exists" };
        }
        const hashPassword = await argon2.hash(password);
        await db.insert(users).values({name, userName,email,password:hashPassword,role });
        return{
            status:"SUCCESS",
            message:"Registration Completed Successfully",
        };
    }catch(error){
        return{
            status:"ERROR",
            message: "Unknown Error Occurred! Please Try Again Later",
        };
    }
}

export const loginUserAction = async (data :LoginUserData) =>{
    try{
        const {data:validateData, error} = loginUserSchema.safeParse(data);
        if(error) return { status:"ERROR", message:error.issues[0].message };
        const {email,password} = validateData;
        const [user] = await db.select().from (users) .where(eq(users.email,email));
        if(!user){
            return{ status:"ERROR", message:"Invalid Email or Password" };
        }
        const isValidPassword = await argon2.verify(user.password,password);
        if(!isValidPassword){
            return{ 
                status:"ERROR", 
                message:"Invalid Email or Password" 
            };
        }
        return{ 
            status:"SUCCESS", 
            message:"Login Successful"
        };
    }catch(error){
         return { 
            status:"ERROR", 
            message: "Unknown Error Occurred! Please Try Again Later",
        };
    }
}