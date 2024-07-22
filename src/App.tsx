import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { themeChange } from "theme-change";
import Prefetch from "features/auth/Prefetch";
import PersistLogin from "features/auth/PersistLogin";
import RequireAuth from "features/auth/RequireAuth";
import { Roles } from "utils/roles";
import CheckEmail from "pages/Auth/CheckEmail";
import Edit from "pages/Profile/Edit";
import NewWorkplace from "pages/Workplaces/New";

const ForgotPassword = lazy(() => import("pages/Auth/ForgotPassword"));
const HomePage = lazy(() => import("pages/Dashboard"));
const LandingPage = lazy(() => import("pages/Auth/LandingPage"));
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
const Profile = lazy(() => import("pages/Profile"));
const Verify = lazy(() => import("pages/Auth/Verify"));
const NotFound = lazy(() => import("pages/NotFound"));

function App() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/check-email" element={<CheckEmail />} />

        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(Roles)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dashboard" element={<Layout />}>
                <Route index element={<HomePage />} />

                <Route path="profile">
                  <Route index element={<Profile />} />
                  <Route path=":id" element={<Edit />} />
                </Route>

                <Route
                  element={
                    <RequireAuth
                      allowedRoles={[
                        Roles["Super Admin"],
                        Roles.Admin,
                        Roles["Health Worker"],
                      ]}
                    />
                  }
                >
                  <Route path="workplaces">
                    <Route index element={<WorkplacesPage />} />
                    <Route path="new" element={<NewWorkplace />} />
                    <Route path=":id">
                      <Route index element={<WorkplaceDetails />} />
                      <Route path="edit" element={<EditWorkplace />} />
                    </Route>
                  </Route>

                  <Route path="patients">
                    <Route index element={<PatientsPage />} />
                  </Route>

                  <Route
                    element={
                      <RequireAuth
                        allowedRoles={[Roles["Super Admin"], Roles.Admin]}
                      />
                    }
                  >
                    {" "}
                    <Route path="users">
                      <Route index element={<UsersPage />} />
                      <Route path={"new"} element={<NewUser />} />
                      <Route path={":id"} element={<EditUser />} />
                    </Route>
                  </Route>

                  <Route path="reports">
                    <Route index element={<ReportsPage />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
