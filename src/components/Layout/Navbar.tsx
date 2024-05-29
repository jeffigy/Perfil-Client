import {
  Bars3Icon,
  SunIcon,
  MoonIcon,
  BellIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { themeChange } from "theme-change";

const Navbar = () => {
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
  return (
    <>
      <div className="navbar sticky top-0 z-10  bg-base-100 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        <div className="flex-1">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <Bars3Icon className="inline-block h-5 w-5" />
          </label>
          <h1 className="ml-2 text-2xl font-semibold">{"page title"}</h1>
        </div>

        <div className="flex-none ">
          {/* Light and dark theme selection toogle **/}
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

          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" alt="profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu-compact menu dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li className="justify-between">
                <Link to={"/app/settings-profile"}>
                  Profile Settings
                  <span className="badge">New</span>
                </Link>
              </li>
              <li className="">
                <Link to={"/app/settings-billing"}>Bill History</Link>
              </li>
              <div className="divider mb-0 mt-0"></div>
              <li>{/* <a onClick={logoutUser}>Logout</a> */}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
