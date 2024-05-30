/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import ChartPieIcon from "@heroicons/react/24/outline/ChartPieIcon";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import BuildingOfficeIcon from "@heroicons/react/24/outline/BuildingOfficeIcon";

import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import { ReactElement } from "react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

interface SubmenuItem {
  path: string;
  icon: ReactElement;
  name: string;
}
interface RouteItem {
  path: string;
  icon: ReactElement;
  name: string;
  submenu?: SubmenuItem[];
}

type Routes = RouteItem[];

const routes: Routes = [
  {
    path: "/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/workplaces",
    icon: <BuildingOfficeIcon className={iconClasses} />,
    name: "Workplaces",
  },
  {
    path: "/patients",
    icon: <UserGroupIcon className={iconClasses} />,
    name: "Patients",
  },
  {
    path: "/health-workers",
    icon: <UsersIcon className={iconClasses} />,
    name: "Health Workers",
  },
  {
    path: "/reports",
    icon: <ChartPieIcon className={iconClasses} />,
    name: "Reports",
  },

  {
    path: "",
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />,
    name: "Pages",
    submenu: [
      {
        path: "/login",
        icon: <ArrowRightStartOnRectangleIcon className={submenuIconClasses} />,
        name: "Login",
      },
      {
        path: "/register", //url
        icon: <UserIcon className={submenuIconClasses} />,
        name: "Register",
      },
      {
        path: "/forgot-password",
        icon: <KeyIcon className={submenuIconClasses} />,
        name: "Forgot Password",
      },
      {
        path: "/app/blank",
        icon: <DocumentIcon className={submenuIconClasses} />,
        name: "Blank Page",
      },
      {
        path: "/app/404",
        icon: <ExclamationTriangleIcon className={submenuIconClasses} />,
        name: "404",
      },
    ],
  },
];

export default routes;
