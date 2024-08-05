import { EntityId } from "@reduxjs/toolkit";
import React from "react";
import { useGetAnnouncementsQuery } from "./announcementApiSlice";
import DeleteAnnouncementModal from "./DeleteAnnouncementModal";
import useFormattedDate from "hooks/useFormattedDate";
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

  const formattedDate = useFormattedDate(announcement.createdAt);

  return (
    <div className="card bg-base-100 shadow">
      <div className="flex items-center justify-between p-3 !pb-1">
        <div className="flex items-center">
          {" "}
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="ml-3 flex flex-col">
            <p className="font-medium leading-none">Announcers Name</p>
            <p className="text-xs leading-none text-slate-400">
              {formattedDate}
            </p>
          </div>
        </div>
        <DeleteAnnouncementModal announcement={announcement} />
      </div>
      <div className="divider m-0 p-0"></div>
      <div className="card-body">
        <p>{announcement.title}</p>
      </div>
    </div>
  );
};
export default Announcement;
