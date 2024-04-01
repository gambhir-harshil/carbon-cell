import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col w-full min-h-screen md:flex-row">
      <Navbar />
      <div className="h-screen p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
