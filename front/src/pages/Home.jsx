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

  if (loading) return <p className="text-center mt-16 text-gray-500">Cargando productos…</p>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Nuestras Pizzas</h2>

      {/* filtro por categoría */}
      <div className="flex gap-2 justify-center mb-6 flex-wrap">
        <button
          onClick={() => setCategoriaActiva("todas")}
          className={`px-3 py-1 rounded-full ${categoriaActiva === "todas" ? "bg-red-600 text-white" : "bg-white shadow"}`}
        >
          Todas
        </button>
        {categorias.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategoriaActiva(c.id)}
            className={`px-3 py-1 rounded-full ${categoriaActiva === c.id ? "bg-red-600 text-white" : "bg-white shadow"}`}
          >
            {c.nombre}
          </button>
        ))}
      </div>

      {filtrados.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos en esta categoría</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {filtrados.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      )}
    </main>
  );
}
