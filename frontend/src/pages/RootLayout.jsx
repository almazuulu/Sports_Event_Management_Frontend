import { Outlet } from "react-router-dom";
import HeaderNavBar from "../components/HeaderNavBar";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <>
      <HeaderNavBar />
      <main style={{minHeight: '100vh'}}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
