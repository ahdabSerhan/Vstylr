import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Plus, Edit2, Trash2, Car, Sparkles, Bot, Save, X, ChevronLeft, ChevronRight, User } from 'lucide-react';

export interface Assistant {
  id: string;
  name: string;
  type: 'fashion' | 'car' | 'custom';
  icon: string;
  description: string;
  initialMessage: string;
  placeholder: string;
  systemPrompt?: string;
  color: string;
}

interface AssistantTabManagerProps {
  assistants: Assistant[];
  activeAssistantId: string;
  onAssistantSelect: (id: string) => void;
  onAssistantUpdate: (assistant: Assistant) => void;
  onAssistantAdd: (assistant: Assistant) => void;
  onAssistantDelete: (id: string) => void;
  onProfileClick?: () => void;
  onClose?: () => void;
  mobileMenuTrigger?: React.ReactNode;
}

const predefinedAssistants: Omit<Assistant, 'id'>[] = [
  {
    name: 'Fashion Stylist',
    type: 'fashion',
    icon: 'Sparkles',
    description: 'Your personal fashion advisor for outfit recommendations and styling advice',
    initialMessage: "Hi! I'm your personal style assistant. I can help you find the perfect outfit, suggest sizes, and give you styling advice. What are you looking for today?",
    placeholder: "Ask about style, sizes, or describe what you're looking for...",
    color: 'from-pink-500 to-purple-600'
  },
  {
    name: 'Car Enhancement',
    type: 'car',
    icon: 'Car',
    description: 'AI-powered car modification and upgrade recommendations',
    initialMessage: "🚗 Hi! I'm your car enhancement assistant. I can help you upgrade and improve your vehicle with the perfect parts and modifications. Upload a photo of your car or describe what you'd like to enhance, and I'll provide personalized recommendations!",
    placeholder: "Describe what you want to enhance about your car...",
    color: 'from-blue-500 to-cyan-600'
  }
];

const customAssistantTypes = [
  { value: 'fitness', label: 'Fitness Trainer', icon: '💪', color: 'from-green-500 to-emerald-600' },
  { value: 'nutrition', label: 'Nutrition Coach', icon: '🥗', color: 'from-orange-500 to-yellow-600' },
  { value: 'travel', label: 'Travel Advisor', icon: '✈️', color: 'from-sky-500 to-blue-600' },
  { value: 'tech', label: 'Tech Support', icon: '🔧', color: 'from-purple-500 to-violet-600' },
  { value: 'cooking', label: 'Cooking Assistant', icon: '👨‍🍳', color: 'from-red-500 to-pink-600' },
  { value: 'finance', label: 'Financial Advisor', icon: '💰', color: 'from-emerald-500 to-green-600' },
  { value: 'learning', label: 'Learning Tutor', icon: '📚', color: 'from-indigo-500 to-purple-600' },
  { value: 'health', label: 'Health Coach', icon: '🏥', color: 'from-teal-500 to-cyan-600' },
  { value: 'custom', label: 'Custom Assistant', icon: '🤖', color: 'from-gray-500 to-slate-600' }
];

export function AssistantTabManager({
  assistants,
  activeAssistantId,
  onAssistantSelect,
  onAssistantUpdate,
  onAssistantAdd,
  onAssistantDelete,
  onProfileClick,
  onClose,
  mobileMenuTrigger
}: AssistantTabManagerProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAssistant, setEditingAssistant] = useState<Assistant | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [newAssistant, setNewAssistant] = useState<Omit<Assistant, 'id'>>({
    name: '',
    type: 'custom',
    icon: '🤖',
    description: '',
    initialMessage: '',
    placeholder: '',
    systemPrompt: '',
    color: 'from-gray-500 to-slate-600'
  });
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5); // Small threshold to avoid flicker
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = Math.min(200, scrollContainerRef.current.clientWidth * 0.8);
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 300); // Update buttons after scroll animation
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = Math.min(200, scrollContainerRef.current.clientWidth * 0.8);
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 300); // Update buttons after scroll animation
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateScrollButtons);
      window.addEventListener('resize', updateScrollButtons);
      return () => {
        scrollContainer.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
      };
    }
  }, [assistants]);

  const handleAddAssistant = () => {
    if (newAssistant.name.trim()) {
      const assistant: Assistant = {
        ...newAssistant,
        id: Date.now().toString()
      };
      onAssistantAdd(assistant);
      setNewAssistant({
        name: '',
        type: 'custom',
        icon: '🤖',
        description: '',
        initialMessage: '',
        placeholder: '',
        systemPrompt: '',
        color: 'from-gray-500 to-slate-600'
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditSave = () => {
    if (editingAssistant) {
      onAssistantUpdate(editingAssistant);
      setEditingAssistant(null);
    }
  };

  const handleQuickAdd = (template: Omit<Assistant, 'id'>) => {
    const assistant: Assistant = {
      ...template,
      id: Date.now().toString()
    };
    onAssistantAdd(assistant);
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'Sparkles': <Sparkles className="w-4 h-4" />,
      'Car': <Car className="w-4 h-4" />,
      'Bot': <Bot className="w-4 h-4" />
    };
    return iconMap[iconName] || <Bot className="w-4 h-4" />;
  };

  return (
    <div className="border-b border-border bg-background">
      <div className="flex items-center min-h-[72px] sm:min-h-[64px] h-18 sm:h-16 px-3 gap-2">
        {/* Mobile Menu Trigger */}
        {mobileMenuTrigger && (
          <div className="flex-shrink-0 md:hidden">
            {mobileMenuTrigger}
          </div>
        )}
        
        {/* Left Section: Scrollable Tabs */}
        <div className="flex items-center flex-1 min-w-0 mr-2 max-w-[calc(100vw-120px)] sm:max-w-[calc(100vw-280px)]">
          {/* Left Scroll Button */}
          <div className="flex-shrink-0">
            {canScrollLeft && (
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollLeft}
                className="mr-1 h-8 w-8 bg-background/80 backdrop-blur border"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Scrollable Tab Container */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-2 overflow-x-auto scrollbar-hide scroll-smooth py-2 sm:py-1 tab-scroll-container"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              onScroll={updateScrollButtons}
            >
              {assistants.map((assistant) => (
                <div key={assistant.id} className="flex-shrink-0">
                  <Button
                    variant={activeAssistantId === assistant.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onAssistantSelect(assistant.id)}
                    className={`flex items-center gap-2 relative group transition-all duration-200 whitespace-nowrap ${
                      assistant.type === 'fashion' 
                        ? 'h-12 sm:h-8 px-4 sm:px-2 text-lg sm:text-sm min-w-[140px] sm:min-w-fit' 
                        : 'h-10 sm:h-8 px-3 sm:px-2 min-w-fit'
                    } ${
                      activeAssistantId === assistant.id 
                        ? assistant.color 
                          ? `bg-gradient-to-r ${assistant.color} text-white shadow-md` 
                          : 'bg-primary text-primary-foreground shadow-md'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span className={`${
                      assistant.type === 'fashion' 
                        ? 'text-xl sm:text-sm' 
                        : 'text-base sm:text-sm'
                    } flex-shrink-0`}>{assistant.icon}</span>
                    {editingAssistant?.id === assistant.id ? (
                      <Input
                        value={editingAssistant.name}
                        onChange={(e) => setEditingAssistant({ ...editingAssistant, name: e.target.value })}
                        className="h-6 w-32 text-xs bg-background/90"
                        onBlur={handleEditSave}
                        onKeyPress={(e) => e.key === 'Enter' && handleEditSave()}
                        autoFocus
                      />
                    ) : (
                      <span className={`${
                        assistant.type === 'fashion' 
                          ? 'text-base sm:text-sm font-semibold' 
                          : 'text-sm sm:text-sm'
                      } whitespace-nowrap px-1`}>{assistant.name}</span>
                    )}
                    
                    {/* Tab Controls - Always visible on mobile, hover on desktop */}
                    {editingAssistant?.id !== assistant.id && (
                      <div className="sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center gap-1 ml-1 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 sm:h-4 sm:w-4 p-0 hover:bg-white/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingAssistant(assistant);
                          }}
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        {assistants.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 sm:h-4 sm:w-4 p-0 text-destructive hover:bg-destructive/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAssistantDelete(assistant.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    )}
                  </Button>
                </div>
              ))}
              {/* Spacer to ensure scroll reaches the end */}
              <div className="w-8 flex-shrink-0"></div>
            </div>
          </div>

          {/* Right Scroll Button */}
          <div className="flex-shrink-0">
            {canScrollRight && (
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollRight}
                className="ml-1 h-8 w-8 bg-background/80 backdrop-blur border"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Right Section: Add Button and Profile */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Add New Assistant - More Prominent (HIDDEN - keeping code for future use) */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="hidden bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md">
                <Plus className="w-4 h-4 mr-1" />
                Add Assistant
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button variant="default" size="icon" className="hidden h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md">
                <Plus className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
              <DialogHeader>
                <DialogTitle>Add New Assistant</DialogTitle>
                <DialogDescription>
                  Create a new AI assistant with specialized knowledge and capabilities. Choose from templates or create a custom assistant.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Quick Add Templates */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Quick Add Templates</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {customAssistantTypes.map((template) => (
                      <Button
                        key={template.value}
                        variant="outline"
                        className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 h-auto min-h-[60px] sm:min-h-0"
                        onClick={() => handleQuickAdd({
                          name: template.label,
                          type: 'custom',
                          icon: template.icon,
                          description: `AI-powered ${template.label.toLowerCase()} assistant`,
                          initialMessage: `Hi! I'm your ${template.label.toLowerCase()}. How can I help you today?`,
                          placeholder: `Ask me anything about ${template.label.toLowerCase()}...`,
                          color: template.color
                        })}
                      >
                        <span className="text-lg sm:text-base">{template.icon}</span>
                        <span className="text-xs sm:text-xs text-center sm:text-left leading-tight">{template.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Assistant Form */}
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-3">Create Custom Assistant</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          value={newAssistant.name}
                          onChange={(e) => setNewAssistant({ ...newAssistant, name: e.target.value })}
                          placeholder="Assistant name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Icon</label>
                        <Input
                          value={newAssistant.icon}
                          onChange={(e) => setNewAssistant({ ...newAssistant, icon: e.target.value })}
                          placeholder="🤖"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Input
                        value={newAssistant.description}
                        onChange={(e) => setNewAssistant({ ...newAssistant, description: e.target.value })}
                        placeholder="Brief description of what this assistant does"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Initial Message</label>
                      <Textarea
                        value={newAssistant.initialMessage}
                        onChange={(e) => setNewAssistant({ ...newAssistant, initialMessage: e.target.value })}
                        placeholder="The first message users see from this assistant"
                        rows={2}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Input Placeholder</label>
                      <Input
                        value={newAssistant.placeholder}
                        onChange={(e) => setNewAssistant({ ...newAssistant, placeholder: e.target.value })}
                        placeholder="Placeholder text for the input field"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Color Theme</label>
                      <Select
                        value={newAssistant.color}
                        onValueChange={(value) => setNewAssistant({ ...newAssistant, color: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {customAssistantTypes.map((type) => (
                            <SelectItem key={type.color} value={type.color}>
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded bg-gradient-to-r ${type.color}`} />
                                {type.label} Theme
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleAddAssistant} className="flex-1">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Assistant
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsAddDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Profile Button */}
          {onProfileClick && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onProfileClick}
              className="rounded-full h-8 w-8"
            >
              <User className="w-4 h-4" />
            </Button>
          )}

          {/* Close Button */}
          {onClose && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="rounded-full h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}