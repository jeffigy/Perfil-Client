import { store } from "app/store";
import { patientsApiSlice } from "features/patients/patientsApiSlice";
import { usersApiSlice } from "features/users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const patients = store.dispatch(
      patientsApiSlice.endpoints.getPatients.initiate(),
    );
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("unsubscribing");
      patients.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
