import React, { useState, useEffect, useRef } from 'react';
import { EcommerceHomepage } from './components/EcommerceHomepage';
import { ChatLayout } from './components/ChatLayout';
import { CompactChatInterface } from './components/CompactChatInterface';
import { MobileChatInterface } from './components/MobileChatInterface';
import { motion, AnimatePresence } from 'motion/react';
import { useIsMobile } from './components/ui/use-mobile';

export default function App() {
  const [chatMode, setChatMode] = useState<'closed' | 'compact' | 'expanded'>('compact');
  const [initialMessage, setInitialMessage] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const chatPanelRef = useRef<HTMLDivElement>(null);

  // Set initial chat mode - both start in compact but show different interfaces
  useEffect(() => {
    if (isMobile !== undefined) {
      setChatMode('compact');
    }
  }, [isMobile]);

  // Click outside to close chat (only on desktop)
  useEffect(() => {
    if (chatMode !== 'expanded' || isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (chatPanelRef.current && !chatPanelRef.current.contains(event.target as Node)) {
        handleChatClose();
      }
    };

    // Add event listener with a small delay to prevent immediate closure
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [chatMode, isMobile]);

  const handleChatOpen = () => {
    setChatMode('expanded');
  };

  const handleChatClose = () => {
    setChatMode('compact');
    setInitialMessage(null);
  };

  const handleMessageSend = (message: string) => {
    setInitialMessage(message);
    setChatMode('expanded');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Full Chat Panel - Shows in expanded mode */}
      <AnimatePresence>
        {chatMode === 'expanded' && (
          <motion.div 
            ref={chatPanelRef}
            className="w-full md:w-1/2 border-r bg-background shadow-xl z-50"
            initial={{ x: isMobile ? "0%" : "-100%", y: isMobile ? "100%" : "0%", opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ x: isMobile ? "0%" : "-100%", y: isMobile ? "100%" : "0%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChatLayout 
              initialMessage={initialMessage}
              onClose={handleChatClose}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* E-commerce Homepage - Always visible, adjusts width when chat is expanded */}
      <motion.div 
        className={`overflow-auto ${chatMode === 'expanded' ? (isMobile ? 'hidden' : 'md:w-1/2') : 'w-full'}`}
        initial={false}
        animate={{ 
          marginLeft: (chatMode === 'expanded' && !isMobile) ? 16 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <EcommerceHomepage onChatOpen={handleChatOpen} />
      </motion.div>

      {/* Chat Input Interface - Different for mobile vs desktop in compact mode */}
      {chatMode === 'compact' && (
        <>
          {/* Desktop: Compact chat interface (popup on left) */}
          {!isMobile && (
            <CompactChatInterface 
              onExpand={handleChatOpen}
              onMessageSend={handleMessageSend}
            />
          )}
          {/* Mobile: Bottom chat interface (expanded at bottom) */}
          {isMobile && (
            <MobileChatInterface 
              onExpand={handleChatOpen}
              onMessageSend={handleMessageSend}
            />
          )}
        </>
      )}
    </div>
  );
}