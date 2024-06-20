import { useAppSelector } from "app/hooks";
import EditUserForm from "features/users/EditUserForm";
import { selectUserById } from "features/users/usersApiSlice";
import { useParams } from "react-router-dom";

const EditUserPage = () => {
  const { id } = useParams<{ id: string }>();

  const user = useAppSelector((state) => selectUserById(state, id!));

  return (
    <div className="flex justify-center">
      {user ? <EditUserForm user={user} /> : <p>loading....</p>}
    </div>
  );
};

export default EditUserPage;
