import React from "react";
import { Route, RouteProps } from "react-router-dom";

const UserRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth = true;
  if (!isAuth) return <></>;
  return <>{children}</>;
};

export default UserRoute;
