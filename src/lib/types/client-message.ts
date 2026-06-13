export type OnlineStatus = "online" | "away" | "offline";

export interface MessageAttachment {
  id: string;
  name: string;
  size: string;
  type: string;
}

export interface ClientMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  sentAt: string;
  isOwn: boolean;
  read: boolean;
  attachments?: MessageAttachment[];
}

export interface ClientConversation {
  id: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerTitle: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  onlineStatus: OnlineStatus;
  projectId?: string;
  projectName?: string;
  contractId?: string;
  archived: boolean;
  messages: ClientMessage[];
}

export const CLIENT_MESSAGES_STORAGE_KEY = "freelanceai-client-messages";
export const CLIENT_ACTIVE_CONVERSATION_KEY = "freelanceai-client-active-conversation";
