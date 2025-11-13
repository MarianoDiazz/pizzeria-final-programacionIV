import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <Router>
      <Header />
      
      {/* Nav mejorado con diseño elegante */}
      <nav className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 shadow-md sticky top-16 z-40">
        <div className="container mx-auto px-6">
          <ul className="flex gap-8 justify-center items-center py-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-amber-200"
                      : "text-white hover:text-amber-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center gap-2">
                      🏠 Inicio
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-200 rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-amber-200"
                      : "text-white hover:text-amber-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center gap-2">
                      👨‍💼 Panel Admin
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-200 rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>
            </li>

            <li className="ml-auto">
              <a
                href="https://wa.me/5493814567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <span className="text-xl">💬</span>
                <span>Pedí por WhatsApp</span>
              </a>
            </li>
          </ul>
        </div>
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