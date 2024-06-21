import { store } from "app/store";
import { patientsApiSlice } from "features/patients/patientsApiSlice";
import { usersApiSlice } from "features/users/usersApiSlice";
import { workplacesApiSlice } from "features/workplaces/workplacesApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const patients = store.dispatch(
      patientsApiSlice.endpoints.getPatients.initiate(),
    );
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const workplaces = store.dispatch(
      workplacesApiSlice.endpoints.getWorkplaces.initiate(),
    );

    return () => {
      console.log("unsubscribing");
      patients.unsubscribe();
      users.unsubscribe();
      workplaces.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
