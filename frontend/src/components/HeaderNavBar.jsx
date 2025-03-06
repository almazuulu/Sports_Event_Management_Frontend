import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./HeaderNavBar.module.css";
import logo from "../assets/images/ust-white-logo.svg";
import { BiLogInCircle } from "react-icons/bi";
import AuthContext from "../context/AuthContext";

// icons
import { CgProfile } from "react-icons/cg";

const HeaderNavBar = () => {
  const { user } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const profileHandler = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <section className={classes.headerNavBar}>
      <nav className={classes.navContainerMain}>
        <section className={classes.navbar}>
          <img src={logo} alt="UST Logo" />
        </section>
        {!user && (
          <NavLink to={"/login"} className={classes.loginContainer}>
            <BiLogInCircle className={classes.icon} />
            <p>Sign In</p>
          </NavLink>
        )}
        {user && (
          <section className={classes.section}>
            <button
              className={classes.profileBtn}
              type="button"
              onClick={profileHandler}
            >
              <CgProfile className={classes.icon} />
              <p className={classes.welcomeText}>Hi, {user.first_name}!</p>
            </button>

            {isDropdownOpen && (
              <div className={classes.dropdownMenu}>dropdown</div>
            )}
          </section>
        )}
      </nav>

      <nav className={classes.navContainerSecond}>
        <section className={classes.navbar}>
          {NAVIGATIONS.map((nav) => (
            <NavLink
              key={nav.title}
              to={nav.path}
              className={({ isActive }) => `${isActive ? classes.active : ""}`}
              end
            >
              <span className={classes.optionText}>{nav.title}</span>
            </NavLink>
          ))}
        </section>
      </nav>
    </section>
  );
};

export default HeaderNavBar;

const NAVIGATIONS = [
  {
    title: "Home",
    path: "/home",
  },
  {
    title: "Fixtures",
    path: "/fixtures",
  },
  {
    title: "Results",
    path: "/results",
  },
  {
    title: "Stats",
    path: "/stats",
  },
  {
    title: "Teams",
    path: "/teams",
  },
  {
    title: "Players",
    path: "/players",
  },
];
