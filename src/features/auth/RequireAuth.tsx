import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

type RequireAuthProps = {
  allowedRoles: string[];
};

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles } = useAuth();

  return (
    <>
      {roles.some((role) => allowedRoles.includes(role)) ? (
        <Outlet />
      ) : (
        <Navigate to="/" state={{ from: location }} replace={true} />
      )}
    </>
  );
};
export default RequireAuth;
