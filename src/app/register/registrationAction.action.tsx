"use server";
export const registrationAction = async (formData: FormData) =>{
    const {name, userName,email,password,confirmPassword,role } = Object.fromEntries(formData.entries());
    console.log(Object.fromEntries(formData.entries()));
}