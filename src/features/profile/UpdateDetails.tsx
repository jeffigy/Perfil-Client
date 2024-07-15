import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Patient } from "types/Patient";
import { User } from "types/User";
import { CivilStatus } from "utils/civilStatus";
import { Genders } from "utils/gender";
import { useUpdateDetailsMutation } from "./profileApiSlice";
import Alert from "components/Feedback/Alert";
import { ErrorType } from "types/Error";
import { Link, useNavigate } from "react-router-dom";

type UpdateDetailsProps = {
  details: User | Patient;
};

const UpdateDetails: React.FC<UpdateDetailsProps> = ({ details }) => {
  const navigate = useNavigate();
  const [UpdateDetails, { isLoading, isError, error, isSuccess }] =
    useUpdateDetailsMutation();
  const [bday, setBday] = useState<Date>(new Date(details.bday));
  const [name, setName] = useState(details.name);
  const [gender, setGender] = useState(details.gender);
  const [civilStatus, setCivilStatus] = useState(details.civilStatus);
  const [fathersName, setFathersName] = useState(details.fathersName);
  const [mothersName, setMothersName] = useState(details.mothersName);
  const [ethnicity, setEthnicity] = useState(details.ethnicity);
  const [religion, setReligion] = useState(details.religion);
  const [nationality, setNationality] = useState(details.nationality);
  const [address, setAddress] = useState(details.address);

  const [showAlert, setShowAlert] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await UpdateDetails({
        id: details.id,
        name,
        bday: bday.getTime(),
        gender,
        civilStatus,
        fathersName,
        mothersName,
        ethnicity,
        religion,
        nationality,
        address,
      }).unwrap();

      navigate(-1);
    } catch (error) {}
  };

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
    <form
      onSubmit={onSubmit}
      className="card mx-auto w-full max-w-lg rounded-md bg-base-100 shadow-sm"
    >
      {" "}
      <div className="card-body">
        <h2 className="card-title">Update Details</h2>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text"> Name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Birthday</span>
            </div>
            <DatePicker
              className="input input-bordered w-full "
              selected={bday}
              onChange={(date) => {
                setBday(date!);
              }}
            />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Ethnicity</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              value={ethnicity}
              onChange={({ target }) => setEthnicity(target.value)}
            />
          </label>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Gender</span>
            </div>
            <select
              value={gender}
              onChange={({ target }) => setGender(target.value)}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select Option
              </option>
              {Genders.map((gender, index) => {
                return (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Civil Status</span>
            </div>
            <select
              value={civilStatus}
              onChange={({ target }) => setCivilStatus(target.value)}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select Option
              </option>
              {CivilStatus.map((status, index) => {
                return (
                  <option key={index} value={status}>
                    {status}
                  </option>
                );
              })}
            </select>
          </label>
        </div>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Fathers Name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
            value={fathersName}
            onChange={({ target }) => setFathersName(target.value)}
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Mothers Name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
            value={mothersName}
            onChange={({ target }) => setMothersName(target.value)}
          />
        </label>

        <div className="flex flex-col gap-2 sm:flex-row">
          {" "}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Religion</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              value={religion}
              onChange={({ target }) => setReligion(target.value)}
            />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Nationality</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              value={nationality}
              onChange={({ target }) => setNationality(target.value)}
            />
          </label>
        </div>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
            value={address}
            onChange={({ target }) => setAddress(target.value)}
          />
        </label>

        {showAlert && isError && (
          <Alert type="error" message={(error as ErrorType)?.data?.message} />
        )}
        {showAlert && isSuccess && (
          <Alert
            type="success"
            message="A verification email has been sent to your email"
          />
        )}
        <div className="card-actions flex flex-col gap-2 sm:flex-row">
          <button
            type="submit"
            className={`btn btn-primary w-full ${isLoading && "btn-disabled"}`}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner"></span> Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
          <Link className="btn btn-ghost w-full" to={"/dashboard/profile"}>
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
};
export default UpdateDetails;
