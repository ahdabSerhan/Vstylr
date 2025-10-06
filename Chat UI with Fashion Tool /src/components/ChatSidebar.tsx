import React from 'react';
import { Plus, MessageSquare, Edit2, Trash2, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string;
  onConversationSelect: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
}

export function ChatSidebar({ 
  conversations, 
  activeConversationId, 
  onConversationSelect, 
  onNewConversation,
  onDeleteConversation 
}: ChatSidebarProps) {
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4">
        <Button 
          onClick={onNewConversation}
          className="w-full justify-start gap-2 bg-sidebar-primary hover:bg-sidebar-primary/90"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Conversations List */}
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`group relative rounded-lg p-3 cursor-pointer transition-colors hover:bg-sidebar-accent ${
                activeConversationId === conversation.id 
                  ? 'bg-sidebar-accent' 
                  : ''
              }`}
              onClick={() => onConversationSelect(conversation.id)}
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-sidebar-foreground/60 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-sidebar-foreground line-clamp-1">
                    {truncateText(conversation.title, 25)}
                  </h3>
                  <p className="text-xs text-sidebar-foreground/60 line-clamp-1 mt-1">
                    {truncateText(conversation.lastMessage, 35)}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-sidebar-foreground/40">
                      {formatTimestamp(conversation.timestamp)}
                    </span>
                    <span className="text-xs text-sidebar-foreground/40">
                      {conversation.messageCount} msgs
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons - shown on hover */}
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="w-6 h-6 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle edit conversation title
                  }}
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="w-6 h-6 text-destructive/60 hover:text-destructive hover:bg-destructive/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conversation.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator className="bg-sidebar-border" />

      {/* Settings */}
      <div className="p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}