import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";
import { createPedido } from "../services/api";
import { useState } from "react";

export default function Checkout() {
  const { cart, addToCart, decrease, removeFromCart, clearCart, total } = useCart();

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    notas: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono || cart.length === 0) {
      Swal.fire("Completa el formulario y el carrito", "", "warning");
      return;
    }

    const pedido = {
      cliente_nombre: form.nombre,
      cliente_telefono: form.telefono,
      total,
      detalles: cart.map((p) => ({
        id_producto: p.id,
        cantidad: p.cantidad,
        precio_unitario: p.precio,
        subtotal: p.precio * p.cantidad,
      })),
    };

    try {
      const res = await createPedido(pedido);

      clearCart();
      Swal.fire({
        title: "Pedido realizado 🍕",
        html: `
          <p>N° de orden: #${res.data.id}</p>
          <p>Total: $${res.data.total}</p>
          <p>Estado: ${res.data.estado}</p>
        `,
        icon: "success",
      });
    } catch {
      Swal.fire("Error al enviar el pedido", "", "error");
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Finalizar Pedido</h1>

      {/* LISTA DEL CARRITO */}
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Carrito vacío</p>
      ) : (
        <>
          <ul className="mb-6 border rounded-lg p-4 bg-white">
            {cart.map((p) => (
              <li
                key={p.id}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <p className="font-semibold">{p.nombre}</p>
                  <p className="text-gray-600 text-sm">
                    ${p.precio} x {p.cantidad} = ${p.precio * p.cantidad}
                  </p>
                </div>

                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => decrease(p.id)}
                    className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                  >
                    −
                  </button>
                  <span>{p.cantidad}</span>
                  <button
                    onClick={() => addToCart(p)}
                    className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(p.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="text-right text-xl font-bold mb-6">
            Total: ${total}
          </h2>

          {/* FORMULARIO */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="nombre"
              placeholder="Nombre"
              className="border rounded px-3 py-2"
              value={form.nombre}
              onChange={handleChange}
            />
            <input
              name="telefono"
              placeholder="Teléfono"
              className="border rounded px-3 py-2"
              value={form.telefono}
              onChange={handleChange}
            />
            <input
              name="direccion"
              placeholder="Dirección"
              className="border rounded px-3 py-2 sm:col-span-2"
              value={form.direccion}
              onChange={handleChange}
            />
            <textarea
              name="notas"
              placeholder="Notas adicionales"
              className="border rounded px-3 py-2 sm:col-span-2"
              value={form.notas}
              onChange={handleChange}
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded sm:col-span-2 hover:bg-green-700">
              Confirmar Pedido
            </button>
          </form>
        </>
      )}
    </main>
  );
}
