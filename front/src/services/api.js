import axios from "axios";

// 👉 Si querés, luego podés mover esto a un .env
const BASE_URL = "http://127.0.0.1:8000";

const API = axios.create({ baseURL: BASE_URL });

// --- Endpoints de alto nivel (facilitan el uso desde componentes) ---
export const getProductos = () => API.get("/productos");
export const createProducto = (data) => API.post("/productos", data);
export const deleteProducto = (id) => API.delete(`/productos/${id}`);

export const getCategorias = () => API.get("/categorias");
export const createCategoria = (data) => API.post("/categorias", data);

export const createPedido = (data) => API.post("/pedidos", data);

export default API;
