import React from "react";
import { Link } from "react-router-dom";
import { Workplace } from "types/Workplace";

type DetailsCardProps = {
  workplace: Workplace;
};

const DetailsCard: React.FC<DetailsCardProps> = ({ workplace }) => {
  return (
    <div>
      <div>{workplace.id}</div>
      <div>{workplace.name}</div>
      <div>{workplace.address}</div>
      <div>{workplace.owner}</div>
      <Link to={`/dashboard/workplaces/${workplace.id}/edit`} className="btn">
        edit
      </Link>
    </div>
  );
};
export default DetailsCard;
