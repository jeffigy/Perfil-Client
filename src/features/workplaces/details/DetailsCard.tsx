import { MapPinIcon, UserIcon, QrCodeIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";
import { Workplace } from "types/Workplace";

type DetailsCardProps = {
  workplace: Workplace;
};

const DetailsCard: React.FC<DetailsCardProps> = ({ workplace }) => {
  return (
    <div className="flex h-40 flex-col rounded-md bg-secondary p-5 text-base-200 md:h-52">
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
        </div>
        <Link
          to={`/dashboard/workplaces/${workplace.id}/edit`}
          className="btn btn-sm rounded-sm"
        >
          Edit
        </Link>
      </div>
      <div className="flex grow flex-col justify-end">
        <div className="flex items-center">
          <QrCodeIcon className="mr-1 h-5" />
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            {workplace.workplaceCode}
          </p>
        </div>
      </div>
    </div>
  );
};
export default DetailsCard;
