<p align="center">
  <h1>🍕 Pizzería Don Mariano — Sistema Web Fullstack</h1>
</p>
<p align="center">
  <b>Aplicación web completa con React + FastAPI + SQLite</b><br>
  Proyecto final de Programación IV — UTN
</p>

## 🚀 Descripción del Proyecto

Este proyecto consiste en un sistema web fullstack para la gestión de una pizzería.

Incluye:
* 👤 **Vista Cliente**
    * Listado de productos (pizzas) con imagen, descripción y precio
    * Carrito básico de compras
    * Formulario de finalización de pedido
    * Envío del pedido al backend
    * Confirmación del pedido con número de orden
    * Estilo moderno con TailwindCSS
* 👨‍💼 **Panel Administrador**
    * Crear, editar y eliminar productos
    * Crear categorías
    * Listado de pedidos
    * Cambio de estado del pedido (“Pendiente → En preparación → Listo → Enviado”)
    * SweetAlert2 para avisos visuales
    * Uso de Axios para comunicarse con el backend

## 🛠️ Tecnologías Utilizadas

* **🔹 Frontend**
    * React (Vite)
    * React Router
    * TailwindCSS
    * Axios
    * SweetAlert2
* **🔹 Backend**
    * FastAPI
    * SQLAlchemy
    * Pydantic
    * Uvicorn
    * CORS Middleware
* **🔹 Base de Datos**
    * SQLite (local, persistente y ligera)

## 🧩 Base de Datos — Tablas implementadas

**📁 1. Categorías**
`id`, `nombre`, `orden`

**📁 2. Productos**
`id`, `nombre`, `descripcion`, `precio`, `id_categoria`, `imagen_url`, `disponible`

**📁 3. Pedidos**
`id`, `cliente_nombre`, `cliente_telefono`, `total`, `estado`, `fecha`

**📁 4. Detalle Pedidos**
`id`, `id_pedido`, `id_producto`, `cantidad`, `precio_unitario`, `subtotal`

## 🔄 Flujo del Sistema

### 🧑‍🍳 Cliente

* 1️⃣ Ve el menú de pizzas
* 2️⃣ Agrega una o más al carrito
* 3️⃣ Completa formulario con nombre, teléfono y dirección
* 4️⃣ Confirma el pedido
* 5️⃣ El backend guarda el pedido y devuelve un número de orden
* 6️⃣ Se muestra una pantalla de confirmación al usuario

### 👨‍💼 Administrador

* 1️⃣ Crea categorías
* 2️⃣ Crea productos nuevos
* 3️⃣ Edita o elimina productos existentes
* 4️⃣ Visualiza lista de pedidos
* 5️⃣ Cambia su estado ("Pendiente", "En preparación", "Listo", "Enviado")

## 🧪 Endpoints Principales (FastAPI)

### 📦 Productos

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| GET | `/productos` | Listar productos |
| POST | `/productos` | Crear producto |
| PUT | `/productos/{id}` | Actualizar producto |
| DELETE | `/productos/{id}` | Eliminar producto |

### 🗂 Categorías

| Método | Ruta |
| :--- | :--- |
| GET | `/categorias` |
| POST | `/categorias` |

### 🧾 Pedidos

| Método | Ruta |
| :--- | :--- |
| GET | `/pedidos` |
| POST | `/pedidos` |
| PUT | `/pedidos/{id}/estado` |

## 💻 Cómo Ejecutar el Proyecto (Modo Desarrollo)

### 🟦 Backend (FastAPI)

```bash
cd Backend
uvicorn main:app --reload
La API quedará disponible en:

 [http://127.0.0.1:8000]

### 🟦 Backend (FastAPI)

cd Front
npm install
npm run dev