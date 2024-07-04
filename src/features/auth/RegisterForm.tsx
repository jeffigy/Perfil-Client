import React, { useEffect, useState } from "react";
import { useSignupMutation } from "./authApiSlice";
import { ErrorType } from "types/Error";
import Alert from "components/Feedback/Alert";
import usePersist from "hooks/usePersist";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [_persist, setPersist] = usePersist();
  const [signup, { isLoading, isError, error, isSuccess }] =
    useSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password, confirmPassword, name } = formData;

    if (password !== confirmPassword) {
      setShowAlert(true);
      return;
    }

    try {
      await signup({ email, password, confirmPassword, name }).unwrap();

      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
      });
      navigate("/check-email");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  useEffect(() => {
    setPersist(false);
  }, [setPersist]);

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
    <form className="space-y-6" onSubmit={onSubmit}>
      {showAlert && isError && (
        <Alert type="error" message={(error as ErrorType)?.data?.message} />
      )}
      {showAlert && isSuccess && (
        <Alert
          type="success"
          message="A verification email has been sent to your email"
        />
      )}

      <input
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        type="text"
        placeholder="Name"
        className="input input-primary w-full border-none bg-gray-100"
      />

      <input
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        placeholder="Email"
        className="input input-primary w-full border-none bg-gray-100"
      />

      <input
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        type="password"
        placeholder="Password"
        className="input input-primary w-full border-none bg-gray-100"
      />

      <input
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
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
