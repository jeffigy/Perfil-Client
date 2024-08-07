import { useParams } from "react-router-dom";
import Appointment from "./Appointment";
import { ErrorType } from "types/Error";
import Loader from "components/Loader";
import { useGetAppointmentsByWorkplaceIdQuery } from "./appointmentApiSlice";

const AppointmentList = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: appointments,
    isLoading,
    isError,
    error,
  } = useGetAppointmentsByWorkplaceIdQuery(id, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p className="text-center">{(error as ErrorType).data.message}</p>;
  }

  return (
    <div className="space-y-3">
      {appointments &&
        appointments.ids.map((id) => {
          return <Appointment key={id} appointmentId={id} />;
        })}
    </div>
  );
};

export default AppointmentList;
