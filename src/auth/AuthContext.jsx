import { createContext, useContext, useEffect, useState } from "react";

// 1️⃣ CREATE CONTEXT
const AuthContext = createContext(null);

// 2️⃣ PROVIDER
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 3️⃣ REHYDRATE USER FROM SERVER (SESSION / COOKIE)
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("https://admin.boostmybusiness.ai/react/login.php", {
          credentials: "include", // 🔐 important
        });

        if (!res.ok) {
          setUser(null);
        } else {
          
          const data = await res.json();
          // console.log(data);
          setUser({
            ...data,
            isAuthenticated: true,
          });
        }
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  // 4️⃣ LOGIN (called after successful login API)
  const login = (userData) => {
    setUser({
      ...userData,
      isAuthenticated: true,
    });
  };

  // 5️⃣ LOGOUT
  const logout = async () => {
    await fetch("https://admin.boostmybusiness.ai/react/logout.php", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  // 6️⃣ PROVIDE CONTEXT VALUES
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role ?? null,
        login,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 7️⃣ CUSTOM HOOK
export function useAuth() {
  return useContext(AuthContext);
}
