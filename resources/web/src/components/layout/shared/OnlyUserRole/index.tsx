import { useAuth } from "@/components/providers/AuthProvider";
import React from "react";
import { Navigate } from "react-router-dom";

interface OnlyUserRoleProps {
  role: "user" | "admin";
  redirect?: string;
  children?: React.ReactNode;
}

const OnlyUserRole: React.FC<OnlyUserRoleProps> = ({
  role,
  redirect,
  children,
}) => {
  const { user } = useAuth();
  if (!user || user.role !== role) {
    if (redirect) {
      return <Navigate to={redirect} />;
    }

    return <></>;
  }
  return <>{children}</>;
};

export default OnlyUserRole;
