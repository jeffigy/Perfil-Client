import Loader from "components/Loader";
import DetailsCard from "features/workplaces/details/DetailsCard";
import DetailsTabs from "features/workplaces/details/DetailsTabs";
import { useGetWorkplacesQuery } from "features/workplaces/workplacesApiSlice";
import useTitle from "hooks/useTitle";
import { useParams } from "react-router-dom";

const WorkplaceDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { workplace } = useGetWorkplacesQuery("worplacesList", {
    selectFromResult: ({ data }) => ({
      workplace: data?.entities[id!],
    }),
  });

  useTitle(workplace ? workplace.name : "Loading...");

  if (!workplace) {
    return <Loader />;
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col space-y-5">
      <DetailsCard workplace={workplace} />
      <DetailsTabs />
    </div>
  );
};

export default WorkplaceDetails;
