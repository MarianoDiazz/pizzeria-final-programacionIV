import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <nav style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <Link to="/">Inicio</Link>
        <Link to="/admin">Panel Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
