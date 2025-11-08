import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/productos")
      .then(res => setProductos(res.data.productos))
      .catch(err => console.error(err));
  }, []);

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h2>🍕 Nuestras Pizzas</h2>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px"
      }}>
        {productos.map(p => (
          <ProductCard key={p[0]} producto={p} />
        ))}
      </div>
    </main>
  );
};

export default Home;
