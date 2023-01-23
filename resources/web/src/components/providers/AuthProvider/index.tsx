import { ApiApp } from "@/services/api/api.app";
import { apiClient } from "@/services/clients/api";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useEffectOnce } from "react-use";

interface AuthMailProps {
  email: string;
  password: string;
}

interface AuthContextProps {
  user?: ApiApp.Entities.User;
  loginByEmail: (props: AuthMailProps) => Promise<ApiApp.Entities.User>;
  loginByToken: (token: string) => Promise<ApiApp.Entities.User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuth: boolean;
  isAdmin: boolean;
  dashboardPath: string | undefined;
  username?: string;
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<ApiApp.Entities.User>();
  const isAuth = !!user;
  const isAdmin = !!user && user.role === "admin";
  const dashboardPath = user ? (isAdmin ? `/admin` : `/accpanel`) : undefined;
  const [isInitialized, setInitialize] = useState(false);

  const username = useMemo(() => {
    if (!user) return undefined;

    const [firstName, secondName] = user.name.split(" ");

    return `${firstName}${secondName ? ` ${secondName[0]}.` : ""}`;
  }, [user]);

  const onLoginSuccess = (res: ApiApp.Response$Auth) => {
    localStorage.setItem("meubemquere:auth", res.token);
    setUser(() => res.user);
  };

  const loginByEmail = async (props: AuthMailProps) => {
    return await apiClient.authenticateByEmail(props).then((res) => {
      onLoginSuccess(res);
      return res.user;
    });
  };

  const loginByToken = async (token: string) => {
    return await apiClient.authenticateByToken(token).then((res) => {
      onLoginSuccess(res);
      return res.user;
    });
  };

  const refreshUser = async () => {
    await apiClient.getAuthUser().then(setUser);
  };

  const logout = async () => {
    setUser(() => undefined);
    localStorage.removeItem("meubemquere:auth");
  };

  useEffect(() => {
    const localToken = localStorage.getItem("meubemquere:auth");

    if (localToken) {
      if (!isInitialized) {
        loginByToken(localToken).finally(() => {
          setInitialize(() => true);
        });
      }
    } else {
      setInitialize(() => true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        isAdmin,
        dashboardPath,
        username,
        loginByEmail,
        loginByToken,
        logout,
        refreshUser,
      }}
    >
      {isInitialized && <>{children}</>}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
