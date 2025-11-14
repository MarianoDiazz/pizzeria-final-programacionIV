import { useCart } from "../context/CartContext";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const { cart, total } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-amber-900 shadow-2xl"
          : "bg-gradient-to-r from-amber-900 via-orange-900 to-amber-900"
      }`}
    >
      {/* Barra superior: Logo + Carrito */}
      <div className="border-b border-amber-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-600 rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative bg-amber-800 p-3 rounded-full border-2 border-amber-600 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🍕</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-amber-100 tracking-tight">
                Bella Napoli
              </h1>
              <p className="text-xs text-amber-300 italic font-light tracking-wide">
                Dal 1924 • Napoli, Italia
              </p>
            </div>
          </Link>

          {/* Carrito */}
          <Link
            to="/checkout"
            className="relative bg-amber-800/50 backdrop-blur-sm border-2 border-amber-600 px-4 md:px-6 py-3 rounded-lg hover:bg-amber-800 transition-all duration-300 flex items-center gap-3 md:gap-4 group shadow-lg"
          >
            <div className="relative">
              <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform inline-block">
                🛒
              </span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cart.length}
                </span>
              )}
            </div>
            <div className="text-amber-100">
              <p className="text-xs text-amber-300 hidden md:block">Mi pedido</p>
              <p className="text-base md:text-lg font-bold">${total.toFixed(2)}</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Navegación */}
      <nav className="bg-amber-800/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <ul className="flex items-center justify-between md:justify-center md:gap-8 py-3">
            {/* Links principales */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "text-amber-200"
                      : "text-white hover:text-amber-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="hidden md:inline">🏠</span>
                    <span>Inicio</span>
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
                  `relative px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "text-amber-200"
                      : "text-white hover:text-amber-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="hidden md:inline">👨‍💼</span>
                    <span>Panel Admin</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-200 rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>
            </li>

            {/* Botón WhatsApp - Destacado */}
            <li className="hidden md:block ml-auto">
              <a
                href="https://wa.me/5493814567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-sm"
              >
                <span className="text-lg">💬</span>
                <span>Pedí por WhatsApp</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}