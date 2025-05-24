import React from "react";

import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Tienda Online - Todos los derechos
        reservados.
      </p>
    </footer>
  );
}

export default Footer;
