import { InformationCircleIcon } from "@heroicons/react/24/outline";
import useFormattedDate from "hooks/useFormattedDate";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetPatientsQuery } from "./patientsApiSlice";

type PatientProps = {
  patientId: string;
};

const Patient: React.FC<PatientProps> = ({ patientId }) => {
  const navigate = useNavigate();
  const { patient } = useGetPatientsQuery("patientsList", {
    selectFromResult: ({ data }) => ({
      patient: data?.entities[patientId],
    }),
  });

  if (!patient) {
    return null;
  }

  const formattedDate = useFormattedDate(patient.createdAt);
  return (
    <tr>
      <td>{patient.name}</td>
      <td>{patient.email}</td>
      <td>{formattedDate}</td>
      <td>
        <button
          className="btn btn-square btn-link  btn-sm "
          onClick={() => navigate(`/dash/patients/${patientId}`)}
        >
          <InformationCircleIcon />
        </button>
      </td>
    </tr>
  );
};
export default Patient;
