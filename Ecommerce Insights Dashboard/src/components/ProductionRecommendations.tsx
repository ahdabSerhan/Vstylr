import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Bot, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Factory, Target, Calendar } from "lucide-react";

const productionRecommendations = [
  {
    id: 1,
    product: "Classic White T-Shirt",
    size: "M",
    currentStock: 45,
    demandForecast: 200,
    recommendation: "Increase production by 155 units",
    priority: "high",
    confidence: 92,
    timeline: "2 weeks",
    reason: "High demand, low inventory, seasonal trend increasing"
  },
  {
    id: 2,
    product: "Blue Denim Jeans",
    size: "L",
    currentStock: 78,
    demandForecast: 120,
    recommendation: "Increase production by 42 units",
    priority: "medium",
    confidence: 85,
    timeline: "3 weeks",
    reason: "Steady demand growth, moderate inventory levels"
  },
  {
    id: 3,
    product: "Summer Dress",
    size: "S",
    currentStock: 150,
    demandForecast: 80,
    recommendation: "Reduce production by 35%",
    priority: "low",
    confidence: 78,
    timeline: "1 week",
    reason: "Overstock situation, seasonal demand declining"
  },
  {
    id: 4,
    product: "Black Hoodie",
    size: "XL",
    currentStock: 95,
    demandForecast: 180,
    recommendation: "Increase production by 85 units",
    priority: "high",
    confidence: 89,
    timeline: "2 weeks",
    reason: "Winter approaching, high demand expected"
  }
];

const demandForecastData = [
  { week: "W1", historical: 120, predicted: 125, actual: 128 },
  { week: "W2", historical: 135, predicted: 140, actual: 142 },
  { week: "W3", historical: 150, predicted: 155, actual: 151 },
  { week: "W4", historical: 165, predicted: 170, actual: 168 },
  { week: "W5", historical: 180, predicted: 185, actual: null },
  { week: "W6", historical: 190, predicted: 195, actual: null }
];

const sizeOptimizationData = [
  { size: "XS", current: 120, recommended: 80, savings: "$2,400" },
  { size: "S", current: 95, recommended: 140, investment: "$2,700" },
  { size: "M", current: 45, recommended: 200, investment: "$9,300" },
  { size: "L", current: 78, recommended: 120, investment: "$2,520" },
  { size: "XL", current: 110, recommended: 95, savings: "$900" },
  { size: "XXL", current: 140, recommended: 90, savings: "$3,000" }
];

export function ProductionRecommendations() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bot className="h-8 w-8 text-blue-600" />
          <h2 className="text-3xl">AI Production Assistant</h2>
        </div>
        <Button className="flex items-center gap-2">
          <Factory className="h-4 w-4" />
          Generate Production Plan
        </Button>
      </div>

      {/* AI Summary Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <Bot className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>AI Analysis:</strong> Based on current trends and inventory levels, recommend focusing on Size M production across all categories. Potential revenue impact: +$45,000 over next quarter.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
          <TabsTrigger value="forecast">Demand Forecast</TabsTrigger>
          <TabsTrigger value="optimization">Size Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid gap-4">
            {productionRecommendations.map((rec) => (
              <Card key={rec.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium">{rec.product} - Size {rec.size}</h3>
                      <Badge variant={
                        rec.priority === "high" ? "destructive" :
                        rec.priority === "medium" ? "default" : "secondary"
                      }>
                        {rec.priority} priority
                      </Badge>
                    </div>
                    
                    <div className="grid gap-2 md:grid-cols-3">
                      <div>
                        <div className="text-sm text-gray-600">Current Stock</div>
                        <div className="font-medium">{rec.currentStock} units</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Demand Forecast</div>
                        <div className="font-medium">{rec.demandForecast} units</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Timeline</div>
                        <div className="font-medium">{rec.timeline}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">AI Confidence</div>
                      <div className="flex items-center gap-3">
                        <Progress value={rec.confidence} className="flex-1 h-2" />
                        <span className="text-sm font-medium">{rec.confidence}%</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-700">
                      <strong>Reasoning:</strong> {rec.reason}
                    </div>
                  </div>
                  
                  <div className="text-right space-y-3">
                    <div className="text-lg font-medium text-blue-600">
                      {rec.recommendation}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl mb-4">Demand Forecasting Model</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={demandForecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="historical" fill="#94a3b8" name="Historical" />
                <Bar dataKey="predicted" fill="#2563eb" name="AI Predicted" />
                <Bar dataKey="actual" fill="#059669" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">94%</div>
                <div className="text-sm text-gray-600">Prediction Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">+12%</div>
                <div className="text-sm text-gray-600">Demand Growth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">2.3 days</div>
                <div className="text-sm text-gray-600">Avg Forecast Lead Time</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl mb-4">Size Distribution Optimization</h3>
            <div className="space-y-4">
              {sizeOptimizationData.map((size) => (
                <div key={size.size} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-lg">
                      {size.size}
                    </div>
                    <div>
                      <div className="font-medium">Size {size.size}</div>
                      <div className="text-sm text-gray-600">
                        Current: {size.current} → Recommended: {size.recommended}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`font-medium ${size.savings ? 'text-green-600' : 'text-blue-600'}`}>
                        {size.savings || size.investment}
                      </div>
                      <div className="text-sm text-gray-600">
                        {size.savings ? 'Potential Savings' : 'Investment Needed'}
                      </div>
                    </div>
                    
                    {size.current < size.recommended ? (
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    ) : size.current > size.recommended ? (
                      <TrendingDown className="h-5 w-5 text-green-600" />
                    ) : (
                      <Target className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid gap-4 md:grid-cols-3 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">$8,300</div>
                  <div className="text-sm text-gray-600">Total Potential Savings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">$14,520</div>
                  <div className="text-sm text-gray-600">Required Investment</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">+22%</div>
                  <div className="text-sm text-gray-600">Expected ROI</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}