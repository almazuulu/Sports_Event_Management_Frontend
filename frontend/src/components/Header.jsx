import { useNavigate } from "react-router-dom";

import NormalButton from "./Button/NormalButton";
import classes from "./Header.module.css";

function Header({ title, enableBack = false }) {
  const navigate = useNavigate();

  return (
    <header className={classes.header}>
      {enableBack && <NormalButton onClick={() => navigate("..")} />}
      <h1 className={classes.title}>{title}</h1>
    </header>
  );
}

export default Header;
