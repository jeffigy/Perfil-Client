import React from "react";

type InfoEntryProps = {
  label: string;
  value: string | undefined;
};

const InfoEntry: React.FC<InfoEntryProps> = ({ label, value }) => {
  return (
    <div>
      <span className="mb-2 font-bold tracking-wider">{label}</span>

      <p className="mb-2 leading-3">{value}</p>
      <hr className="border-t border-gray-100" />
    </div>
  );
};
export default InfoEntry;
