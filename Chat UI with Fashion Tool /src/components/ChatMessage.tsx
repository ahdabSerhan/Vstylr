import React from 'react';
import { User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'products' | 'recommendation';
  content: string;
  image?: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser
              ? 'bg-primary text-primary-foreground ml-auto'
              : 'bg-muted text-foreground'
          }`}
        >
          {message.image && (
            <div className="mb-3">
              <img 
                src={message.image} 
                alt="Uploaded fashion photo" 
                className="max-w-full h-auto rounded-lg max-h-64 object-cover"
              />
            </div>
          )}
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        
        <div className={`text-xs text-muted-foreground mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-secondary-foreground" />
        </div>
      )}
    </div>
  );
}