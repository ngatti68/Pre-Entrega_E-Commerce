import { toast } from "react-toastify";
import "../styles/cart.css";

const Cart = ({
  carrito,
  actualizarCantidad,
  vaciarCarrito,
  eliminarProducto,
}) => {
  const manejarActualizarCantidad = (producto, nuevaCantidad) => {
    console.log(
      `Nueva cantidad: ${nuevaCantidad}, Stock disponible: ${producto.stock}`
    );

    if (nuevaCantidad > producto.stock) {
      toast.error(
        `No puedes agregar más unidades de "${producto.nombre}", alcanzaste el límite de stock.`
      );
      return;
    }

    actualizarCantidad(producto.id, nuevaCantidad);
    toast.success(
      `Cantidad de ${producto.nombre} actualizada a ${nuevaCantidad}`
    );
  };

  const totalCarrito = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          {carrito.map((producto) => (
            <div key={producto.id} className="carrito-producto">
              <p>
                {producto.nombre} (${producto.precio})
              </p>

              <button
                className="boton-estilizado"
                onClick={() =>
                  manejarActualizarCantidad(
                    producto,
                    Math.max(1, producto.cantidad - 1)
                  )
                }
              >
                -
              </button>

              <input
                type="number"
                min="1"
                max={producto.stock}
                value={producto.cantidad}
                onChange={(e) =>
                  manejarActualizarCantidad(
                    producto,
                    Math.min(Number(e.target.value), producto.stock)
                  )
                }
                className="carrito-input"
              />

              <button
                className="boton-estilizado"
                onClick={() =>
                  manejarActualizarCantidad(producto, producto.cantidad + 1)
                }
              >
                +
              </button>

              <button
                className="boton-estilizado boton-eliminar"
                onClick={() => {
                  eliminarProducto(producto.id);
                  toast.error(`Producto ${producto.nombre} eliminado`);
                }}
              >
                Eliminar
              </button>
            </div>
          ))}

          <h3>Total: ${totalCarrito.toFixed(2)}</h3>
          <button
            className="boton-estilizado boton-vaciar"
            onClick={() => {
              vaciarCarrito();
              toast.info("Carrito vaciado correctamente");
            }}
          >
            Vaciar Carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
