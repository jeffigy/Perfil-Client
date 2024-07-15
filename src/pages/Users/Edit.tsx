import Loader from "components/Loader";
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

  return <>{user ? <EditUserForm user={user} /> : <Loader />}</>;
};

export default EditUserPage;
