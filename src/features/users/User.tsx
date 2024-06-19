import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { selectUserById } from "./usersApiSlice";
import { useAppSelector } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { User as UserType } from "types/User";

type UserProps = {
  userId: string;
};

const User: React.FC<UserProps> = ({ userId }) => {
  const user: UserType = useAppSelector((state) =>
    selectUserById(state, userId),
  );

  const navigate = useNavigate();
  if (!user) {
    return null;
  }

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button
          className="btn btn-square btn-link  btn-sm "
          onClick={() => navigate(`/dash/users/${userId}`)}
        >
          <InformationCircleIcon />
        </button>
      </td>
    </tr>
  );
};
export default User;
