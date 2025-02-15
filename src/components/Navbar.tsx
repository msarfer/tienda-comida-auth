import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { authService } from "../services/auth/AuthService";
import logger from "../services/logging";

export const Navbar = () => {
  const {user, roles} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await authService.signOut()
      navigate('/login')
    } catch (error) {
      logger.error(`Error al cerrar la sesión: ${error}`)
    }
  }
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'><strong>Comida Rápida</strong></Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/stock">Stock</Link>
          </li>
          <li>
            <Link to="/orders">Pedidos</Link>
          </li>
          { user && <li><Link to="/dashboard">Dashboard</Link></li>}
          {!user && <li><Link to="/login">Login</Link></li>}
          {!user && <li><Link to="/register">Registro</Link></li>}
          {user && <li><button onClick={handleLogout}>Logout</button></li>}
        </ul>
      </nav>
    </header>
  );
};
