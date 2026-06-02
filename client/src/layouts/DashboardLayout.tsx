import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

 type DashboardLayoutProps={children: React.ReactNode};
 function DashboardLayout({children,}:DashboardLayoutProps){
    const navigate =useNavigate();
    const {logout} = useAuth();
    const handleLogout=()=>{
        logout();
        navigate("/");
    };
 return(
    <div className="flex min-h-screen">
        <div className="w-64 bg-blue-900 text-white p-5">
            <h1 className="text-2xl font-bold mb-8">
                SaaS App
            </h1>
            <nav className="flex flex-col gap-4">
                <Link to= "/dashboard" className="hover:text-blue-400">
                Dashboard
                </Link>
                <Link to ="/plans" className="hover:text-blue-400">
                Plans
                </Link>
                <Link to ="/profile" className="hover:text-blue-400">
                Profile
                </Link>
                    <button onClick={handleLogout} className="text-left hover:text-red-400">
                        Logout
                    </button>
            </nav>
        </div>
        <div className="flex-1 p-6 bg-gray-100">
            {children}
        </div>
    </div>

 );}
 export default DashboardLayout;