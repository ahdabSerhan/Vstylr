import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Bot, TrendingUp, Search, MessageSquare, Package, ShoppingBag, Sparkles } from "lucide-react";

export function AIInsightsCard() {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <Bot className="h-6 w-6 text-blue-600" />
          <Sparkles className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1" />
        </div>
        <h3 className="text-xl font-medium">AI Retail Intelligence</h3>
        <Badge variant="outline" className="ml-auto">
          Real-time Analysis
        </Badge>
      </div>

      <div className="space-y-6">
        {/* Query Trend */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-600" />
            <span className="font-medium text-sm">Query Trend</span>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Top query this week:</span>
              <Badge variant="secondary">+45% searches</Badge>
            </div>
            <p className="font-medium text-blue-700">"Red dress for weddings"</p>
            <Progress value={75} className="h-2 mt-2" />
            <p className="text-xs text-gray-500 mt-1">1,287 searches in 7 days</p>
          </div>
        </div>

        {/* Fit Feedback */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-gray-600" />
            <span className="font-medium text-sm">Fit Feedback Analysis</span>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-medium text-orange-800">30% of size M shoppers reject shiny fabrics</p>
                <p className="text-sm text-gray-600 mt-1">Particularly satin and silk finishes</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-200 rounded"></div>
                <span>Shiny: 30% rejection</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-200 rounded"></div>
                <span>Matte: 85% approval</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-gray-600" />
            <span className="font-medium text-sm">Smart Recommendations</span>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-red-600" />
                <span className="font-medium text-red-800">Reduce satin stock by 15%</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Promote matte dresses</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">Launch red dress wedding collection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1">
            <Package className="h-4 w-4 mr-2" />
            Apply Recommendations
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            View Full Analysis
          </Button>
        </div>

        {/* Confidence Score */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">AI Confidence Score</span>
            <span className="text-sm font-bold text-green-600">92%</span>
          </div>
          <Progress value={92} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">Based on 2,847 customer interactions</p>
        </div>
      </div>
    </Card>
  );
}