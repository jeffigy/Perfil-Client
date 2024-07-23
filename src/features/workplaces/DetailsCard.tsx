import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Workplace } from "types/Workplace";

type DetailsCardProps = {
  workplace: Workplace;
};

const DetailsCard: React.FC<DetailsCardProps> = ({ workplace }) => {
  const [activeTab, setActiveTab] = useState("appointments");
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col space-y-5">
      <div className="flex h-40 flex-col rounded-md bg-secondary p-5 text-base-200 md:h-52">
        <div className="flex justify-between ">
          <div className="overflow-hidden">
            <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-bold">
              {workplace.name}
            </h2>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {workplace.owner}
            </p>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {workplace.address}
            </p>
          </div>
          <Link
            to={`/dashboard/workplaces/${workplace.id}/edit`}
            className="btn btn-sm rounded-sm"
          >
            Edit
          </Link>
        </div>
        <div className="flex grow flex-col justify-end">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            Workplace code: {workplace.workplaceCode}
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <div className=" mx-auto max-w-md ">
          {" "}
          <div role="tablist" className="tabs-boxed tabs bg-base-300">
            <a
              className={`tab-bordered tab ${activeTab === "announcements" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("announcements")}
            >
              Announcements
            </a>
            <a
              className={`tab-bordered tab ${activeTab === "appointments" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("appointments")}
            >
              Appointments
            </a>
            <a
              className={`tab-bordered tab ${activeTab === "patients" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("patients")}
            >
              Patients
            </a>
          </div>
        </div>

        <div className="w-full rounded-md bg-base-100 p-5">
          {activeTab === "announcements" && <div>Announcements Content</div>}
          {activeTab === "appointments" && <div>Appointments Content</div>}
          {activeTab === "patients" && <div>Patients Content</div>}
        </div>
      </div>
    </div>
  );
};
export default DetailsCard;
