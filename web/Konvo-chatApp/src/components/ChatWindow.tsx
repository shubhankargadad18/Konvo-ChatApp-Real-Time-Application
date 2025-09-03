import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChat } from "../store/chat";

export default function ChatWindow() {
  const { selectedUserId } = useChat();
  if (!selectedUserId) {
    return (
      <div style={{ display: "grid", placeItems: "center" }}>
        Select a user to start chatting.
      </div>
    );
  }
  return (
    <section style={{ display: "flex", flexDirection: "column" }}>
      <MessageList />
      <MessageInput />
    </section>
  );
}