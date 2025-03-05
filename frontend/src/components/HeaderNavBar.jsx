import { NavLink } from "react-router-dom";

import classes from "./HeaderNavBar.module.css";
import logo from "../assets/images/ust-white-logo.svg";

const HeaderNavBar = () => {
  return (
    <nav className={classes.navbar}>
      <img src={logo} alt="UST Logo" />
      <NavLink
        to={"/"}
        className={({ isActive }) => `${isActive ? classes.active : ""}`}
        end
      >
        <span className={classes.optionText}>Home</span>
      </NavLink>
      <NavLink
        to={"/events"}
        className={({ isActive }) => `${isActive ? classes.active : ""}`}
        end
      >
        <span className={classes.optionText}>Events</span>
      </NavLink>
      <NavLink
        to={"/teams"}
        className={({ isActive }) => `${isActive ? classes.active : ""}`}
        end
      >
        <span className={classes.optionText}>Teams</span>
      </NavLink>
    </nav>
  );
};

export default HeaderNavBar;
