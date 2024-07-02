import React from "react";

type InfoEntryProps = {
  label: string;
  value: string;
};

const InfoEntry: React.FC<InfoEntryProps> = ({ label, value }) => {
  return (
    <div>
      <span className="mb-2 font-bold tracking-wider text-gray-700">
        {label}
      </span>
      <div>
        <p>{value}</p>
      </div>
    </div>
  );
};
export default InfoEntry;
