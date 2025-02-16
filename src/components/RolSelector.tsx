import { useState } from "react";
import { Rol } from "../services/auth/AuthServiceInterface";
import { updateRoles } from "../services/firebase";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchUsers } from "../features/users/usersSlice";

export const RolSelector = ({ user, initActiveRoles }) => {
  const [roles, setRoles] = useState(initActiveRoles || []);
  const dispatch = useDispatch<AppDispatch>();

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const idx = roles.findIndex(([rol]) => rol === value)
    const newRoles = [...roles]
    if (idx !== -1) {
      newRoles[idx][1] = checked
    }else {
      newRoles.push([value, checked])
    }
    console.log(newRoles)
    setRoles(newRoles)
  };

  const handleButton = () => {
    const transformData = {}
    roles.forEach(([rol, value]) => {transformData[rol] = value})
    updateRoles(user.id, transformData)
    dispatch(fetchUsers())
  };

  return (
    <fieldset role="group">
      <details className="dropdown">
        <summary>{`Selecciona los roles...`}</summary>
        <ul>
          {Object.values(Rol)?.map((rol) => (
            <li key={rol}>
              <label>
                <input
                  type="checkbox"
                  value={rol}
                  checked={roles.some(([key, value]) => key === rol && value)}
                  onChange={handleCheckboxChange}
                />
                {rol.toLowerCase()}
              </label>
            </li>
          ))}
        </ul>
      </details>
      <button onClick={handleButton}>Cambiar Roles</button>
    </fieldset>
  );
};
