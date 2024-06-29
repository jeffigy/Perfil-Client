import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React, { memo } from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { EntityId } from "@reduxjs/toolkit";

type UserProps = {
  userId: EntityId;
};

const User: React.FC<UserProps> = ({ userId }) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.roles}</td>
      <td>
        <button
          className="btn btn-square btn-link  btn-sm "
          onClick={() => navigate(`/dashboard/users/${userId}`)}
        >
          <InformationCircleIcon />
        </button>
      </td>
    </tr>
  );
};

const memoizedUser = memo(User);

export default memoizedUser;
