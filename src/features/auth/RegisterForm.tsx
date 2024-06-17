import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  return (
    <>
      <input
        type="text"
        placeholder="Name"
        className="input input-primary w-full border-none bg-gray-100"
      />

      <input
        type="text"
        placeholder="Email"
        className="input input-primary w-full border-none bg-gray-100"
      />

      <input
        type="text"
        placeholder="Password"
        className="input input-primary w-full border-none bg-gray-100"
      />

      <input
        type="text"
        placeholder="Confirm Password"
        className="input input-primary w-full border-none bg-gray-100"
      />

      <button
        className="btn btn-primary !mt-10 w-full"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Register
      </button>
    </>
  );
};

export default RegisterForm;
