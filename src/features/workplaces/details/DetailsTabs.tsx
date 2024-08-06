import { useState } from "react";
import AnnouncmentTab from "./Announcements/AnnouncementTab";
import AppointmentsTab from "./Appointments/AppointmentsTab";

const DetailsTabs = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  return (
    <div className="space-y-1">
      <div className=" mx-auto max-w-md ">
        {" "}
        <div role="tablist" className="tabs-boxed tabs bg-base-200">
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

      <div className="flex justify-center">
        {activeTab === "announcements" && <AnnouncmentTab />}
        {activeTab === "appointments" && <AppointmentsTab />}
        {activeTab === "patients" && <div>Patients Content</div>}
      </div>
    </div>
  );
};

export default DetailsTabs;
