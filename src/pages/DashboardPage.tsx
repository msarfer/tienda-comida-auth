import { useDispatch, useSelector } from "react-redux";
import { RolSelector } from "../components/RolSelector";
import { StoreState } from "../store/store";
import { useEffect } from "react";
import { fetchUsers } from "../features/users/usersSlice";

export default function DashboardPage() {
  const { users } = useSelector((state: StoreState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <table className="striped">
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Roles</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            const { id, email, roles } = user;
            const activeRoles = roles
              ? Object.entries(roles)?.filter(([_, value]) => value)
              : [];
            return (
              <tr key={id}>
                <th scope="row">{email}</th>
                <td>
                  <div style={{display: 'flex', gap: '1rem'}}>
                    {activeRoles?.map(([rol]) => (
                      <kbd style={{backgroundColor: '#017FC0', textTransform: 'capitalize'}} key={`${id}-${rol}`}>{rol.toLocaleLowerCase()}</kbd>
                    ))}
                  </div>
                </td>
                <td>
                  <RolSelector user={user} initActiveRoles={activeRoles}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
