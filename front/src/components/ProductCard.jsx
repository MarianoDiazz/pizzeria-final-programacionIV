import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

export default function ProductCard({ producto }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(producto);
    Swal.fire({
      icon: "success",
      title: "¡Agregado al carrito!",
      text: `${producto.nombre} ha sido agregado`,
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
      {/* Imagen */}
      <div className="relative overflow-hidden h-56 bg-gradient-to-br from-orange-100 to-red-100">
        {producto.imagen_url ? (
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-8xl group-hover:rotate-12 transition-transform duration-300">
              🍕
            </span>
          </div>
        )}
        
        {/* Badge de disponibilidad */}
        {!producto.disponible && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            Agotado
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
          {producto.nombre}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {producto.descripcion || "Deliciosa pizza con ingredientes frescos"}
        </p>

        {/* Precio y botón */}
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-red-600">
            ${producto.precio}
          </div>
          
          <button
            onClick={handleAdd}
            disabled={!producto.disponible}
            className={`px-5 py-3 rounded-full font-semibold transition-all duration-300 transform ${
              producto.disponible
                ? "bg-gradient-to-r from-red-600 to-orange-500 text-white hover:shadow-lg hover:scale-110 active:scale-95"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {producto.disponible ? "Agregar 🛒" : "No disponible"}
          </button>
        </div>
      </div>

      {/* Efecto de brillo decorativo */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
}