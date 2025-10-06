import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Mail, Users, Target, Calendar, TrendingUp, Bot, Plus, Play, Pause, Edit, BarChart3 } from "lucide-react";
import { useState } from "react";

const campaigns = [
  {
    id: 1,
    name: "Size M Restock Alert",
    type: "Automated",
    status: "Active",
    audience: "Previous Size M Buyers",
    sent: 1234,
    opened: 567,
    clicked: 89,
    revenue: 4500,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "VIP Customer Exclusive",
    type: "Manual",
    status: "Scheduled",
    audience: "VIP Customers",
    sent: 0,
    opened: 0,
    clicked: 0,
    revenue: 0,
    createdAt: "2024-01-20"
  },
  {
    id: 3,
    name: "Seasonal Sale",
    type: "Automated",
    status: "Completed",
    audience: "All Customers",
    sent: 2890,
    opened: 1445,
    clicked: 289,
    revenue: 12400,
    createdAt: "2024-01-10"
  }
];

const audienceSegments = [
  { name: "VIP Customers", count: 284, description: "High-value repeat customers" },
  { name: "Regular Buyers", count: 1205, description: "Customers with 2+ purchases" },
  { name: "Size M Preferences", count: 567, description: "Customers who frequently buy Size M" },
  { name: "Seasonal Shoppers", count: 890, description: "Active during seasonal sales" },
  { name: "Cart Abandoners", count: 456, description: "Left items in cart within 7 days" }
];

const campaignPerformanceData = [
  { month: "Jan", sent: 12500, opened: 6250, clicked: 1250, revenue: 25000 },
  { month: "Feb", sent: 15600, opened: 7800, clicked: 1560, revenue: 31200 },
  { month: "Mar", sent: 18900, opened: 9450, clicked: 1890, revenue: 37800 },
  { month: "Apr", sent: 22100, opened: 11050, clicked: 2210, revenue: 44200 },
  { month: "May", sent: 25400, opened: 12700, clicked: 2540, revenue: 50800 },
  { month: "Jun", sent: 28700, opened: 14350, clicked: 2870, revenue: 57400 }
];

export function CampaignManagement() {
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mail className="h-8 w-8 text-purple-600" />
          <h2 className="text-3xl">Campaign Management</h2>
        </div>
        
        <Dialog open={isNewCampaignOpen} onOpenChange={setIsNewCampaignOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input id="campaign-name" placeholder="e.g., Summer Sale 2024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign-type">Campaign Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automated">Automated</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience segment" />
                  </SelectTrigger>
                  <SelectContent>
                    {audienceSegments.map((segment) => (
                      <SelectItem key={segment.name} value={segment.name.toLowerCase()}>
                        {segment.name} ({segment.count} customers)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Email Subject</Label>
                <Input id="subject" placeholder="Compelling subject line" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Email Content</Label>
                <Textarea 
                  id="message" 
                  placeholder="Personalized email content will be generated by AI based on customer data..."
                  rows={4}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="ai-personalization" />
                <Label htmlFor="ai-personalization">Enable AI Personalization</Label>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Create Campaign</Button>
                <Button variant="outline" onClick={() => setIsNewCampaignOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Mail className="h-8 w-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-gray-600">Active Campaigns</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold">28.4%</div>
              <div className="text-sm text-gray-600">Avg Open Rate</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold">5.7%</div>
              <div className="text-sm text-gray-600">Avg Click Rate</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-orange-600" />
            <div>
              <div className="text-2xl font-bold">$57.4K</div>
              <div className="text-sm text-gray-600">Monthly Revenue</div>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="segments">Audience Segments</TabsTrigger>
          <TabsTrigger value="automation">AI Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Opened</TableHead>
                  <TableHead>Clicked</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>
                      <Badge variant={campaign.type === "Automated" ? "default" : "secondary"}>
                        {campaign.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        campaign.status === "Active" ? "default" :
                        campaign.status === "Scheduled" ? "secondary" : "outline"
                      }>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{campaign.audience}</TableCell>
                    <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                    <TableCell>{campaign.opened.toLocaleString()}</TableCell>
                    <TableCell>{campaign.clicked.toLocaleString()}</TableCell>
                    <TableCell>${campaign.revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          {campaign.status === "Active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {audienceSegments.map((segment) => (
              <Card key={segment.name} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{segment.name}</h3>
                    <Badge variant="secondary">{segment.count}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{segment.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      Create Campaign
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bot className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl">AI Campaign Automation</h3>
            </div>
            
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Automated Triggers</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Low Stock Alert</div>
                        <div className="text-sm text-gray-600">When inventory drops below threshold</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Cart Abandonment</div>
                        <div className="text-sm text-gray-600">Send reminder after 24 hours</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Customer Birthday</div>
                        <div className="text-sm text-gray-600">Personalized birthday offers</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">AI Personalization</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium mb-2">Product Recommendations</div>
                      <div className="text-sm text-gray-600 mb-2">AI suggests products based on purchase history</div>
                      <Progress value={85} className="h-2" />
                      <div className="text-xs text-gray-500 mt-1">85% accuracy rate</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium mb-2">Send Time Optimization</div>
                      <div className="text-sm text-gray-600 mb-2">AI determines best time to send emails</div>
                      <Progress value={92} className="h-2" />
                      <div className="text-xs text-gray-500 mt-1">92% accuracy rate</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium mb-2">Content Personalization</div>
                      <div className="text-sm text-gray-600 mb-2">Dynamic content based on customer preferences</div>
                      <Progress value={78} className="h-2" />
                      <div className="text-xs text-gray-500 mt-1">78% accuracy rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl mb-4">Campaign Performance Trends</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={campaignPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sent" fill="#94a3b8" name="Emails Sent" />
                <Bar dataKey="opened" fill="#2563eb" name="Opened" />
                <Bar dataKey="clicked" fill="#059669" name="Clicked" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2.4x</div>
                <div className="text-sm text-gray-600">ROI Improvement</div>
                <div className="text-xs text-gray-500 mt-1">vs. manual campaigns</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">+47%</div>
                <div className="text-sm text-gray-600">Revenue Growth</div>
                <div className="text-xs text-gray-500 mt-1">month over month</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">89%</div>
                <div className="text-sm text-gray-600">Automation Rate</div>
                <div className="text-xs text-gray-500 mt-1">of all campaigns</div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}