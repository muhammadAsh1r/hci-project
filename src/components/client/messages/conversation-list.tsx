"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { ClientConversation } from "@/lib/types/client-message";
import { cn } from "@/lib/utils";

const statusColors = {
  online: "bg-green-500",
  away: "bg-amber-500",
  offline: "bg-muted-foreground/40",
};

interface ConversationListProps {
  conversations: ClientConversation[];
  activeId: string | null;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelect: (id: string) => void;
}

export function ConversationList({
  conversations,
  activeId,
  searchQuery,
  onSearchChange,
  onSelect,
}: ConversationListProps) {
  return (
    <div className="flex h-full flex-col border-r border-border">
      <div className="border-b border-border p-4">
        <h2 className="mb-3 text-lg font-semibold text-foreground">Messages</h2>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-9 rounded-xl pl-9"
            aria-label="Search conversations"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" role="list" aria-label="Conversations">
        {conversations.length === 0 ? (
          <p className="p-4 text-center text-sm text-muted-foreground">No conversations found</p>
        ) : (
          conversations.map((conv, index) => (
            <motion.button
              key={conv.id}
              type="button"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => onSelect(conv.id)}
              className={cn(
                "flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                activeId === conv.id && "bg-primary/5",
                conv.unreadCount > 0 && activeId !== conv.id && "bg-primary/[0.03]"
              )}
              role="listitem"
              aria-current={activeId === conv.id ? "true" : undefined}
            >
              <div className="relative shrink-0">
                <Avatar className="size-11">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-sm font-semibold text-primary-foreground">
                    {conv.freelancerAvatar}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={cn(
                    "absolute bottom-0 right-0 size-3 rounded-full border-2 border-card",
                    statusColors[conv.onlineStatus]
                  )}
                  aria-label={`${conv.freelancerName} is ${conv.onlineStatus}`}
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-medium text-foreground">{conv.freelancerName}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">{conv.timestamp}</span>
                </div>
                <p className="truncate text-xs text-muted-foreground">{conv.freelancerTitle}</p>
                <p className="mt-0.5 truncate text-sm text-muted-foreground">{conv.lastMessage}</p>
              </div>

              {conv.unreadCount > 0 ? (
                <Badge className="size-5 shrink-0 justify-center rounded-full p-0 text-[10px]">
                  {conv.unreadCount}
                </Badge>
              ) : null}
            </motion.button>
          ))
        )}
      </div>
    </div>
  );
}
