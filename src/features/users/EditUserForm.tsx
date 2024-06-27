import React, { useEffect, useState } from "react";
import { useDeleteUserMutation, useUpdateUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { Roles } from "utils/roles";
import { ErrorType } from "types/Error";
import { User } from "types/User";
type EditUserFormProps = {
  user: User;
};
const EditUserForm: React.FC<EditUserFormProps> = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>(user.email);
  const [name, setName] = useState<string>(user.name);
  const [password, setPassword] = useState<string>("");
  const [active, setActive] = useState(user.active);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(user.roles);

  const canSave = [selectedRoles, email, name].every(Boolean) && !isLoading;

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setEmail(""), setPassword(""), setSelectedRoles([]);
      navigate("/dashboard/users");
    }
  });

  const userObj = {
    id: user.id,
    email,
    password,
    roles: selectedRoles,
    name,
    active,
  };
  const onSubmit = async (
    e: React.FormEvent<HTMLInputElement | HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (canSave) {
      await updateUser(userObj);
    }
  };

  const onChangeRoles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const role = e.target.value;
    const isChecked = e.target.checked;

    setSelectedRoles((prevSelectedRoles) =>
      isChecked
        ? [...prevSelectedRoles, role]
        : prevSelectedRoles.filter((r) => r !== role),
    );
  };

  const onDelete = async () => {
    await deleteUser({ id: user.id });
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
        {isDelError && (
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
            <span>{(delError as ErrorType).data.message}</span>
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
              <div className="form-control" key={role}>
                <label className="label cursor-pointer space-x-1">
                  <span className="label-text">{role}</span>
                  <input
                    type="checkbox"
                    id={role}
                    value={role}
                    checked={selectedRoles.includes(role)}
                    onChange={onChangeRoles}
                    className="checkbox-primary checkbox"
                  />
                </label>
              </div>
            );
          })}
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Active status</span>
            <input
              type="checkbox"
              className="checkbox-primary checkbox"
              checked={active}
              onChange={() => setActive(!active)}
            />
          </label>
        </div>
        <div className="card-actions justify-between space-x-1">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-neutral "
          >
            Cancel
          </button>
          <button className="btn btn-error" onClick={onDelete}>
            delete
          </button>
          <button type="submit" className="btn btn-primary ">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditUserForm;
