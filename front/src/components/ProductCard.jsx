const ProductCard = ({ producto }) => {
  const [id, nombre, descripcion, precio, imagen_url] = producto;
  const mensaje = encodeURIComponent(
    `Hola! Quiero pedir una ${nombre} ($${precio}).`
  );
  const url = `https://wa.me/5493811234567?text=${mensaje}`;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 w-64 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={imagen_url}
        alt={nombre}
        className="rounded-xl mb-3 w-full h-40 object-cover"
      />
      <h3 className="text-lg font-semibold">{nombre}</h3>
      <p className="text-gray-600">{descripcion}</p>
      <p className="text-xl font-bold text-green-700 my-2">${precio}</p>
      <a
        href={`https://wa.me/5493811234567?text=Hola! Quiero pedir una ${nombre}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          🟢 Pedir por WhatsApp
        </button>
      </a>
    </div>
  );
};

export default ProductCard;
