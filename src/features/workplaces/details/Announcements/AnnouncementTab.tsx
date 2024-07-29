import AnnouncementsList from "./AnnouncementsList";
import NewAnnouncementModal from "./NewAnnouncementModal";

const AnnouncementTab = () => {
  return (
    <div className="w-full max-w-screen-sm">
      <NewAnnouncementModal />
      <AnnouncementsList />
    </div>
  );
};

export default AnnouncementTab;
