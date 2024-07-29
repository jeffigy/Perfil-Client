import { useParams } from "react-router-dom";
import { useGetAnnouncmentsByWorkplaceIdQuery } from "./announcementApiSlice";
import { ErrorType } from "types/Error";
import Announcement from "./Announcement";

const AnnouncementsList = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: announcements,
    isLoading,
    isError,
    error,
  } = useGetAnnouncmentsByWorkplaceIdQuery(id, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <p>loading....</p>;
  }

  if (isError) {
    return <p>{(error as ErrorType).data.message}</p>;
  }

  return (
    <div className="space-y-3">
      {announcements &&
        announcements.ids.map((id) => {
          return <Announcement announcementId={id} />;
        })}
    </div>
  );
};

export default AnnouncementsList;
