import { useState } from "react";

import SidebarNav from "../../components/SidebarNav";

// icons
import { FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEvent, MdOutlineSportsSoccer } from "react-icons/md";
import { HiOutlineRectangleGroup } from "react-icons/hi2";

import MyProfilePage from "../MyProfile";
import ChangePasswordPage from "../ChangePassword";
import UsersPage from "../Users";
import ManageEventsPage from "../Admin-panels/ManageEvents";
import ManageSportEventsPage from "../Admin-panels/ManageSportEvents";
import ManageTeamsPage from "../Admin-panels/ManageTeams";
import MyTeamsPage from "../MyTeams";

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
        {/* MY TEAMS */}
        {activeTab === "my-teams" && <MyTeamsPage />}

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
  {
    label: "MY TEAMS",
    key: "my-teams",
    allowedRoles: ["team_manager"],
    options: [
      {
        Icon: FaUsers,
        title: "My Teams",
        path: "my-teams",
        allowedRoles: ["team_manager"],
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
