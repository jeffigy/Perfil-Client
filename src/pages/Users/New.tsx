import NewUserForm from "features/users/NewUserForm";
import useTitle from "hooks/useTitle";

const NewUserPage = () => {
  useTitle("New User");

  return <NewUserForm />;
};

export default NewUserPage;
