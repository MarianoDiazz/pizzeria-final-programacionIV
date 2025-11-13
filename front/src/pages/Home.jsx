import { useEffect, useState } from "react";
import { getProductos, getCategorias } from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProductos(), getCategorias()])
      .then(([resProd, resCat]) => {
        setProductos(resProd.data);
        setCategorias(resCat.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtrados =
    categoriaActiva === "todas"
      ? productos
      : productos.filter((p) => String(p.id_categoria) === String(categoriaActiva));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">🍕</div>
          <p className="text-xl text-gray-600 font-semibold">Preparando tu pizza...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl animate-pulse">🍕</div>
          <div className="absolute bottom-10 right-10 text-9xl animate-pulse delay-75">🍕</div>
          <div className="absolute top-1/2 left-1/3 text-7xl animate-pulse delay-150">🧀</div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl">
            ¡Bienvenido a Bella Napoli!
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-orange-100">
            La auténtica pizza italiana hecha con amor 🇮🇹
          </p>
          <div className="flex gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-sm font-semibold">✨ Ingredientes frescos</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-sm font-semibold">🔥 Horno de leña</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menú Section */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Nuestro Menú
        </h3>

        {/* Filtros de categoría - Mejorados */}
        <div className="flex gap-3 justify-center mb-10 flex-wrap">
          <button
            onClick={() => setCategoriaActiva("todas")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md ${
              categoriaActiva === "todas"
                ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            🍕 Todas
          </button>
          {categorias.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoriaActiva(c.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md ${
                categoriaActiva === c.id
                  ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {c.nombre}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        {filtrados.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <p className="text-xl text-gray-600">No hay productos en esta categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtrados.map((p, index) => (
              <div
                key={p.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard producto={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sección adicional de valor */}
      <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-16 px-6 mt-12">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">¿Por qué elegirnos?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="font-bold text-xl mb-2">Entrega Rápida</h4>
              <p className="text-orange-100">En 30-45 minutos a tu puerta</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-4xl mb-3">🌿</div>
              <h4 className="font-bold text-xl mb-2">Ingredientes Frescos</h4>
              <p className="text-orange-100">Seleccionados diariamente</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-4xl mb-3">👨‍🍳</div>
              <h4 className="font-bold text-xl mb-2">Maestros Pizzeros</h4>
              <p className="text-orange-100">Recetas tradicionales italianas</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}