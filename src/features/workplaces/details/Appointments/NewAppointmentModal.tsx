import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import Modal from "components/Modal";
import useDisclosure from "hooks/useDisclosure";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { appointmentCategory } from "utils/appointmentCategory";
import { useAddNewAppointmentMutation } from "./appointmentApiSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorType } from "types/Error";

const NewAppointmentModal = () => {
  const { id } = useParams<{ id: string }>();
  const [addNewAppointment, { isLoading }] = useAddNewAppointmentMutation();
  const { isOpen, onOpen, onClose } = useDisclosure("New Appointment");
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("All");
  const [patient, setPatient] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newAppointment = await addNewAppointment({
        title,
        category,
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
        workplace: id,
      }).unwrap();

      toast.success(newAppointment.message);
      setTitle("");
      setDescription("");
      onClose();
    } catch (error) {
      toast.error((error as ErrorType).data.message);
    }
  };

  return (
    <>
      <button onClick={onOpen} className="btn btn-primary my-3 w-full">
        <CalendarDaysIcon className="h-5 w-5" /> Add New Schedule
      </button>
      <Modal isOpen={isOpen} onClose={onClose} title={"New Appointment"}>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="form-control">
            {" "}
            <div className="label">
              <span className="required label-text ">Appointment Name</span>
            </div>
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. follow up"
            />
          </div>
          <div className="form-control">
            {" "}
            <div className="label">
              <span className="label-text">Description </span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
          </div>
          <div>
            {" "}
            <div className="form-control ">
              <span className="required label-text">Category</span>
              {appointmentCategory &&
                appointmentCategory.map((appointmentCategory) => (
                  <label
                    key={appointmentCategory}
                    className="label cursor-pointer justify-start gap-5"
                  >
                    <input
                      value={appointmentCategory}
                      type="radio"
                      name="radio-10"
                      checked={category === appointmentCategory}
                      className="radio checked:bg-blue-500"
                      onChange={({ target }) => setCategory(target.value)}
                    />
                    <span className="label-text">{appointmentCategory}</span>
                  </label>
                ))}
            </div>
          </div>
          {category === "Individual positive patient" ? (
            <div className="form-control">
              <div className="label">
                <span className="required label-text">Select patient</span>
              </div>
              <input
                className="input input-bordered"
                value={patient}
                onChange={({ target }) => setPatient(target.value)}
              />
            </div>
          ) : null}
          <div className="form-control ">
            <div className="label">
              <span className="required label-text">Select Date Range</span>
            </div>

            <div className="flex w-full ">
              <DatePicker
                className="input input-bordered"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
              <div className="divider mx-2 w-full"></div>
              <DatePicker
                className="input input-bordered"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary mt-5 flex md:block "
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default NewAppointmentModal;
