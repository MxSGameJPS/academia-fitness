import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStudentStore } from "../store/studentStore";
import { useAdminStore } from "../store/adminStore";

const ProtectedRoute = ({ children, requiredAuth }) => {
  const location = useLocation();
  const { isAuthenticated: isStudentAuthenticated } = useStudentStore();
  const { isAuthenticated: isAdminAuthenticated } = useAdminStore();

  // Verificar qual tipo de autenticação é necessário
  const isAuthenticated =
    requiredAuth === "admin"
      ? isAdminAuthenticated
      : requiredAuth === "student"
      ? isStudentAuthenticated
      : isAdminAuthenticated || isStudentAuthenticated;

  // Redirecionar para a página de login adequada
  const loginPath =
    requiredAuth === "admin"
      ? "/admin/login"
      : requiredAuth === "student"
      ? "/aluno/login"
      : "/aluno/login";

  if (!isAuthenticated) {
    // Redireciona para a página de login apropriada, mantendo o histórico da URL
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
