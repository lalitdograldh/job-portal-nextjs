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
import { Eye, EyeOff,  Mail,  UserCheck } from "lucide-react";
import { loginUserAction } from '@/features/auth/server/auth.actions';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginUserData, loginUserSchema } from '@/features/auth/auth.schema';
import { useRouter } from 'next/navigation';
const LoginForm: React.FC= () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginUserSchema),
    });
const router  = useRouter();
const [showPassword, setShowPassword] = useState(false);

//console.log(formData);
const onSubmit = async(data: LoginUserData) => {
    const result = await loginUserAction(data);
    if(result.status ==="SUCCESS"){
        if(result.role === "employer") router.push("/employer-dashboard");
        else router.push("/dashboard");
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
                 <CardDescription>We are The Job Portal Team</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                            id="email"
                            {...register("email")}
                            type="email"
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
                    <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                            id="password"
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            required
                            className={`pl-10 pr-10 ${
                                errors.email ? "border-destructive" : ""
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
                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            Not a member? 
                            <Link
                            href="/register"
                            className="text-primary pl-1 hover:text-primary/80 font-medium underline-offset-4 hover:underline"
                            >
                             Register
                            </Link>
                        </p>
                     </div>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default LoginForm
