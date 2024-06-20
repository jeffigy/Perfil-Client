import Loader from "components/Loader";
import { useGetUsersQuery } from "./usersApiSlice";
import { ErrorType } from "types/Error";
import User from "./User";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.log(error);

    return (
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
    );
  }

  if (isSuccess) {
    const { ids } = users;
    return (
      <div className="w-full overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {ids?.length
              ? ids.map((userId) => <User key={userId} userId={userId} />)
              : "no data"}
          </tbody>
        </table>
      </div>
    );
  }
};

export default UsersList;
