import { useEffect, useRef } from "react";
import { useChat } from "../store/chat";
import { useAuth } from "../store/auth";

export default function MessageList() {
  const { selectedUserId, messagesByUser } = useChat();
  const { user } = useAuth();
  const listRef = useRef<HTMLDivElement>(null);

  const msgs = (selectedUserId ? messagesByUser[selectedUserId] : []) || [];

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs.length]);

  return (
    <div
      ref={listRef}
      style={{ padding: 16, overflowY: "auto", height: "calc(100vh - 120px)" }}
    >
      {msgs.map((m) => (
        <div
          key={m.id}
          style={{
            marginBottom: 12,
            display: "flex",
            justifyContent: m.from === user?.id ? "flex-end" : "flex-start",
          }}
        >
          <div
            style={{
              maxWidth: 420,
              border: "1px solid #eee",
              padding: 8,
              borderRadius: 8,
            }}
          >
            {m.content && (
              <div style={{ whiteSpace: "pre-wrap" }}>{m.content}</div>
            )}
            {m.imageUrl && (
              <div>
                <img
                  src={m.imageUrl}
                  alt="uploaded"
                  style={{ maxWidth: "100%", borderRadius: 6 }}
                />
              </div>
            )}
            <div style={{ fontSize: 12, color: "#777" }}>
              {new Date(m.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}