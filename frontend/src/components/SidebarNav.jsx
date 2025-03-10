import { useState } from "react";

import classes from "./SidebarNav.module.css";
import Option from "./Option";

// icons
import { FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEvent, MdOutlineSportsSoccer } from "react-icons/md";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { TbDeviceGamepad3 } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";

function SidebarNav() {
  const existingUser = JSON.parse(localStorage.getItem("user"));

  const [openSection, setOpenSection] = useState("dashboard");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <nav className={classes.sidebar}>
      {SECTIONS.filter(
        ({ allowedRoles }) =>
          !allowedRoles || allowedRoles.includes(existingUser.role)
      ).map(({ label, options, key }) => (
        <section key={key} className={classes.navigationSection}>
          <div
            className={classes.labelContainer}
            onClick={() => toggleSection(key)}
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
                    !allowedRoles || allowedRoles.includes(existingUser.role)
                )
                .map(({ Icon, title, path }) => (
                  <Option key={title} Icon={Icon} title={title} path={path} />
                ))}
            </div>
          )}
        </section>
      ))}
    </nav>
  );
}

export default SidebarNav;

const SECTIONS = [
  {
    // FOR TEAM_MANAGER
    label: "ORGANIZE TEAMS",
    key: "organize-teams",
    allowedRoles: ["team_manager"],
    options: [
      {
        Icon: FaUsers,
        title: "My Teams",
        path: "/settings/organize-teams",
        allowedRoles: ["team_manager"],
      },
    ],
  },
  {
    label: "MY TEAMS",
    key: "my-team",
    allowedRoles: ["player"],
    options: [
      {
        Icon: FaUsers,
        title: "My Teams",
        path: "/settings/my-team",
        allowedRoles: ["player"],
      },
    ],
  },
  {
    label: "ADMIN PANEL",
    key: "admin-panel",
    allowedRoles: ["admin"],
    options: [
      {
        Icon: FaUsers,
        title: "Manage Users",
        path: "/settings/manage-users",
        allowedRoles: ["admin"],
      },
      {
        Icon: MdEvent,
        title: "Manage Events",
        path: "/settings/manage-events",
        allowedRoles: ["admin"],
      },
      {
        Icon: MdOutlineSportsSoccer,
        title: "Manage Sport Events",
        path: "/settings/manage-sport-events",
        allowedRoles: ["admin"],
      },
      {
        Icon: HiOutlineRectangleGroup,
        title: "Manage Teams",
        path: "/settings/manage-teams",
        allowedRoles: ["admin"],
      },
      {
        Icon: HiOutlineRectangleGroup,
        title: "Manage Registrations",
        path: "/settings/manage-registrations",
        allowedRoles: ["admin"],
      },
      {
        Icon: TbDeviceGamepad3,
        title: "Manage Games",
        path: "/settings/manage-games",
        allowedRoles: ["admin"],
      },
    ],
  },
  {
    label: "MY PROFILE",
    key: "my-profile",
    options: [
      { Icon: CgProfile, title: "My Profile", path: "/settings/my-profile" },
      {
        Icon: RiLockPasswordLine,
        title: "Change Password",
        path: "/settings/change-password",
      },
    ],
  },
];
