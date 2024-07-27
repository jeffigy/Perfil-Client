import { useState } from "react";

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

      <div className="w-full rounded-md bg-base-100 p-5">
        {activeTab === "announcements" && <div>Announcements Content</div>}
        {activeTab === "appointments" && <div>Appointments Content</div>}
        {activeTab === "patients" && <div>Patients Content</div>}
      </div>
    </div>
  );
};

export default DetailsTabs;
