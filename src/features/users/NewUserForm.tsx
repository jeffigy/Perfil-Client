import React, { useEffect, useState } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { Roles } from "utils/roles";
import { ErrorType } from "types/Error";

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Health Worker");

  const canSave =
    [selectedRole, email, password, name].every(Boolean) && !isLoading;

  useEffect(() => {
    if (isSuccess) {
      setEmail(""), setPassword(""), setSelectedRole("");
      navigate("/dashboard/users");
    }
  });

  const newUserObj = {
    email,
    password,
    role: selectedRole,
    name,
  };
  const onSubmit = async (
    e: React.FormEvent<HTMLInputElement | HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser(newUserObj);
      console.log();
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="card w-full max-w-lg bg-base-100 shadow-sm"
    >
      <div className="card-body">
        <h2 className="card-title">New User</h2>
        {isError && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{(error as ErrorType).data.message}</span>
          </div>
        )}
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
            <span className="label-text">Email</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </label>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>

        <div className="form-control w-fit">
          <div className="label">
            <span className="label-text">role</span>
          </div>

          {Object.values(Roles).map((role) => {
            return (
              <label
                className="label cursor-pointer justify-start space-x-1"
                key={role}
              >
                <input
                  value={role}
                  type="radio"
                  name="radio-10"
                  className="radio-primary radio"
                  checked={selectedRole === role}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                <span className="label-text">{role}</span>
              </label>
            );
          })}
        </div>
        <div className="card-actions justify-end space-x-1">
          <button className="btn btn-ghost btn-neutral ">Cancel</button>
          <button className="btn btn-primary ">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default NewUserForm;
