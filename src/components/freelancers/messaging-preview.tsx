"use client";

import { MessageSquare, Paperclip, Send, Video } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockConversations } from "@/lib/freelancers-data";
import { cn } from "@/lib/utils";

interface MessagingPreviewProps {
  freelancerName: string;
  freelancerAvatar: string;
}

export function MessagingPreview({
  freelancerName,
  freelancerAvatar,
}: MessagingPreviewProps) {
  return (
    <section
      aria-labelledby="messaging-heading"
      className="overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="border-b border-border px-4 py-3">
        <h2 id="messaging-heading" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <MessageSquare className="size-4" aria-hidden="true" />
          Messaging Preview
        </h2>
      </div>

      <div className="grid sm:grid-cols-5">
        <div
          className="border-b border-border sm:border-b-0 sm:border-r"
          role="list"
          aria-label="Conversations"
        >
          {mockConversations.map((conv) => (
            <button
              key={conv.id}
              type="button"
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                conv.unread && "bg-primary/5"
              )}
              aria-label={`Conversation with ${conv.name}`}
            >
              <Avatar className="size-8">
                <AvatarFallback className="text-xs">{conv.avatar}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {conv.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {conv.lastMessage}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">{conv.time}</span>
            </button>
          ))}
        </div>

        <div className="col-span-3 flex flex-col sm:col-span-4">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Avatar className="size-8">
              <AvatarFallback className="text-xs">{freelancerAvatar}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium text-foreground">{freelancerName}</p>
          </div>

          <div className="flex-1 space-y-3 p-4" aria-label="Message preview">
            <div className="max-w-[80%] rounded-xl rounded-tl-sm bg-muted px-4 py-2 text-sm text-foreground">
              Hi! I&apos;m interested in your React project. Can we discuss the scope?
            </div>
            <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm bg-primary px-4 py-2 text-sm text-primary-foreground">
              Absolutely! I&apos;d love to help. When would you like to start?
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-border px-4 py-3">
            <Button variant="ghost" size="icon" className="size-8 rounded-lg" aria-label="Attach file">
              <Paperclip className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8 rounded-lg" aria-label="Start video call">
              <Video className="size-4" />
            </Button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Message input"
              readOnly
            />
            <Button size="icon" className="size-8 rounded-lg" aria-label="Send message">
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
