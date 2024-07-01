import { useState } from "react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>("");

  const onSubmit = () => {};
  return (
    <form className="space-y-6" onSubmit={onSubmit} action="">
      <input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        type="text"
        placeholder="Email"
        className="input input-primary w-full border-none bg-gray-100"
      />

      <button className={`btn  btn-primary !mt-10 w-full`} type="submit">
        Reset Password
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
