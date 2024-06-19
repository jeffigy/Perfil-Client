import { ErrorType } from "types/Error";
import { useGetPatientsQuery } from "./patientsApiSlice";
import Patient from "./Patient";
import Loader from "components/Loader";

const PatientsList = () => {
  const {
    data: patients,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPatientsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{(error as ErrorType).data.message}</span>
      </div>
    );
  }

  if (isSuccess) {
    const { ids } = patients;
    return (
      <div className="w-full overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {ids?.length
              ? ids.map((patientId) => (
                  <Patient key={patientId} patientId={patientId} />
                ))
              : "no data"}
          </tbody>
        </table>
      </div>
    );
  }
};

export default PatientsList;
