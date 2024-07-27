import { PencilIcon } from "@heroicons/react/24/outline";
import { MapPinIcon, UserIcon, QrCodeIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";
import { Workplace } from "types/Workplace";
import DeleteWorkplace from "../DeleteWorkplace";

type DetailsCardProps = {
  workplace: Workplace;
};

const DetailsCard: React.FC<DetailsCardProps> = ({ workplace }) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between ">
        <div className="overflow-hidden">
          <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-bold">
            {workplace.name}
          </h2>

          <div className="flex items-center">
            <UserIcon className="mr-1 h-5" />
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {workplace.owner}
            </p>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="mr-1 h-5" />
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {workplace.address}
            </p>
          </div>
          <div className="flex items-center">
            <QrCodeIcon className="mr-1 h-5" />
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {workplace.workplaceCode}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-stretch justify-between">
          <Link
            to={`/dashboard/workplaces/${workplace.id}/edit`}
            className="btn btn-ghost text-primary"
          >
            <PencilIcon className="h-6 w-6 " />
          </Link>
          <DeleteWorkplace workplace={workplace} />
        </div>
      </div>
      <div className="flex grow flex-col justify-end"></div>
    </div>
  );
};
export default DetailsCard;
