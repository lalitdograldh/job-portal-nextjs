"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, Building2, Calendar, FileText, Globe, MapPin } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form'

const organizationTypeOptions = ["development","business","design"] as const;
type OrganizationType = (typeof organizationTypeOptions)[number];

const teamSizeOptions = ["just me","2-10 employees","11-50 employees"] as const;
type TeamSize = (typeof teamSizeOptions)[number];

interface IFormInput {
  name: string
  description:string
  yearOfEstablisment:string
  location:string
  websiteUrl:string
  organizationType:OrganizationType
  teamSize:TeamSize
}

const EmployerSettingsForm = () => {
    const { register, handleSubmit , control } = useForm<IFormInput>();
    const handleFormSubmit = (data:IFormInput) =>{
        console.log(data);
    }
  return (
    <Card className='w-3/4'>
        <CardContent>
            <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
                {/* <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="picture">Picture</Label>
                    <Input id="picture" type="file" />
                </div> */}
                {/* Company Name */}
                <div className='space-y-2'>
                    <Label htmlFor='companyName'>Company Name *</Label>
                    <div className='relative'>
                        <Building2 className='absolute left-3 top-1/3 transform-translate-y-1/2 w-4 h-4 text-muted-foreground'/>
                        <Input
                            id='companyName'
                            type='text'
                            placeholder='Enter company name'
                            className='pl-10'
                            {...register("name")}
                        />
                    </div>
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='description'>Description *</Label>
                    <div className='relative'>
                        <FileText className='absolute left-3 top-3 w-4 h-4 text-muted-foreground'/>
                        <Textarea
                            id='description'
                            placeholder='Tell us about your company, what you do, and your mission...'
                            className='pl-10 min-h-[120px] resize-none'
                            {...register("description")}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                        <Label htmlFor='organizationType'>Organization Type *</Label>
                        <Controller name='organizationType' control={ control } render={({ field }) =>(
                            <div className='relative'>
                                <Briefcase className='absolute left-3 top-1/3 tansform-translate-y-1/2 w-4 h-4
                                text-muted-foreground z-10'/>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className='pl-10 w-full'>
                                        <SelectValue placeholder="Select organization type"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {organizationTypeOptions.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )} />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='teamSize'>Team Size *</Label>
                        <Controller name='teamSize' control={ control } render={({ field }) =>(
                            <div className='relative'>
                                <Briefcase className='absolute left-3 top-1/3 tansform-translate-y-1/2 w-4 h-4
                                text-muted-foreground z-10'/>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className='pl-10 w-full'>
                                        <SelectValue placeholder="Select team size"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teamSizeOptions.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )} />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                        <Label htmlFor='yearOfEstablisment'>Year of Establisment *</Label>
                        <div className='relative'>
                            <Calendar className='absolute left-3 top-1/3 transform-translate-y-1/2 w-4 h-4 text-muted-foreground'/>
                            <Input
                                id='yearOfEstablisment'
                                type='text'
                                placeholder='e.g., 2020'
                                maxLength={4}
                                className='pl-10'
                                {...register("yearOfEstablisment")}
                            />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='location'>Location *</Label>
                        <div className='relative'>
                            <MapPin className='absolute left-3 top-1/3 transform-translate-y-1/2 w-4 h-4 text-muted-foreground'/>
                            <Input
                                id='location'
                                type='text'
                                placeholder='e.g., Pune, Bangalore'
                                className='pl-10'
                                {...register("location")}
                            />
                        </div>
                    </div>
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='websiteUrl'>Website URL (optional) *</Label>
                    <div className='relative'>
                        <Globe className='absolute left-3 top-1/3 transform-translate-y-1/2 w-4 h-4 text-muted-foreground'/>
                        <Input
                            id='websiteUrl'
                            type='text'
                            placeholder='https://www.yourcompany.com'
                            className='pl-10'
                            {...register("websiteUrl")}
                        />
                    </div>
                </div>
                <Button type='submit'>Save Changes</Button>
            </form>

        </CardContent>
    </Card>
  )
}

export default EmployerSettingsForm