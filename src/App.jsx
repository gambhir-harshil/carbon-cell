import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Population from "./pages/Population";
import Assets from "./pages/Assets";
import Wallet from "./pages/Wallet";
import Layout from "./Layout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: <Dashboard />,
        },
        {
          path: "/population",
          element: <Population />,
        },
        {
          path: "/assets",
          element: <Assets />,
        },
        {
          path: "/wallet",
          element: <Wallet />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
