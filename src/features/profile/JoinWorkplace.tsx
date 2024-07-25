import Modal from "components/Modal";
import React, { useState } from "react";
import { useJoinWorkplaceMutation } from "./profileApiSlice";
import { ErrorType } from "types/Error";
import { toast } from "react-toastify";
import useDisclosure from "hooks/useDisclosure";

type JoinWorkplaceProps = {
  userId: string;
};

const JoinWorkplace: React.FC<JoinWorkplaceProps> = ({ userId }) => {
  const [JoinWorkplace, { isLoading }] = useJoinWorkplaceMutation();
  const [workplaceCode, setWorkplaceCode] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure("join workplace");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await JoinWorkplace({
        id: userId,
        workplaceCode,
      }).unwrap();
      toast.success("Successfully joined a workplace");
      onClose();
    } catch (error) {
      toast.error((error as ErrorType).data.message, {
        autoClose: 10000,
      });
    }
  };

  return (
    <>
      <button onClick={onOpen} className="btn btn-ghost btn-sm text-primary">
        Join Workplace
      </button>
      <Modal isOpen={isOpen} onClose={onClose} title={"Join Workplace"}>
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
