import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Suspense } from "react";
import SuspenseContent from "components/SuspenseContent";
import SpeedDial from "components/SpeedDial";
import actions from "routes/actions";

const PageContent = () => {
  return (
    <div className="drawer-content flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 overflow-y-auto bg-base-200 px-6 pt-4 md:pt-4">
        <Suspense fallback={<SuspenseContent />}>
          <Outlet />
        </Suspense>
      </main>
      <SpeedDial actions={actions} />
    </div>
  );
};

export default PageContent;
