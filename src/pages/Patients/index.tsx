import PatientsList from "features/patients/PatientsList";
import useTitle from "hooks/useTitle";

const PatientsPage = () => {
  useTitle("Patients");
  return <PatientsList />;
};

export default PatientsPage;
