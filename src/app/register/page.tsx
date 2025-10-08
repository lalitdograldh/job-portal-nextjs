"use client";
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, EyeOff, Lock, Mail, User, UserCheck } from "lucide-react";
interface RegistrationFormData {
    name : string;
    userName :string;
    email:string;
    password:string;
    confirmPassword:string;
    role:'applicant' | 'employer';
}
const Registration: React.FC= () => {
    const [formData,setForData] = useState<RegistrationFormData>({
        name :'',
        userName: '',
        email : '',
        password:'',
        confirmPassword:'',
        role:'applicant',
    })
  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                    <UserCheck className="w-8 h-8 text-primary-foreground" />
                </div>
                 <CardTitle className="text-2xl">Join Our Job Portal</CardTitle>
                 <CardDescription>Create your account to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input 
                            id="name" 
                            type="text" 
                            placeholder="Enter your full name" 
                            className={`pl-10 `}/>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="userName">User Name *</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                            id="userName"
                            type="text"
                            placeholder="Choose a username"
                            required
                            className={`pl-10 `}/>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            className={`pl-10 `}/>
                        </div>
                    </div>
                    <div className="space-y-2 w-full">
                        <Label htmlFor="role">I am a *</Label>  
                        <Select>
                           <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="applicant">Job Applicant</SelectItem>
                                <SelectItem value="employer">Employer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                            id="password"
                            type="text"
                            placeholder="Create a strong password"
                            required
                            className={`pl-10 pr-10 `}/>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                            id="confirmPassword"
                            type="text"
                            placeholder="Confirm your password"
                            required
                            className={`pl-10 pr-10 `}/>
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account? 
                            <Link
                            href="/login"
                            className="text-primary pl-1 hover:text-primary/80 font-medium underline-offset-4 hover:underline"
                            >
                             Sign in here
                            </Link>
                        </p>
                     </div>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default Registration
