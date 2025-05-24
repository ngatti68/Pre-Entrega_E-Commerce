import Navbar from "./Navbar";
import Cart from "./Cart";

function Header({ carrito, mostrarCarrito, toggleCarrito }) {
  return (
    <header className="header">
      <Navbar
        carrito={carrito}
        mostrarCarrito={mostrarCarrito}
        toggleCarrito={toggleCarrito}
      />

      {mostrarCarrito && <Cart carrito={carrito} />}
    </header>
  );
}

export default Header;
