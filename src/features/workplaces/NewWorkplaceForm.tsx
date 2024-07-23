import { useNavigate } from "react-router-dom";
import { useAddNewWorkplaceMutation } from "./workplacesApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { ErrorType } from "types/Error";

const NewWorkplaceForm = () => {
  const navigate = useNavigate();

  const [addnewWorkplace, { isLoading }] = useAddNewWorkplaceMutation();

  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [address, setAddress] = useState("");

  const canSave = [name, owner, address].every(Boolean) && !isLoading;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addnewWorkplace({ name, owner, address }).unwrap();
      toast.success("New workplace succesfully created");
      navigate("/dashboard/workplaces");
    } catch (error) {
      toast.error((error as ErrorType).data.message);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="card mx-auto w-full max-w-lg bg-base-100 shadow-sm"
    >
      <div className="card-body">
        <h3 className="card-title">New Workplace</h3>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </label>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Owner</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
            value={owner}
            onChange={({ target }) => setOwner(target.value)}
          />
        </label>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
            value={address}
            onChange={({ target }) => setAddress(target.value)}
          />
        </label>

        <div className="card-actions flex-col-reverse justify-end gap-1 sm:flex-row">
          <button
            className="btn btn-ghost w-full sm:w-auto"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary w-full sm:w-auto"
            disabled={!canSave}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewWorkplaceForm;
