import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { themeChange } from "theme-change";
import Prefetch from "features/auth/Prefetch";

const HomePage = lazy(() => import("pages/HomePage"));
const LandingPage = lazy(() => import("pages/LandingPage"));
const RootLayout = lazy(() => import("components/RootLayout"));
const Layout = lazy(() => import("components/Layout/Layout"));
const WorkplacesPage = lazy(() => import("pages/Workplaces"));
const WorkplaceDetails = lazy(() => import("pages/Workplaces/Details"));
const EditWorkplace = lazy(() => import("pages/Workplaces/Edit"));
const PatientsPage = lazy(() => import("pages/Patients"));
const UsersPage = lazy(() => import("pages/Users"));
const NewUser = lazy(() => import("pages/Users/New"));
const EditUser = lazy(() => import("pages/Users/Edit"));
const ReportsPage = lazy(() => import("pages/Reports"));
function App() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage />} />

        <Route element={<Prefetch />}>
          <Route path="dashboard" element={<Layout />}>
            <Route index element={<HomePage />} />

            <Route path="workplaces">
              <Route index element={<WorkplacesPage />} />
              <Route path=":id">
                <Route index element={<WorkplaceDetails />} />
                <Route path="edit" element={<EditWorkplace />} />
              </Route>
            </Route>

            <Route path="patients">
              <Route index element={<PatientsPage />} />
            </Route>

            <Route path="users">
              <Route index element={<UsersPage />} />
              <Route path={"new"} element={<NewUser />} />
              <Route path={":id"} element={<EditUser />} />
            </Route>

            <Route path="reports">
              <Route index element={<ReportsPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
