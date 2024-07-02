import useAuth from "hooks/useAuth";
import PageContent from "./PageContent";
import Sidebar from "./Sidebar";
import { useMemo } from "react";

const Layout = () => {
  const { roles } = useAuth();

  const isPatient = useMemo(() => roles.includes("Patient"), [roles]);

  return (
    <div className="drawer-auto-gutter drawer lg:drawer-open">
      {!isPatient && (
        <>
          {" "}
          <input
            id="left-sidebar-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <Sidebar />
        </>
      )}
      <PageContent />
    </div>
  );
};

export default Layout;
