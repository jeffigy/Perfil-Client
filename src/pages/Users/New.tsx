import NewUserForm from "features/users/NewUserForm";
import useTitle from "hooks/useTitle";

const NewUserPage = () => {
  useTitle("New User");

  return (
    <div>
      <NewUserForm />
    </div>
  );
};

export default NewUserPage;
