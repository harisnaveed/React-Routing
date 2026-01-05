import { redirect } from "react-router-dom";

export function requireAuthLoader(allowedRoles) {
  return async () => {
    const res = await fetch("https://admin.boostmybusiness.ai/react/me.php", {
      credentials: "include",
    });

    if (res.status === 401) {
      throw redirect("/login");
    }

    if (!res.ok) {
      throw redirect("/login");
    }

    const data = await res.json();
    const user = data.user;

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      throw redirect("/unauthorized");
    }

    return user; // optional: useLoaderData()
  };
}
