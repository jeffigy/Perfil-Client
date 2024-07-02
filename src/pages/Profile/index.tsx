import InfoEntry from "components/Profile/InfoEntry";
import { useGetPatientsQuery } from "features/patients/patientsApiSlice";
import { useGetUsersQuery } from "features/users/usersApiSlice";
import useAuth from "hooks/useAuth";
import useFormattedDate from "hooks/useFormattedDate";
import useTitle from "hooks/useTitle";

const index = () => {
  useTitle("Profile");
  const { email, status } = useAuth();

  const { user } = useGetUsersQuery("usersList ", {
    selectFromResult: ({ data }) => ({
      user: data
        ? Object.values(data.entities).find((entity) => entity?.email === email)
        : undefined,
    }),
  });

  const { patient } = useGetPatientsQuery("patientsList", {
    selectFromResult: ({ data }) => ({
      patient: data
        ? Object.values(data.entities).find((entity) => entity?.email === email)
        : undefined,
    }),
  });

  const profile = user || patient;
  const createAt = useFormattedDate(profile?.createdAt || "");

  if (profile) {
    return (
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 gap-6 px-4 sm:grid-cols-12">
          <div className="col-span-4 sm:col-span-5">
            <div className="card rounded-md bg-base-100 text-neutral-content shadow-sm">
              <div className="card-body">
                <div className="flex flex-col items-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/94.jpg"
                    className="mb-4 h-32 w-32 shrink-0 rounded-full bg-gray-300"
                  ></img>
                  <h1 className="text-xl font-bold">{profile.name}</h1>

                  <div className="my-3 flex w-full flex-col">
                    <button className="btn btn-primary w-full">
                      Update Profile
                    </button>
                    <button className="btn btn-ghost w-full text-primary">
                      View pink card
                    </button>
                  </div>
                </div>
                <hr className="border-t border-gray-300" />
                <div className="flex flex-col space-y-3">
                  <InfoEntry label={"Email"} value={profile.email} />
                  {status !== "Patient" && (
                    <InfoEntry label={"Role"} value={status} />
                  )}
                  <InfoEntry label={"Date created"} value={createAt} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-7">
            <div className="card rounded-md bg-base-100 shadow-sm">
              <div className="card-body">
                {profile.roles.includes("Patient") ? (
                  <>
                    <InfoEntry label={"Birthday"} value={"sample data"} />
                    <InfoEntry label={"Gender"} value={"sample data"} />
                    <InfoEntry label={"Civil Status"} value={"sample data"} />
                    <InfoEntry label={"Fathers Name"} value={"sample data"} />
                    <InfoEntry label={"Mothers Name"} value={"sample data"} />
                    <InfoEntry label={"Ethinicity"} value={"sample data"} />
                    <InfoEntry label={"Religion"} value={"sample data"} />
                    <InfoEntry label={"Nationality"} value={"sample data"} />
                    <InfoEntry label={"Address"} value={"sample data"} />
                    <InfoEntry label={"Workplace"} value={"sample data"} />
                  </>
                ) : (
                  <p className="mx-auto">
                    {" "}
                    This section is currently unvailable
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default index;
