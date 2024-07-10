import InfoEntry from "components/Profile/InfoEntry";
import { useGetPatientsQuery } from "features/patients/patientsApiSlice";
import UpdateProfile from "features/patients/UpdateProfile";
import { useGetUsersQuery } from "features/users/usersApiSlice";
import useAuth from "hooks/useAuth";
import useFormattedDate from "hooks/useFormattedDate";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { Patient } from "types/Patient";

function isPatient(profile: any): profile is Patient {
  return (profile as Patient).bday !== undefined;
}

const Profile = () => {
  useTitle("Profile");
  const { email, status } = useAuth();

  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetUsersQuery("usersList");
  const {
    data: patientsData,
    isLoading: isPatientsLoading,
    isError: isPatientsError,
  } = useGetPatientsQuery("patientsList");

  const user = usersData
    ? Object.values(usersData.entities).find(
        (entity) => entity?.email === email,
      )
    : undefined;
  const patient = patientsData
    ? Object.values(patientsData.entities).find(
        (entity) => entity?.email === email,
      )
    : undefined;

  const profile = patient || user;
  const createdAt = useFormattedDate(profile?.createdAt || "");

  if (isUsersLoading || isPatientsLoading) {
    return <div>Loading...</div>;
  }

  if (isUsersError || isPatientsError) {
    return <div>Error loading data.</div>;
  }

  if (!profile) {
    return <div>No profile found.</div>;
  }

  const ProfileInfo = () => (
    <div className="card rounded-md bg-base-100 text-neutral-content shadow-sm">
      <div className="card-body">
        <div className="flex flex-col items-center space-y-2">
          <div className="relative">
            <img
              src={profile.avatar}
              className="h-[150px] w-[150px] rounded-full border-2 border-gray-400"
              alt="Avatar"
            />

            <UpdateProfile userId={profile.id} />
          </div>
          <h1 className="text-xl font-bold">{profile.name}</h1>
          <div className="flex w-full flex-col gap-3 lg:flex-row">
            <button className="btn btn-primary flex-1 ">Update Profile</button>
            <button className="btn btn-ghost flex-1 text-primary">
              View pink card
            </button>
          </div>
        </div>
        <hr className="border-t border-gray-300" />
        <div className="flex flex-col space-y-3">
          <InfoEntry label="Email" value={profile.email} />
          {status !== "Patient" && <InfoEntry label="Role" value={status} />}
          <InfoEntry label="Date created" value={createdAt} />
        </div>
      </div>
    </div>
  );

  const AdditionalInfo = () => (
    <div className="card rounded-md bg-base-100 shadow-sm">
      <div className="card-body">
        {isPatient(profile) ? (
          <>
            <InfoEntry
              label="Birthday"
              value={new Date(profile.bday).toString()}
            />
            <InfoEntry label="Gender" value={profile.gender} />
            <InfoEntry label="Civil Status" value={profile.civilStatus} />
            <InfoEntry label="Fathers Name" value={profile.fathersName} />
            <InfoEntry label="Mothers Name" value={profile.mothersName} />
            <InfoEntry label="Ethnicity" value={profile.ethnicity} />
            <InfoEntry label="Religion" value={profile.religion} />
            <InfoEntry label="Nationality" value={profile.nationality} />
            <InfoEntry label="Address" value={profile.address} />
            <InfoEntry label="Workplace" value={profile.workplace} />
          </>
        ) : (
          <p className="mx-auto">This section is currently unavailable</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-4 gap-6 px-4 sm:grid-cols-12">
        <div className="col-span-4 sm:col-span-5">
          <ProfileInfo />
        </div>
        <div className="col-span-4 sm:col-span-7">
          <AdditionalInfo />
        </div>
      </div>
    </div>
  );
};

export default Profile;
