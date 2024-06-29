import { store } from "app/store";
import { patientsApiSlice } from "features/patients/patientsApiSlice";
import { usersApiSlice } from "features/users/usersApiSlice";
import { workplacesApiSlice } from "features/workplaces/workplacesApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", {
        force: true,
      }),
    );
    store.dispatch(
      workplacesApiSlice.util.prefetch("getWorkplaces", "workplacesList", {
        force: true,
      }),
    );
    store.dispatch(
      patientsApiSlice.util.prefetch("getPatients", "patientsList", {
        force: true,
      }),
    );
  }, []);

  return <Outlet />;
};

export default Prefetch;
