import TopBar from "components/Workplace/TopBar";
import { useGetWorkplacesQuery } from "./workplacesApiSlice";
import WorkplaceCard from "./WorkplaceCard";
import { ErrorType } from "types/Error";

const WorkplacesGrid = () => {
  const {
    data: workplaces,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetWorkplacesQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      {" "}
      <TopBar />
      {isError && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{(error as ErrorType).data.message}</span>
        </div>
      )}
      <div className="mx-auto p-4 sm:max-w-full md:max-w-3xl xl:max-w-7xl">
        <div className="xxl:grid-cols-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
          {isSuccess &&
            workplaces.ids.map((workplaceId) => (
              <WorkplaceCard workplaceId={workplaceId} />
            ))}

          {isLoading &&
            [1, 2, 3, 4].map(() => (
              <div className="skeleton h-[208px] w-[253px]" />
            ))}
        </div>
      </div>
    </>
  );
};

export default WorkplacesGrid;
