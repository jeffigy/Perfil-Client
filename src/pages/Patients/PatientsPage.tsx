import { InformationCircleIcon } from "@heroicons/react/24/outline";
import TopBar from "../../components/Patients/TopBar";

const PatientsPage = () => {
  return (
    <div className="card w-full bg-base-100 p-6 shadow">
      <TopBar />
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th className="hidden sm:table-cell">Email</th>
              <th className="hidden md:table-cell">Works at</th>
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

export default PatientsPage;

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
            <div className="fon-bold">Patient Name</div>
          </div>
        </div>
      </td>
      <td className="hidden sm:table-cell">sample@email.com</td>
      <td className="hidden md:table-cell">Davao City Red light District</td>
      <td>
        <div className="btn btn-square btn-primary">
          <InformationCircleIcon></InformationCircleIcon>
        </div>
      </td>
    </tr>
  );
};
