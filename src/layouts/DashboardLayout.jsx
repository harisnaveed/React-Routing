import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const { logout, role } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    alert("Logging out...");
    logout();
    localStorage.removeItem("authUser");
    navigate("/login");
  }

  return (
    <>
      <h1>Dashboard Layout</h1>

      <nav>
        {role === "admin" && (
          <>
            <Link to="sales">Sales</Link> |{" "}
          </>
        )}

        {(role === "admin" || role === "manager") && (
          <Link to="reporting">Reporting</Link>
        )}
      </nav>

      <hr />

      <br />
      <button onClick={handleLogout}>Logout</button>

      <Suspense fallback={<p>Loading dashboard...</p>}>
        <Outlet />
      </Suspense>
    </>
  );
}

