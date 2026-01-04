import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
function App() {
  return (
    <>
      <h1>Welcome to React Router</h1>
      <Navbar />
      <Suspense fallback={<p>Loading page...</p>}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default App
