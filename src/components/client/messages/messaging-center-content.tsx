"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { ChatWindow } from "@/components/client/messages/chat-window";
import { ConversationList } from "@/components/client/messages/conversation-list";
import { EmptyState } from "@/components/shared/empty-state";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { useClientMessages } from "@/hooks/use-client-messages";
import { useToast } from "@/hooks/use-toast";

export function MessagingCenterContent() {
  const {
    conversations,
    activeConversation,
    activeId,
    selectConversation,
    sendMessage,
    archiveConversation,
    deleteConversation,
    searchQuery,
    setSearchQuery,
    isTyping,
  } = useClientMessages();
  const { showToast, ToastContainer } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 pb-24 sm:p-6 lg:p-8">
        <ListSkeleton count={4} />
      </div>
    );
  }

  if (conversations.length === 0 && !searchQuery) {
    return (
      <div className="p-8 pb-24">
        <EmptyState
          icon={MessageSquare}
          title="No messages yet"
          description="Start a conversation by messaging a freelancer from a proposal or contract."
          actionLabel="Review Proposals"
          actionHref="/client/proposals"
        />
      </div>
    );
  }

  return (
    <div className="mb-24 flex h-[calc(100vh-12rem)] flex-col lg:mx-4 lg:mb-8 lg:overflow-hidden lg:rounded-2xl lg:border lg:border-border lg:bg-card lg:shadow-sm">
      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <div className="h-64 shrink-0 lg:h-full lg:w-80 xl:w-96">
          <ConversationList
            conversations={conversations}
            activeId={activeId}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelect={selectConversation}
          />
        </div>
        <div className="min-h-0 flex-1">
          <ChatWindow
            conversation={activeConversation}
            isTyping={isTyping}
            onSend={(msg) => {
              sendMessage(msg);
              showToast("Message sent");
            }}
            onArchive={(id) => {
              archiveConversation(id);
              showToast("Conversation archived");
            }}
            onDelete={(id) => {
              deleteConversation(id);
              showToast("Conversation deleted", "info");
            }}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
