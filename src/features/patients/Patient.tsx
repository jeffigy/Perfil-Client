import { useAppSelector } from "app/hooks";
import React from "react";
import { selectPatientById } from "./patientsApiSlice";
import { Patient as PatientType } from "types/Patient";
import { useNavigate } from "react-router-dom";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import useFormattedDate from "hooks/useFormattedDate";

type PatientProps = {
  patientId: string;
};

const Patient: React.FC<PatientProps> = ({ patientId }) => {
  const user: PatientType = useAppSelector((state) =>
    selectPatientById(state, patientId),
  );

  const formattedDate = useFormattedDate(user.createdAt);
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
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
