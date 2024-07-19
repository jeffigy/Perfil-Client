import { SquaresPlusIcon, UserPlusIcon } from "@heroicons/react/24/outline";

const actions = [
  {
    icon: <SquaresPlusIcon className="h-5 w-5" />,
    name: "New Workplace",
    to: "/dashboard/workplaces/new",
  },
  {
    icon: <UserPlusIcon className="h-5 w-5" />,
    name: "New User",
    to: "/dashboard/users/new",
  },
];

export default actions;
