import { Link } from "react-router-dom";
import "../styles/galeriaDeProductos.css";

function ProductList({ productos, setProductoSeleccionado }) {
  return (
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
          <button onClick={() => agregarAlCarrito(producto)}>
            Agregar al carrito
          </button>
          <Link
            to={`/productos/${producto.id}`}
            onClick={() => setProductoSeleccionado(producto)}
          >
            Ver más
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
