"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { updateEmployerProfileAction } from '@/features/server/employers.action';
import { Briefcase, Building2, Calendar, FileText, Globe, Loader, MapPin } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner';
import { EmployerProfileData, employerProfileSchema, organizationTypes, teamSizes } from '../employers.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Tiptap from '@/components/text-editor';

const EmployerSettingsForm = ({initialData }  : {
    initialData?:Partial<EmployerProfileData>
}) => {
    const { register, handleSubmit , control , formState: { errors, isDirty, isSubmitting }, } = useForm<EmployerProfileData>({
        defaultValues:{
            name:initialData?.name || "",
            description:initialData?.description || "",
            organizationType:initialData?.organizationType,
            teamSize:initialData?.teamSize,
            yearOfEstablisment:initialData?.yearOfEstablisment,
            websiteUrl:initialData?.websiteUrl || "",
            location:initialData?.location || "",
        },
        resolver:zodResolver(employerProfileSchema),
    });
    const handleFormSubmit = async (data:EmployerProfileData) =>{
        const response = await (updateEmployerProfileAction(data));
        if(response.status === 'SUCCESS'){
            toast.success(response.message);
        }else{
            toast.error(response.message);
        }
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
                            className={`pl-10 ${errors.name ? "border-destructive":""}`}
                            {...register("name")}
                        />
                    </div>
                    {errors.name && <p className='text-sm text-destructive'>{ errors.name.message}</p>}
                </div>
                {/* <div className='space-y-2'>
                    <Label htmlFor='description'>Description *</Label>
                    <div className='relative'>
                        <FileText className='absolute left-3 top-3 w-4 h-4 text-muted-foreground'/>
                        <Textarea
                            id='description'
                            placeholder='Tell us about your company, what you do, and your mission...'
                            className={`pl-10 min-h-[120px] resize-none ${errors.description ? "border-destructive":""}`}
                            {...register("description")}
                        />
                    </div>
                    {errors.description && <p className='text-sm text-destructive'>{ errors.description.message}</p>}
                </div> */}
                <div className="space-y-2">
                    <Controller
                        name="description"
                        control={control}
                        render={({ field, fieldState }) => (
                            <div className="space-y-2">
                            <Label>Description *</Label>
                            <Tiptap content={field.value} onChange={field.onChange} />

                            {fieldState.error && (
                                <p className="text-sm text-destructive">
                                {fieldState.error.message}
                                </p>
                            )}
                            </div>
                        )}
                    />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                        <Label htmlFor='organizationType'>Organization Type *</Label>
                        <Controller name='organizationType' control={ control } render={({ field }) =>(
                            <div className='relative'>
                                <Briefcase className='absolute left-3 top-1/3 tansform-translate-y-1/2 w-4 h-4
                                text-muted-foreground z-10'/>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className={`pl-10 w-full ${errors.organizationType ? "border-destructive":""}`}>
                                        <SelectValue placeholder="Select organization type"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {organizationTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )} />
                        {errors.organizationType                                                                                && <p className='text-sm text-destructive'>{ errors.organizationType.message}</p>}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='teamSize'>Team Size *</Label>
                        <Controller name='teamSize' control={ control } render={({ field }) =>(
                            <div className='relative'>
                                <Briefcase className='absolute left-3 top-1/3 tansform-translate-y-1/2 w-4 h-4
                                text-muted-foreground z-10'/>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className={`pl-10 w-full ${errors.teamSize ? "border-destructive":""}`}>
                                        <SelectValue placeholder="Select team size"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teamSizes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )} />
                        {errors.teamSize && <p className='text-sm text-destructive'>{ errors.teamSize.message}</p>}
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
                                className={`pl-10 ${errors.yearOfEstablisment ? "border-destructive":""}`}
                                {...register("yearOfEstablisment")}
                            />
                        </div>
                        {errors.yearOfEstablisment && <p className='text-sm text-destructive'>{ errors.yearOfEstablisment.message}</p>}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='location'>Location *</Label>
                        <div className='relative'>
                            <MapPin className='absolute left-3 top-1/3 transform-translate-y-1/2 w-4 h-4 text-muted-foreground'/>
                            <Input
                                id='location'
                                type='text'
                                placeholder='e.g., Pune, Bangalore'
                                className={`pl-10 ${errors.location ? "border-destructive":""}`}
                                {...register("location")}
                            />
                        </div>
                        {errors.location && <p className='text-sm text-destructive'>{ errors.location.message}</p>}
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
                            className={`pl-10 ${errors.websiteUrl ? "border-destructive":""}`}
                            {...register("websiteUrl")}
                        />
                    </div>
                    {errors.websiteUrl && <p className='text-sm text-destructive'>{ errors.websiteUrl.message}</p>}
                </div>
                <div className='flex items-center gap-4 pt-4'>
                    <Button type='submit'>
                        {isSubmitting && <Loader className='w-4 h-4 animate-spin'/>}
                        {isSubmitting ? "Saving Changes..." : "Save Changes"}
                    </Button>
                    {!isDirty && (
                        <p className='text-sm'>No changes to save</p>
                    )}
                </div>
            </form>

        </CardContent>
    </Card>
  )
}

export default EmployerSettingsForm