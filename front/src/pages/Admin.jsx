import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import API from "../services/api";

export default function Admin() {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  const [newCat, setNewCat] = useState({ nombre: "", orden: 0 });
  const [newProd, setNewProd] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    id_categoria: "",
    imagen_url: "",
  });

  // 🔥 Cargar todo al entrar
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

  // 🔥 Crear categoría
  const crearCategoria = async () => {
    if (!newCat.nombre) return;
    await API.post("/categorias", newCat);
    setNewCat({ nombre: "", orden: 0 });
    cargarTodo();
    Swal.fire("Categoría creada", "", "success");
  };

  // 🔥 Crear producto
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
    Swal.fire("Producto creado", "", "success");
  };

  // 🔥 Eliminar producto
  const eliminarProducto = async (id) => {
    const ok = await Swal.fire({
      icon: "warning",
      title: "¿Eliminar producto?",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
    });
    if (!ok.isConfirmed) return;

    await API.delete(`/productos/${id}`);
    cargarTodo();
    Swal.fire("Eliminado", "", "success");
  };

  // 🔥 Editar producto (con categoría)
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
        <input id="nombre" class="swal2-input" placeholder="Nombre" value="${
          p.nombre
        }">
        <input id="descripcion" class="swal2-input" placeholder="Descripción" value="${
          p.descripcion
        }">
        <input id="precio" type="number" class="swal2-input" value="${
          p.precio
        }">
        <select id="categoria" class="swal2-input">
          <option value="">Sin categoría</option>
          ${opcionesCategorias}
        </select>
        <input id="imagen" class="swal2-input" placeholder="URL imagen" value="${
          p.imagen_url
        }">
        <label class="mt-3">
          <input type="checkbox" id="disponible" ${
            p.disponible ? "checked" : ""
          }>
          Disponible
        </label>
      `,
      focusConfirm: false,
      preConfirm: () => ({
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        precio: Number(document.getElementById("precio").value),
        imagen_url: document.getElementById("imagen").value,
        id_categoria:
          Number(document.getElementById("categoria").value) || null,
        disponible: document.getElementById("disponible").checked,
      }),
    });

    if (!valores) return;

    await API.put(`/productos/${p.id}`, valores);
    cargarTodo();
    Swal.fire("Producto actualizado", "", "success");
  };

  // 🔥 Cambiar estado del pedido
  const cambiarEstado = async (pedido) => {
    const estados = ["Pendiente", "En preparación", "Listo", "Entregado"];

    const { value: nuevoEstado } = await Swal.fire({
      title: "Cambiar estado",
      input: "select",
      inputOptions: estados.reduce((acc, estado) => {
        acc[estado] = estado;
        return acc;
      }, {}),
      inputValue: pedido.estado,
      showCancelButton: true,
    });

    if (!nuevoEstado) return;

    await API.put(`/pedidos/${pedido.id}/estado`, { estado: nuevoEstado });
    cargarTodo();
    Swal.fire("Estado actualizado", "", "success");
  };

  // UI
  return (
    <div className="max-w-5xl mx-auto py-8 space-y-10">
      <h1 className="text-center text-3xl font-bold mb-4">Panel Admin</h1>

      {/* CATEGORÍAS */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Crear categoría</h2>
        <div className="grid grid-cols-2 gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Nombre"
            value={newCat.nombre}
            onChange={(e) => setNewCat({ ...newCat, nombre: e.target.value })}
          />
          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Orden"
            value={newCat.orden}
            onChange={(e) =>
              setNewCat({ ...newCat, orden: Number(e.target.value) })
            }
          />
        </div>
        <button
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={crearCategoria}
        >
          Crear
        </button>
      </section>

      {/* PRODUCTOS */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Crear producto</h2>
        <div className="grid grid-cols-2 gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Nombre"
            onChange={(e) => setNewProd({ ...newProd, nombre: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Descripción"
            onChange={(e) =>
              setNewProd({ ...newProd, descripcion: e.target.value })
            }
          />
          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Precio"
            onChange={(e) =>
              setNewProd({ ...newProd, precio: Number(e.target.value) })
            }
          />
          <select
            className="border p-2 rounded"
            onChange={(e) =>
              setNewProd({ ...newProd, id_categoria: Number(e.target.value) })
            }
          >
            <option value="">Sin categoría</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
          <input
            className="border p-2 rounded"
            placeholder="Imagen"
            onChange={(e) =>
              setNewProd({ ...newProd, imagen_url: e.target.value })
            }
          />
        </div>
        <button
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
          onClick={crearProducto}
        >
          Crear producto
        </button>

        <h3 className="mt-6 text-lg font-semibold">Productos creados</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {productos.map((p) => (
            <div key={p.id} className="border p-4 rounded-xl shadow">
              <h4 className="font-bold">{p.nombre}</h4>
              <p className="text-sm text-gray-600">Precio: ${p.precio}</p>
              <p className="text-sm">
                Categoría: {p.categoria?.nombre ?? "Sin categoría"}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => editarProducto(p)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => eliminarProducto(p.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PEDIDOS */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Pedidos</h2>

        <div className="space-y-4">
          {pedidos.map((pe) => (
            <div key={pe.id} className="border p-4 rounded shadow">
              <h4 className="font-bold">Pedido #{pe.id}</h4>
              <p>Cliente: {pe.cliente_nombre}</p>
              <p>Teléfono: {pe.cliente_telefono}</p>
              <p>Total: ${pe.total}</p>

              <span className="text-sm px-2 py-1 bg-gray-200 rounded">
                Estado: {pe.estado}
              </span>

              <button
                className="ml-3 bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => cambiarEstado(pe)}
              >
                Cambiar estado
              </button>

              <details className="mt-3 bg-gray-50 p-3 rounded-xl">
                <summary className="cursor-pointer font-semibold text-gray-700">
                  Ver detalles
                </summary>

                <div className="mt-3 space-y-2">
                  {pe.detalles.map((d) => (
                    <div
                      key={d.id}
                      className="p-2 bg-white rounded shadow-sm border flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">
                          {d.producto?.nombre || "Producto eliminado"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Cantidad: {d.cantidad}
                        </p>
                      </div>
                      <div className="font-semibold text-green-700">
                        ${d.subtotal}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
