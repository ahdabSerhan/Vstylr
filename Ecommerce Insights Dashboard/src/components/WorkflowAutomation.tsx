import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Bot, 
  Mail, 
  Package, 
  Users, 
  Settings, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Send,
  Eye,
  Edit,
  Zap,
  Target,
  TrendingUp,
  MessageSquare,
  FileText,
  Calendar,
  Webhook,
  Database
} from "lucide-react";
import { useState } from "react";

interface WorkflowItem {
  id: string;
  type: "email" | "inventory" | "crm" | "feedback";
  title: string;
  description: string;
  status: "pending" | "draft" | "approved" | "sent" | "completed";
  timestamp: string;
  details: any;
}

const workflowItems: WorkflowItem[] = [
  {
    id: "1",
    type: "email",
    title: "Matte Red Dress Campaign",
    description: "Auto-generated campaign based on 25% shopper demand for matte red dresses",
    status: "draft",
    timestamp: "5 min ago",
    details: {
      subject: "Perfect Matte Dresses for Weddings — Just In",
      segment: "Size M shoppers with past dress queries",
      audience: 1847,
      expectedRevenue: "$23,400"
    }
  },
  {
    id: "2", 
    type: "inventory",
    title: "Satin Inventory Reduction",
    description: "Auto-generated purchase order adjustment to reduce satin inventory by 15%",
    status: "pending",
    timestamp: "12 min ago",
    details: {
      adjustment: "-150 units",
      value: "$12,750",
      supplier: "TextileCorp",
      deadline: "2 days"
    }
  },
  {
    id: "3",
    type: "crm",
    title: "HubSpot Lead Sync",
    description: "Pushing 89 new qualified leads from size M dress shoppers to HubSpot",
    status: "completed",
    timestamp: "1 hour ago",
    details: {
      leads: 89,
      qualified: 67,
      platform: "HubSpot",
      conversion: "12%"
    }
  },
  {
    id: "4",
    type: "feedback",
    title: "Shoulder Fit Issue Alert",
    description: "Creating Jira task for SKU 001 due to recurring 'too tight in shoulders' feedback",
    status: "sent",
    timestamp: "2 hours ago",
    details: {
      sku: "SKU-001",
      issue: "Shoulder tightness",
      frequency: "23% of returns",
      task: "PROD-456"
    }
  }
];

export function WorkflowAutomation() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowItem | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "draft": return "bg-blue-100 text-blue-800 border-blue-200";
      case "approved": return "bg-green-100 text-green-800 border-green-200";
      case "sent": return "bg-purple-100 text-purple-800 border-purple-200";
      case "completed": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email": return <Mail className="h-4 w-4" />;
      case "inventory": return <Package className="h-4 w-4" />;
      case "crm": return <Users className="h-4 w-4" />;
      case "feedback": return <MessageSquare className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Workflow Automation</h1>
          <p className="text-gray-600 mt-1">Automated actions and recommendations from your AI Retail Agent</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Bot className="h-3 w-3 mr-1" />
            4 Active Workflows
          </Badge>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure Automations
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="email">Email Campaigns</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="crm">CRM & Marketing</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Active Workflows */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium">Active Workflows</h3>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {workflowItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => setSelectedWorkflow(item)}
                >
                  <div className={`p-2 rounded-lg ${getStatusColor(item.status).replace('text-', 'bg-').replace('bg-', 'bg-').split(' ')[0]} bg-opacity-20`}>
                    {getTypeIcon(item.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    {item.status === "draft" && (
                      <>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </>
                    )}
                    {item.status === "pending" && (
                      <Button size="sm">
                        <Zap className="h-4 w-4 mr-1" />
                        Execute
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Workflow Performance */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-1">Completed Today</h3>
              <p className="text-2xl font-bold text-green-600">12</p>
              <p className="text-sm text-gray-600">+40% from yesterday</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-1">Pending Approval</h3>
              <p className="text-2xl font-bold text-blue-600">4</p>
              <p className="text-sm text-gray-600">Require your review</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium mb-1">Revenue Generated</h3>
              <p className="text-2xl font-bold text-purple-600">$47.2K</p>
              <p className="text-sm text-gray-600">This week</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-medium mb-4">Auto-Generated Email Campaigns</h3>
            
            {/* Featured Campaign */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-medium text-lg">Perfect Matte Dresses for Weddings — Just In</h4>
                  <p className="text-gray-600 mt-1">Auto-generated based on trend: "25% of shoppers asked for matte red dresses"</p>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Draft Ready
                </Badge>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Target Audience</p>
                  <p className="font-medium">Size M dress shoppers</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Segment Size</p>
                  <p className="font-medium">1,847 customers</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Expected Revenue</p>
                  <p className="font-medium text-green-600">$23,400</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Send Time</p>
                  <p className="font-medium">Tuesday 10 AM</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Email
                </Button>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Content
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Send className="h-4 w-4 mr-2" />
                  Approve & Send
                </Button>
              </div>
            </div>

            {/* Integration Status */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Klaviyo Connected</p>
                  <p className="text-sm text-gray-600">Ready to send</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Mailchimp Synced</p>
                  <p className="text-sm text-gray-600">Audiences updated</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Shopify Email</p>
                  <p className="text-sm text-gray-600">Templates ready</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-medium mb-4">Automated Inventory Management</h3>
            
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-orange-800">Purchase Order Adjustment</h4>
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                    Pending Approval
                  </Badge>
                </div>
                <p className="text-sm text-orange-700 mb-3">
                  AI detected: 30% rejection rate for shiny fabrics. Recommending inventory reduction.
                </p>
                
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Adjustment</p>
                    <p className="font-medium">-150 satin units</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Value Impact</p>
                    <p className="font-medium">-$12,750</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Supplier</p>
                    <p className="font-medium">TextileCorp</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="font-medium">2 days</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Adjustment
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Modify Order
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Supplier
                  </Button>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-green-800">Forecast Alert Sent</h4>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Completed
                  </Badge>
                </div>
                <p className="text-sm text-green-700">
                  Revised demand forecast sent to suppliers for Size M items (+200 units needed).
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="crm" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-medium mb-4">CRM & Marketing Automation</h3>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-medium">Lead Management</h4>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">HubSpot Integration</p>
                      <p className="text-sm text-gray-600">89 leads synced</p>
                    </div>
                  </div>
                  <div className="grid gap-2 grid-cols-2 text-sm">
                    <div>Qualified Leads: <strong>67</strong></div>
                    <div>Conversion Rate: <strong>12%</strong></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Ad Campaign Generation</h4>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Google Ads Campaign</p>
                      <p className="text-sm text-gray-600">Red dress wedding theme</p>
                    </div>
                  </div>
                  <Button size="sm" className="w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    Launch Campaign
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-medium mb-4">Platform Integrations</h3>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Klaviyo", status: "connected", icon: "📧", type: "Email Marketing" },
                { name: "HubSpot", status: "connected", icon: "🔄", type: "CRM" },
                { name: "Shopify", status: "connected", icon: "🛍️", type: "E-commerce" },
                { name: "Slack", status: "connected", icon: "💬", type: "Communication" },
                { name: "Jira", status: "connected", icon: "📋", type: "Project Management" },
                { name: "Google Ads", status: "pending", icon: "📊", type: "Advertising" }
              ].map((integration) => (
                <div key={integration.name} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{integration.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium">{integration.name}</p>
                    <p className="text-sm text-gray-600">{integration.type}</p>
                  </div>
                  <Badge className={integration.status === "connected" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {integration.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Workflow Detail Modal */}
      {selectedWorkflow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedWorkflow(null)}>
          <Card className="w-96 max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">{selectedWorkflow.title}</h3>
                <Button size="sm" variant="ghost" onClick={() => setSelectedWorkflow(null)}>×</Button>
              </div>
              <p className="text-sm text-gray-600 mb-4">{selectedWorkflow.description}</p>
              
              <div className="space-y-3">
                {Object.entries(selectedWorkflow.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-sm text-gray-600 capitalize">{key}:</span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}