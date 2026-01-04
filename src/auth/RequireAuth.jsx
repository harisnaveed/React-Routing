import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

function RequireAuth({ allowedRoles }) {
  const { user, isAuthenticated, role } = useAuth();

  if (!user || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
