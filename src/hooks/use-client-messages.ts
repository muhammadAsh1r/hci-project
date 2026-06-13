"use client";

import { useCallback, useEffect, useSyncExternalStore, useState } from "react";
import { SEED_CLIENT_CONVERSATIONS } from "@/lib/client-messages-data";
import {
  CLIENT_ACTIVE_CONVERSATION_KEY,
  CLIENT_MESSAGES_STORAGE_KEY,
  type ClientConversation,
  type ClientMessage,
} from "@/lib/types/client-message";

const listeners = new Set<() => void>();
let cache: { raw: string; data: ClientConversation[] } | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CLIENT_MESSAGES_STORAGE_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function notify() {
  listeners.forEach((cb) => cb());
}

function readConversations(): ClientConversation[] {
  if (typeof window === "undefined") return SEED_CLIENT_CONVERSATIONS;
  try {
    const raw = localStorage.getItem(CLIENT_MESSAGES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CLIENT_MESSAGES_STORAGE_KEY, JSON.stringify(SEED_CLIENT_CONVERSATIONS));
      return SEED_CLIENT_CONVERSATIONS;
    }
    const parsed = JSON.parse(raw) as ClientConversation[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_CLIENT_CONVERSATIONS;
  } catch {
    return SEED_CLIENT_CONVERSATIONS;
  }
}

function getSnapshot(): ClientConversation[] {
  const raw = localStorage.getItem(CLIENT_MESSAGES_STORAGE_KEY) ?? "";
  if (cache?.raw === raw) return cache.data;
  const data = readConversations();
  cache = { raw: JSON.stringify(data), data };
  return data;
}

function writeConversations(conversations: ClientConversation[]) {
  const raw = JSON.stringify(conversations);
  localStorage.setItem(CLIENT_MESSAGES_STORAGE_KEY, raw);
  cache = { raw, data: conversations };
  notify();
}

export function useClientMessages() {
  const conversations = useSyncExternalStore(subscribe, getSnapshot, () => SEED_CLIENT_CONVERSATIONS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CLIENT_ACTIVE_CONVERSATION_KEY);
    const convs = getSnapshot();
    const id =
      stored && convs.some((c) => c.id === stored)
        ? stored
        : convs.find((c) => !c.archived)?.id ?? null;
    setActiveId(id);
  }, []);

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;

  const visibleConversations = conversations.filter((c) => {
    if (c.archived) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.freelancerName.toLowerCase().includes(q) ||
      c.lastMessage.toLowerCase().includes(q) ||
      (c.projectName?.toLowerCase().includes(q) ?? false)
    );
  });

  const selectConversation = useCallback((id: string) => {
    setActiveId(id);
    localStorage.setItem(CLIENT_ACTIVE_CONVERSATION_KEY, id);
    const conv = getSnapshot().find((c) => c.id === id);
    if (conv && conv.unreadCount > 0) {
      writeConversations(
        getSnapshot().map((c) =>
          c.id === id
            ? {
                ...c,
                unreadCount: 0,
                messages: c.messages.map((m) => ({ ...m, read: true })),
              }
            : c
        )
      );
    }
  }, []);

  const sendMessage = useCallback(
    (content: string) => {
      if (!activeId || !content.trim()) return;
      const newMsg: ClientMessage = {
        id: `msg-${Date.now()}`,
        conversationId: activeId,
        senderId: "client",
        senderName: "Alex Rivera",
        content: content.trim(),
        timestamp: "Just now",
        sentAt: new Date().toISOString(),
        isOwn: true,
        read: true,
      };

      writeConversations(
        getSnapshot().map((c) =>
          c.id === activeId
            ? {
                ...c,
                lastMessage: content.trim(),
                timestamp: "Just now",
                messages: [...c.messages, newMsg],
              }
            : c
        )
      );

      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    },
    [activeId]
  );

  const archiveConversation = useCallback((id: string) => {
    writeConversations(
      getSnapshot().map((c) => (c.id === id ? { ...c, archived: true } : c))
    );
    if (activeId === id) {
      const next = getSnapshot().find((c) => !c.archived);
      setActiveId(next?.id ?? null);
    }
  }, [activeId]);

  const deleteConversation = useCallback((id: string) => {
    writeConversations(getSnapshot().filter((c) => c.id !== id));
    if (activeId === id) {
      const next = getSnapshot().find((c) => !c.archived);
      setActiveId(next?.id ?? null);
    }
  }, [activeId]);

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  return {
    conversations: visibleConversations,
    allConversations: conversations,
    activeConversation,
    activeId,
    selectConversation,
    sendMessage,
    archiveConversation,
    deleteConversation,
    searchQuery,
    setSearchQuery,
    isTyping,
    totalUnread,
  };
}
