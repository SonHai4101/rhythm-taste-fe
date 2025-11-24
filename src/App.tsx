import { Outlet } from "react-router";
import { Navbar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Outlet />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
