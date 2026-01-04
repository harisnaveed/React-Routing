// component based auth

import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { lazyDelay } from "../utils/lazyDelay";
import RequireAuth from "../auth/RequireAuth";
import { requireAuthLoader } from "../auth/authLoader";

//copilot instruction: add lazy imports below copilot
const App = lazy(() => import("../App"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Unauthorized = lazy(() => import("../pages/Unauthorized"));

const DashboardLayout = lazy(() =>
  lazyDelay(3000).then(() => import("../layouts/DashboardLayout"))
);
const NotFound = lazy(() => import("../pages/NotFound"));
const DashboardHome = lazy(() => import("../pages/dashboard/DashboardHome"));
const Sales = lazy(() => import("../pages/Dashboard/Sales"));
const Reporting = lazy(() => import("../pages/Dashboard/Reporting"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },

      { path: "login", element: <Login /> },

      {
        path: "dashboard",
        element: <RequireAuth allowedRoles={["admin", "manager"]} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <RequireAuth allowedRoles={["admin"]} />,
                children: [{ index: true, element: <DashboardHome /> }],
              },

              {
                path: "sales",
                element: <RequireAuth allowedRoles={["admin"]} />,
                children: [{ index: true, element: <Sales /> }],
              },

              {
                path: "reporting",
                element: <RequireAuth allowedRoles={["admin", "manager"]} />,
                children: [{ index: true, element: <Reporting /> }],
              },
            ],
          },
        ],
      },
    ],
  },

  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "*", element: <NotFound /> },
]);

export default router;
