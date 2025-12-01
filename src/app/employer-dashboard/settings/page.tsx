import EmployerSettingsForm from '@/features/employers/components/employer-setting-form'
import { getCurrentEmployerDetails } from '@/features/server/employers.queries';
import { redirect } from 'next/navigation';


const EmployerSettings = async () => {
  const currentEmployer = await getCurrentEmployerDetails();
  if(!currentEmployer) return redirect('/login');
  //console.log("Current Employer :", currentEmployer);
  return (
    <EmployerSettingsForm 
    initialData = {{
      name: currentEmployer.employerDetails.name ?? undefined,
      description: currentEmployer.employerDetails.description ?? undefined,
      organizationType: currentEmployer.employerDetails.organizationType,
      teamSize:currentEmployer.employerDetails.teamSize,
      websiteUrl:currentEmployer.employerDetails.websiteUrl ?? undefined,
      yearOfEstablisment:currentEmployer.employerDetails.yearOfEstablisment?.toString(),
      location:currentEmployer.employerDetails.location ?? undefined,
    }}/>
  )
}

export default EmployerSettings