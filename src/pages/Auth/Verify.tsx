import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyMutation } from "features/auth/authApiSlice";
import { ErrorType } from "types/Error";
import Alert from "components/Feedback/Alert";
import { useAppDispatch } from "app/hooks";
import { setCredentials } from "features/auth/authSlice";
import usePersist from "hooks/usePersist";
import Loader from "components/Loader";

const Verify: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [verify, { isError, isLoading, isSuccess, error }] =
    useVerifyMutation();
  const [_persist, setPersist] = usePersist();
  const hasVerified = useRef(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const verifyEmail = async () => {
      if (token && !hasVerified.current) {
        hasVerified.current = true;
        try {
          const { accessToken } = await verify(token).unwrap();
          dispatch(setCredentials({ accessToken }));
          setPersist(true);
        } catch (err) {
          console.error("Verification failed:", err);
        }
      }
    };

    verifyEmail();
  }, [token, verify, dispatch, setPersist]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        navigate("/dashboard");
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [isSuccess, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12">
        <div className="max-w-xl space-y-3 text-center">
          <h2 className="text-[42px] font-bold text-base-content">Success</h2>
          <p className="text-lg text-base-content">
            Your email has been verified successfully! You will be redirected in{" "}
            <span className="text-[20px] font-bold text-primary">
              {countdown}
            </span>{" "}
            seconds.
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-5">
        <Alert
          type="error"
          message={
            (error as ErrorType)?.data?.message ||
            "An error occurred during verification."
          }
        />
      </div>
    );
  }

  return null;
};

export default Verify;
