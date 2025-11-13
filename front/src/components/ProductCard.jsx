import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

export default function ProductCard({ producto }) {
  const { addToCart } = useCart();
  const { nombre, descripcion, precio, imagen_url } = producto;

  const handleAdd = () => {
    addToCart(producto);
    Swal.fire({
      title: "Agregado al carrito",
      text: `${nombre} ($${precio})`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 w-72 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={imagen_url || "https://via.placeholder.com/300x200?text=Pizza"}
        alt={nombre}
        className="rounded-xl mb-3 w-full h-40 object-cover"
      />
      <h3 className="text-lg font-semibold">{nombre}</h3>
      <p className="text-gray-600 text-sm">{descripcion}</p>
      <p className="text-xl font-bold text-green-700 my-2">${precio}</p>
      <button
        onClick={handleAdd}
        className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
      >
        🛒 Agregar al carrito
      </button>
    </div>
  );
}
