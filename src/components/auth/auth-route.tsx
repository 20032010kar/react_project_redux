import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth-context.js"

const AuthRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div><h1>Session is loading</h1></div>
    }

    return user ? <Outlet /> : <Navigate to='/login' replace />;
}

export default AuthRoute;