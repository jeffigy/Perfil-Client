import LoginForm from "features/auth/LoginForm";
import RegisterForm from "features/auth/RegisterForm";
import { useState } from "react";

const LandingPage = () => {
  const [isLogin, setisLogin] = useState(true);

  const handleFormChange = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setisLogin(!isLogin);
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
      <div className="grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
        <div className="max-md:text-center">
          <h2 className="text-4xl font-extrabold lg:text-5xl lg:leading-[55px]">
            Welcome to Perfil
          </h2>
          <p className="mt-6 text-sm">
            Immerse yourself in a hassle-free login hourney with our intuitively
            sedinged login form. Efforlessly access your account.
          </p>
        </div>

        <div className="w-full max-w-md space-y-6 max-md:mx-auto md:ml-auto">
          <h3 className="mb-8 text-3xl font-extrabold max-md:text-center">
            {isLogin ? "Sign in" : "Sign up"}
          </h3>

          {isLogin ? <LoginForm /> : <RegisterForm />}

          <div className="flex items-center justify-center">
            <p className="mr-[1px] text-sm">
              {isLogin ? "Don't have an Account?" : "Already have an Account?"}
            </p>
            <button
              onClick={handleFormChange}
              className="btn btn-link no-underline "
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
