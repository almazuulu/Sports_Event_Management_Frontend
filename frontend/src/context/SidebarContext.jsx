import { createContext, useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// icons
import { FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  MdEvent,
  MdOutlineSportsSoccer,
  MdOutlineDashboard,
  MdOutlineScoreboard 
} from "react-icons/md";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { TbDeviceGamepad3 } from "react-icons/tb";

const SidebarContext = createContext({
  user: {},
  availableSections: [],
});

export function SidebarContextProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const availableSections = useMemo(() => {
    if (!user) return [];

    return SECTIONS.filter(
      ({ allowedRoles }) => !allowedRoles || allowedRoles.includes(user.role)
    ).flatMap(({ options }) => options);
  }, [user]);

  useEffect(() => {
    if (availableSections.length > 0) {
      navigate(availableSections[0].path);
    }
  }, [availableSections, navigate]);

  useEffect(() => {
    if (location.pathname !== "/login") {
      localStorage.setItem("lastPath", location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    const lastPath = localStorage.getItem("lastPath");
    const isPathAllowed = availableSections.some(
      (option) => option.path === lastPath
    );

    if (lastPath && isPathAllowed) {
      navigate(lastPath);
    } else if (availableSections.length > 0) {
      navigate(availableSections[0].path);
    }
  }, [availableSections, navigate]);

  const sidebarCtx = {
    user,
    availableSections,
  };

  return (
    <SidebarContext.Provider value={sidebarCtx}>
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarContext;

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
        Icon: MdOutlineDashboard,
        title: "Dashboard",
        path: "/settings/dashboard",
      },
      {
        Icon: FaUsers,
        title: "User Management",
        path: "/settings/manage-users",
      },
      {
        Icon: HiOutlineRectangleGroup,
        title: "Team Management",
        path: "/settings/manage-teams",
      },
      {
        Icon: MdEvent,
        title: "Event  Management",
        path: "/settings/manage-events",
      },
      {
        Icon: MdOutlineSportsSoccer,
        title: "Sport Events Management",
        path: "/settings/manage-sport-events",
      },
      
      {
        Icon: HiOutlineRectangleGroup,
        title: "Team Registration",
        path: "/settings/manage-registrations",
      },
      {
        Icon: TbDeviceGamepad3,
        title: "Match Management",
        path: "/settings/manage-games",
      },
      {
        Icon: MdOutlineScoreboard,
        title: "Scorekeeping",
        path: "/settings/manage-scores",
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
