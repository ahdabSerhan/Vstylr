import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, Send, X, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingChatInputProps {
  onChatOpen: () => void;
  onMessageSend: (message: string) => void;
}

export function FloatingChatInput({ onChatOpen, onMessageSend }: FloatingChatInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onMessageSend(message);
      setMessage('');
      onChatOpen(); // Open full chat interface
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsMinimized(false)}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
        >
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <AnimatePresence>
        {!isExpanded ? (
          <motion.div
            key="collapsed"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex items-center gap-3"
          >
            {/* Quick suggestion bubbles */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden sm:flex flex-col gap-2"
            >
              <Button
                variant="outline"
                size="sm"
                className="bg-background/95 backdrop-blur text-sm shadow-md hover:shadow-lg transition-all duration-200 relative"
                onClick={() => {
                  onMessageSend("Help me find a dress for a wedding");
                  onChatOpen();
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
                    <span className="text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      AI
                    </span>
                  </div>
                  <span>Find a dress for wedding 👗</span>
                </div>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-background/95 backdrop-blur text-sm shadow-md hover:shadow-lg transition-all duration-200 relative"
                onClick={() => {
                  onMessageSend("Show me the new collection for try-on");
                  onChatOpen();
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
                    <span className="text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      AI
                    </span>
                  </div>
                  <span>Try on the new collection ✨</span>
                </div>
              </Button>
            </motion.div>

            <Button
              onClick={() => setIsExpanded(true)}
              className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <MessageCircle className="w-6 h-6 text-primary-foreground" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-card border rounded-2xl shadow-xl p-4 w-80 max-w-[calc(100vw-3rem)]"
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
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setIsMinimized(true)}
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setIsExpanded(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
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
                    setMessage("Help me find an outfit for a date night");
                  }}
                >
                  Date night outfit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => {
                    setMessage("What colors suit my skin tone?");
                  }}
                >
                  Color matching
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => {
                    setMessage("Show me sustainable fashion options");
                  }}
                >
                  Sustainable fashion
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
                className="flex-1 text-sm"
                autoFocus
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

            {/* Footer */}
            <div className="mt-3 text-center">
              <Button
                variant="link"
                size="sm"
                className="text-xs text-muted-foreground"
                onClick={onChatOpen}
              >
                Open full chat experience →
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}