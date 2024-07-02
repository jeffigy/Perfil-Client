import { SunIcon, MoonIcon, BellIcon } from "@heroicons/react/16/solid";
import { useAppSelector } from "app/hooks";
import { useLogoutMutation } from "features/auth/authApiSlice";
import useAuth from "hooks/useAuth";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { themeChange } from "theme-change";
import { ErrorType } from "types/Error";

const Navbar = () => {
  const { pageTitle } = useAppSelector((state) => state.header);
  const navigate = useNavigate();
  const { email, status, roles } = useAuth();

  const [logout, { isLoading, isSuccess, isError, error }] =
    useLogoutMutation();

  const isPatient = useMemo(() => roles.includes("Patient"), [roles]);

  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme"),
  );

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: night)").matches
      ) {
        setCurrentTheme("night");
      } else {
        setCurrentTheme("winter");
      }
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/", { replace: true });
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) toast.error((error as ErrorType).data.message);
  }, [isError, error]);

  return (
    <>
      <div className="navbar sticky top-0 z-10  bg-base-100 shadow-sm ">
        <div className="flex-1">
          {isPatient ? (
            <Link to={"/dashboard"}>
              <img
                className="mask mask-squircle w-10"
                src="/logo.png"
                alt="DashWind Logo"
              />
            </Link>
          ) : (
            <>
              <h1 className="ml-2 text-2xl font-semibold">{pageTitle}</h1>
            </>
          )}
        </div>

        <div className="flex-none ">
          <label className="swap ">
            <input type="checkbox" />
            <SunIcon
              data-set-theme="winter"
              data-act-class="ACTIVECLASS"
              className={
                "h-6 w-6 fill-current " +
                (currentTheme === "night" ? "swap-on" : "swap-off")
              }
            />
            <MoonIcon
              data-set-theme="night"
              data-act-class="ACTIVECLASS"
              className={
                "h-6 w-6 fill-current " +
                (currentTheme === "winter" ? "swap-on" : "swap-off")
              }
            />
          </label>

          <button
            className="btn btn-circle btn-ghost  ml-4"
            // onClick={() => openNotification()}
          >
            <div className="indicator">
              <BellIcon className="h-6 w-6" />
              {/* {noOfNotifications > 0 ? (
                <span className="badge indicator-item badge-secondary badge-sm">
                  {noOfNotifications}
                </span>
              ) : null} */}
            </div>
          </button>

          <div className="ml-4v dropdown dropdown-end ">
            <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
              <div className="w-10 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  alt="profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu-compact menu dropdown-content mt-3 w-52 divide-y rounded-box bg-base-100 p-2 shadow"
            >
              <div className="flex flex-col items-center space-y-1 py-5">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <p className="font-medium">{email}</p>
                <p>{status}</p>
              </div>
              <li>
                <Link to={"/dashboard/profile"}>Profile</Link>
              </li>
              <li>
                <button onClick={logout}>
                  {isLoading ? "Logging out..." : "Logout"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
