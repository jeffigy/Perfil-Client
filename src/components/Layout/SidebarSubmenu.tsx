import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { ReactElement, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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

type SidebarSubmenuProps = RouteItem;

const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({
  submenu,
  name,
  icon,
}) => {
  const location = useLocation();

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (
      submenu &&
      submenu.filter((m: any) => {
        return m.path === location.pathname;
      })[0]
    )
      setIsExpanded(true);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="block w-full" onClick={() => setIsExpanded(!isExpanded)}>
        {icon} {name}
        <ChevronDownIcon
          className={
            "delay-400 float-right mt-1 h-5 w-5 transition-all duration-500  " +
            (isExpanded ? "rotate-180" : "")
          }
        />
      </div>

      <div className={` w-full ` + (isExpanded ? "" : "hidden")}>
        <ul className={`menu-compact menu`}>
          {submenu &&
            submenu.map((m: any, k: any) => {
              return (
                <li key={k}>
                  <Link to={m.path}>
                    {m.icon} {m.name}
                    {location.pathname == m.path ? (
                      <span
                        className="absolute inset-y-0 left-0 mb-1 mt-1 w-1 rounded-br-md rounded-tr-md bg-primary "
                        aria-hidden="true"
                      ></span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default SidebarSubmenu;
