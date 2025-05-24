import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/login.css";

function Login({ setIsAuthenticated }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (user === "admin" && password === "1234") {
      setIsAuthenticated(true);
      toast.success("¡Bienvenido, admin!", { position: "top-right" });
      navigate("/admin");
    } else {
      toast.error("Credenciales incorrectas. Intenta nuevamente.");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}

export default Login;
