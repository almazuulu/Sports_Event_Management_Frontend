import { useContext, useState } from "react";

import classes from "./LoginForm.module.css";
import AuthContext from "../context/AuthContext";

function LoginForm() {
  const { login, loading } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const emailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const passwordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    const credentials = {
      username: userEmail,
      email: userEmail,
      password: userPassword,
    };

    const res = await login(credentials);
    if (!res.success) {
      setErrorMessage(res.data.error);
    }
  };

  return (
    <section className={classes.container}>
      <h1 className={classes.loginHeader}>Sign In</h1>
      <form onSubmit={loginHandler}>
        <div>
          <input
            type="email"
            className={classes.input}
            placeholder="Email"
            onChange={emailChange}
            value={userEmail}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <input
            type="password"
            className={classes.input}
            placeholder="Password"
            onChange={passwordChange}
            value={userPassword}
            required
            autoComplete="off"
          />
        </div>
        {errorMessage && (
          <p className={classes.errorMessage}>
            <span>{errorMessage}</span>
          </p>
        )}
        <div className={classes.inputSubmit}>
          <button type="submit" className={classes.button} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default LoginForm;
