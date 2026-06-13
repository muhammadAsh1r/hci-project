"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  Briefcase,
  FileSignature,
  MessageSquare,
  Paperclip,
  Search,
  Send,
  Smile,
  Trash2,
  User,
  UserPlus,
} from "lucide-react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EMOJI_OPTIONS } from "@/lib/client-messages-data";
import type { ClientConversation } from "@/lib/types/client-message";
import { cn } from "@/lib/utils";

interface ChatWindowProps {
  conversation: ClientConversation | null;
  isTyping: boolean;
  onSend: (message: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ChatWindow({
  conversation,
  isTyping,
  onSend,
  onArchive,
  onDelete,
}: ChatWindowProps) {
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [messageSearch, setMessageSearch] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);

  if (!conversation) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-muted/20 p-8 text-center">
        <MessageSquare className="size-12 text-muted-foreground/50" aria-hidden="true" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">Select a conversation</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose a freelancer from the list to start messaging
        </p>
      </div>
    );
  }

  const filteredMessages = messageSearch.trim()
    ? conversation.messages.filter((m) =>
        m.content.toLowerCase().includes(messageSearch.toLowerCase())
      )
    : conversation.messages;

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
    setShowEmoji(false);
  };

  const handleEmoji = (emoji: string) => {
    setInput((prev) => prev + emoji);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarFallback className="bg-gradient-to-br from-primary to-brand-secondary text-sm font-semibold text-primary-foreground">
              {conversation.freelancerAvatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{conversation.freelancerName}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {conversation.onlineStatus}
              {conversation.projectName ? ` · ${conversation.projectName}` : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search messages..."
              value={messageSearch}
              onChange={(e) => setMessageSearch(e.target.value)}
              className="h-8 w-40 rounded-lg border border-border bg-background pl-8 pr-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Search messages in conversation"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg"
            aria-label="Archive chat"
            onClick={() => setArchiveOpen(true)}
          >
            <Archive className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-muted-foreground hover:text-destructive"
            aria-label="Delete chat"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-border bg-muted/20 px-4 py-2">
        <SecondaryButton
          href={`/freelancers/${conversation.freelancerId}`}
          className="h-7 rounded-lg px-2 text-xs"
        >
          <User className="size-3" /> Profile
        </SecondaryButton>
        {conversation.contractId ? (
          <SecondaryButton
            href={`/client/contracts/${conversation.contractId}`}
            className="h-7 rounded-lg px-2 text-xs"
          >
            <FileSignature className="size-3" /> Contract
          </SecondaryButton>
        ) : null}
        {conversation.projectId ? (
          <SecondaryButton
            href={`/client/projects/${conversation.projectId}`}
            className="h-7 rounded-lg px-2 text-xs"
          >
            <Briefcase className="size-3" /> Project
          </SecondaryButton>
        ) : null}
        <SecondaryButton href="/client/hire" className="h-7 rounded-lg px-2 text-xs">
          <UserPlus className="size-3" /> Hire
        </SecondaryButton>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-label="Messages">
        <AnimatePresence initial={false}>
          {filteredMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex", msg.isOwn ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                  msg.isOwn
                    ? "rounded-tr-sm bg-primary text-primary-foreground"
                    : "rounded-tl-sm bg-muted text-foreground"
                )}
              >
                <p className="leading-relaxed">{msg.content}</p>
                {msg.attachments?.map((att) => (
                  <div
                    key={att.id}
                    className={cn(
                      "mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs",
                      msg.isOwn ? "bg-primary-foreground/10" : "bg-background"
                    )}
                  >
                    <Paperclip className="size-3.5 shrink-0" />
                    <span className="truncate">{att.name}</span>
                    <span className="opacity-70">{att.size}</span>
                  </div>
                ))}
                <div
                  className={cn(
                    "mt-1 flex items-center gap-1.5 text-[10px]",
                    msg.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}
                >
                  <span>{msg.timestamp}</span>
                  {msg.isOwn && (
                    <span aria-label={msg.read ? "Read" : "Sent"}>
                      {msg.read ? "✓✓" : "✓"}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-xs text-muted-foreground"
            aria-live="polite"
          >
            <span className="flex gap-1">
              <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
              <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
              <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
            </span>
            {conversation.freelancerName} is typing...
          </motion.div>
        )}
      </div>

      <div className="border-t border-border p-4">
        {showEmoji && (
          <div className="mb-2 flex flex-wrap gap-1 rounded-xl border border-border bg-card p-2">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleEmoji(emoji)}
                className="rounded-lg px-2 py-1 text-lg hover:bg-muted"
                aria-label={`Insert ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 shrink-0 rounded-xl"
            aria-label="Attach file"
            onClick={() => {}}
          >
            <Paperclip className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("size-9 shrink-0 rounded-xl", showEmoji && "bg-muted")}
            aria-label="Emoji picker"
            onClick={() => setShowEmoji((v) => !v)}
          >
            <Smile className="size-4" />
          </Button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="h-10 flex-1 rounded-xl border border-border bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Message input"
          />
          <PrimaryButton
            onClick={handleSend}
            disabled={!input.trim()}
            className="size-9 shrink-0 rounded-xl p-0"
            aria-label="Send message"
          >
            <Send className="size-4" />
          </PrimaryButton>
        </div>
      </div>

      <ConfirmDialog
        open={archiveOpen}
        onOpenChange={setArchiveOpen}
        title="Archive conversation?"
        description={`Archive your chat with ${conversation.freelancerName}. You can find archived chats later.`}
        confirmLabel="Archive"
        onConfirm={() => {
          onArchive(conversation.id);
          setArchiveOpen(false);
        }}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete conversation?"
        description="This will permanently delete all messages in this conversation."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => {
          onDelete(conversation.id);
          setDeleteOpen(false);
        }}
      />
    </div>
  );
}
