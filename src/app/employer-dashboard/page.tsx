import { getCurrentUser } from "@/features/auth/server/auth.queries";
const EmployerDashboard = async () => {
  const user =await getCurrentUser();
  //console.log("user data :",user);
  return (
    <div>
      <h1 className="capitalize text-2xl font-bold text-gray-900">Hello, {user?.name || "Guest"}</h1>
    </div>
  )
}

export default EmployerDashboard