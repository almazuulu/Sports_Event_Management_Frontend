import { Outlet, NavLink } from "react-router-dom";
import styles from '../Dashboard/Subnavbar.module.css';
import classes from "./Dashboard.module.css";

const Subnavbar = () => {
  return (
    <div>
      <div className={styles.subNavbar}>
        <ul className={styles.subNavLinks}>
          <li className={styles.subNavItem}>
           <NavLink
        to={"/"}
        className={({ isActive }) => `${isActive ? classes.active : ""}`}
        end
      >
        <span className={classes.optionText}>Results</span>
      </NavLink>
          </li>
          <li className={styles.subNavItem}>
            <NavLink to="stats" className={({ isActive }) => isActive ? styles.active : ""}>Stats</NavLink>
          </li>
          <li className={styles.subNavItem}>
            <NavLink to="tables" className={({ isActive }) => isActive ? styles.active : ""}>Tables</NavLink>
          </li>
          <li className={styles.subNavItem}>Upcoming Games</li>
        </ul>
      </div>
      <div className={styles.contentArea}>
        <Outlet />
      </div>
    </div>
  );
};

export default Subnavbar;
