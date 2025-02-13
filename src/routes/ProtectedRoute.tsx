import React, { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <Navigate to="/login" replace/>
  }

  return children
}

export default ProtectedRoute