import { useAppDispatch } from "app/hooks";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";
import usePersist from "hooks/usePersist";
import Alert from "components/Feedback/Alert";
import { ErrorType } from "types/Error";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [persist, setPersist] = usePersist();

  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>,
  ) => {
    e.preventDefault();

    const { accessToken } = await login({ email, password }).unwrap();

    if (accessToken) {
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
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
      navigate("/dashboard");
    }
  }, [isSuccess]);

  return (
    <form className="space-y-6" onSubmit={onSubmit} action="">
      {showAlert && (
        <Alert type={"error"} message={(error as ErrorType)?.data?.message} />
      )}

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

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            onChange={() => setPersist(!persist)}
            checked={persist}
            disabled={email === "" || password === "" ? true : false}
          />
          <label htmlFor="" className="ml-3 block text-sm">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link to={"/forgot-password"} className="btn btn-link no-underline">
            Forgot your password?
          </Link>
        </div>
      </div>

      <button
        className={`btn ${isLoading && "btn-disabled"} btn-primary !mt-10 w-full`}
        type="submit"
      >
        {isLoading ? (
          <>
            {" "}
            <span className="loading loading-spinner"></span>
            loading
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
