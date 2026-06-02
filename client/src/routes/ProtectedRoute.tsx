import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
type ProtectedRouteProps= {children: React.ReactNode;};
function ProtectedRoute({children,}:ProtectedRouteProps){
    const {token} = useAuth();
    if(!token){
        return <Navigate to ="/"/>;
    }
    return children;
}
export default ProtectedRoute;