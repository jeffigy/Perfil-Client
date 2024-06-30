import EditUserForm from "features/users/EditUserForm";
import { useGetUsersQuery } from "features/users/usersApiSlice";
import useTitle from "hooks/useTitle";
import { useParams } from "react-router-dom";

const EditUserPage = () => {
  useTitle("Edit User");
  const { id } = useParams<{ id: string }>();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id!],
    }),
  });

  return (
    <div className="flex justify-center">
      {user ? <EditUserForm user={user} /> : <p>loading....</p>}
    </div>
  );
};

export default EditUserPage;
