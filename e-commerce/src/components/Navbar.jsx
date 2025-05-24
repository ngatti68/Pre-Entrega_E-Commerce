import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar({ carrito, mostrarCarrito, toggleCarrito }) {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Inicio
      </NavLink>
      <NavLink
        to="/productos"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Productos
      </NavLink>
      <NavLink
        to="/acerca-de"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Acerca de
      </NavLink>
      <NavLink
        to="/contactos"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Contacto
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        <i className="fas fa-user"></i>
      </NavLink>

      <button onClick={toggleCarrito} className="boton-carrito">
        <i className="fas fa-shopping-cart"></i> ({carrito.length})
        <i
          className={mostrarCarrito ? "fas fa-times" : "fas fa-chevron-down"}
        ></i>
      </button>

      {mostrarCarrito && (
        <div className="carrito-dropdown">
          {carrito.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <ul>
              {carrito.map((producto) => (
                <li key={producto.id}>
                  {producto.nombre} - ${producto.precio} ({producto.cantidad})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
