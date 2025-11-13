import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <Router>
      <Header />
      <nav className="flex gap-6 justify-center py-2 bg-orange-500 text-white font-semibold">
        <Link to="/">Inicio</Link>
        <Link to="/admin">Panel Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <Footer />
    </Router>
  );
}
