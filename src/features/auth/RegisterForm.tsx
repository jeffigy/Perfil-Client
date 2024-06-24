import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "./authApiSlice";
import { useAppDispatch } from "app/hooks";
import { useState } from "react";
import { setCredentials } from "./authSlice";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [signup, { isLoading }] = useSignupMutation();
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>,
  ) => {
    e.preventDefault();
    try {
      const { accessToken } = await signup({ email, name, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      setName("");
      navigate("/dashboard");
    } catch (err: any) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {errMsg && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errMsg}</span>
        </div>
      )}
      <input
        value={name}
        onChange={({ target }) => setName(target.value)}
        type="text"
        placeholder="Name"
        className="input input-primary w-full border-none bg-gray-100"
      />

      <input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        type="text"
        placeholder="Email"
        className="input input-primary w-full border-none bg-gray-100"
      />

      <input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
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
        type="submit"
        className={`btn ${isLoading && "btn-disabled"} btn-primary !mt-10 w-full`}
      >
        {isLoading ? (
          <>
            <span className="loading loading-spinner"></span> Registering...
          </>
        ) : (
          "Register"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
