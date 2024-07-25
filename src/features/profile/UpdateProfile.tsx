import React, { useEffect, useState } from "react";

import Modal from "components/Modal";
import { useUpdateProfileMutation } from "features/profile/profileApiSlice";

import { PencilIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { ErrorType } from "types/Error";
import useDisclosure from "hooks/useDisclosure";

type UpdateProfileProps = {
  userId: string;
};

const UpdateProfile: React.FC<UpdateProfileProps> = ({ userId }) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>();

  const { isOpen, onOpen, onClose } = useDisclosure("update profile");

  const closeModal = () => {
    setFile(null);
    setPreview(undefined);
    onClose();
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
      toast.success("Profile successfully updated");
    } catch (error) {
      toast.error((error as ErrorType).data.message);
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

  return (
    <>
      <button
        onClick={onOpen}
        className="btn btn-circle btn-primary btn-sm absolute -bottom-3 left-0 right-0 m-auto p-1"
      >
        <PencilIcon />
      </button>
      <Modal isOpen={isOpen} onClose={closeModal} title={"Update Photo"}>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            id="select-image"
            onChange={handleFileChange}
            type="file"
            className="hidden"
          />
          <label htmlFor="select-image">
            <div className="btn w-full">
              <PhotoIcon className="h-5" />
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
