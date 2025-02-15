import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreState } from "../store/store";
import { fetchUsers } from "../features/users/usersSlice";

export default function DashboardPage() {
  const { users } = useSelector((state: StoreState) => state.users);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  console.log(users)
  return (
    <div>
      <h2>Dashboard</h2>

      <table className="striped">
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Roles</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr>
              <th scope="row">{user.email}</th>
              <td>{user.roles?.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
