"use server";

import { db } from "@/config";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";

export const registrationAction = async (data: {
    name: string,
    userName: string,
    email: string,
    password: string,
    role: "applicant" | "employer",
}) =>{
    const {name, userName,email,password,role } = data;
    //console.log(Object.fromEntries(formData.entries()));
    const hashPassword = await argon2.hash(password);
    await db.insert(users).values({name, userName,email,password:hashPassword,role });
}