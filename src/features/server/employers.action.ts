"use server"
import { db } from "@/config/db";
import { getCurrentUser } from "../auth/server/auth.queries";
import { employers } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { EmployerProfileData } from "../employers/employers.schema";

// const organizationTypeOptions = ["development","business","design"] as const;
// type OrganizationType = (typeof organizationTypeOptions)[number];

// const teamSizeOptions = ["just me","2-10 employees","11-50 employees"] as const;
// type TeamSize = (typeof teamSizeOptions)[number];

// interface IFormInput {
//   name: string
//   description:string
//   yearOfEstablisment:string
//   location:string
//   websiteUrl:string
//   organizationType:OrganizationType
//   teamSize:TeamSize
// }

export const updateEmployerProfileAction = async (data:EmployerProfileData) => {
    try{
        const currentUser = await getCurrentUser();
        if( !currentUser || currentUser.role !== 'employer'){
            return { status:"ERROR", message:'Unathorized'}
        }
    const {
        name,
        description,
        yearOfEstablisment,
        location,
        websiteUrl,
        organizationType,
        teamSize,
    } = data;

    const updateEmployer = await db.update(employers).set({
        name,
        description,
        location,
        websiteUrl,
        organizationType,
        teamSize,
        yearOfEstablisment:yearOfEstablisment 
            ? parseInt(yearOfEstablisment) : null
    }).where(eq(employers.id, currentUser.id));
    console.log("employer :", updateEmployer);
    return{ 
        status:"SUCCESS",
        message:'Profile updated successfully'
    };
    }catch(error){
        return { 
            status:"ERROR", 
            message:'Something went wrong, please try again'
        };
    }
}