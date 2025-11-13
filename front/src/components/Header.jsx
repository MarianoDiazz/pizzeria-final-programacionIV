import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const { cart, total } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 500);
    }
  }, [cart.length]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-red-700 via-red-600 to-orange-600 shadow-2xl py-3"
          : "bg-gradient-to-r from-red-600 via-red-500 to-orange-500 py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo y nombre */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="text-4xl transform group-hover:rotate-12 transition-transform duration-300">
            🍕
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
              Bella Napoli
            </h1>
            <p className="text-xs text-orange-100 italic">Auténtica pizza italiana</p>
          </div>
        </Link>

        {/* Carrito */}
        <Link
          to="/checkout"
          className={`relative bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full 
                     hover:bg-white/30 transition-all duration-300 flex items-center gap-3
                     shadow-lg hover:shadow-xl hover:scale-105 ${
                       cartBounce ? "animate-bounce" : ""
                     }`}
        >
          <span className="text-2xl">🛒</span>
          <div className="text-white">
            <span className="font-bold text-lg">{cart.length}</span>
            <span className="text-sm ml-2 font-semibold">${total.toFixed(2)}</span>
          </div>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}