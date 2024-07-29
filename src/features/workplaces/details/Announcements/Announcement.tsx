import { EntityId } from "@reduxjs/toolkit";
import React from "react";
import { useGetAnnouncementsQuery } from "./announcementApiSlice";

type AnnouncementProps = {
  announcementId: EntityId;
};

const Announcement: React.FC<AnnouncementProps> = ({ announcementId }) => {
  const { announcement } = useGetAnnouncementsQuery("announcementsList", {
    selectFromResult: ({ data }) => ({
      announcement: data?.entities[announcementId],
    }),
  });

  if (!announcement) {
    return null;
  }

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <p>{announcement.title}</p>
        <p>{announcement.description}</p>
      </div>
    </div>
  );
};
export default Announcement;
