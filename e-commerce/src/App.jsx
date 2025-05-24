import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import GaleriaDeProductos from "./pages/GaleriaDeProductos";
import AcercaDe from "./pages/AcercaDe";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Contactos from "./pages/Contactos";
import Pagina404 from "./pages/Pagina404";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [productoAgregado, setProductoAgregado] = useState(null);

  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  useEffect(() => {
    if (productoAgregado) {
      toast.dismiss();
      toast.success(`"${productoAgregado.nombre}" agregado al carrito!`);
      setProductoAgregado(null);
    }
  }, [productoAgregado]);

  const agregarAlCarrito = (producto) => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para agregar productos al carrito.");
      return;
    }

    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);

      if (existe && existe.cantidad >= producto.stock) {
        toast.error(
          `No puedes agregar más unidades de "${producto.nombre}", alcanzaste el límite de stock.`
        );
        return prevCarrito;
      }

      return existe
        ? prevCarrito.map((item) =>
            item.id === producto.id && item.cantidad < producto.stock
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        : [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.id === id
          ? {
              ...producto,
              cantidad: Math.max(1, Math.min(nuevaCantidad, producto.stock)),
            }
          : producto
      )
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    toast.info("El carrito ha sido vaciado.");
  };

  const eliminarProducto = (id) => {
    setCarrito(carrito.filter((producto) => producto.id !== id));
    toast.success("Producto eliminado del carrito.");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        newestOnTop={true}
      />

      <Router>
        <Header
          carrito={carrito}
          mostrarCarrito={mostrarCarrito}
          toggleCarrito={toggleCarrito}
        />
        <div className="contenedor-principal">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/acerca-de" element={<AcercaDe />} />
            <Route
              path="/productos"
              element={
                <GaleriaDeProductos
                  setProductoSeleccionado={setProductoSeleccionado}
                  agregarAlCarrito={agregarAlCarrito}
                  isAuthenticated={isAuthenticated}
                  carrito={carrito}
                />
              }
            />
            <Route
              path="/productos/:id"
              element={
                <Product
                  producto={productoSeleccionado}
                  agregarAlCarrito={agregarAlCarrito}
                />
              }
            />
            <Route path="/contactos" element={<Contactos />} />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/admin"
              element={isAuthenticated ? <Admin /> : <Navigate to="/login" />}
            />
            <Route
              path="/carrito"
              element={
                <Cart
                  carrito={carrito}
                  actualizarCantidad={actualizarCantidad}
                  vaciarCarrito={vaciarCarrito}
                  eliminarProducto={eliminarProducto}
                />
              }
            />
            <Route path="*" element={<Pagina404 />} />
          </Routes>
        </div>
        {mostrarCarrito && (
          <Cart
            carrito={carrito}
            actualizarCantidad={actualizarCantidad}
            vaciarCarrito={vaciarCarrito}
            eliminarProducto={eliminarProducto}
          />
        )}

        <Footer />
      </Router>
    </>
  );
}

export default App;
