"use client";
import { logoutUserAction } from "@/features/auth/server/auth.actions";
import { Bookmark, Briefcase, Building, CreditCard, LayoutDashboard, LogOut, Plus, Settings, User } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";
const base = "/employer-dashboard";
const navigationItem = [ 
    { name : "Overview",icon:LayoutDashboard, href:`${base}` }, 
    { name : "Employers Profile",icon:User }, 
    { name : "Post a Job",icon:Plus }, 
    { name : "My Jobs",icon:Briefcase }, 
    { name : "Saved Candidate",icon:Bookmark }, 
    { name : "Plans & Billing",icon:CreditCard }, 
    { name : "All Companies",icon:Building }, 
    { name : "Settings",icon:Settings,href:`${base}/settings` },
]
const EmployerSidebar = () => {
    const pathname = usePathname();
  return (
    <div className="w-64 bg-card border-r border-border fixed bottom-0 top-0">
        <div className="p-6 border-b">
            <h2 className="text-sm font-medium uppercase tracking-wide">
                Employers Dashboard
            </h2>
        </div>
        <nav className="px-3 space-y-1 py-2">
            {navigationItem.map((curNav) => {
                const Icon = curNav.icon;
                const isActive = pathname === curNav.href;
                return(
                    <Link 
                        key={curNav.name} 
                        href={curNav.href || "#"}
                        className=
                        {`
                            flex items-center gap-3 px-3 py-2 text-sm font-medium w-full 
                            transition-colors rounded-lg
                            hover:text-foreground hover:bg-accent
                            ${
                                isActive
                                    ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600 pl-2"
                                    : "text-muted-foreground border-l-4 border-transparent"
                            }
                        `}
                        >
                        <Icon/>
                        {curNav.name}
                    </Link>    
                    )
                })
            }
        </nav>
        <div className="absolute bottom-6 left-3 right-3">
            <button 
                onClick={logoutUserAction} 
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium hover:text-foreground hover:bg-accent rounded-lg transition-colors w-full text-destructive">
                <LogOut className="h-4 w-4"/>
                Log-out
            </button>
        </div>
    </div>
  )
}

export default EmployerSidebar