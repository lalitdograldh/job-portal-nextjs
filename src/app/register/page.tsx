"use client";
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
    <div>
        <form>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="username">userName</Label>
                <Input id="username" type="text" />
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select>
                    <SelectTrigger id="theme" className="w-[180px]">
                    <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </form>
    </div>
  )
}

export default Registration
