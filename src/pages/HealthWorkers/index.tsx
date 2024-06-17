import { InformationCircleIcon } from "@heroicons/react/24/outline";
import TopBar from "../../components/HealthWorkers/TopBar";

const HealthWorkersPage = () => {
  return (
    <div className="card w-full bg-base-100 p-6 shadow">
      <TopBar />
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th className="hidden sm:table-cell">Email</th>
              <th className="hidden md:table-cell">Account Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <TableData />
            <TableData />
            <TableData />
            <TableData />
            <TableData />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HealthWorkersPage;

const TableData = () => {
  return (
    <tr>
      {" "}
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-circle h-12 w-12">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div>
            <div className="fon-bold">Health Workers Name</div>
          </div>
        </div>
      </td>
      <td className="hidden sm:table-cell">sample@email.com</td>
      <td className="hidden md:table-cell">Active</td>
      <td>
        <div className="btn btn-square btn-primary">
          <InformationCircleIcon />
        </div>
      </td>
    </tr>
  );
};
