import Modal from "components/Modal";
import useDisclosure from "hooks/useDisclosure";
import { useParams } from "react-router-dom";
import { useAddNewAnnouncementMutation } from "./announcementApiSlice";
import { toast } from "react-toastify";
import { ErrorType } from "types/Error";
import { useRef, useState } from "react";

const NewAnnouncementModal = () => {
  const { id } = useParams<{ id: string }>();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const { onClose, onOpen, isOpen } = useDisclosure("New Announcement");
  const [addNewAnnouncement, { isLoading }] = useAddNewAnnouncementMutation();

  const [title, setTitle] = useState("");

  const onModalOpen = () => {
    onOpen();
    setTimeout(() => {
      titleRef.current?.focus();
    }, 100);
  };

  const onModalClose = () => {
    setTitle("");
    onClose();
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const announcement = await addNewAnnouncement({
        workplace: id,
        title,
      }).unwrap();

      toast.success(announcement.message);
      setTitle("");
      onClose();
    } catch (error) {
      toast.error((error as ErrorType).data.message);
    }
  };
  return (
    <>
      <div className="join mt-3 w-full" onClick={onModalOpen}>
        <input
          type="text"
          className="input mb-3 w-full !rounded-e-none !rounded-s-full border-primary bg-base-100 shadow focus:border-none"
          placeholder="Announce something..."
        />
        <button className="btn btn-primary !rounded-e-full rounded-s-none">
          Post
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={onModalClose} title={"New Announcement"}>
        <form onSubmit={onSubmit}>
          <input
            ref={titleRef}
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            type="text"
            placeholder="Announcement something..."
            className="input input-lg w-full border-none px-0 font-semibold focus:outline-none"
          />

          <div className="modal-action">
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={!title || isLoading}
            >
              Post
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default NewAnnouncementModal;
