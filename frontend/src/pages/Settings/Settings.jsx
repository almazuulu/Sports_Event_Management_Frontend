import { useState } from "react";

import SidebarNav from "../../components/SidebarNav";

// icons
import { FiHome, FiSettings } from "react-icons/fi";
import { TiUserAddOutline, TiGroupOutline } from "react-icons/ti";
import {
  FaRegCalendarAlt,
  FaRegClipboard,
  FaPlus,
  FaUsers,
} from "react-icons/fa";
import { LuClipboardPenLine, LuTrophy } from "react-icons/lu";
import { RxUpdate } from "react-icons/rx";
import { FaKey } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine, RiTeamLine } from "react-icons/ri";
import { MdEvent, MdOutlineSportsSoccer } from "react-icons/md";
import { HiOutlineRectangleGroup } from "react-icons/hi2";

import MyProfilePage from "../MyProfile";
import ChangePasswordPage from "../ChangePassword";
import UsersPage from "../Users";
import ManageEventsPage from "../Admin-panels/ManageEvents";
import ManageSportEventsPage from "../Admin-panels/ManageSportEvents";
import ManageTeamsPage from "../Admin-panels/ManageTeams";

function SettingsPage() {
  const [openSection, setOpenSection] = useState("");
  const [activeTab, setActiveTab] = useState("");

  const toggleSectionHandler = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const activeTabHandler = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main style={{ display: "flex" }}>
      <SidebarNav
        onToggleSection={toggleSectionHandler}
        onActiveTab={activeTabHandler}
        openSection={openSection}
        sections={sections}
        activeTab={activeTab}
      />
      <section style={{ width: "100%", overflow: "hidden" }}>
        {/* ADMIN PANEL */}
        {activeTab === "manage-users" && <UsersPage />}
        {activeTab === "manage-events" && <ManageEventsPage />}
        {activeTab === "manage-sport-events" && <ManageSportEventsPage />}
        {activeTab === "manage-teams" && <ManageTeamsPage />}
        {/* MY PROFILE */}
        {activeTab === "my-profile" && <MyProfilePage />}
        {activeTab === "change-password" && <ChangePasswordPage />}
      </section>
    </main>
  );
}

export default SettingsPage;

const sections = [
  // {
  //   label: "EVENTS",
  //   key: "events",
  //   options: [{ Icon: MdEvent, title: "All Events", path: "/events" }],
  // },
  // {
  //   label: "SPORT EVENTS",
  //   key: "sport-events",
  //   options: [
  //     {
  //       Icon: MdOutlineSportsSoccer,
  //       title: "All Sport Events",
  //       path: "/sport-events",
  //     },
  //   ],
  // },
  // {
  //   label: "TEAMS & PLAYERS",
  //   key: "teams",
  //   options: [
  //     {
  //       Icon: TiGroupOutline,
  //       title: "All Teams",
  //       path: "/teams",
  //     },
  //     {
  //       Icon: RiTeamLine,
  //       title: "All Players",
  //       path: "/teams/players",
  //     },
  //     {
  //       Icon: LuClipboardPenLine,
  //       title: "My Teams",
  //       path: "/teams/my-teams",
  //       allowedRoles: "team_captain",
  //     },
  //   ],
  // },
  // {
  //   label: "MATCH SCHEDULING",
  //   key: "scheduling",
  //   options: [
  //     { Icon: FaRegCalendarAlt, title: "View Scheduled Matches", path: "/" },
  //     { Icon: FaPlus, title: "Schedule New Match", path: "/" },
  //   ],
  // },
  // {
  //   label: "RESULTS & STANDINGS",
  //   key: "results",
  //   options: [
  //     { Icon: LuTrophy, title: "View Team Standings", path: "/" },
  //     { Icon: RxUpdate, title: "Update Match Results", path: "/" },
  //   ],
  // },
  {
    label: "ADMIN PANEL",
    key: "admin-panel",
    allowedRoles: ["admin"],
    options: [
      {
        Icon: FaUsers,
        title: "Manage Users",
        path: "manage-users",
        allowedRoles: ["admin"],
      },
      {
        Icon: MdEvent,
        title: "Manage Events",
        path: "manage-events",
        allowedRoles: ["admin"],
      },
      {
        Icon: MdOutlineSportsSoccer,
        title: "Manage Sport Events",
        path: "manage-sport-events",
        allowedRoles: ["admin"],
      },
      {
        Icon: HiOutlineRectangleGroup,
        title: "Manage Teams",
        path: "manage-teams",
        allowedRoles: ["admin"],
      },
      //   {
      //     Icon: LuClipboardPenLine,
      //     title: "Manage Team Registrations",
      //     path: "manage-team-registrations",
      //     allowedRoles: ["admin"],
      //   },
    ],
  },
  {
    label: "MY PROFILE",
    key: "my-profile",
    options: [
      { Icon: CgProfile, title: "My Profile", path: "my-profile" },
      {
        Icon: RiLockPasswordLine,
        title: "Change Password",
        path: "change-password",
      },
    ],
  },
];
