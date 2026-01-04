import { redirect } from "react-router-dom";

export function requireAuthLoader(allowedRoles) {
  return () => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    console.log("Loader user:", user);
    if (!user || !user.isAuthenticated) {
      throw redirect("/login");
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      throw redirect("/unauthorized");
    }

    return null;
  };
}
