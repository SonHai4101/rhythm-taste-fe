import { Outlet } from "react-router";
import { Navbar } from "./components/NavBar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
