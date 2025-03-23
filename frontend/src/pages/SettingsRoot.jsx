import { Outlet } from "react-router-dom";
import SidebarNav from "../components/SidebarNav";
import { SidebarContextProvider } from "../context/SidebarContext";

function SettingsRootLayout() {
  return (
    <main style={{ display: "flex" }}>
      <SidebarContextProvider>
        <SidebarNav />
      </SidebarContextProvider>
      <section style={{ width: "100%" }}>
        <Outlet />
      </section>
    </main>
  );
}

export default SettingsRootLayout;
