import { useAppSelector } from "app/hooks";
import Loader from "components/Loader";
import DetailsCard from "features/workplaces/DetailsCard";
import { selectWorkplaceById } from "features/workplaces/workplacesApiSlice";
import useTitle from "hooks/useTitle";
import { useParams } from "react-router-dom";

const WorkplaceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const workplace = useAppSelector((state) => selectWorkplaceById(state, id!));
  useTitle(workplace ? workplace.name : "...");

  return <>{workplace ? <DetailsCard workplace={workplace} /> : <Loader />}</>;
};

export default WorkplaceDetails;
