import React, { useState, useRef, useEffect } from "react";
import { Send, Car, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { CarPartCard } from "./CarPartCard";
import { CarAnalysisCard } from "./CarAnalysisCard";
import { CarImageUpload } from "./CarImageUpload";

interface CarPart {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  compatibility: string[];
  rating: number;
  reviews: number;
  buyUrl: string;
  specifications: string[];
  installationLevel: "Easy" | "Moderate" | "Professional";
}

interface CarAnalysis {
  make: string;
  model: string;
  year: string;
  color: string;
  licensePlate?: string;
  bodyType: string;
  estimatedMileage?: string;
  condition: "Excellent" | "Good" | "Fair" | "Needs Work";
  identifiedParts: string[];
  recommendedUpgrades: string[];
}

interface Message {
  id: string;
  type: "user" | "assistant" | "car-parts" | "car-analysis" | "image-upload";
  content: string;
  parts?: CarPart[];
  carAnalysis?: CarAnalysis;
  carImage?: string;
  timestamp: Date;
}

// Mock car parts data for different car models
const mockCarParts: Record<string, CarPart[]> = {
  "toyota_camry": [
    {
      id: "1",
      name: "LED Headlight Assembly",
      brand: "VLAND", 
      price: 289,
      image: "https://images.unsplash.com/photo-1551150441-649e0b074fe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBMRUQlMjBoZWFkbGlnaHRzJTIwYXV0b21vdGl2ZXxlbnwxfHx8fDE3NTg3MTQ0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Lighting",
      compatibility: ["Toyota Camry 2018-2023", "Camry Hybrid"],
      rating: 4.8,
      reviews: 1247,
      buyUrl: "https://amazon.com/vland-headlights",
      specifications: ["Plug & Play", "6000K White", "DOT Approved"],
      installationLevel: "Moderate"
    },
    {
      id: "2", 
      name: "Cold Air Intake System",
      brand: "K&N",
      price: 359,
      image: "https://images.unsplash.com/photo-1654267195844-0c42bc469da2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBhaXIlMjBpbnRha2UlMjBzeXN0ZW18ZW58MXx8fHwxNzU4NzE0NDk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Performance",
      compatibility: ["Toyota Camry 2018-2023"],
      rating: 4.7,
      reviews: 892,
      buyUrl: "https://knfilters.com/toyota-camry",
      specifications: ["+15 HP", "Reusable Filter", "Million Mile Warranty"],
      installationLevel: "Easy"
    },
    {
      id: "3",
      name: "Alloy Wheel Set (18\")",
      brand: "Enkei", 
      price: 1299,
      image: "https://images.unsplash.com/photo-1658058765281-0833dce61996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGxveSUyMHdoZWVscyUyMGNhciUyMHJpbXN8ZW58MXx8fHwxNzU4NzE0NDk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Wheels",
      compatibility: ["Toyota Camry 2015-2023"],
      rating: 4.9,
      reviews: 456,
      buyUrl: "https://enkei.com/wheels/camry",
      specifications: ["18x8.5\", +45 Offset", "Flow Formed", "19.2 lbs"],
      installationLevel: "Professional"
    }
  ],
  "honda_civic": [
    {
      id: "4",
      name: "Sport Exhaust System",
      brand: "Injen",
      price: 649,
      image: "https://images.unsplash.com/photo-1722078260099-961a157a46d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBleGhhdXN0JTIwc3lzdGVtJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzU4NzE0NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Exhaust",
      compatibility: ["Honda Civic 2016-2023", "Civic Type R"],
      rating: 4.6,
      reviews: 723,
      buyUrl: "https://injen.com/honda-civic",
      specifications: ["304 Stainless Steel", "+12 HP", "Deep Tone"],
      installationLevel: "Moderate"
    },
    {
      id: "5",
      name: "Carbon Fiber Front Lip",
      brand: "Seibon",
      price: 425,
      image: "https://images.unsplash.com/photo-1654742967873-0bfb6cd0e719?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJib24lMjBmaWJlciUyMGNhciUyMHBhcnRzfGVufDF8fHx8MTc1ODcxNDUwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Aero",
      compatibility: ["Honda Civic 2022-2023"],
      rating: 4.8,
      reviews: 234,
      buyUrl: "https://seibon.com/civic-lip",
      specifications: ["Real Carbon Fiber", "OEM Style", "Clear Coat"],
      installationLevel: "Moderate"
    }
  ],
  "bmw_3series": [
    {
      id: "6",
      name: "M Performance Grille",
      brand: "BMW",
      price: 899,
      image: "https://images.unsplash.com/photo-1758563920526-2f6006462533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCTVclMjBjYXIlMjBncmlsbGUlMjBmcm9udHxlbnwxfHx8fDE3NTg3MTQ1MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Exterior",
      compatibility: ["BMW 3 Series G20", "320i, 330i, M340i"],
      rating: 4.9,
      reviews: 567,
      buyUrl: "https://bmw.com/m-performance",
      specifications: ["Gloss Black", "OEM Quality", "Direct Replacement"],
      installationLevel: "Easy"
    }
  ]
};

interface CarEnhancementInterfaceProps {
  initialMessages?: Message[];
  onMessagesUpdate?: (messages: Message[]) => void;
}

export function CarEnhancementInterface({
  initialMessages,
  onMessagesUpdate,
}: CarEnhancementInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(
    initialMessages || [
      {
        id: "1",
        type: "assistant",
        content:
          "🚗 Hi! I'm your car enhancement assistant. I can help you upgrade and improve your vehicle with the perfect parts and modifications. Upload a photo of your car or describe what you'd like to enhance, and I'll provide personalized recommendations!",
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
      const response = generateResponse(input);
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
      content: "I've uploaded an image of my car. Please analyze it and suggest parts.",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate car analysis - First show analysis
    setTimeout(() => {
      const analysis = analyzeCarImage(imageData);
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
      
      // Show another typing indicator before parts recommendations
      setTimeout(() => {
        setIsTyping(true);
        
        // Then show parts recommendations after analysis
        setTimeout(() => {
          const partsResponse = generatePartsRecommendations(analysis);
          setMessages((prev) => [...prev, partsResponse]);
          setIsTyping(false);
        }, 2000);
      }, 1500);
    }, 2500);
  };

  const analyzeCarImage = (imageData: string): CarAnalysis => {
    // Mock analysis - in real app this would use AI/ML
    const mockAnalyses = [
      {
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
      },
      {
        make: "Honda",
        model: "Civic",
        year: "2022",
        color: "Blue",
        licensePlate: "XYZ789",
        bodyType: "Hatchback",
        estimatedMileage: "25,000 miles",
        condition: "Excellent" as const,
        identifiedParts: ["Front Bumper", "Fog Lights", "Grille", "Spoiler", "Alloy Wheels"],
        recommendedUpgrades: [
          "Sport Exhaust System for better sound",
          "Carbon Fiber Front Lip for aggressive look",
          "Performance Air Filter for engine efficiency"
        ]
      }
    ];
    
    return mockAnalyses[Math.floor(Math.random() * mockAnalyses.length)];
  };

  const generatePartsRecommendations = (analysis: CarAnalysis): Message => {
    const carKey = `${analysis.make.toLowerCase()}_${analysis.model.toLowerCase().replace(' ', '')}`;
    const parts = mockCarParts[carKey] || mockCarParts["toyota_camry"];
    
    return {
      id: Date.now().toString(),
      type: "car-parts",
      content: `🔧 **Perfect! Now let's enhance your ${analysis.make} ${analysis.model}!**\n\nBased on the analysis of your ${analysis.year} ${analysis.make} ${analysis.model} in ${analysis.color}, here are carefully selected upgrades that would significantly improve performance, aesthetics, and functionality:\n\n💡 Each part includes compatibility verification, installation difficulty, and direct purchase links from trusted retailers.`,
      parts: parts,
      timestamp: new Date(),
    };
  };

  const generateResponse = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase();

    if (
      lowerInput.includes("enhance") ||
      lowerInput.includes("upgrade") ||
      lowerInput.includes("improve") ||
      lowerInput.includes("modify")
    ) {
      return {
        id: Date.now().toString(),
        type: "image-upload",
        content: "Great! I'd love to help you enhance your car. To provide the best recommendations, I can analyze your vehicle in two ways:\n\n🔹 **Upload a photo** of your car for detailed analysis\n🔹 **Describe** what you want to change or improve\n\nWhich would you prefer?",
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("performance") ||
      lowerInput.includes("speed") ||
      lowerInput.includes("horsepower") ||
      lowerInput.includes("engine")
    ) {
      return {
        id: Date.now().toString(),
        type: "car-parts",
        content: "Here are some excellent performance upgrades that can boost your car's power and efficiency:",
        parts: [
          mockCarParts["toyota_camry"][1], // Cold Air Intake
          mockCarParts["honda_civic"][0], // Sport Exhaust
        ],
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("lights") ||
      lowerInput.includes("headlight") ||
      lowerInput.includes("led") ||
      lowerInput.includes("lighting")
    ) {
      return {
        id: Date.now().toString(),
        type: "car-parts",
        content: "Upgrade your car's lighting for better visibility and modern aesthetics:",
        parts: [mockCarParts["toyota_camry"][0]], // LED Headlights
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("wheels") ||
      lowerInput.includes("rims") ||
      lowerInput.includes("alloy")
    ) {
      return {
        id: Date.now().toString(),
        type: "car-parts",
        content: "Transform your car's appearance with these premium wheel options:",
        parts: [mockCarParts["toyota_camry"][2]], // Alloy Wheels
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("exterior") ||
      lowerInput.includes("body") ||
      lowerInput.includes("aesthetic") ||
      lowerInput.includes("looks")
    ) {
      return {
        id: Date.now().toString(),
        type: "car-parts",
        content: "Enhance your car's exterior styling with these popular modifications:",
        parts: [
          mockCarParts["honda_civic"][1], // Carbon Fiber Front Lip
          mockCarParts["bmw_3series"][0], // M Performance Grille
        ],
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("upload") ||
      lowerInput.includes("photo") ||
      lowerInput.includes("image") ||
      lowerInput.includes("picture")
    ) {
      return {
        id: Date.now().toString(),
        type: "image-upload",
        content: "Perfect! Upload a clear photo of your car and I'll analyze it to provide personalized recommendations.",
        timestamp: new Date(),
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: "assistant",
      content:
        "I'm here to help you enhance your car! I can assist with:\n\n🔧 **Performance Upgrades** - Exhaust, intake, ECU tuning\n💡 **Lighting Mods** - LED headlights, fog lights, underglow\n🎨 **Aesthetic Changes** - Body kits, wheels, wraps\n🔊 **Audio Systems** - Speakers, subwoofers, amplifiers\n⚙️ **Suspension** - Coilovers, springs, sway bars\n\nTell me what you'd like to improve, or upload a photo of your car for personalized recommendations!",
      timestamp: new Date(),
    };
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Car className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-medium">Car Enhancement Assistant</h1>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200/50">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse"></div>
                  <span className="text-xs font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    AI Mode
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Upgrade your ride with AI-powered recommendations
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowImageUpload(true)}
              className="hidden md:flex"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Car Photo
            </Button>
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
                    Upload Car Photo
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
                  {message.parts.map((part) => (
                    <CarPartCard
                      key={part.id}
                      part={part}
                      onSave={(partId) => console.log('Saved part:', partId)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Car className="w-4 h-4 text-primary-foreground" />
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
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-blue-200/30">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse"></div>
            <span className="text-xs font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              AI-Powered Car Assistant
            </span>
          </div>
        </div>
        <div className="flex gap-2 md:gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowImageUpload(true)}
            className="shrink-0 md:hidden"
          >
            <Upload className="w-4 h-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to enhance about your car..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 text-sm md:text-base"
          />
          <Button onClick={handleSend} size="icon" className="shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Car Image Upload Modal */}
      {showImageUpload && (
        <CarImageUpload
          onClose={() => setShowImageUpload(false)}
          onImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
}