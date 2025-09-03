import { create } from "zustand";

type Message = {
  id: string;
  from: string;
  to: string;
  content?: string;
  imageUrl?: string;
  createdAt: string;
};

type ChatState = {
  selectedUserId: string | null;
  messagesByUser: Record<string, Message[]>;
  setSelectedUser: (id: string | null) => void;
  setMessages: (userId: string, msgs: Message[]) => void;
  addMessage: (userId: string, msg: Message) => void;
};

export const useChat = create<ChatState>((set) => ({
  selectedUserId: null,
  messagesByUser: {},
  setSelectedUser(id) {
    set({ selectedUserId: id });
  },
  setMessages(userId, msgs) {
    set((s) => ({ messagesByUser: { ...s.messagesByUser, [userId]: msgs } }));
  },
  addMessage(userId, msg) {
    set((s) => ({
      messagesByUser: {
        ...s.messagesByUser,
        [userId]: [...(s.messagesByUser[userId] || []), msg],
      },
    }));
  },
}));