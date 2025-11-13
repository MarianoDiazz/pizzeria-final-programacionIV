import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
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
          ? "bg-amber-900 shadow-xl py-3"
          : "bg-gradient-to-r from-amber-900 via-orange-900 to-amber-900 py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo elegante */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-600 rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="relative bg-amber-800 p-3 rounded-full border-2 border-amber-600 group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">🍕</span>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-amber-100 tracking-tight">
              Bella Napoli
            </h1>
            <p className="text-xs text-amber-300 italic font-light tracking-wide">
              Dal 1924 • Napoli, Italia
            </p>
          </div>
        </Link>

        {/* Carrito elegante */}
        <Link
          to="/checkout"
          className="relative bg-amber-800/50 backdrop-blur-sm border-2 border-amber-600 px-6 py-3 rounded-lg hover:bg-amber-800 transition-all duration-300 flex items-center gap-4 group shadow-lg"
        >
          <div className="relative">
            <span className="text-2xl group-hover:scale-110 transition-transform inline-block">
              🛒
            </span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cart.length}
              </span>
            )}
          </div>
          <div className="text-amber-100">
            <p className="text-xs text-amber-300">Mi pedido</p>
            <p className="text-lg font-bold">${total.toFixed(2)}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}