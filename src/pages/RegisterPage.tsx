import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth/AuthService";
import { Rol } from "../services/auth/AuthServiceInterface";
import { firebaseDatabaseService } from "../services/auth/firebase/FirebaseDatabaseService";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await authService.signUp(email, password);
      console.log("Usuario registrado:", userCredential.user);
      // Crear registro en BBDD con roles iniciales (admin: false)
      await firebaseDatabaseService.setUserRoles(userCredential.user.uid, {
        email: userCredential.user.email,
        roles: [Rol.ADMIN],
      });
      setSuccess("Registro exitoso. Redirigiendo al Dashboard...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error: any) {
      console.error("Error al registrarse:", error);
      setError(error.message);
    }
  };
  return (
    <form onSubmit={handleRegister}>
      <h2>Registrarse</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Registrarse</button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </form>
  );
}
