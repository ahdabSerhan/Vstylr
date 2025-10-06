import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Alert } from "./ui/alert";
import { Bot, MessageSquare, TrendingDown, Package, X } from "lucide-react";
import { useState } from "react";

const notifications = [
  {
    id: 1,
    type: "insight",
    message: "Insight created: 30% of size M shoppers reject shiny dresses.",
    timestamp: "2 min ago",
    priority: "high"
  },
  {
    id: 2,
    type: "recommendation", 
    message: "Recommendation: Promote matte dresses, reduce satin inventory.",
    timestamp: "2 min ago",
    priority: "high"
  },
  {
    id: 3,
    type: "trend",
    message: "Alert: Red dress searches increased 45% this week.",
    timestamp: "5 min ago",
    priority: "medium"
  }
];

export function AINotificationBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentNotification, setCurrentNotification] = useState(0);

  if (!isVisible) return null;

  const notification = notifications[currentNotification];

  return (
    <Alert className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 relative">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bot className="h-6 w-6 text-blue-600" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
          {/* Thought bubble */}
          <div className="absolute -top-8 -left-2 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm">
            <div className="text-xs text-gray-600">💡</div>
            <div className="absolute bottom-0 left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-200 transform translate-y-full"></div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <Badge variant="outline" className="text-xs">
              Retail Agent
            </Badge>
            <span className="text-xs text-gray-500">{notification.timestamp}</span>
            <Badge variant={notification.priority === "high" ? "destructive" : "secondary"} className="text-xs">
              {notification.priority}
            </Badge>
          </div>
          <p className="text-sm font-medium text-gray-800">{notification.message}</p>
        </div>

        <div className="flex items-center gap-2">
          {notifications.length > 1 && (
            <div className="flex gap-1">
              {notifications.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentNotification(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentNotification ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
          
          <Button size="sm" variant="outline" className="text-xs">
            <MessageSquare className="h-3 w-3 mr-1" />
            View Details
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Alert>
  );
}