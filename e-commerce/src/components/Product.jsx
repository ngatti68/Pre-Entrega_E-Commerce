import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../styles/product.css";

function Product({ producto }) {
  const { id } = useParams();
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className="producto-detalle">
      <h1>Detalle del producto : {id}</h1>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="producto-imagen-detalle"
      />
      <h2>{producto.nombre}</h2>
      <p>Precio: ${producto.precio}</p>
      <p>Stock disponible: {producto.stock}</p>
      <p>Descripción del Producto :</p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, nobis.
        Voluptate nulla aspernatur quas earum doloremque. Laborum quam debitis
        voluptatem facere a eos dicta ratione quis praesentium cumque. Ea,
        dolor!
      </p>
      <Link to="/productos">
        <button>Volver a la galería</button>
      </Link>
    </div>
  );
}

export default Product;
