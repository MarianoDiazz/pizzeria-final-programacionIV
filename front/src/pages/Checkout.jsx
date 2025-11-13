import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";
import { createPedido } from "../services/api";
import { useState } from "react";
import { Link } from "react-router-dom";

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
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor completa tu nombre, teléfono y agrega productos al carrito",
        icon: "warning",
        confirmButtonColor: "#8B4513",
      });
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
        title: "¡Pedido confirmado! 🍕",
        html: `
          <div class="text-left">
            <p class="text-lg mb-2"><strong>N° de orden:</strong> #${res.data.id}</p>
            <p class="text-lg mb-2"><strong>Total:</strong> $${res.data.total}</p>
            <p class="text-lg mb-4"><strong>Estado:</strong> ${res.data.estado}</p>
            <p class="text-sm text-gray-600">Te contactaremos al <strong>${form.telefono}</strong> para confirmar tu pedido.</p>
            <p class="text-sm text-gray-600 mt-2">⏱️ Tiempo estimado: 30-45 minutos</p>
          </div>
        `,
        icon: "success",
        confirmButtonColor: "#8B4513",
        confirmButtonText: "Entendido",
      });
    } catch {
      Swal.fire({
        title: "Error",
        text: "No pudimos procesar tu pedido. Intenta nuevamente.",
        icon: "error",
        confirmButtonColor: "#8B4513",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Tu Pedido</h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full"></div>
        </div>

        {cart.length === 0 ? (
          // Carrito vacío
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-amber-900 mb-3">
              Tu carrito está vacío
            </h2>
            <p className="text-amber-700 mb-6">
              ¡Agrega algunas pizzas deliciosas para comenzar!
            </p>
            <Link
              to="/"
              className="inline-block bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-900 transition-colors"
            >
              Ver el menú
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Columna izquierda: Productos */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <span>🍕</span>
                  Tus productos
                </h2>

                <div className="space-y-3">
                  {cart.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-200 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                        🍕
                      </div>

                      <div className="flex-grow">
                        <h3 className="font-bold text-amber-900">{p.nombre}</h3>
                        <p className="text-sm text-amber-700">
                          ${p.precio} × {p.cantidad}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm">
                        <button
                          onClick={() => decrease(p.id)}
                          className="w-8 h-8 bg-amber-200 hover:bg-amber-300 rounded-lg font-bold text-amber-900 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-bold text-amber-900">
                          {p.cantidad}
                        </span>
                        <button
                          onClick={() => addToCart(p)}
                          className="w-8 h-8 bg-amber-200 hover:bg-amber-300 rounded-lg font-bold text-amber-900 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-lg text-amber-900">
                          ${(p.precio * p.cantidad).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(p.id)}
                          className="text-xs text-red-600 hover:text-red-800 mt-1"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formulario */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <span>📝</span>
                  Información de entrega
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      name="nombre"
                      placeholder="Juan Pérez"
                      className="w-full border-2 border-amber-200 rounded-lg px-4 py-3 focus:border-amber-500 focus:outline-none transition-colors"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                      Teléfono *
                    </label>
                    <input
                      name="telefono"
                      placeholder="3814567890"
                      className="w-full border-2 border-amber-200 rounded-lg px-4 py-3 focus:border-amber-500 focus:outline-none transition-colors"
                      value={form.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                      Dirección de entrega
                    </label>
                    <input
                      name="direccion"
                      placeholder="Calle, número, barrio"
                      className="w-full border-2 border-amber-200 rounded-lg px-4 py-3 focus:border-amber-500 focus:outline-none transition-colors"
                      value={form.direccion}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                      Notas adicionales
                    </label>
                    <textarea
                      name="notas"
                      placeholder="¿Alguna indicación especial?"
                      rows="3"
                      className="w-full border-2 border-amber-200 rounded-lg px-4 py-3 focus:border-amber-500 focus:outline-none transition-colors resize-none"
                      value={form.notas}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Columna derecha: Resumen */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-amber-900 mb-6">
                  Resumen
                </h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-amber-200">
                  <div className="flex justify-between text-amber-800">
                    <span>Subtotal</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-amber-800">
                    <span>Envío</span>
                    <span className="font-semibold text-green-600">Gratis</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold text-amber-900 mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-amber-800 hover:bg-amber-900 text-white py-4 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl mb-3"
                >
                  Confirmar Pedido
                </button>

                <div className="bg-amber-50 rounded-lg p-4 text-sm text-amber-800">
                  <p className="flex items-start gap-2">
                    <span>⏱️</span>
                    <span>Tiempo estimado de entrega: <strong>30-45 min</strong></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}