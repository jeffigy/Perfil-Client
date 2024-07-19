import { HomeIcon } from "@heroicons/react/24/outline";
import ChartPieIcon from "@heroicons/react/24/outline/ChartPieIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import { ReactElement } from "react";
const iconClasses = `h-6 w-6`;

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
    icon: <HomeIcon className={iconClasses} />,
    name: "Home",
  },
  {
    path: "/dashboard/workplaces",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Workplaces",
  },
  {
    path: "/dashboard/patients",
    icon: <UserGroupIcon className={iconClasses} />,
    name: "Patients",
  },
  {
    path: "/dashboard/users",
    icon: <UsersIcon className={iconClasses} />,
    name: "Users",
  },
  {
    path: "/dashboard/reports",
    icon: <ChartPieIcon className={iconClasses} />,
    name: "Reports",
  },
];

export default routes;
