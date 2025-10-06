import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar } from "./ui/avatar";
import { Bot, User, Send, Minimize2, Maximize2 } from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  sender: "user" | "ai";
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "ai",
    content: "Hello! I'm your AI Retail Agent. I can help you analyze customer feedback, inventory insights, and provide recommendations. What would you like to know?",
    timestamp: "10:30 AM"
  },
  {
    id: 2,
    sender: "user", 
    content: "What's the latest feedback on our size M dresses?",
    timestamp: "10:32 AM"
  },
  {
    id: 3,
    sender: "ai",
    content: "Based on recent customer data: 30% of size M shoppers are rejecting shiny fabric dresses, particularly satin finishes. They prefer matte textures. I recommend reducing satin inventory by 15% and promoting matte dress collections.",
    timestamp: "10:32 AM"
  }
];

interface AIChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AIChat({ isOpen, onToggle }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: messages.length + 2,
        sender: "ai",
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("stock") || lowerQuery.includes("inventory")) {
      return "Current inventory analysis: Size M items are critically low across all categories. I recommend increasing production by 200 units. Size XS and XXL are overstocked - consider promotional campaigns to clear inventory.";
    }
    
    if (lowerQuery.includes("feedback") || lowerQuery.includes("customer")) {
      return "Recent customer insights: 1) 30% of size M customers reject shiny fabrics 2) 67% prefer matte finishes 3) Red dress searches up 45% for weddings 4) Customers complain about sizing inconsistency in XL category.";
    }
    
    if (lowerQuery.includes("sales") || lowerQuery.includes("revenue")) {
      return "Sales performance: Total revenue $127.4K (+12.5% MoM). Top performing: Blue Denim Jeans ($11.3K), Classic White T-Shirt ($4.7K). Underperforming: Leather Jackets (declining trend).";
    }
    
    if (lowerQuery.includes("campaign") || lowerQuery.includes("email")) {
      return "Campaign opportunities: 384 customers abandoned carts with Size M items (potential $12K recovery). VIP customers haven't received targeted emails in 2 weeks. Seasonal sale campaign can target 890 seasonal shoppers.";
    }
    
    return "I can help you with inventory analysis, customer feedback insights, sales performance, and campaign recommendations. What specific area would you like to explore?";
  };

  if (!isOpen) return null;

  return (
    <Card className={`fixed bottom-4 right-4 w-96 bg-white shadow-2xl border-2 border-blue-100 z-50 transition-all duration-300 ${
      isMinimized ? "h-16" : "h-[500px]"
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-8 h-8 bg-blue-600">
              <Bot className="h-5 w-5 text-white" />
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-medium">AI Retail Agent</h3>
            <Badge variant="outline" className="text-xs">
              AI Mode Active
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onToggle}
          >
            ✕
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <ScrollArea className="h-80 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "ai" && (
                    <Avatar className="w-7 h-7 bg-blue-600 flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[80%] ${message.sender === "user" ? "order-1" : ""}`}>
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white ml-auto"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.content}
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${
                      message.sender === "user" ? "text-right" : "text-left"
                    }`}>
                      {message.timestamp}
                    </div>
                  </div>
                  
                  {message.sender === "user" && (
                    <Avatar className="w-7 h-7 bg-gray-600 flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about inventory, feedback, sales..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue("What's the current stock status?")}
                className="text-xs"
              >
                Stock Status
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue("Show me customer feedback trends")}
                className="text-xs"
              >
                Customer Feedback
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}