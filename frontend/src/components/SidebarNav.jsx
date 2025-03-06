import { useContext } from "react";

import classes from "./SidebarNav.module.css";
import Option from "./Option";
import AuthContext from "../context/AuthContext";
import { IoMdArrowDropdown } from "react-icons/io";

function SidebarNav({
  onToggleSection,
  onActiveTab,
  openSection,
  sections,
  activeTab,
}) {
  const { user } = useContext(AuthContext);

  return (
    <nav className={classes.sidebar}>
      {sections
        .filter(
          ({ allowedRoles }) =>
            !allowedRoles || allowedRoles.includes(user.role)
        )
        .map(({ label, options, key }) => (
          <section key={key} className={classes.navigationSection}>
            <div
              className={classes.labelContainer}
              onClick={() => onToggleSection(key)}
            >
              <label className={classes.label}>{label}</label>
              <span>
                <IoMdArrowDropdown />
              </span>
            </div>
            {openSection === key && (
              <div className={classes.optionsContainer}>
                {options
                  .filter(
                    ({ allowedRoles }) =>
                      !allowedRoles || allowedRoles.includes(user.role)
                  )
                  .map(({ Icon, title, path }) => (
                    <Option
                      key={title}
                      Icon={Icon}
                      title={title}
                      path={path}
                      onClick={() => onActiveTab(path)}
                      activeTab={activeTab}
                    />
                  ))}
              </div>
            )}
          </section>
        ))}
    </nav>
  );
}

export default SidebarNav;
