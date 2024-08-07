import { EntityId } from "@reduxjs/toolkit";
import useFormattedDate from "hooks/useFormattedDate";
import React from "react";
import { useGetAppointmentsQuery } from "./appointmentApiSlice";
import { Link } from "react-router-dom";

type AppointmentProps = {
  appointmentId: EntityId;
};

const Appointment: React.FC<AppointmentProps> = ({ appointmentId }) => {
  const { appointment } = useGetAppointmentsQuery("appointmentsList", {
    selectFromResult: ({ data }) => ({
      appointment: data?.entities[appointmentId],
    }),
  });

  if (!appointment) {
    return null;
  }

  return (
    <Link to={""} className="card bg-base-100 shadow hover:bg-base-200">
      <div className="flex items-center justify-between p-3 !pb-1">
        <div className="flex items-center">
          {" "}
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="ml-3 flex flex-col">
            <p className="font-medium leading-none">Announcers Name</p>

            <p className="text-xs leading-none text-slate-400">
              {useFormattedDate(appointment.createdAt)}
            </p>
          </div>
        </div>
        {/* <DeleteAppointmentModal appointment={appointment} /> */}
      </div>
      <div className="divider m-0 p-0"></div>
      <div className="card-body">
        <p>{appointment.title}</p>
        <p>{new Date(appointment.startDate).toDateString()}</p>
        <p>{new Date(appointment.endDate).toDateString()}</p>
      </div>
    </Link>
  );
};
export default Appointment;
