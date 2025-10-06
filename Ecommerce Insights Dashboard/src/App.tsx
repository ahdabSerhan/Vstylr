import { useState } from "react";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "./components/ui/sidebar";
import { ProductAnalytics } from "./components/ProductAnalytics";
import { CustomerInsights } from "./components/CustomerInsights";
import { ProductionRecommendations } from "./components/ProductionRecommendations";
import { CampaignManagement } from "./components/CampaignManagement";
import { WorkflowAutomation } from "./components/WorkflowAutomation";
import { AINotificationBanner } from "./components/AINotificationBanner";
import { AIChat } from "./components/AIChat";
import { AIInsightsCard } from "./components/AIInsightsCard";
import { 
  BarChart3, 
  Users, 
  Factory, 
  Mail, 
  Bot, 
  TrendingUp, 
  AlertTriangle,
  DollarSign,
  Package,
  Target,
  MessageSquare,
  Zap
} from "lucide-react";

type ActiveTab = "overview" | "products" | "customers" | "production" | "campaigns" | "workflows";

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const menuItems = [
    { id: "overview", label: "Dashboard Overview", icon: BarChart3 },
    { id: "products", label: "Product Analytics", icon: Package },
    { id: "customers", label: "Customer Insights", icon: Users },
    { id: "production", label: "AI Production Assistant", icon: Factory },
    { id: "campaigns", label: "Campaign Management", icon: Mail },
    { id: "workflows", label: "AI Workflow Automation", icon: Zap }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductAnalytics />;
      case "customers":
        return <CustomerInsights />;
      case "production":
        return <ProductionRecommendations />;
      case "campaigns":
        return <CampaignManagement />;
      case "workflows":
        return <WorkflowAutomation />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar className="w-64 border-r bg-white">
          <SidebarHeader className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Fashion AI</h1>
                <p className="text-sm text-gray-600">Ecommerce Dashboard</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id as ActiveTab)}
                    className={`w-full justify-start gap-3 p-3 rounded-lg transition-colors ${
                      activeTab === item.id 
                        ? "bg-blue-50 text-blue-700 border border-blue-200" 
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <AINotificationBanner />
            {renderContent()}
          </div>
        </main>

        {/* AI Chat Box Preview */}
        {!isChatOpen && (
          <Card className="fixed bottom-4 right-4 w-80 bg-white shadow-2xl border-2 border-blue-100 z-40">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">AI Retail Agent</h4>
                    <p className="text-xs text-gray-500">Ready to help</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  Online
                </Badge>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">
                    💡 <strong>Latest insight:</strong> Size M demand is 30% higher than forecasted
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  Ask me about inventory, customer feedback, or recommendations...
                </div>
              </div>
              
              <Button 
                onClick={() => setIsChatOpen(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Start AI Mode
              </Button>
            </div>
          </Card>
        )}

        {/* AI Chat Component */}
        <AIChat isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
      </div>
    </SidebarProvider>
  );
}

function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Fashion AI Dashboard</h1>
          <p className="text-gray-600 mt-1">Intelligent insights for your clothing ecommerce business</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            AI Assistant Active
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold">$127.4K</p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-4 w-4" />
                +12.5% from last month
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Customers</p>
              <p className="text-3xl font-bold">2,334</p>
              <p className="text-sm text-blue-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-4 w-4" />
                +8.2% from last month
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Products Sold</p>
              <p className="text-3xl font-bold">1,892</p>
              <p className="text-sm text-purple-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-4 w-4" />
                +15.7% from last month
              </p>
            </div>
            <Package className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-3xl font-bold">4.8%</p>
              <p className="text-sm text-orange-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-4 w-4" />
                +2.1% from last month
              </p>
            </div>
            <Target className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* AI Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6 border-l-4 border-l-orange-500">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-orange-500 mt-1" />
            <div>
              <h3 className="font-medium text-orange-800">Critical Inventory Alert</h3>
              <p className="text-sm text-orange-700 mt-1">
                Size M items across multiple categories are running low. Immediate production increase recommended.
              </p>
              <Button size="sm" variant="outline" className="mt-3">
                View Recommendations
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-blue-500">
          <div className="flex items-start gap-4">
            <Bot className="h-6 w-6 text-blue-500 mt-1" />
            <div>
              <h3 className="font-medium text-blue-800">AI Campaign Opportunity</h3>
              <p className="text-sm text-blue-700 mt-1">
                384 customers have abandoned carts with Size M items. Automated email campaign can recover ~$12K.
              </p>
              <Button size="sm" variant="outline" className="mt-3">
                Create Campaign
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Insights and Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <AIInsightsCard />
        </div>
        
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-xl font-medium mb-4">Quick Actions</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BarChart3 className="h-6 w-6" />
                View Analytics
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Factory className="h-6 w-6" />
                Production Plan
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Mail className="h-6 w-6" />
                New Campaign
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-6 w-6" />
                Customer Segments
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-xl font-medium mb-4">Recent AI Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <Bot className="h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <p className="font-medium">Increase Size M production by 200 units</p>
              <p className="text-sm text-gray-600">Based on demand forecast and current inventory</p>
            </div>
            <Badge>High Priority</Badge>
          </div>
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <Bot className="h-5 w-5 text-green-600" />
            <div className="flex-1">
              <p className="font-medium">Launch cart abandonment campaign</p>
              <p className="text-sm text-gray-600">Targeting 384 customers, estimated $12K recovery</p>
            </div>
            <Badge variant="secondary">Medium Priority</Badge>
          </div>
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <Bot className="h-5 w-5 text-purple-600" />
            <div className="flex-1">
              <p className="font-medium">Reduce XS/XXL inventory by 30%</p>
              <p className="text-sm text-gray-600">Overstock detected, promotional campaign suggested</p>
            </div>
            <Badge variant="outline">Low Priority</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default App;