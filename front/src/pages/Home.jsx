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
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">🍕</div>
          <p className="text-xl text-amber-900 font-semibold">Horneando tu experiencia...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section Elegante */}
      <section 
        className="relative bg-cover bg-center text-white py-32 px-6"
        style={{
          backgroundImage: 'linear-gradient(rgba(139, 69, 19, 0.85), rgba(139, 69, 19, 0.85)), url("https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200")',
        }}
      >
        <div className="container mx-auto text-center relative z-10">
          <p className="text-amber-300 text-sm uppercase tracking-widest mb-3 font-light">
            Auténtica pizza napolitana
          </p>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-amber-50">
            Tradizione Italiana
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-amber-100 max-w-2xl mx-auto font-light">
            Desde 1924, llevando el sabor de Napoli a tu mesa con recetas transmitidas por generaciones
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <div className="bg-white/10 backdrop-blur-sm border border-amber-400 px-6 py-3 rounded-lg">
              <span className="text-sm font-semibold">🔥 Horno de leña a 485°C</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-amber-400 px-6 py-3 rounded-lg">
              <span className="text-sm font-semibold">🇮🇹 Ingredientes importados</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-amber-400 px-6 py-3 rounded-lg">
              <span className="text-sm font-semibold">👨‍🍳 Maestros pizzeros</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menú Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-amber-700 text-sm uppercase tracking-widest mb-2">Nuestro menú</p>
          <h3 className="text-4xl font-bold text-amber-900 mb-3">
            Le Nostre Pizze
          </h3>
          <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full"></div>
        </div>

        {/* Filtros elegantes */}
        <div className="flex gap-3 justify-center mb-12 flex-wrap">
          <button
            onClick={() => setCategoriaActiva("todas")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 ${
              categoriaActiva === "todas"
                ? "bg-amber-800 text-white border-amber-800 shadow-lg"
                : "bg-white text-amber-800 border-amber-200 hover:border-amber-400"
            }`}
          >
            Todas
          </button>
          {categorias.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoriaActiva(c.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 ${
                categoriaActiva === c.id
                  ? "bg-amber-800 text-white border-amber-800 shadow-lg"
                  : "bg-white text-amber-800 border-amber-200 hover:border-amber-400"
              }`}
            >
              {c.nombre}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        {filtrados.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍕</div>
            <p className="text-xl text-amber-800">No hay productos en esta categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtrados.map((p, index) => (
              <div
                key={p.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard producto={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sección de valores */}
      <section className="bg-amber-900 text-white py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3">La Nostra Filosofia</h3>
            <p className="text-amber-300 max-w-2xl mx-auto">
              Cada pizza es una obra de arte, preparada con pasión y dedicación
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-amber-800/50 backdrop-blur-sm p-8 rounded-xl border border-amber-700 text-center">
              <div className="text-5xl mb-4">🌾</div>
              <h4 className="font-bold text-xl mb-3">Masa Artesanal</h4>
              <p className="text-amber-200 leading-relaxed">
                Fermentación natural de 72 horas para una masa ligera y digerible
              </p>
            </div>
            <div className="bg-amber-800/50 backdrop-blur-sm p-8 rounded-xl border border-amber-700 text-center">
              <div className="text-5xl mb-4">🧀</div>
              <h4 className="font-bold text-xl mb-3">Mozzarella di Bufala</h4>
              <p className="text-amber-200 leading-relaxed">
                Importada directamente de Campania, la región de origen
              </p>
            </div>
            <div className="bg-amber-800/50 backdrop-blur-sm p-8 rounded-xl border border-amber-700 text-center">
              <div className="text-5xl mb-4">🍅</div>
              <h4 className="font-bold text-xl mb-3">Pomodoro San Marzano</h4>
              <p className="text-amber-200 leading-relaxed">
                Los mejores tomates del mundo, cultivados en las laderas del Vesubio
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}