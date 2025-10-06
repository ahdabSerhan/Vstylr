import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, Send, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';

interface CompactChatInterfaceProps {
  onExpand: () => void;
  onMessageSend: (message: string) => void;
}

export function CompactChatInterface({ onExpand, onMessageSend }: CompactChatInterfaceProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onMessageSend(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleInputFocus = () => {
    // Auto-expand when user starts typing
    onExpand();
  };

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-6 bottom-6 z-50 bg-card border rounded-2xl shadow-xl p-4 w-80 max-w-[calc(100vw-3rem)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">VStylr</h3>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
                <span className="text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AI Mode
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Ask me anything about style!</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
          onClick={onExpand}
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick suggestions */}
      <div className="space-y-2 mb-4">
        <p className="text-xs text-muted-foreground">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7"
            onClick={() => {
              onMessageSend("Help me find a red dress");
            }}
          >
            🔴 Red dress
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7"
            onClick={() => {
              onMessageSend("What colors suit my skin tone?");
            }}
          >
            🎨 Color matching
          </Button>
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about styles, sizes, or trends..."
          onKeyPress={handleKeyPress}
          onFocus={handleInputFocus}
          className="flex-1 text-sm"
        />
        <Button
          onClick={handleSend}
          size="icon"
          className="shrink-0 w-9 h-9"
          disabled={!message.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}