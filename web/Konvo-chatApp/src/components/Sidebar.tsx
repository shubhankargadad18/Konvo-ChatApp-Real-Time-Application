/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChat } from "../store/chat";

export default function Sidebar({
  users,
  onLogout,
}: {
  users: any[];
  onLogout: () => void;
}) {
  const { selectedUserId, setSelectedUser } = useChat();
  return (
    <aside
      style={{ borderRight: "1px solid #ddd", padding: 16, overflow: "auto" }}
    >
      <h3>Users</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((u) => (
          <li key={u.id}>
            <button
              style={{
                background: selectedUserId === u.id ? "#f0f0f0" : "transparent",
                width: "100%",
                textAlign: "left",
                padding: 8,
              }}
              onClick={() => setSelectedUser(u.id)}
            >
              {u.name} <small>({u.email})</small>
            </button>
          </li>
        ))}
      </ul>
      <button onClick={onLogout} style={{ marginTop: 16 }}>
        Logout
      </button>
    </aside>
  );
}