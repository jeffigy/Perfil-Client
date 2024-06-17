import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <>
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

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="" className="ml-3 block text-sm">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <button className="btn btn-link no-underline">
            Forgot your password?
          </button>
        </div>
      </div>

      <button
        className="btn btn-primary !mt-10 w-full"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Log in
      </button>
    </>
  );
};

export default LoginForm;
