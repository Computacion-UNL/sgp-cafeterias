import { useCurrentPermissions } from "@lib/api";
import { AuthModel, PermissionModel } from "@types";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextInterface {
  currentUser: AuthModel.CurrentUserResponse["currentUser"];
  updateCurrentUser: (data: AuthModel.CurrentUser) => void;
  permissions: PermissionModel.Response[];
}

interface AuthContextProviderInterface {
  currentUser: AuthModel.CurrentUserResponse["currentUser"];
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextInterface>({
  currentUser: null,
  updateCurrentUser: () => {},
  permissions: [],
});

export const AuthContextProvider: FC<AuthContextProviderInterface> = (
  props
) => {
  const { children } = props;

  const [currentUser, setCurrentUser] = useState(props.currentUser);
  const { data: permissions } = useCurrentPermissions();
  const updateCurrentUser = (data: AuthModel.CurrentUser) => {
    setCurrentUser((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    setCurrentUser(props.currentUser);
  }, [props.currentUser]);

  const value = useMemo(
    () => ({ currentUser, permissions: permissions ?? [], updateCurrentUser }),
    [currentUser, permissions]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
