import WorkplacesGrid from "features/workplaces/WorkplacesGrid";
import useTitle from "hooks/useTitle";

const WorkplacesPage = () => {
  useTitle("Workplaces");

  return (
    <>
      <WorkplacesGrid />
    </>
  );
};

export default WorkplacesPage;
