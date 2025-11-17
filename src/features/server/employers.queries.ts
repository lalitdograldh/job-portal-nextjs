import { db } from "@/config/db";
import { getCurrentUser } from "../auth/server/auth.queries"
import { eq } from "drizzle-orm";
import { employers } from "@/drizzle/schema";

export const getCurrentEmployerDetails = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) return null;
    if(currentUser.role !== 'employer') return null;
    const [employer] = await db
    .select()
    .from (employers)
    .where(eq(employers.id,currentUser.id));

    //console.log("employer:", employer);

    const isProfileCompleted = employer ? (
        employer.name &&
        employer.description &&
        employer.avatarUrl &&
        employer.organizationType &&
        employer.yearOfEstablisment
    ) : false;

    return { ...currentUser, employerDetails:employer ?? null, isProfileCompleted };
}