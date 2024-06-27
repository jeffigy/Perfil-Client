import { useAppSelector } from "app/hooks";
import { selectCurrentToken } from "features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  UserInfo: {
    email: string;
    roles: string[];
  };
}

const useAuth = () => {
  const token = useAppSelector(selectCurrentToken);

  if (!token) {
    return {
      email: "",
      roles: [],
      status: "",
      isSuperAdmin: false,
      isAdmin: false,
      isHealthWorker: false,
    };
  }

  const decoded: DecodedToken = jwtDecode(token);
  const { email, roles } = decoded.UserInfo;

  const isSuperAdmin = roles.includes("Super Admin");
  const isAdmin = roles.includes("Admin");
  const isHealthWorker = roles.includes("Health Worker");

  const status = isSuperAdmin
    ? "Super Admin"
    : isAdmin
      ? "Admin"
      : isHealthWorker
        ? "Health Worker"
        : "Patient";

  return { email, roles, status, isSuperAdmin, isAdmin, isHealthWorker };
};

export default useAuth;
