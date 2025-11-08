import { useState } from "react";
import axios from "axios";

const Admin = () => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen_url: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/productos", {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: parseFloat(form.precio),
        imagen_url: form.imagen_url
      });
      alert("Producto agregado correctamente 🍕");
      setForm({ nombre: "", descripcion: "", precio: "", imagen_url: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h2>Panel de Administración</h2>
      <form onSubmit={handleSubmit} style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "300px",
        margin: "auto"
      }}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
        <input name="precio" placeholder="Precio" type="number" value={form.precio} onChange={handleChange} required />
        <input name="imagen_url" placeholder="URL de imagen" value={form.imagen_url} onChange={handleChange} required />
        <button type="submit">Agregar Producto</button>
      </form>
    </main>
  );
};

export default Admin;
