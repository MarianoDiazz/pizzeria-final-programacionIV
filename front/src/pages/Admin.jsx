import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import API from "../services/api";

export default function Admin() {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [activeTab, setActiveTab] = useState("productos");

  const [newCat, setNewCat] = useState({ nombre: "", orden: 0 });
  const [newProd, setNewProd] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    id_categoria: "",
    imagen_url: "",
  });

  const cargarTodo = async () => {
    const resC = await API.get("/categorias");
    const resP = await API.get("/productos");
    const resPe = await API.get("/pedidos");
    setCategorias(resC.data);
    setProductos(resP.data);
    setPedidos(resPe.data);
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  const crearCategoria = async () => {
    if (!newCat.nombre) return;
    await API.post("/categorias", newCat);
    setNewCat({ nombre: "", orden: 0 });
    cargarTodo();
    Swal.fire({
      title: "¡Categoría creada!",
      icon: "success",
      confirmButtonColor: "#8B4513",
      timer: 1500,
    });
  };

  const crearProducto = async () => {
    if (!newProd.nombre || !newProd.precio) return;
    await API.post("/productos", newProd);
    setNewProd({
      nombre: "",
      descripcion: "",
      precio: 0,
      id_categoria: "",
      imagen_url: "",
    });
    cargarTodo();
    Swal.fire({
      title: "¡Producto creado!",
      icon: "success",
      confirmButtonColor: "#8B4513",
      timer: 1500,
    });
  };

  const eliminarProducto = async (id) => {
    const ok = await Swal.fire({
      icon: "warning",
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#8B4513",
    });
    if (!ok.isConfirmed) return;

    await API.delete(`/productos/${id}`);
    cargarTodo();
    Swal.fire({
      title: "Producto eliminado",
      icon: "success",
      confirmButtonColor: "#8B4513",
      timer: 1500,
    });
  };

  const editarProducto = async (p) => {
    const opcionesCategorias = categorias
      .map(
        (cat) =>
          `<option value="${cat.id}" ${
            p.id_categoria === cat.id ? "selected" : ""
          }>${cat.nombre}</option>`
      )
      .join("");

    const { value: valores } = await Swal.fire({
      title: "Editar producto",
      html: `
        <div class="text-left space-y-3">
          <input id="nombre" class="swal2-input w-full" placeholder="Nombre" value="${p.nombre}">
          <textarea id="descripcion" class="swal2-input w-full" placeholder="Descripción">${p.descripcion}</textarea>
          <input id="precio" type="number" class="swal2-input w-full" placeholder="Precio" value="${p.precio}">
          <select id="categoria" class="swal2-input w-full">
            <option value="">Sin categoría</option>
            ${opcionesCategorias}
          </select>
          <input id="imagen" class="swal2-input w-full" placeholder="URL imagen" value="${p.imagen_url || ""}">
          <label class="flex items-center gap-2 px-3">
            <input type="checkbox" id="disponible" ${p.disponible ? "checked" : ""}>
            <span>Disponible para la venta</span>
          </label>
        </div>
      `,
      focusConfirm: false,
      confirmButtonColor: "#8B4513",
      preConfirm: () => ({
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        precio: Number(document.getElementById("precio").value),
        imagen_url: document.getElementById("imagen").value,
        id_categoria: Number(document.getElementById("categoria").value) || null,
        disponible: document.getElementById("disponible").checked,
      }),
    });

    if (!valores) return;

    await API.put(`/productos/${p.id}`, valores);
    cargarTodo();
    Swal.fire({
      title: "Producto actualizado",
      icon: "success",
      confirmButtonColor: "#8B4513",
      timer: 1500,
    });
  };

  const cambiarEstado = async (pedido) => {
    const estados = ["Pendiente", "En preparación", "Listo", "Entregado"];

    const { value: nuevoEstado } = await Swal.fire({
      title: "Cambiar estado del pedido",
      input: "select",
      inputOptions: estados.reduce((acc, estado) => {
        acc[estado] = estado;
        return acc;
      }, {}),
      inputValue: pedido.estado,
      showCancelButton: true,
      confirmButtonColor: "#8B4513",
      confirmButtonText: "Actualizar",
    });

    if (!nuevoEstado) return;

    await API.put(`/pedidos/${pedido.id}/estado`, { estado: nuevoEstado });
    cargarTodo();
    Swal.fire({
      title: "Estado actualizado",
      icon: "success",
      confirmButtonColor: "#8B4513",
      timer: 1500,
    });
  };

  // Estadísticas
  const totalVentas = pedidos.reduce((sum, p) => sum + p.total, 0);
  const pedidosPendientes = pedidos.filter(p => p.estado === "Pendiente").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header con estadísticas */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-6 text-center">
            Panel de Administración
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-600">
              <p className="text-amber-700 text-sm font-semibold uppercase">Total Productos</p>
              <p className="text-3xl font-bold text-amber-900">{productos.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
              <p className="text-green-700 text-sm font-semibold uppercase">Ventas Totales</p>
              <p className="text-3xl font-bold text-green-900">${totalVentas.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600">
              <p className="text-orange-700 text-sm font-semibold uppercase">Pedidos Pendientes</p>
              <p className="text-3xl font-bold text-orange-900">{pedidosPendientes}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="flex border-b border-amber-200">
            {["productos", "categorias", "pedidos"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === tab
                    ? "text-amber-900 border-b-2 border-amber-600 bg-amber-50"
                    : "text-amber-700 hover:bg-amber-50"
                }`}
              >
                {tab === "productos" && "🍕 Productos"}
                {tab === "categorias" && "📁 Categorías"}
                {tab === "pedidos" && "📦 Pedidos"}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido de tabs */}
        {activeTab === "categorias" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Crear Categoría</h2>
            <div className="flex gap-3 mb-6">
              <input
                className="flex-1 border-2 border-amber-200 rounded-lg px-4 py-3 focus:border-amber-500 outline-none"
                placeholder="Nombre de la categoría"
                value={newCat.nombre}
                onChange={(e) => setNewCat({ ...newCat, nombre: e.target.value })}
              />
              <input
                type="number"
                className="w-32 border-2 border-amber-200 rounded-lg px-4 py-3 focus:border-amber-500 outline-none"
                placeholder="Orden"
                value={newCat.orden}
                onChange={(e) => setNewCat({ ...newCat, orden: Number(e.target.value) })}
              />
              <button
                onClick={crearCategoria}
                className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Crear
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categorias.map((c) => (
                <div key={c.id} className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                  <h3 className="font-bold text-amber-900">{c.nombre}</h3>
                  <p className="text-sm text-amber-700">Orden: {c.orden}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "productos" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Crear Producto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  className="border-2 border-amber-200 rounded-lg px-4 py-3 focus:border-amber-500 outline-none"
                  placeholder="Nombre del producto"
                  value={newProd.nombre}
                  onChange={(e) => setNewProd({ ...newProd, nombre: e.target.value })}
                />
                <input
                  type="number"
                  className="border-2 border-amber-200 rounded-lg px-4 py-3 focus:border-amber-500 outline-none"
                  placeholder="Precio"
                  value={newProd.precio || ""}
                  onChange={(e) => setNewProd({ ...newProd, precio: Number(e.target.value) })}
                />
                <textarea
                  className="border-2 border-amber-200 rounded-lg px-4 py-3 focus:border-amber-500 outline-none md:col-span-2"
                  placeholder="Descripción"
                  value={newProd.descripcion}
                  onChange={(e) => setNewProd({ ...newProd, descripcion: e.target.value })}
                />
                <select
                  className="border-2 border-amber-200 rounded-lg px-4 py-3 focus:border-amber-500 outline-none"
                  value={newProd.id_categoria}
                  onChange={(e) => setNewProd({ ...newProd, id_categoria: Number(e.target.value) })}
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
                <input
                  className="border-2 border-amber-200 rounded-lg px-4 py-3 focus:border-amber-500 outline-none"
                  placeholder="URL de la imagen"
                  value={newProd.imagen_url}
                  onChange={(e) => setNewProd({ ...newProd, imagen_url: e.target.value })}
                />
              </div>
              <button
                onClick={crearProducto}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Crear Producto
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Productos Existentes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productos.map((p) => (
                  <div key={p.id} className="border-2 border-amber-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-amber-900">{p.nombre}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.disponible ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {p.disponible ? "Disponible" : "Agotado"}
                      </span>
                    </div>
                    <p className="text-sm text-amber-700 mb-2">{p.descripcion}</p>
                    <p className="text-lg font-bold text-amber-900 mb-1">${p.precio}</p>
                    <p className="text-xs text-amber-600 mb-3">
                      {p.categoria?.nombre || "Sin categoría"}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editarProducto(p)}
                        className="flex-1 bg-amber-800 hover:bg-amber-900 text-white py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarProducto(p.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "pedidos" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Gestión de Pedidos</h2>
            <div className="space-y-4">
              {pedidos.length === 0 ? (
                <p className="text-center text-amber-700 py-8">No hay pedidos todavía</p>
              ) : (
                pedidos.map((pe) => (
                  <div
                    key={pe.id}
                    className="border-2 border-amber-200 rounded-xl p-5 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-amber-900">
                          Pedido #{pe.id}
                        </h4>
                        <p className="text-amber-700">👤 {pe.cliente_nombre}</p>
                        <p className="text-amber-700">📞 {pe.cliente_telefono}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-700">${pe.total}</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${
                            pe.estado === "Pendiente"
                              ? "bg-yellow-100 text-yellow-800"
                              : pe.estado === "En preparación"
                              ? "bg-blue-100 text-blue-800"
                              : pe.estado === "Listo"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {pe.estado}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => cambiarEstado(pe)}
                      className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-2 rounded-lg font-semibold transition-colors mb-3"
                    >
                      Cambiar Estado
                    </button>

                    <details className="bg-amber-50 rounded-lg p-4 mt-3">
                      <summary className="cursor-pointer font-semibold text-amber-900">
                        Ver detalles del pedido
                      </summary>
                      <div className="mt-3 space-y-2">
                        {pe.detalles.map((d) => (
                          <div
                            key={d.id}
                            className="flex justify-between items-center bg-white p-3 rounded-lg border border-amber-200"
                          >
                            <div>
                              <p className="font-semibold text-amber-900">
                                {d.producto?.nombre || "Producto eliminado"}
                              </p>
                              <p className="text-sm text-amber-700">
                                Cantidad: {d.cantidad} × ${d.precio_unitario}
                              </p>
                            </div>
                            <p className="font-bold text-green-700">${d.subtotal}</p>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}