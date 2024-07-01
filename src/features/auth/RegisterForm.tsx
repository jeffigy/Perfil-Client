import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "./authApiSlice";
import { useAppDispatch } from "app/hooks";
import { useEffect, useState } from "react";
import { setCredentials } from "./authSlice";
import { ErrorType } from "types/Error";
import Alert from "components/Feedback/Alert";
import usePersist from "hooks/usePersist";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [persist, setPersist] = usePersist();
  const [signup, { isLoading, isError, error, isSuccess }] =
    useSignupMutation();

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>,
  ) => {
    e.preventDefault();

    const { accessToken } = await signup({
      email,
      name,
      password,
      confirmPassword,
    }).unwrap();

    if (accessToken) {
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      setName("");
      setConfirmPassword("");
    }
  };
  useEffect(() => {
    setPersist(false);
  }, []);

  useEffect(() => {
    if (isError) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setPersist(!persist);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (persist) {
      navigate("/dashboard");
    }
  }, [persist]);

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {showAlert && (
        <Alert type="error" message={(error as ErrorType)?.data?.message} />
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
        type="password"
        placeholder="Password"
        className="input input-primary w-full border-none bg-gray-100"
      />

      <input
        value={confirmPassword}
        onChange={({ target }) => setConfirmPassword(target.value)}
        type="password"
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
