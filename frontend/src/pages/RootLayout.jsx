import { Outlet } from "react-router-dom";
import HeaderNavBar from "../components/HeaderNavBar";

function RootLayout() {
  return (
    <>
      <HeaderNavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
