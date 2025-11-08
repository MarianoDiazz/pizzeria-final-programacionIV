const ProductCard = ({ producto }) => {
  const [id, nombre, descripcion, precio, imagen_url] = producto;
  const mensaje = encodeURIComponent(`Hola! Quiero pedir una ${nombre} ($${precio}).`);
  const url = `https://wa.me/5493811234567?text=${mensaje}`;

  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "1rem",
      width: "250px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <img
        src={imagen_url}
        alt={nombre}
        style={{ width: "100%", borderRadius: "10px" }}
      />
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <p><b>${precio}</b></p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <button>🟢 Pedir por WhatsApp</button>
      </a>
    </div>
  );
};

export default ProductCard;
