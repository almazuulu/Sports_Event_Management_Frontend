import { useNavigate } from "react-router-dom";

import classes from "./Header.module.css";
import NormalButton from "./Button/NormalButton";

function Header({ title, enableBack = false }) {
  const navigate = useNavigate();

  return (
    <header className={classes.header}>
      {enableBack && (
        <NormalButton
          className={classes.button}
          onClick={() => navigate("..")}
        />
      )}
      <h1 className={classes.title}>{title}</h1>
    </header>
  );
}

export default Header;
