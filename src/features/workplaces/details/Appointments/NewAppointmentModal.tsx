import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import Modal from "components/Modal";
import useDisclosure from "hooks/useDisclosure";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { appointmentCategory } from "utils/appointmentCategory";
const NewAppointmentModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure("New Appointment");
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  return (
    <>
      <button onClick={onOpen} className="btn btn-primary my-3 w-full">
        <CalendarDaysIcon className="h-5 w-5" /> Add New Schedule
      </button>
      <Modal isOpen={isOpen} onClose={onClose} title={"New Appointment"}>
        <div className="space-y-5">
          <div className="form-control">
            {" "}
            <div className="label">
              <span className="label-text">Appointment Name</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. follow up "
            />
          </div>
          <div>
            {" "}
            <div className="form-control">
              <span className="label-text">Blue pill</span>
              {appointmentCategory &&
                appointmentCategory.map((category, index) => (
                  <label
                    key={index}
                    className="label cursor-pointer justify-start gap-5"
                  >
                    <input
                      value={category}
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue-500"
                      defaultChecked
                    />
                    <span className="label-text">{category}</span>
                  </label>
                ))}
            </div>
          </div>
          <div className="form-control ">
            <div className="label">
              <span className="label-text">Select Date Range</span>
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

            <button className="btn btn-primary mt-5 flex md:block ">
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewAppointmentModal;
