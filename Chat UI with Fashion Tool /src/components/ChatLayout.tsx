import React, { useState } from 'react';
import { ChatSidebar } from './ChatSidebar';
import { ChatInterface } from './ChatInterface';
import { CarEnhancementInterface } from './CarEnhancementInterface';
import { GenericAssistantInterface } from './GenericAssistantInterface';
import { AssistantTabManager, Assistant } from './AssistantTabManager';
import { UserProfile } from './UserProfile';
import { Button } from './ui/button';
import { Menu, X, User, Car, Sparkles } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
  messages: Message[];
  assistantId: string; // Link conversation to specific assistant
}

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'products' | 'recommendation' | 'car-parts' | 'car-analysis' | 'image-upload';
  content: string;
  products?: Product[];
  recommendation?: Recommendation;
  parts?: any[];
  carAnalysis?: any;
  carImage?: string;
  timestamp: Date;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  sizes: string[];
  color: string;
  category: string;
  recommendedSize?: string;
}

interface Recommendation {
  title: string;
  advice: string;
  suggestedSizes: string[];
  styleNotes: string[];
}

// Initial assistant configurations
const initialAssistants: Assistant[] = [
  {
    id: 'fashion-assistant',
    name: 'Fashion Stylist',
    type: 'fashion',
    icon: '✨',
    description: 'Your personal fashion advisor for outfit recommendations and styling advice',
    initialMessage: "Hi! I'm your personal style assistant. I can help you find the perfect outfit, suggest sizes, and give you styling advice. What are you looking for today?",
    placeholder: "Ask about style, sizes, or describe what you're looking for...",
    color: '' // Removed color gradient for fashion stylist - now uses default styling
  }
  // Car Assistant - Hidden for now (uncomment lines below to show)
  // {
  //   id: 'car-assistant',
  //   name: 'Car Enhancement',
  //   type: 'car',
  //   icon: '🚗',
  //   description: 'AI-powered car modification and upgrade recommendations',
  //   initialMessage: "🚗 Hi! I'm your car enhancement assistant. I can help you upgrade and improve your vehicle with the perfect parts and modifications. Upload a photo of your car or describe what you'd like to enhance, and I'll provide personalized recommendations!",
  //   placeholder: "Describe what you want to enhance about your car...",
  //   color: 'from-blue-500 to-cyan-600'
  // }
];

const initialConversations: Conversation[] = [
  {
    id: '1',
    title: 'Summer Fashion Looks',
    lastMessage: "I found some beautiful dress options for you! Here are my top picks:",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    messageCount: 8,
    assistantId: 'fashion-assistant',
    messages: [
      {
        id: '1',
        type: 'assistant',
        content: "Hi! I'm your personal style assistant. I can help you find the perfect outfit, suggest sizes, and give you styling advice. What are you looking for today?",
        timestamp: new Date()
      }
    ]
  }
  // Car-related conversations - Hidden for now (uncomment to show)
  // {
  //   id: '2',
  //   title: 'Toyota Camry Performance Upgrades',
  //   lastMessage: "Perfect! Now let's enhance your Toyota Camry! Here are carefully selected upgrades that would significantly improve performance:",
  //   timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  //   messageCount: 12,
  //   assistantId: 'car-assistant',
  //   messages: [
  //     {
  //       id: '1',
  //       type: 'assistant',
  //       content: "🚗 Hi! I'm your car enhancement assistant. I can help you upgrade and improve your vehicle with the perfect parts and modifications. Upload a photo of your car or describe what you'd like to enhance, and I'll provide personalized recommendations!",
  //       timestamp: new Date()
  //     }
  //   ]
  // },
  // {
  //   id: '3',
  //   title: 'Honda Civic Styling Mods',
  //   lastMessage: "Here are some excellent performance upgrades that can boost your car's power and efficiency:",
  //   timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  //   messageCount: 6,
  //   assistantId: 'car-assistant', // Fixed - should be car-assistant not fashion-assistant
  //   messages: [
  //     {
  //       id: '1',
  //       type: 'assistant',
  //       content: "🚗 Hi! I'm your car enhancement assistant. I can help you upgrade and improve your vehicle with the perfect parts and modifications. Upload a photo of your car or describe what you'd like to enhance, and I'll provide personalized recommendations!",
  //       timestamp: new Date()
  //     }
  //   ]
  // }
];

interface ChatLayoutProps {
  initialMessage?: string | null;
  onClose?: () => void;
}

export function ChatLayout({ initialMessage, onClose }: ChatLayoutProps) {
  const [assistants, setAssistants] = useState<Assistant[]>(initialAssistants);
  const [activeAssistantId, setActiveAssistantId] = useState<string>('fashion-assistant');
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string>('1');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleNewConversation = () => {
    const activeAssistant = assistants.find(a => a.id === activeAssistantId) || assistants[0];
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      lastMessage: activeAssistant.initialMessage,
      timestamp: new Date(),
      messageCount: 1,
      assistantId: activeAssistantId,
      messages: [
        {
          id: '1',
          type: 'assistant',
          content: activeAssistant.initialMessage,
          timestamp: new Date()
        }
      ]
    };

    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  const handleAssistantSelect = (assistantId: string) => {
    setActiveAssistantId(assistantId);
    // Find or create a conversation for this assistant
    const assistantConversations = conversations.filter(c => c.assistantId === assistantId);
    if (assistantConversations.length > 0) {
      setActiveConversationId(assistantConversations[0].id);
    } else {
      // Create new conversation for this assistant
      handleNewConversation();
    }
  };

  const handleAssistantAdd = (assistant: Assistant) => {
    setAssistants(prev => [...prev, assistant]);
    setActiveAssistantId(assistant.id);
    // Create initial conversation for new assistant
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      lastMessage: assistant.initialMessage,
      timestamp: new Date(),
      messageCount: 1,
      assistantId: assistant.id,
      messages: [
        {
          id: '1',
          type: 'assistant',
          content: assistant.initialMessage,
          timestamp: new Date()
        }
      ]
    };
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  const handleAssistantUpdate = (updatedAssistant: Assistant) => {
    setAssistants(prev => prev.map(a => a.id === updatedAssistant.id ? updatedAssistant : a));
  };

  const handleAssistantDelete = (assistantId: string) => {
    if (assistants.length <= 1) return; // Don't allow deleting last assistant
    
    setAssistants(prev => prev.filter(a => a.id !== assistantId));
    // Remove conversations for this assistant
    setConversations(prev => prev.filter(c => c.assistantId !== assistantId));
    
    // Switch to another assistant if current was deleted
    if (activeAssistantId === assistantId) {
      const remainingAssistants = assistants.filter(a => a.id !== assistantId);
      if (remainingAssistants.length > 0) {
        handleAssistantSelect(remainingAssistants[0].id);
      }
    }
  };

  const handleConversationSelect = (id: string) => {
    setActiveConversationId(id);
    setIsMobileMenuOpen(false); // Close mobile menu when selecting conversation
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => {
      const filtered = prev.filter(conv => conv.id !== id);
      if (activeConversationId === id && filtered.length > 0) {
        setActiveConversationId(filtered[0].id);
      }
      return filtered;
    });
  };

  const handleUpdateConversation = (id: string, messages: Message[]) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === id) {
        const lastUserMessage = messages.filter(m => m.type === 'user').pop();
        const lastMessage = messages[messages.length - 1];
        
        return {
          ...conv,
          title: lastUserMessage ? lastUserMessage.content.substring(0, 40) : conv.title,
          lastMessage: lastMessage.content.substring(0, 60),
          timestamp: new Date(),
          messageCount: messages.length,
          messages,
          assistantId: conv.assistantId // Preserve assistant ID
        };
      }
      return conv;
    }));
  };

  const activeConversation = conversations.find(conv => conv.id === activeConversationId);
  const activeAssistant = assistants.find(a => a.id === activeAssistantId) || assistants[0];
  // Filter conversations by active assistant
  const filteredConversations = conversations.filter(conv => conv.assistantId === activeAssistantId);

  // Handle initial message from e-commerce site
  React.useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      // Create a new conversation with the initial message
      const activeAssistant = assistants.find(a => a.id === activeAssistantId) || assistants[0];
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: initialMessage.substring(0, 40),
        lastMessage: initialMessage,
        timestamp: new Date(),
        messageCount: 2,
        assistantId: activeAssistantId,
        messages: [
          {
            id: '1',
            type: 'assistant',
            content: activeAssistant.initialMessage,
            timestamp: new Date()
          },
          {
            id: '2',
            type: 'user',
            content: initialMessage,
            timestamp: new Date()
          }
        ]
      };

      setConversations(prev => [newConversation, ...prev]);
      setActiveConversationId(newConversation.id);
    }
  }, [initialMessage]);

  return (
    <div className="flex h-full bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <ChatSidebar
          conversations={filteredConversations}
          activeConversationId={activeConversationId}
          onConversationSelect={handleConversationSelect}
          onNewConversation={handleNewConversation}
          onDeleteConversation={handleDeleteConversation}
        />
      </div>

      {/* Mobile Menu Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <ChatSidebar
            conversations={filteredConversations}
            activeConversationId={activeConversationId}
            onConversationSelect={handleConversationSelect}
            onNewConversation={handleNewConversation}
            onDeleteConversation={handleDeleteConversation}
          />
        </SheetContent>
      </Sheet>
      
      <div className="flex-1 flex flex-col">
        {/* Assistant Tab Manager with Profile */}
        <AssistantTabManager
          assistants={assistants}
          activeAssistantId={activeAssistantId}
          onAssistantSelect={handleAssistantSelect}
          onAssistantUpdate={handleAssistantUpdate}
          onAssistantAdd={handleAssistantAdd}
          onAssistantDelete={handleAssistantDelete}
          onProfileClick={() => setIsProfileOpen(true)}
          onClose={onClose}
          mobileMenuTrigger={
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="bg-background/90 backdrop-blur border shadow-sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
            </Sheet>
          }
        />

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col min-h-0">
          {activeConversation && activeAssistant ? (
            // Use specific interfaces for built-in types, generic for custom
            activeAssistant.type === 'car' ? (
              <CarEnhancementInterface
                key={`car-${activeConversationId}`}
                initialMessages={activeConversation.messages}
                onMessagesUpdate={(messages) => handleUpdateConversation(activeConversationId, messages)}
              />
            ) : activeAssistant.type === 'fashion' ? (
              <ChatInterface
                key={`fashion-${activeConversationId}`}
                initialMessages={activeConversation.messages}
                onMessagesUpdate={(messages) => handleUpdateConversation(activeConversationId, messages)}
              />
            ) : (
              <GenericAssistantInterface
                key={`generic-${activeConversationId}`}
                assistant={activeAssistant}
                initialMessages={activeConversation.messages}
                onMessagesUpdate={(messages) => handleUpdateConversation(activeConversationId, messages)}
              />
            )
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No conversation selected</p>
            </div>
          )}
        </div>
      </div>
      
      {/* User Profile Modal */}
      <UserProfile 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </div>
  );
}