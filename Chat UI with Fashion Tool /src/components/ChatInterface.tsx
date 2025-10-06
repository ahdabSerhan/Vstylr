import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { ProductCard } from "./ProductCard";
import { StyleRecommendation } from "./StyleRecommendation";
import { CompleteStyleCard } from "./CompleteStyleCard";
import { FashionImageUpload } from "./FashionImageUpload";
import { EnhancedFashionAnalysis } from "./EnhancedFashionAnalysis";
import { useFashionAnalysis } from "./hooks/useFashionAnalysis";
import { PurchasePrompt } from "./PurchasePrompt";
import { PurchaseConfirmation } from "./PurchaseConfirmation";

interface StyleLook {
  id: string;
  title: string;
  description: string;
  occasion: string;
  totalPrice: number;
  items: Product[];
  mainItem: Product;
}

interface Message {
  id: string;
  type:
    | "user"
    | "assistant"
    | "products"
    | "recommendation"
    | "complete-style"
    | "fashion-analysis"
    | "purchase-prompt"
    | "purchase-confirmation";
  content: string;
  products?: Product[];
  recommendation?: Recommendation;
  styleLook?: StyleLook;
  image?: string;
  timestamp: Date;
  fashionAnalysis?: {
    personalAnalysis: any;
    styleRecommendations: any;
  };
  purchaseData?: {
    product: Product;
    selectedSize?: string;
    requestingAddress?: boolean;
    shippingAddress?: {
      fullName: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    orderNumber?: string;
    estimatedDelivery?: string;
  };
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

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Elegant Red Dress",
    brand: "Revolve",
    price: 129,
    image:
      "https://is4.revolveassets.com/images/p4/n/z/AMAN-WD1348_V1.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Red",
    category: "Dresses",
    recommendedSize: "S",
  },
  {
    id: "2",
    name: "Party Red dress",
    brand: "Zara",
    price: 450,
    image:
      "https://static.zara.net/assets/public/5020/ed8e/b0214db4a5f9/925d23e3cfe3/02180280632-a1/02180280632-a1.jpg?ts=1757580124797&w=1280",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    color: "red",
    category: "dress",
    recommendedSize: "L",
  },
  {
    id: "3",
    name: "Adidas Track Pants",
    brand: "Adidas",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1715532098035-a343b26eaeaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZGlkYXMlMjBzd2VhdHBhbnRzfGVufDF8fHx8MTc1ODY1MDEwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Navy",
    category: "Pants",
    recommendedSize: "M",
  },
  {
    id: "4",
    name: "Classic White Sneakers",
    brand: "Adidas",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1578314921455-34dd4626b38d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzJTIwc2hvZXN8ZW58MXx8fHwxNzU4NTkxNjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sizes: [
      "7",
      "7.5",
      "8",
      "8.5",
      "9",
      "9.5",
      "10",
      "10.5",
      "11",
    ],
    color: "White",
    category: "Shoes",
    recommendedSize: "9",
  },
  {
    id: "5",
    name: "Black Leather Jacket",
    brand: "AllSaints",
    price: 295,
    image:
      "https://images.unsplash.com/photo-1606715791286-6e43e9838f44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGxlYXRoZXIlMjBqYWNrZXR8ZW58MXx8fHwxNzU4NjEzNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Black",
    category: "Jackets",
    recommendedSize: "L",
  },
  {
    id: "6",
    name: "High-Waisted Blue Jeans",
    brand: "Levi's",
    price: 98,
    image:
      "https://images.unsplash.com/photo-1713880442898-0f151fba5e16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwamVhbnMlMjBkZW5pbXxlbnwxfHx8fDE3NTg1ODExNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sizes: [
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
    ],
    color: "Blue",
    category: "Jeans",
    recommendedSize: "28",
  },
  {
    id: "7",
    name: "Classic White Blazer",
    brand: "Theory",
    price: 215,
    image:
      "https://images.unsplash.com/photo-1657846447142-77d301981276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGJsYXplciUyMGphY2tldHxlbnwxfHx8fDE3NTg2NTA0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "White",
    category: "Blazers",
    recommendedSize: "M",
  },
  {
    id: "8",
    name: "Black Ankle Boots",
    brand: "Dr. Martens",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1605732440685-d0654d81aa30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGJvb3RzJTIwc2hvZXN8ZW58MXx8fHwxNzU4NjUwNDk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sizes: [
      "6",
      "6.5",
      "7",
      "7.5",
      "8",
      "8.5",
      "9",
      "9.5",
      "10",
    ],
    color: "Black",
    category: "Boots",
    recommendedSize: "8",
  },
  {
    id: "9",
    name: "Cozy Beige Sweater",
    brand: "COS",
    price: 135,
    image:
      "https://images.unsplash.com/photo-1646270968802-6bad28659329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMHN3ZWF0ZXIlMjBrbml0d2VhcnxlbnwxfHx8fDE3NTg2NTA1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Beige",
    category: "Sweaters",
    recommendedSize: "M",
  },
  {
    id: "10",
    name: "Navy Pleated Skirt",
    brand: "Uniqlo",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1464170400324-dda9eb57e9ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXZ5JTIwYmx1ZSUyMHNraXJ0fGVufDF8fHx8MTc1ODY1MDUwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Navy",
    category: "Skirts",
    recommendedSize: "S",
  },
  {
    id: "11",
    name: "elegant Red Dress",
    brand: "Zara",
    price: 340,
    image:
      "https://images.asos-media.com/products/oh-polly-aldona-slinky-jersey-rose-detail-maxi-dress-in-scarlet-red/209121141-1-red?$n_1280w$&wid=1125&fit=constrain",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Red",
    category: "Dresses",
    recommendedSize: "M",
  },
  {
    id: "12",
    name: "Long Red dress",
    brand: "Zara",
    price: 550,
    image:
      "https://static.zara.net/assets/public/a6cc/1e80/d8ec41019083/f1f86e8ff6f8/02965278600-p/02965278600-p.jpg?ts=1753090023140&w=1280",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    color: "red",
    category: "dress",
    recommendedSize: "L",
  },
  {
    id: "13",
    name: "flowy or satin pants",
    brand: "Zara",
    price: 250,
    image:
      "https://static.zara.net/assets/public/c172/2a23/b0264d6281f5/fce723d6c58d/01478278610-p/01478278610-p.jpg?ts=1757521440890&w=1280",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    color: "purple",
    category: "pant",
    recommendedSize: "M",
  },
  {
    id: "14",
    name: "jeans",
    brand: "Zara",
    price: 280,
    image:
      "https://static.zara.net/assets/public/9c0a/27cc/79c34a17bca3/820d39a47432/00858815250-000-p/00858815250-000-p.jpg?ts=1754653002164&w=1280",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    color: "blue",
    category: "pant",
    recommendedSize: "M",
  },
  // Shoes and Accessories
  {
    id: "15",
    name: "Black Ankle Boots",
    brand: "Steve Madden",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1572550907105-dc3c8e55f5b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFua2xlJTIwYm9vdHMlMjBsZWF0aGVyfGVufDF8fHx8MTc1ODcxMTQ2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sizes: [
      "6",
      "6.5",
      "7",
      "7.5",
      "8",
      "8.5",
      "9",
      "9.5",
      "10",
    ],
    color: "black",
    category: "shoes",
    recommendedSize: "8",
  },
  {
    id: "16",
    name: "Gold Statement Necklace",
    brand: "Mejuri",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1733761013921-89d19f4a2194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwc3RhdGVtZW50JTIwbmVja2xhY2UlMjBqZXdlbHJ5fGVufDF8fHx8MTc1ODcxMTQ3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sizes: ["One Size"],
    color: "gold",
    category: "accessories",
    recommendedSize: "One Size",
  },
  {
    id: "17",
    name: "Leather Crossbody Bag",
    brand: "Marc Jacobs",
    price: 195,
    image:
      "https://images.unsplash.com/photo-1564842505181-8862a3b9b173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwY3Jvc3Nib2R5JTIwYmFnJTIwYnJvd258ZW58MXx8fHwxNzU4NzExNDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sizes: ["One Size"],
    color: "brown",
    category: "accessories",
    recommendedSize: "One Size",
  },
  {
    id: "18",
    name: "White Sneakers",
    brand: "Adidas",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1718882707232-a1c6a8484b0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3NTg2OTYwNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sizes: [
      "6",
      "6.5",
      "7",
      "7.5",
      "8",
      "8.5",
      "9",
      "9.5",
      "10",
    ],
    color: "white",
    category: "shoes",
    recommendedSize: "8",
  },
  {
    id: "19",
    name: "Silver Watch",
    brand: "Fossil",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1623998024112-74fd3267d19c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjB3YXRjaCUyMG1vZGVybnxlbnwxfHx8fDE3NTg3MTE0ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sizes: ["One Size"],
    color: "silver",
    category: "accessories",
    recommendedSize: "One Size",
  },
  {
    id: "20",
    name: "Heeled Sandals",
    brand: "Sam Edelman",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1689711880342-0cb516d7be0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudWRlJTIwaGVlbGVkJTIwc2FuZGFsc3xlbnwxfHx8fDE3NTg3MTE0ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sizes: [
      "6",
      "6.5",
      "7",
      "7.5",
      "8",
      "8.5",
      "9",
      "9.5",
      "10",
    ],
    color: "nude",
    category: "shoes",
    recommendedSize: "8",
  },
];

interface ChatInterfaceProps {
  initialMessages?: Message[];
  onMessagesUpdate?: (messages: Message[]) => void;
  onClose?: () => void;
}

export function ChatInterface({
  initialMessages,
  onMessagesUpdate,
  onClose,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(
    initialMessages || [
      {
        id: "1",
        type: "assistant",
        content:
          "Hi! I'm your personal style assistant. I can help you find the perfect outfit, suggest sizes, and give you styling advice. What are you looking for today?",
        timestamp: new Date(),
      },
    ],
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [productTryOnImages, setProductTryOnImages] = useState<
    Record<string, string>
  >({});
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isProcessingResponse, setIsProcessingResponse] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { generateComprehensiveAnalysis, isAnalyzing } =
    useFashionAnalysis();

  useEffect(() => {
    if (scrollAreaRef.current) {
      // Find the viewport element within the ScrollArea
      const viewport = scrollAreaRef.current.querySelector(
        '[data-slot="scroll-area-viewport"]',
      ) as HTMLElement;
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
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

  // Auto-respond to initial user messages (from floating chat input)
  useEffect(() => {
    if (initialMessages && initialMessages.length >= 2) {
      const lastMessage =
        initialMessages[initialMessages.length - 1];
      if (
        lastMessage.type === "user" &&
        !messages.find(
          (m) => m.id === `auto-response-${lastMessage.id}`,
        ) &&
        !isProcessingResponse
      ) {
        // Generate automatic response to the user's initial message
        setIsProcessingResponse(true);
        setTimeout(() => {
          setMessages((prev) => {
            const response = generateResponse(
              lastMessage.content,
              prev
            );
            response.id = `auto-response-${lastMessage.id}`;
            return [...prev, response];
          });
          setIsProcessingResponse(false);
        }, 1500);
      }
    }
  }, [initialMessages, isProcessingResponse]);

  const handleSend = async () => {
    if (!input.trim() || isProcessingResponse) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setIsProcessingResponse(true);

    // Simulate AI response
    setTimeout(() => {
      let response: Message;
      setMessages((prev) => {
        response = generateResponse(input, prev);
        return [...prev, response];
      });

      // Always reset typing and processing flags after the main response
      setIsTyping(false);
      setIsProcessingResponse(false);

      // If we showed products, add a purchase suggestion and then styling advice
      if (response && response.type === "products") {
        // First, add purchase suggestion for the first product
        setTimeout(() => {
          // Get the first product from the response
          const firstProduct = response.products?.[0];
          if (firstProduct) {
            const purchaseMessage: Message = {
              id: (Date.now() + 1).toString(),
              type: "purchase-prompt",
              content:
                "I think the first one from Evolve is so pretty and appropriate for you! 😍✨ Let me help you buy it - enter your shipping address below:",
              purchaseData: {
                product: firstProduct,
                requestingAddress: true,
              },
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, purchaseMessage]);
          }
        }, 1500);

        // Then add styling advice
        setTimeout(() => {
          const followUpMessage: Message = {
            id: (Date.now() + 2).toString(),
            type: "assistant",
            content:
              "✨ **Let's create your personal style profile!**\n\nTo give you the most accurate recommendations, I'd love to learn more about you. Could you share a photo of yourself? This will help me:\n\n• Analyze your body shape for perfect sizing\n• Determine your skin tone for ideal color matches\n• Assess your eye color for complementary palettes\n• Create a personalized style profile just for you\n\n📸 Simply upload or take a photo, and I'll provide tailored recommendations that are uniquely yours!\n\n*Your image is only used for styling analysis and kept completely private.*",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, followUpMessage]);
        }, 3500);
      }
    }, 1500);
  };

  const handleProductTryOn = (
    productId: string,
    userImage: string,
  ) => {
    setProductTryOnImages((prev) => ({
      ...prev,
      [productId]: userImage,
    }));
  };

  const handleImageUpload = async (imageUrl: string) => {
    // Add user message with the uploaded image
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: "Here's my photo for styling advice!",
      image: imageUrl,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setShowImageUpload(false);
    setIsTyping(true);

    // Generate image analysis and ask what they want to wear
    setTimeout(() => {
      const analysisResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "Perfect! 📸 I love your photo! Let me analyze your style and features...\n\n✨ **Style Analysis:**\n• I can see you have great fashion sense!\n• Your natural coloring would work beautifully with both warm and cool tones\n• Your body shape would look amazing in a variety of silhouettes\n• You have a lovely, confident style that we can definitely enhance\n\n👗 **Now, what would you like to wear?**\nTell me about the occasion or style you're looking for:\n• A casual everyday look?\n• Something elegant for a special event?\n• Professional attire for work?\n• A fun night out outfit?\n• Seasonal pieces for the current weather?\n\nI'll curate the perfect pieces just for you based on your photo and preferences! What sounds most appealing right now?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, analysisResponse]);
      setIsTyping(false);
    }, 2500);
  };

  const handleTryOnModalClose = (productId: string) => {
    // Remove the try-on image (used by clear button)
    setProductTryOnImages((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  const handleAnalysisComplete = (
    productId: string,
    analysisData: any,
  ) => {
    // Generate AI response with detailed analysis
    const product = mockProducts.find(
      (p) => p.id === productId,
    );
    if (!product) return;

    const analysisMessage: Message = {
      id: Date.now().toString(),
      type: "assistant",
      content: `Great! I've completed a comprehensive analysis of your 3D model. Here's what I found:\n\n**📏 Your Measurements:**\n• Height: ${analysisData.measurements.height}\n• Chest: ${analysisData.measurements.chest}\n• Waist: ${analysisData.measurements.waist}\n• Hips: ${analysisData.measurements.hips}\n• Shoulder Width: ${analysisData.measurements.shoulderWidth}\n\n**👤 Body Analysis:**\n• Body Shape: ${analysisData.bodyShape}\n• Skin Tone: ${analysisData.skinTone}\n• Eye Color: ${analysisData.eyeColor}\n\n**✨ Personalized Style Recommendations:**\n${analysisData.recommendedStyles.map((style: string, index: number) => `${index + 1}. ${style}`).join("\n")}\n\n**🎯 For the ${product.name}:**\nBased on your body analysis, I recommend size **${product.recommendedSize || "M"}** for the best fit. The ${analysisData.bodyShape.toLowerCase()} body shape will look fantastic in this style!\n\n**💫 Complete the Look:**\nWould you like me to suggest shoes and accessories to create a complete, coordinated outfit? I can recommend pieces that perfectly complement your ${product.name} and match your personal style!`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, analysisMessage]);
  };

  const handleTryOnSuccess = (
    product: Product,
    userImage: string,
  ) => {
    // When user keeps a try-on look, trigger purchase prompt
    setProductTryOnImages((prev) => ({
      ...prev,
      [product.id]: userImage,
    }));

    setTimeout(() => {
      const purchasePromptMessage: Message = {
        id: Date.now().toString(),
        type: "purchase-prompt",
        content: `✨ **You look absolutely stunning in the ${product.name}!**\n\nI can see this piece is perfect for you. Would you like to purchase it and make this amazing look yours?\n\n💫 **What happens next:**\n• Select your size\n• Provide shipping details\n• Get fast, secure delivery\n\n🛍️ Ready to add this gorgeous piece to your wardrobe?`,
        purchaseData: {
          product,
          requestingAddress: false,
        },
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, purchasePromptMessage]);
    }, 1500);
  };

  const handlePurchaseConfirm = () => {
    // Find the most recent purchase prompt
    const recentPurchasePrompt = messages
      .slice()
      .reverse()
      .find((m) => m.type === "purchase-prompt");
    if (
      recentPurchasePrompt &&
      recentPurchasePrompt.purchaseData
    ) {
      const addressRequestMessage: Message = {
        id: Date.now().toString(),
        type: "purchase-prompt",
        content: `🛍️ **Excellent choice!** Let's get your ${recentPurchasePrompt.purchaseData.product.name} ordered for you.\n\nI'll need your shipping information to complete the purchase. Please provide:\n\n📋 **Shipping Details:**\n• Full Name\n• Street Address\n• City, State, ZIP Code\n• Country\n\nYou can type it all in one message like:\n"John Smith, 123 Main St, New York, NY 10001, USA"\n\nOr just start typing and I'll guide you through each step! 📦`,
        purchaseData: {
          ...recentPurchasePrompt.purchaseData,
          requestingAddress: true,
        },
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, addressRequestMessage]);
    }
  };

  const generateResponse = (userInput: string, currentMessages: Message[]): Message => {
    const lowerInput = userInput.toLowerCase();

    if (
      lowerInput.includes("upload") ||
      lowerInput.includes("photo") ||
      lowerInput.includes("image") ||
      lowerInput.includes("picture")
    ) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "I'd love to help you with personalized styling! 📸 Upload a photo of yourself so I can give you tailored fashion advice based on your style, body type, and preferences. Click the upload button above or in the input area to get started!",
        timestamp: new Date(),
      };
    }

    // Specific response for wedding dress search
    if (
      lowerInput.includes("find a dress for wedding") ||
      lowerInput.includes("dress for wedding") ||
      lowerInput.includes("wedding dress")
    ) {
      return {
        id: Date.now().toString(),
        type: "products",
        content:
          "Perfect choice for a wedding! 💃🌹 Red dresses are stunning for wedding guests - elegant, sophisticated, and absolutely eye-catching. Here are my top red dress recommendations that will make you look fabulous at the celebration:",
        products: [
          mockProducts[20], // Red Evening Gown (index 20 = id "21")
          mockProducts[21], // Red Formal Wedding Guest Dress (index 21 = id "22")
          mockProducts[22], // Red Cocktail Party Dress (index 22 = id "23")
        ].filter(Boolean),
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("dress") ||
      lowerInput.includes("formal") ||
      lowerInput.includes("elegant") ||
      lowerInput.includes("special event") ||
      lowerInput.includes("date night") ||
      lowerInput.includes("evening")
    ) {
      return {
        id: Date.now().toString(),
        type: "products",
        content:
          "Gorgeous choice! 💃 Based on your photo, these elegant dresses would look absolutely stunning on you. I've selected pieces that complement your style and would make you feel confident and beautiful:",
        products: [
          mockProducts[0],
          mockProducts[1],
          mockProducts[10],
          mockProducts[11],
        ].filter(Boolean),
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("adidas") ||
      lowerInput.includes("pants") ||
      lowerInput.includes("sweatpants")
    ) {
      return {
        id: Date.now().toString(),
        type: "products",
        content:
          "Perfect! Here are some Adidas pants that would be great for you:",
        products: [mockProducts[2]].filter(Boolean),
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("jeans") ||
      lowerInput.includes("denim")
    ) {
      return {
        id: Date.now().toString(),
        type: "products",
        content:
          "Here are some perfect jeans that would look great on you:",
        products: [mockProducts[5], mockProducts[13]].filter(
          Boolean,
        ),
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("blazer") ||
      lowerInput.includes("professional") ||
      lowerInput.includes("work")
    ) {
      return {
        id: Date.now().toString(),
        type: "products",
        content:
          "Here are some professional blazer options perfect for work:",
        products: [mockProducts[6]].filter(Boolean),
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("boots") ||
      lowerInput.includes("ankle boots")
    ) {
      return {
        id: Date.now().toString(),
        type: "products",
        content:
          "Here are some stylish boot options that would complete your look:",
        products: [mockProducts[7]].filter(Boolean),
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("sweater") ||
      lowerInput.includes("knitwear") ||
      lowerInput.includes("cozy")
    ) {
      return {
        id: Date.now().toString(),
        type: "products",
        content:
          "Here are some cozy sweater options perfect for any season:",
        products: [mockProducts[8]].filter(Boolean),
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("skirt") ||
      lowerInput.includes("pleated")
    ) {
      return {
        id: Date.now().toString(),
        type: "products",
        content:
          "Here are some beautiful skirt options that would look amazing:",
        products: [mockProducts[9]].filter(Boolean),
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("jacket") ||
      lowerInput.includes("leather") ||
      lowerInput.includes("outerwear")
    ) {
      return {
        id: Date.now().toString(),
        type: "products",
        content:
          "I found some amazing jacket options for you! Here are my top picks:",
        products: [mockProducts[4]].filter(Boolean),
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("shoes") ||
      lowerInput.includes("sneakers") ||
      lowerInput.includes("footwear")
    ) {
      return {
        id: Date.now().toString(),
        type: "products",
        content:
          "Here are some stylish sneaker options perfect for you:",
        products: [mockProducts[3]].filter(Boolean),
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("casual") ||
      lowerInput.includes("everyday") ||
      lowerInput.includes("relaxed") ||
      lowerInput.includes("comfortable") ||
      lowerInput.includes("weekend")
    ) {
      return {
        id: Date.now().toString(),
        type: "products",
        content:
          "Perfect choice! 😊 Based on your style from the photo, here's a casual yet chic outfit combination that would look amazing on you. These pieces will keep you comfortable while looking effortlessly stylish:",
        products: [
          mockProducts[2],
          mockProducts[5],
          mockProducts[3],
          mockProducts[8],
        ].filter(Boolean),
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("business") ||
      lowerInput.includes("business casual") ||
      lowerInput.includes("professional") ||
      lowerInput.includes("work") ||
      lowerInput.includes("office")
    ) {
      return {
        id: Date.now().toString(),
        type: "products",
        content:
          "Excellent! 💼 From your photo, I can tell you'd look incredibly polished and professional in these pieces. This combination will give you confidence and command respect while staying true to your personal style:",
        products: [
          mockProducts[6],
          mockProducts[5],
          mockProducts[7],
          mockProducts[14],
        ].filter(Boolean),
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("winter") ||
      lowerInput.includes("cold") ||
      lowerInput.includes("warm") ||
      lowerInput.includes("cozy") ||
      lowerInput.includes("seasonal")
    ) {
      return {
        id: Date.now().toString(),
        type: "products",
        content:
          "Perfect timing! ❄️ Based on your photo, here's a cozy yet stylish winter outfit that would look amazing on you. These pieces will keep you warm while maintaining that effortless style I can see you already have:",
        products: [
          mockProducts[8],
          mockProducts[5],
          mockProducts[7],
          mockProducts[4],
        ].filter(Boolean),
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("outfit") ||
      lowerInput.includes("complete look")
    ) {
      return {
        id: Date.now().toString(),
        type: "products",
        content:
          "Here's a complete stylish outfit I've curated for you:",
        products: [
          mockProducts[8],
          mockProducts[9],
          mockProducts[7],
          mockProducts[6],
        ],
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("size") ||
      lowerInput.includes("fit") ||
      lowerInput.includes("recommend")
    ) {
      return {
        id: Date.now().toString(),
        type: "recommendation",
        content:
          "Here are my size and styling recommendations for you:",
        recommendation: {
          title: "Personal Size & Style Guide",
          advice:
            "Based on your preferences and current fashion trends, here are my personalized recommendations for the perfect fit.",
          suggestedSizes: [
            "Medium (M) for tops and dresses",
            "Large (L) for relaxed fit shirts",
            "Size 9 for shoes",
            "Size 28 for jeans",
          ],
          styleNotes: [
            "Layer pieces for versatility and style depth",
            "Mix textures like leather with cotton for interest",
            "Stick to a cohesive color palette with 2-3 main colors",
            "Invest in quality basics that can be styled multiple ways",
            "Consider your lifestyle when choosing fabrics and fits",
          ],
        },
        timestamp: new Date(),
      };
    }

    if (
      lowerInput.includes("everything") ||
      lowerInput.includes("full wardrobe")
    ) {
      return {
        id: Date.now().toString(),
        type: "products",
        content:
          "Here's a complete wardrobe selection with versatile pieces that work together:",
        products: [
          mockProducts[0],
          mockProducts[1],
          mockProducts[5],
          mockProducts[6],
          mockProducts[8],
          mockProducts[3],
        ].filter(Boolean),
        timestamp: new Date(),
      };
    }

    // Style completion responses
    if (
      lowerInput.includes("yes") ||
      lowerInput.includes("complete") ||
      lowerInput.includes("shoes") ||
      lowerInput.includes("accessories") ||
      lowerInput.includes("finish the look") ||
      lowerInput.includes("complete the look") ||
      lowerInput.includes("complete the style")
    ) {
      // Find the most recently tried on item to base the complete look on
      const triedOnProducts = Object.keys(productTryOnImages);
      if (triedOnProducts.length > 0) {
        const mainProductId =
          triedOnProducts[triedOnProducts.length - 1];
        const mainProduct = mockProducts.find(
          (p) => p.id === mainProductId,
        );

        if (mainProduct) {
          return generateCompleteStyleResponse(mainProduct);
        }
      }

      // Fallback to a general complete style
      return generateCompleteStyleResponse(mockProducts[0]);
    }

    // Check if this is a follow-up to image upload asking for more options
    if (
      lowerInput.includes("more") ||
      lowerInput.includes("other") ||
      lowerInput.includes("different") ||
      lowerInput.includes("else") ||
      lowerInput.includes("something else") ||
      lowerInput.includes("alternatives")
    ) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "Of course! 🎨 Based on your photo, here are some other styling directions we could explore:\n\n• **Smart Casual** - Elevated everyday pieces that are comfortable yet polished\n• **Trendy & Fun** - Current fashion-forward pieces with personality\n• **Classic & Timeless** - Investment pieces that never go out of style\n• **Bohemian Chic** - Flowy, artistic pieces with unique textures\n• **Sporty Luxe** - Athletic-inspired pieces elevated for everyday wear\n\nWhich direction sounds most appealing to you? Or tell me about a specific occasion you're dressing for!",
        timestamp: new Date(),
      };
    }

    // Handle questions about styling or fit
    if (
      lowerInput.includes("how") ||
      lowerInput.includes("style") ||
      lowerInput.includes("wear") ||
      lowerInput.includes("look good")
    ) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "Great question! 💫 From analyzing your photo, here are some personalized styling tips just for you:\n\n• **Color Palette**: You'd look stunning in both warm and cool tones - try rich jewel tones or soft pastels\n• **Silhouettes**: Your body shape would shine in both fitted and flowy pieces\n• **Proportions**: You can confidently wear high-waisted bottoms and cropped tops\n• **Layering**: Mix textures like denim with silk, or leather with cotton for visual interest\n\nWould you like me to show you specific pieces that incorporate these styling principles? What type of outfit are you most interested in trying?",
        timestamp: new Date(),
      };
    }

    // Handle \"I want to buy it\" and similar purchase expressions
    if (
      lowerInput.includes("i want to buy it") ||
      lowerInput.includes("want to buy it") ||
      lowerInput.includes("i want to buy") ||
      lowerInput.includes("want to buy") ||
      lowerInput.includes("buy it") ||
      lowerInput.includes("purchase it") ||
      lowerInput.includes("i'll take it") ||
      lowerInput.includes("take it") ||
      lowerInput.includes("buy this") ||
      lowerInput.includes("purchase this")
    ) {
      // Find the most recent product shown to the user
      const recentProductMessage = currentMessages
        .slice()
        .reverse()
        .find(
          (m) =>
            m.type === "products" &&
            m.products &&
            m.products.length > 0,
        );

      if (
        recentProductMessage &&
        recentProductMessage.products
      ) {
        const firstProduct = recentProductMessage.products[0];
        return {
          id: Date.now().toString(),
          type: "purchase-prompt",
          content: `🎉 **Amazing choice!** The ${firstProduct.name} by ${firstProduct.brand} is going to look absolutely stunning on you! ✨

💫 **Why you'll love it:**
• Perfect for your style and body type
• High-quality ${firstProduct.brand} craftsmanship  
• Versatile piece you can style multiple ways
• Great value at ${firstProduct.price}

🛍️ **Let's make it yours!** I just need your shipping details to get this gorgeous piece delivered to you:

📋 **Shipping Information:**
• Full Name
• Street Address  
• City, State, ZIP Code
• Country

You can type it all in one message like:
"Sarah Johnson, 456 Oak Ave, Los Angeles, CA 90210, USA"

📦 **Fast & secure delivery guaranteed!** Ready to complete your purchase?`,
          purchaseData: {
            product: firstProduct,
            requestingAddress: true,
          },
          timestamp: new Date(),
        };
      } else {
        // If no recent products, encourage them to browse first
        return {
          id: Date.now().toString(),
          type: "assistant",
          content:
            "I love your enthusiasm! 😍 To help you purchase the perfect item, could you tell me what you're interested in buying? \n\n✨ **I can show you:**\n• Elegant dresses for special occasions\n• Casual everyday outfits\n• Professional work attire\n• Seasonal pieces\n• Complete style looks\n\nWhat type of fashion item are you looking for? Once I show you some options, I'll be happy to help you purchase your favorites! 🛍️",
          timestamp: new Date(),
        };
      }
    }

    // Handle purchase flow responses
    if (
      lowerInput.includes("yes") &&
      (lowerInput.includes("buy") ||
        lowerInput.includes("purchase") ||
        lowerInput.includes("want it"))
    ) {
      // Check if there's a recent purchase prompt in the messages
      const recentPurchasePrompt = messages
        .slice()
        .reverse()
        .find((m) => m.type === "purchase-prompt");
      if (
        recentPurchasePrompt &&
        recentPurchasePrompt.purchaseData
      ) {
        return {
          id: Date.now().toString(),
          type: "purchase-prompt",
          content: `🛍️ **Excellent choice!** Let's get your ${recentPurchasePrompt.purchaseData.product.name} ordered for you.\n\nI'll need your shipping information to complete the purchase. Please provide:\n\n📋 **Shipping Details:**\n• Full Name\n• Street Address\n• City, State, ZIP Code\n• Country\n\nYou can type it all in one message like:\n"John Smith, 123 Main St, New York, NY 10001, USA"\n\nOr just start typing and I'll guide you through each step! 📦`,
          purchaseData: {
            ...recentPurchasePrompt.purchaseData,
            requestingAddress: true,
          },
          timestamp: new Date(),
        };
      }
    }

    // Handle shipping address input
    const addressPattern =
      /([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+)/;
    const addressMatch = userInput.match(addressPattern);

    if (
      addressMatch ||
      ((userInput.includes("st") ||
        userInput.includes("ave") ||
        userInput.includes("rd")) &&
        userInput.length > 20)
    ) {
      // Check if there's a recent purchase prompt requesting address
      const recentPurchasePrompt = messages
        .slice()
        .reverse()
        .find(
          (m) =>
            m.type === "purchase-prompt" &&
            m.purchaseData?.requestingAddress,
        );

      if (
        recentPurchasePrompt &&
        recentPurchasePrompt.purchaseData
      ) {
        const orderNumber = `ORD-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
        const deliveryDate = new Date();
        deliveryDate.setDate(
          deliveryDate.getDate() +
            Math.floor(Math.random() * 5) +
            2,
        ); // 2-7 days

        let shippingAddress;
        if (addressMatch) {
          shippingAddress = {
            fullName: addressMatch[1].trim(),
            address: addressMatch[2].trim(),
            city: addressMatch[3].trim(),
            state: addressMatch[4].trim(),
            zipCode: addressMatch[5].trim(),
            country: addressMatch[6]
              ? addressMatch[6].trim()
              : "USA",
          };
        } else {
          // Parse less structured address
          shippingAddress = {
            fullName: "Customer",
            address: userInput.trim(),
            city: "Your City",
            state: "State",
            zipCode: "ZIP",
            country: "USA",
          };
        }

        return {
          id: Date.now().toString(),
          type: "purchase-confirmation",
          content: `🎉 **Order Confirmed!** Your ${recentPurchasePrompt.purchaseData.product.name} is on its way!\n\n✅ **Order Summary:**\n• Product: ${recentPurchasePrompt.purchaseData.product.name}\n• Brand: ${recentPurchasePrompt.purchaseData.product.brand}\n• Price: ${recentPurchasePrompt.purchaseData.product.price}\n• Size: ${recentPurchasePrompt.purchaseData.product.recommendedSize || "M"}\n\n📦 **Shipping Details:**\n• Order #: ${orderNumber}\n• Estimated Delivery: ${deliveryDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}\n• Shipping Method: Standard (Free on orders over $50)\n\n📧 You'll receive a confirmation email with tracking information shortly.\n\n💫 Thank you for shopping with us! Your style is going to look absolutely amazing! ✨`,
          purchaseData: {
            ...recentPurchasePrompt.purchaseData,
            shippingAddress,
            orderNumber,
            estimatedDelivery:
              deliveryDate.toLocaleDateString(),
          },
          timestamp: new Date(),
        };
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: "assistant",
      content:
        "I'd love to help you find the perfect outfit! I can show you specific items and complete style combinations. Try asking me about:\n\n• 'Show me casual outfits'\n• 'I need business casual looks'\n• 'Winter outfit ideas'\n• 'Show me jeans and blazers'\n• 'Complete wardrobe essentials'\n• 'What size should I get?'\n\nWhat style are you looking for today?",
      timestamp: new Date(),
    };
  };

  const generateCompleteStyleResponse = (
    mainProduct: Product,
  ): Message => {
    let complementaryItems: Product[] = [];
    let occasion = "Casual";
    let title = "Complete Your Look";
    let description =
      "Perfect accessories and shoes to complement your style";

    // Generate complementary items based on the main product category
    if (mainProduct.category === "dress") {
      complementaryItems = [
        mockProducts.find((p) => p.id === "15") ||
          mockProducts[14], // Black Ankle Boots
        mockProducts.find((p) => p.id === "16") ||
          mockProducts[15], // Gold Statement Necklace
        mockProducts.find((p) => p.id === "17") ||
          mockProducts[16], // Leather Crossbody Bag
      ];
      occasion = "Evening Out";
      title = "Elegant Evening Look";
      description =
        "Complete your dress with sophisticated accessories";
    } else if (
      mainProduct.category === "pant" &&
      mainProduct.name.toLowerCase().includes("jean")
    ) {
      complementaryItems = [
        mockProducts.find((p) => p.id === "18") ||
          mockProducts[17], // White Sneakers
        mockProducts.find((p) => p.id === "19") ||
          mockProducts[18], // Silver Watch
        mockProducts.find((p) => p.id === "17") ||
          mockProducts[16], // Leather Crossbody Bag
      ];
      occasion = "Casual Weekend";
      title = "Casual Chic Style";
      description =
        "Perfect pieces for a relaxed yet stylish look";
    } else if (
      mainProduct.category === "blazer" ||
      mainProduct.name.toLowerCase().includes("blazer")
    ) {
      complementaryItems = [
        mockProducts.find((p) => p.id === "15") ||
          mockProducts[14], // Black Ankle Boots
        mockProducts.find((p) => p.id === "19") ||
          mockProducts[18], // Silver Watch
        mockProducts.find((p) => p.id === "17") ||
          mockProducts[16], // Leather Crossbody Bag
      ];
      occasion = "Business Professional";
      title = "Professional Power Look";
      description =
        "Elevate your professional style with these refined pieces";
    } else {
      // Default complementary items
      complementaryItems = [
        mockProducts.find((p) => p.id === "20") ||
          mockProducts[19], // Heeled Sandals
        mockProducts.find((p) => p.id === "16") ||
          mockProducts[15], // Gold Statement Necklace
        mockProducts.find((p) => p.id === "17") ||
          mockProducts[16], // Leather Crossbody Bag
      ];
      occasion = "Date Night";
      title = "Stylish Complete Look";
      description =
        "Finish your outfit with these perfect accessories";
    }

    const totalOriginalPrice = [
      mainProduct,
      ...complementaryItems,
    ].reduce((sum, item) => sum + item.price, 0);
    const bundleDiscount = Math.round(
      totalOriginalPrice * 0.15,
    ); // 15% bundle discount
    const totalPrice = totalOriginalPrice - bundleDiscount;

    const styleLook: StyleLook = {
      id: `style-${Date.now()}`,
      title,
      description,
      occasion,
      totalPrice,
      items: [mainProduct, ...complementaryItems],
      mainItem: mainProduct,
    };

    return {
      id: Date.now().toString(),
      type: "complete-style",
      content: `🎉 Perfect! I've curated a complete ${occasion.toLowerCase()} look for you! This coordinated outfit includes your ${mainProduct.name} plus carefully selected shoes and accessories that complement your style perfectly.\n\n✨ **Special Bundle Offer:** Save ${bundleDiscount} when you get the complete look!`,
      styleLook,
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
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-medium">
                  VStylr
                </h1>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
                  <span className="text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    AI Mode
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Your personal fashion advisor
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
              Upload Photo
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea
        className="flex-1 px-3 md:px-6 min-h-0"
        ref={scrollAreaRef}
      >
        <div className="space-y-4 md:space-y-6 py-4 md:py-6">
          {messages.map((message) => (
            <div key={message.id}>
              <ChatMessage message={message} />

              {message.products && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {message.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      tryOnImage={
                        productTryOnImages[product.id]
                      }
                      onTryOnComplete={handleProductTryOn}
                      onTryOnModalClose={handleTryOnModalClose}
                      onAnalysisComplete={
                        handleAnalysisComplete
                      }
                    />
                  ))}
                </div>
              )}

              {message.recommendation && (
                <div className="mt-4">
                  <StyleRecommendation
                    recommendation={message.recommendation}
                  />
                </div>
              )}

              {message.styleLook && (
                <div className="mt-4">
                  <CompleteStyleCard
                    styleLook={message.styleLook}
                    tryOnImages={productTryOnImages}
                    onTryOnComplete={handleProductTryOn}
                    onTryOnModalClose={handleTryOnModalClose}
                    onAnalysisComplete={handleAnalysisComplete}
                    onStyleSave={(styleId) =>
                      console.log("Style saved:", styleId)
                    }
                  />
                </div>
              )}

              {message.fashionAnalysis && (
                <div className="mt-4">
                  <EnhancedFashionAnalysis
                    personalAnalysis={
                      message.fashionAnalysis.personalAnalysis
                    }
                    styleRecommendations={
                      message.fashionAnalysis
                        .styleRecommendations
                    }
                  />
                </div>
              )}

              {message.type === "purchase-prompt" &&
                message.purchaseData && (
                  <div className="mt-4">
                    <PurchasePrompt
                      product={message.purchaseData.product}
                      requestingAddress={
                        message.purchaseData
                          .requestingAddress || false
                      }
                      onPurchaseConfirm={handlePurchaseConfirm}
                    />
                  </div>
                )}

              {message.type === "purchase-confirmation" &&
                message.purchaseData && (
                  <div className="mt-4">
                    <PurchaseConfirmation
                      purchaseData={message.purchaseData}
                    />
                  </div>
                )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
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

      {/* Input - Fixed at bottom */}
      <div className="border-t border-border px-3 md:px-6 py-3 md:py-4 shrink-0 bg-background">
        <div className="flex items-center gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-200/30">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
            <span className="text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Powered VStylr
            </span>
          </div>
        </div>
        <div className="flex gap-2 md:gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowImageUpload(true)}
            className="shrink-0 md:hidden h-8 w-8"
          >
            <Upload className="w-4 h-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about style, sizes, or describe what you're looking for..."
            onKeyPress={(e) =>
              e.key === "Enter" && handleSend()
            }
            className="flex-1 text-sm md:text-base"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <FashionImageUpload
              onImageUpload={handleImageUpload}
              onClose={() => setShowImageUpload(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}