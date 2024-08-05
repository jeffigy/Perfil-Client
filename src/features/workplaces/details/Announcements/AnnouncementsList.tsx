import { useParams } from "react-router-dom";
import { useGetAnnouncmentsByWorkplaceIdQuery } from "./announcementApiSlice";
import { ErrorType } from "types/Error";
import Announcement from "./Announcement";
import Loader from "components/Loader";

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
    return <Loader />;
  }

  if (isError) {
    return <p className="text-center">{(error as ErrorType).data.message}</p>;
  }

  return (
    <div className="space-y-3">
      {announcements &&
        announcements.ids.map((id) => {
          return <Announcement key={id} announcementId={id} />;
        })}
    </div>
  );
};

export default AnnouncementsList;
