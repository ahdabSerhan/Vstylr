import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, Upload, Car, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { ProductCard } from "./ProductCard";
import { CarPartCard } from "./CarPartCard";
import { CarAnalysisCard } from "./CarAnalysisCard";
import { CarImageUpload } from "./CarImageUpload";
import { StyleRecommendation } from "./StyleRecommendation";
import { CompleteStyleCard } from "./CompleteStyleCard";
import { Assistant } from "./AssistantTabManager";

interface Message {
  id: string;
  type: "user" | "assistant" | "products" | "recommendation" | "complete-style" | "car-parts" | "car-analysis" | "image-upload";
  content: string;
  products?: any[];
  recommendation?: any;
  styleLook?: any;
  parts?: any[];
  carAnalysis?: any;
  carImage?: string;
  timestamp: Date;
}

interface GenericAssistantInterfaceProps {
  assistant: Assistant;
  initialMessages?: Message[];
  onMessagesUpdate?: (messages: Message[]) => void;
}

export function GenericAssistantInterface({
  assistant,
  initialMessages,
  onMessagesUpdate,
}: GenericAssistantInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(
    initialMessages || [
      {
        id: "1",
        type: "assistant",
        content: assistant.initialMessage,
        timestamp: new Date(),
      },
    ],
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    if (onMessagesUpdate) {
      onMessagesUpdate(messages);
    }
  }, [messages, onMessagesUpdate]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(input, assistant);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleImageUpload = (imageData: string, file: File) => {
    setShowImageUpload(false);
    
    // Add user message with image
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: `I've uploaded an image. Please analyze it and provide recommendations.`,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // For car assistants, use car analysis flow
    if (assistant.type === 'car') {
      // Simulate car analysis
      setTimeout(() => {
        const analysis = {
          make: "Toyota",
          model: "Camry",
          year: "2021",
          color: "Silver",
          licensePlate: "ABC123",
          bodyType: "Sedan",
          estimatedMileage: "45,000 miles",
          condition: "Good" as const,
          identifiedParts: ["Front Bumper", "Headlights", "Grille", "Hood", "Wheels", "Side Mirrors"],
          recommendedUpgrades: [
            "LED Headlight Upgrade for better visibility",
            "Cold Air Intake for improved performance", 
            "Sport Wheels for enhanced aesthetics",
            "Tinted Windows for privacy and UV protection"
          ]
        };

        const analysisMessage: Message = {
          id: Date.now().toString(),
          type: "car-analysis",
          content: `🔍 **Analysis Complete!** I've successfully analyzed your ${analysis.make} ${analysis.model}! Here are the details I extracted from your image:`,
          carAnalysis: analysis,
          carImage: imageData,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, analysisMessage]);
        setIsTyping(false);
      }, 2500);
    } else {
      // Generic image analysis response
      setTimeout(() => {
        const response: Message = {
          id: Date.now().toString(),
          type: "assistant",
          content: "I can see your image! Based on what I observe, here are my recommendations and suggestions tailored to your needs.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, response]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const generateResponse = (userInput: string, assistant: Assistant): Message => {
    const lowerInput = userInput.toLowerCase();

    // For VStylr assistants, use fashion-specific responses
    if (assistant.type === 'fashion') {
      return generateFashionResponse(lowerInput);
    }
    
    // For car assistants, use car-specific responses  
    if (assistant.type === 'car') {
      return generateCarResponse(lowerInput);
    }

    // For custom assistants, generate contextual responses
    return generateCustomResponse(lowerInput, assistant);
  };

  const generateFashionResponse = (lowerInput: string): Message => {
    if (lowerInput.includes("dress") || lowerInput.includes("formal")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content: "I'd love to help you find the perfect dress! For the best recommendations, could you tell me more about:\n\n• What occasion is this for?\n• What's your preferred style (elegant, casual, trendy)?\n• Any color preferences?\n• What size range should I focus on?",
        timestamp: new Date(),
      };
    }

    return {
      id: Date.now().toString(),
      type: "assistant",
      content: "I'm here to help with all your fashion needs! I can assist with:\n\n👗 **Outfit Recommendations** - Find perfect looks for any occasion\n📏 **Size Guidance** - Get the right fit every time\n🎨 **Style Advice** - Discover your personal style\n🛍️ **Shopping Help** - Find the best pieces for your wardrobe\n\nWhat would you like to explore today?",
      timestamp: new Date(),
    };
  };

  const generateCarResponse = (lowerInput: string): Message => {
    if (lowerInput.includes("performance") || lowerInput.includes("upgrade")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content: "Great choice! I can help you boost your car's performance. To provide the best recommendations:\n\n🚗 **Upload a photo** of your car for detailed analysis\n📝 **Tell me your goals** - more power, better handling, sound?\n🔧 **Budget range** - so I can suggest appropriate upgrades\n⚙️ **Current modifications** - what's already been done?\n\nWhat's your main performance goal?",
        timestamp: new Date(),
      };
    }

    return {
      id: Date.now().toString(),
      type: "assistant",
      content: "I'm here to help enhance your ride! I can assist with:\n\n🔧 **Performance Upgrades** - Exhaust, intake, ECU tuning\n💡 **Lighting Mods** - LED headlights, fog lights, underglow\n🎨 **Aesthetic Changes** - Body kits, wheels, wraps\n🔊 **Audio Systems** - Speakers, subwoofers, amplifiers\n⚙️ **Suspension** - Coilovers, springs, sway bars\n\nTell me what you'd like to improve, or upload a photo of your car for personalized recommendations!",
      timestamp: new Date(),
    };
  };

  const generateCustomResponse = (lowerInput: string, assistant: Assistant): Message => {
    // Generate contextual responses based on assistant type and user input
    const responses = [
      `As your ${assistant.name.toLowerCase()}, I'm here to help! Can you tell me more about what you're looking for?`,
      `I'd be happy to assist you with that! Based on my expertise in ${assistant.name.toLowerCase()}, here are some suggestions...`,
      `That's a great question! Let me help you with my knowledge in this area.`,
      `I understand what you're asking about. Here's how I can help as your ${assistant.name.toLowerCase()}...`
    ];

    return {
      id: Date.now().toString(),
      type: "assistant",
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
    };
  };

  const getAssistantIcon = () => {
    if (assistant.type === 'car') return <Car className="w-4 h-4 text-primary-foreground" />;
    if (assistant.type === 'fashion') return <Sparkles className="w-4 h-4 text-primary-foreground" />;
    return <Bot className="w-4 h-4 text-primary-foreground" />;
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 bg-gradient-to-r ${assistant.color} rounded-full flex items-center justify-center`}>
              <span className="text-sm">{assistant.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-medium">{assistant.name}</h1>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${assistant.color}/10 border border-current/20`}>
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${assistant.color} animate-pulse`}></div>
                  <span className={`text-xs font-medium bg-gradient-to-r ${assistant.color} bg-clip-text text-transparent`}>
                    AI Mode
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {assistant.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {(assistant.type === 'car' || assistant.name.toLowerCase().includes('image')) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowImageUpload(true)}
                className="hidden md:flex"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-3 md:px-6 min-h-0" ref={scrollAreaRef}>
        <div className="space-y-4 md:space-y-6 py-4 md:py-6">
          {messages.map((message) => (
            <div key={message.id}>
              <ChatMessage message={message} />

              {message.type === "image-upload" && (
                <div className="mt-4">
                  <Button
                    onClick={() => setShowImageUpload(true)}
                    className="w-full md:w-auto"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              )}

              {message.carAnalysis && message.carImage && (
                <div className="mt-4">
                  <CarAnalysisCard
                    carImage={message.carImage}
                    analysis={message.carAnalysis}
                  />
                </div>
              )}

              {message.parts && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {message.parts.map((part: any) => (
                    <CarPartCard
                      key={part.id}
                      part={part}
                      onSave={(partId) => console.log('Saved part:', partId)}
                    />
                  ))}
                </div>
              )}

              {message.products && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                  {message.products.map((product: any) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onTryOnComplete={() => {}}
                      onTryOnModalClose={() => {}}
                      onAnalysisComplete={() => {}}
                    />
                  ))}
                </div>
              )}

              {message.recommendation && (
                <div className="mt-4">
                  <StyleRecommendation recommendation={message.recommendation} />
                </div>
              )}

              {message.styleLook && (
                <div className="mt-4">
                  <CompleteStyleCard
                    styleLook={message.styleLook}
                    tryOnImages={{}}
                    onTryOnComplete={() => {}}
                    onTryOnModalClose={() => {}}
                    onAnalysisComplete={() => {}}
                    onStyleSave={() => {}}
                  />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 bg-gradient-to-r ${assistant.color} rounded-full flex items-center justify-center`}>
                <span className="text-sm">{assistant.icon}</span>
              </div>
              <div className="bg-muted rounded-lg px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CarImageUpload
              onImageUpload={handleImageUpload}
              onCancel={() => setShowImageUpload(false)}
            />
          </div>
        </div>
      )}

      {/* Input - Fixed at bottom */}
      <div className="border-t border-border px-3 md:px-6 py-3 md:py-4 shrink-0 bg-background">
        <div className="flex items-center gap-2 mb-2">
          <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gradient-to-r ${assistant.color}/5 border border-current/10`}>
            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${assistant.color} animate-pulse`}></div>
            <span className={`text-xs font-medium bg-gradient-to-r ${assistant.color} bg-clip-text text-transparent`}>
              AI-Powered {assistant.name}
            </span>
          </div>
        </div>
        <div className="flex gap-2 md:gap-3">
          {(assistant.type === 'car' || assistant.name.toLowerCase().includes('image')) && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowImageUpload(true)}
              className="shrink-0 md:hidden"
            >
              <Upload className="w-4 h-4" />
            </Button>
          )}
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={assistant.placeholder}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 text-sm md:text-base"
          />
          <Button onClick={handleSend} size="icon" className="shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}