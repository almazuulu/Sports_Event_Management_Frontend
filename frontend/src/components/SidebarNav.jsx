import { useContext } from "react";

import classes from "./SidebarNav.module.css";
import Option from "./Option";
import SidebarContext from "../context/SidebarContext";

function SidebarNav() {
  const { user, availableSections } = useContext(SidebarContext);

  if (!user) return null;

  return (
    <nav className={classes.sidebar}>
      {availableSections.map(({ Icon, title, path }) => (
        <Option key={title} Icon={Icon} title={title} path={path} />
      ))}
    </nav>
  );
}

export default SidebarNav;
