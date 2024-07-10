import React, { useState } from "react";
import { useUpdateProfileMutation } from "./patientsApiSlice";
import { ErrorType } from "types/Error";

type UpdateProfileProps = {
  userId: string;
};

const UpdateProfile: React.FC<UpdateProfileProps> = ({ userId }) => {
  const [updateProfile, { isLoading, isSuccess, isError, error }] =
    useUpdateProfileMutation();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      console.error("No file selected");
      return;
    }

    const data = new FormData();
    data.append("image", file);
    data.append("id", userId);

    try {
      await updateProfile(data).unwrap();
      console.log("Profile updated successfully");
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload"}
      </button>
      {isSuccess && <p>Profile updated successfully!</p>}
      {isError && (
        <p>
          Error updating profile:{" "}
          {(error as ErrorType)?.data?.message || "Unknown error"}
        </p>
      )}
    </form>
  );
};

export default UpdateProfile;
