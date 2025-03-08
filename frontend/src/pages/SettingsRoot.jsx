import { Outlet } from "react-router-dom";
import SidebarNav from "../components/SidebarNav";

function SettingsRootLayout() {
  return (
    <main style={{ display: "flex" }}>
      <SidebarNav />
      <section style={{ width: "100%" }}>
        <Outlet />
      </section>
    </main>
  );
}

export default SettingsRootLayout;
