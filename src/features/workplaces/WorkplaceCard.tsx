import React from "react";
import { useGetWorkplacesQuery } from "./workplacesApiSlice";
import { Link } from "react-router-dom";
import { EntityId } from "@reduxjs/toolkit";

type WorkplaceCardProps = {
  workplaceId: EntityId;
};

const WorkplaceCard: React.FC<WorkplaceCardProps> = ({ workplaceId }) => {
  const { workplace } = useGetWorkplacesQuery("workplacesList", {
    selectFromResult: ({ data }) => ({
      workplace: data?.entities[workplaceId],
    }),
  });

  if (!workplace) {
    return null;
  }

  return (
    <Link
      to={`/dashboard/workplaces/${workplaceId}`}
      className="card card-compact w-full bg-sky-500  shadow hover:cursor-pointer hover:bg-sky-400 active:bg-sky-600 "
    >
      <div className="card-body">
        <div>
          <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-semibold">
            {workplace.name}
          </h2>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            {workplace.address}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default WorkplaceCard;
