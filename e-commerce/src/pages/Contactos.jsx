import { useState } from "react";

function Contactos() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const manejarCambio = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    alert(`Mensaje enviado por: ${formData.nombre}`);

    setFormData({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Contacto</h2>
      <form
        onSubmit={manejarEnvio}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "auto",
        }}
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={manejarCambio}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={manejarCambio}
          required
        />
        <textarea
          name="mensaje"
          placeholder="Escribe tu mensaje"
          value={formData.mensaje}
          onChange={manejarCambio}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Contactos;
