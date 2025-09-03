import React, { useState } from "react";
import { useChat } from "../store/chat";
import { api } from "../api/client";

export default function MessageInput() {
  const { selectedUserId } = useChat();
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedUserId) return;
    const form = new FormData();
    form.append("to", selectedUserId);
    if (text) form.append("content", text);
    if (file) form.append("image", file);
    setSending(true);
    try {
      await api.post("/messages", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setText("");
      setFile(null);
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={send}
      style={{
        display: "flex",
        gap: 8,
        padding: 16,
        borderTop: "1px solid #ddd",
      }}
    >
      <input
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1 }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button type="submit" disabled={sending || (!text && !file)}>
        {sending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}