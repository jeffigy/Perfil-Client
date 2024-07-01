import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useAppSelector } from "app/hooks";
import React from "react";
import { selectWorkplaceById } from "./workplacesApiSlice";
import { Link } from "react-router-dom";
import { EntityId } from "@reduxjs/toolkit";

type WorkplaceCardProps = {
  workplaceId: EntityId;
};

const WorkplaceCard: React.FC<WorkplaceCardProps> = ({ workplaceId }) => {
  const workplace = useAppSelector((state) =>
    selectWorkplaceById(state, workplaceId),
  );

  if (!workplace) {
    return null;
  }

  return (
    <div className=" card w-full border bg-base-100 shadow transition-all hover:scale-[1.02]">
      <div className="card-body">
        <h2 className="card-title">{workplace.name}</h2>
        <p className="mb-5">{workplace.address}</p>
        <div className="card-actions justify-between">
          <Link
            to={`/dashboard/workplaces/${workplaceId}`}
            className="btn btn-outline btn-primary btn-sm"
          >
            Details
          </Link>

          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-square btn-ghost btn-sm"
            >
              <EllipsisVerticalIcon />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <a>Edit</a>
              </li>
              <li>
                <a>Delete</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkplaceCard;
