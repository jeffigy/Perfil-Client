import AppointmentList from "./AppointmentList";
import NewAppointmentModal from "./NewAppointmentModal";
const AppointmentsTab = () => {
  return (
    <div className="w-full max-w-screen-sm">
      <NewAppointmentModal />
      <AppointmentList />
    </div>
  );
};

export default AppointmentsTab;
