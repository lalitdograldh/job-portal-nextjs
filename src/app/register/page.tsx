"use client";
import React, { ChangeEvent, FormEvent, useState } from 'react'
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
import { registerUserAction } from '../../features/auth/server/auth.actions';
import { toast } from 'sonner';
import { Controller, useForm } from 'react-hook-form';
import { RegisterUserWithConfirmData, registerUserWithConfirmSchema } from '@/features/auth/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const Registration: React.FC= () => {
   const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserWithConfirmSchema),
  });
  console.log(errors);
  const router  = useRouter();
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//console.log(formData);
const onSubmit = async (data:RegisterUserWithConfirmData) => {
    const result = await registerUserAction(data);
    if(result.status ==="SUCCESS"){
        if(data.role === "employer") router.push("/employer-dashboard");
        else router.push("/applicant-dashboard");
    }
    if(result.status ==="SUCCESS") toast.success(result.message);
    else toast.error(result.message);
};
  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-[linear-gradient(to_right,#ee7724,#d8363a,#dd3675,#b44593)]'>
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                    <UserCheck className="w-8 h-8 text-primary-foreground" />
                </div>
                 <CardTitle className="text-2xl">Join Our Job Portal</CardTitle>
                 <CardDescription>Create your account to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input 
                            id="name" 
                            {...register("name")}
                            type="text" 
                            placeholder="Enter your full name" 
                            required
                            className={`pl-10 ${
                                errors.name ? "border-destructive" : ""
                            }`}/>
                        </div>
                        {errors.name && (
                            <p className="text-sm text-destructive">
                            {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="userName">User Name *</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                            id="userName"
                            type="text"
                            {...register("userName")}
                            placeholder="Choose a username"
                            required
                            className={`pl-10 ${
                                errors.userName ? "border-destructive" : ""
                            }`}/>
                        </div>
                        {errors.userName && (
                            <p className="text-sm text-destructive">
                                {errors.userName.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                            id="email"
                            type="email"
                           {...register("email")}
                            placeholder="Enter your email"
                            required
                            className={`pl-10 ${
                                errors.email ? "border-destructive" : ""
                            }`}/>
                        </div>
                        {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2 w-full">
                        <Label htmlFor="role">I am a *</Label>  
                        <Controller name='role' control={control} render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className={`w-full pl-10 pr-10 ${
                                        errors.role ? "border-destructive" : ""
                                    }`}>
                                    <SelectValue placeholder="Select your role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="applicant">Job Applicant</SelectItem>
                                    <SelectItem value="employer">Employer</SelectItem>
                                </SelectContent>
                            </Select>
                        )}>
                        </Controller>
                        {errors.role && (
                            <p className="text-sm text-destructive">
                                {errors.role.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                            id="password"
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            required
                            className={`pl-10 pr-10 ${
                                errors.password ? "border-destructive" : ""
                            }`}/>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                             >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="w-4 h-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-destructive">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                            id="confirmPassword"
                            {...register("confirmPassword")}
                            type={showConfirmPassword ? "text":"password"}
                            placeholder="Confirm your password"
                            required
                            className={`pl-10 pr-10 ${
                                errors.confirmPassword ? "border-destructive" : ""
                            }`}/>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="w-4 h-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-destructive">
                                {errors.confirmPassword.message}
                            </p>
                        )}
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
