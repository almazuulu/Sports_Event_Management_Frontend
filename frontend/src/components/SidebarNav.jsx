import { useEffect, useState } from "react";

import classes from "./SidebarNav.module.css";
import Option from "./Option";

// icons
import { FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEvent, MdOutlineSportsSoccer } from "react-icons/md";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { TbDeviceGamepad3 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function SidebarNav() {
  const existingUser = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const firstAvailableOption = SECTIONS.filter(
    ({ allowedRoles }) =>
      !allowedRoles || allowedRoles.includes(existingUser.role)
  ).flatMap(({ options }) => options)[0];

  useEffect(() => {
    if (firstAvailableOption) {
      navigate(firstAvailableOption.path);
    }
  }, [firstAvailableOption, navigate]);

  return (
    <nav className={classes.sidebar}>
      {SECTIONS.filter(
        ({ allowedRoles }) =>
          !allowedRoles || allowedRoles.includes(existingUser.role)
      )
        .flatMap(({ options }) => options)
        .map(({ Icon, title, path }) => (
          <Option key={title} Icon={Icon} title={title} path={path} />
        ))}
    </nav>
  );
}

export default SidebarNav;

const SECTIONS = [
  {
    label: "TEAM MANAGER",
    allowedRoles: ["team_manager"],
    options: [
      {
        Icon: FaUsers,
        title: "My Teams",
        path: "/settings/organize-teams",
      },
    ],
  },
  {
    label: "PLAYER",
    allowedRoles: ["player"],
    options: [
      {
        Icon: FaUsers,
        title: "My Teams",
        path: "/settings/my-team",
      },
    ],
  },
  {
    label: "SCOREKEEPER",
    allowedRoles: ["scorekeeper"],
    options: [
      {
        Icon: FaUsers,
        title: "My Assignments",
        path: "/settings/my-assignments",
      },
    ],
  },
  {
    label: "ADMIN",
    allowedRoles: ["admin"],
    options: [
      {
        Icon: FaUsers,
        title: "Manage Users",
        path: "/settings/manage-users",
      },
      {
        Icon: MdEvent,
        title: "Manage Events",
        path: "/settings/manage-events",
      },
      {
        Icon: MdOutlineSportsSoccer,
        title: "Manage Sport Events",
        path: "/settings/manage-sport-events",
      },
      {
        Icon: HiOutlineRectangleGroup,
        title: "Manage Teams",
        path: "/settings/manage-teams",
      },
      {
        Icon: HiOutlineRectangleGroup,
        title: "Manage Registrations",
        path: "/settings/manage-registrations",
      },
      {
        Icon: TbDeviceGamepad3,
        title: "Manage Games",
        path: "/settings/manage-games",
      },
    ],
  },
  {
    label: "MY PROFILE",
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
