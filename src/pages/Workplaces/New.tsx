import NewWorkplaceForm from "features/workplaces/NewWorkplaceForm";
import useTitle from "hooks/useTitle";

const NewWorkplace = () => {
  useTitle("New Workplace");

  return <NewWorkplaceForm />;
};

export default NewWorkplace;
