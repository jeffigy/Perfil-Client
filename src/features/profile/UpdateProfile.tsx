import React, { useEffect, useState } from "react";
import { ErrorType } from "types/Error";
import Modal from "components/Modal";
import { useUpdateProfileMutation } from "features/profile/profileApiSlice";
import Alert from "components/Feedback/Alert";

type UpdateProfileProps = {
  userId: string;
};

const UpdateProfile: React.FC<UpdateProfileProps> = ({ userId }) => {
  const [updateProfile, { isLoading, isSuccess, isError, error }] =
    useUpdateProfileMutation();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>();
  const [showAlert, setShowAlert] = useState(false);
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => {
    setFile(null);
    setPreview(undefined);
    setModal(false);
  };

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
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    if (isError || isSuccess) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isError, isSuccess]);

  return (
    <>
      <button
        onClick={openModal}
        className="btn btn-circle btn-primary btn-sm absolute -bottom-3 left-0 right-0 m-auto p-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      <Modal isOpen={modal} onClose={closeModal}>
        <button
          onClick={closeModal}
          className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="mb-3 text-lg font-bold">Update Photo</h3>
        <form className="space-y-3" onSubmit={handleSubmit}>
          {showAlert && isError && (
            <Alert type="error" message={(error as ErrorType)?.data?.message} />
          )}
          {showAlert && isSuccess && (
            <Alert type="success" message="Profile updated successfully!" />
          )}
          <input
            id="select-image"
            onChange={handleFileChange}
            type="file"
            className="hidden"
          />
          <label htmlFor="select-image">
            <div className="btn w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              {file ? "Change photo" : "Select photo"}
            </div>
          </label>
          {file && (
            <img
              className="mx-auto h-[150px] w-[150px] rounded-full"
              src={preview}
              alt="Preview"
            />
          )}
          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading || !file}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UpdateProfile;
