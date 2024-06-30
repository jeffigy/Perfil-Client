import {
  UserGroupIcon,
  CreditCardIcon,
  CircleStackIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Stat from "../components/Dashboard/Stat";
import useTitle from "hooks/useTitle";

const HomePage = () => {
  useTitle("Dashboard");
  const statsData = [
    {
      title: "New Users",
      value: "34.7k",
      icon: <UserGroupIcon className="h-8 w-8" />,
      description: "↗︎ 2300 (22%)",
    },
    {
      title: "Total Sales",
      value: "$34,545",
      icon: <CreditCardIcon className="h-8 w-8" />,
      description: "Current month",
    },
    {
      title: "Pending Leads",
      value: "450",
      icon: <CircleStackIcon className="h-8 w-8" />,
      description: "50 in hot leads",
    },
    {
      title: "Active Users",
      value: "5.6k",
      icon: <UsersIcon className="h-8 w-8" />,
      description: "↙ 300 (18%)",
    },
  ];
  return (
    <>
      <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((data, key) => {
          return <Stat colorIndex={key} {...data} key={key} />;
        })}
      </div>
    </>
  );
};

export default HomePage;
