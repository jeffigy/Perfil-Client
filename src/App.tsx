import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { themeChange } from "theme-change";

const HomePage = lazy(() => import("./pages/HomePage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const RootLayout = lazy(() => import("./components/RootLayout"));
const Layout = lazy(() => import("./components/Dashboard/Layout"));
const WorkplacesPage = lazy(() => import("./pages/Workplaces/WorkplacesPage"));
const PatientsPage = lazy(() => import("./pages/Patients/PatientsPage"));
const HealthWorkersPage = lazy(
  () => import("./pages/HealthWorkers/HealthWorkersPage"),
);
const ReportsPage = lazy(() => import("./pages/Reports/ReportsPage"));

function App() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage />} />

        <Route element={<Layout />}>
          <Route path="dashboard">
            <Route index element={<HomePage />} />
          </Route>

          <Route path="workplaces">
            <Route index element={<WorkplacesPage />} />
          </Route>

          <Route path="patients">
            <Route index element={<PatientsPage />} />
          </Route>

          <Route path="health-workers">
            <Route index element={<HealthWorkersPage />} />
          </Route>

          <Route path="reports">
            <Route index element={<ReportsPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
