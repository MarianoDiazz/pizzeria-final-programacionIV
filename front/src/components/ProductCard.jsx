import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

export default function ProductCard({ producto }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(producto);
    Swal.fire({
      icon: "success",
      title: "¡Agregado!",
      text: `${producto.nombre} se agregó al carrito`,
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
      background: "#8B4513",
      color: "#fff",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group border border-amber-100">
      {/* Imagen */}
      <div className="relative overflow-hidden h-48 bg-gradient-to-br from-amber-100 to-orange-100">
        {producto.imagen_url ? (
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-7xl group-hover:rotate-12 transition-transform duration-300">
              🍕
            </span>
          </div>
        )}
        
        {!producto.disponible && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
          {producto.nombre}
        </h3>
        
        <p className="text-amber-700 text-sm mb-4 line-clamp-2 leading-relaxed">
          {producto.descripcion || "Pizza artesanal con ingredientes frescos"}
        </p>

        {/* Precio y botón */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-amber-600 mb-1">Precio</p>
            <p className="text-2xl font-bold text-amber-900">
              ${producto.precio}
            </p>
          </div>
          
          <button
            onClick={handleAdd}
            disabled={!producto.disponible}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              producto.disponible
                ? "bg-amber-800 hover:bg-amber-900 text-white shadow-md hover:shadow-lg active:scale-95"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {producto.disponible ? "Agregar 🛒" : "No disponible"}
          </button>
        </div>
      </div>

      {/* Borde decorativo inferior */}
      <div className="h-1 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
}