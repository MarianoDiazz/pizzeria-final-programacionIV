import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { cart, total } = useCart();

  return (
    <header className="bg-red-600 text-white py-4 shadow-md flex justify-between items-center px-6">
      <h1 className="text-2xl font-bold">🍕 Pizzería Don Mariano</h1>
      <Link to="/checkout" className="relative">
        🛒 <span className="font-semibold">{cart.length}</span>
        <span className="ml-2 text-sm">(${total})</span>
      </Link>
    </header>
  );
}
