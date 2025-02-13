import React, { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Rol } from "../services/auth/AuthServiceInterface";

interface AdminRouteProps {
  children: ReactNode
}

const AdminRoute: React.FC<AdminRouteProps> = ({children}) => {
  const { user, roles } = useContext(AuthContext)
  console.log(user?.email, roles?.length)
  if (!user || !roles || !roles.includes(Rol.ADMIN)) {
    return <Navigate to="/" replace />;
  }

  return children
}

export default AdminRoute