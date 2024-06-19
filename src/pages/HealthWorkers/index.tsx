import TopBar from "../../components/HealthWorkers/TopBar";
import UsersList from "features/users/UsersList";

const HealthWorkersPage = () => {
  return (
    <div className="card w-full bg-base-100 p-6 shadow">
      <TopBar />
      <UsersList />
    </div>
  );
};

export default HealthWorkersPage;
