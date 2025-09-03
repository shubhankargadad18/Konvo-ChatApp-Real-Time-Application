/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../store/auth";
import { useChat } from "../store/chat";
import { api } from "../api/client";
import { getSocket } from "../socket";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

export default function Chat({ onLogout }: { onLogout: () => void }) {
  const { token } = useAuth();
  const { selectedUserId, addMessage, setMessages } = useChat();
  const [users, setUsers] = useState<any[]>([]);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await api.get("/users");
      setUsers(data);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!token) return;
    const s = getSocket(token);
    socketRef.current = s;
    if (!s) return;

    s.on("message:new", (msg: any) => {
      const peer =
        msg.from === users.find((u) => u.id === msg.from)?.id
          ? msg.from
          : msg.from;
      const key = msg.from;
      const userKey =
        msg.from === selectedUserId
          ? selectedUserId!
          : msg.from === users.find((u) => u.id === msg.from)?.id
          ? msg.from
          : msg.from;
      addMessage(msg.from === selectedUserId ? selectedUserId! : msg.from, msg);
    });

    return () => {
      s.off("message:new");
    };
  }, [token, selectedUserId, users]);

  useEffect(() => {
    async function fetchHistory() {
      if (!selectedUserId) return;
      const { data } = await api.get(`/messages/with/${selectedUserId}`);
      setMessages(selectedUserId, data);
    }
    fetchHistory();
  }, [selectedUserId]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        height: "100vh",
      }}
    >
      <Sidebar users={users} onLogout={onLogout} />
      <ChatWindow />
    </div>
  );
}