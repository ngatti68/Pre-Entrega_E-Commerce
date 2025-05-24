import { Link } from "react-router-dom";

function Pagina404() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🛑 404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" style={{ textDecoration: "none", color: "#3498db" }}>
        Volver al inicio
      </Link>
    </div>
  );
}

export default Pagina404;
