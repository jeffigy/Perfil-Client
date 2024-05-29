import PageContent from "./PageContent";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className=" drawer-auto-gutter drawer lg:drawer-open">
      <input
        id="left-sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <PageContent />
      <Sidebar />
    </div>
  );
};

export default Layout;
