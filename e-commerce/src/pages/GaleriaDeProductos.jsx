import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

import "../styles/galeriaDeProductos.css";

function GaleriaDeProductos({
  setProductoSeleccionado,
  agregarAlCarrito,
  isAuthenticated,
  carrito,
}) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://6817bb0c5a4b07b9d1cd2005.mockapi.io/productos-ecommerce/productos"
    )
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("Error al cargar los productos");
        return respuesta.json();
      })
      .then((datos) => setProductos(datos))
      .catch((error) => {
        setError(error.message);        
      })

      .finally(() => setLoading(false));
  }, []);

  const handleAgregarAlCarrito = (producto) => {
    if (!isAuthenticated) {
      toast.warning("Debes iniciar sesión para comprar.");
      return;
    }

    const existe = carrito.find((item) => item.id === producto.id);
    if (existe && existe.cantidad >= producto.stock) {
      toast.error(
        `No puedes agregar más unidades de "${producto.nombre}", alcanzaste el límite de stock.`
      );
      return;
    }

    agregarAlCarrito(producto);
    toast.success(`"${producto.nombre}" agregado al carrito!`);
  };

  return (
    <div className="productos-container">
      <h2>Galería de Productos</h2>

      {loading ? (
        <div className="spinner-container">
          <p>Cargando productos...</p>
          <Loader />
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-mensaje">{error}</p>
        </div>
      ) : (
        <div className="productos-grid">
          {productos.map((producto) => (
            <div key={producto.id} className="producto-card">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="producto-imagen"
              />
              <h3>{producto.nombre}</h3>
              <p>Precio: ${producto.precio}</p>
              <p>Stock disponible: {producto.stock}</p>
              <div className="botones-container">
                <button onClick={() => handleAgregarAlCarrito(producto)}>
                  Agregar al carrito
                </button>
                <Link
                  to={`/productos/${producto.id}`}
                  onClick={() => setProductoSeleccionado(producto)}
                >
                  <button className="boton-estilizado">Ver más...</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GaleriaDeProductos;