import Modal from "components/Modal";
import React, { useState } from "react";
import { useJoinWorkplaceMutation } from "./profileApiSlice";
import { ErrorType } from "types/Error";
import { toast } from "react-toastify";

type JoinWorkplaceProps = {
  userId: string;
};

const JoinWorkplace: React.FC<JoinWorkplaceProps> = ({ userId }) => {
  const [JoinWorkplace, { isLoading }] = useJoinWorkplaceMutation();
  const [workplaceCode, setWorkplaceCode] = useState("");

  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await JoinWorkplace({
        id: userId,
        workplaceCode,
      }).unwrap();
      toast.success("Successfully joined a workplace");
    } catch (error) {
      toast.error((error as ErrorType).data.message, {
        autoClose: 10000,
      });
    }
  };

  return (
    <>
      <button onClick={openModal} className="btn btn-ghost btn-sm text-primary">
        Join Workplace
      </button>
      <Modal isOpen={modal} onClose={closeModal}>
        <button
          type="button"
          onClick={closeModal}
          className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="mb-3 text-lg font-bold">Join Workplace</h3>

        <form onSubmit={onSubmit}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Workplace Code</span>
            </div>
            <input
              value={workplaceCode}
              onChange={({ target }) => setWorkplaceCode(target.value)}
              type="text"
              placeholder="e.g. Gb9w541Oba"
              className="input input-bordered w-full"
            />
          </label>
          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto"
              disabled={isLoading || !workplaceCode}
            >
              {isLoading ? "Joining..." : "Join"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default JoinWorkplace;
