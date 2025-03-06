import { useContext, useState } from "react";

import classes from "./LoginForm.module.css";
import AuthContext from "../context/AuthContext";

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const emailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const passwordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const loginHandler = (event) => {
    event.preventDefault();
    const credentials = {
      username: userEmail,
      email: userEmail,
      password: userPassword,
    };

    login(credentials);
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
        <div className={classes.inputSubmit}>
          <button type="submit" className={classes.button}>
            Sign In
          </button>
        </div>
      </form>
    </section>
  );
}

export default LoginForm;
