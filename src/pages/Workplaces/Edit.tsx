import Loader from "components/Loader";
import EditWorkplaceForm from "features/workplaces/EditWorkplaceForm";
import { useGetWorkplacesQuery } from "features/workplaces/workplacesApiSlice";
import useTitle from "hooks/useTitle";
import { useParams } from "react-router-dom";

const EditWorkplace = () => {
  useTitle("Edit Workplace");
  const { id } = useParams<{ id: string }>();

  const { workplace } = useGetWorkplacesQuery("workplacesList", {
    selectFromResult: ({ data }) => ({
      workplace: data?.entities[id!],
    }),
  });

  return (
    <>{workplace ? <EditWorkplaceForm workplace={workplace} /> : <Loader />}</>
  );
};

export default EditWorkplace;
