import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const userData = {
    name: "Haris",
    email: "haris@egmail.com",
    role: "manager",
    isAuthenticated: true,
  };

  const handleLogin = () => {
    login(userData);
    // 2. store ONLY what you need in localStorage
    const authStorageData = {
      role: userData.role,
      isAuthenticated: userData.isAuthenticated,
    };
    localStorage.setItem("authUser", JSON.stringify(authStorageData));
    navigate("/dashboard");
  };

  return <button onClick={handleLogin}>Login</button>;
}

export default Login;
