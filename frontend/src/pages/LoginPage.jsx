import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

import classes from "./LoginPage.module.css";

function LoginPage() {
  return (
    <div className={classes.container}>
      <Header title={'Your Account'}/>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
