import Loader from "components/Loader";
import { useGetPatientsQuery } from "features/patients/patientsApiSlice";
import UpdateDetails from "features/profile/UpdateDetails";
import { useGetUsersQuery } from "features/users/usersApiSlice";
import useTitle from "hooks/useTitle";
import { useParams } from "react-router-dom";

const Edit = () => {
  useTitle("Update Details");
  const { id } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id!],
    }),
  });

  const { patient } = useGetPatientsQuery("patientsList", {
    selectFromResult: ({ data }) => ({
      patient: data?.entities[id!],
    }),
  });

  const details = patient || user;

  return <>{details ? <UpdateDetails details={details} /> : <Loader />}</>;
};

export default Edit;
