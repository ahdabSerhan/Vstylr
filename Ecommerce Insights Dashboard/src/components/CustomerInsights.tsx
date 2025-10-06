import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { Users, MapPin, ShoppingCart, Heart, DollarSign, TrendingUp } from "lucide-react";

const customerSegments = [
  { segment: "VIP Customers", count: 284, percentage: 12, avgSpend: 450, color: "#9333ea" },
  { segment: "Regular Buyers", count: 1205, percentage: 52, avgSpend: 125, color: "#2563eb" },
  { segment: "Occasional", count: 567, percentage: 24, avgSpend: 65, color: "#059669" },
  { segment: "One-time", count: 278, percentage: 12, avgSpend: 35, color: "#dc2626" }
];

const demographicData = [
  { age: "18-25", count: 340, percentage: 23 },
  { age: "26-35", count: 520, percentage: 35 },
  { age: "36-45", count: 380, percentage: 26 },
  { age: "46-55", count: 180, percentage: 12 },
  { age: "55+", count: 60, percentage: 4 }
];

const geoData = [
  { location: "New York", customers: 245, revenue: 32500 },
  { location: "California", customers: 189, revenue: 28900 },
  { location: "Texas", customers: 156, revenue: 21300 },
  { location: "Florida", customers: 134, revenue: 18700 },
  { location: "Illinois", customers: 98, revenue: 15200 }
];

const customerJourneyData = [
  { stage: "Awareness", visitors: 10000, conversion: 100 },
  { stage: "Interest", visitors: 3500, conversion: 35 },
  { stage: "Consideration", visitors: 1200, conversion: 12 },
  { stage: "Purchase", visitors: 450, conversion: 4.5 },
  { stage: "Retention", visitors: 280, conversion: 2.8 }
];

const lifetimeValueData = [
  { month: "Jan", value: 125 },
  { month: "Feb", value: 142 },
  { month: "Mar", value: 158 },
  { month: "Apr", value: 167 },
  { month: "May", value: 185 },
  { month: "Jun", value: 203 }
];

export function CustomerInsights() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl">Customer Insights</h2>
        <Button variant="outline" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Customer Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold">2,334</div>
              <div className="text-sm text-gray-600">Total Customers</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold">$203</div>
              <div className="text-sm text-gray-600">Avg Lifetime Value</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold">3.2</div>
              <div className="text-sm text-gray-600">Avg Orders per Customer</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-600" />
            <div>
              <div className="text-2xl font-bold">78%</div>
              <div className="text-sm text-gray-600">Customer Retention</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Customer Segments */}
      <Card className="p-6">
        <h3 className="text-xl mb-4">Customer Segmentation</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {customerSegments.map((segment) => (
            <div key={segment.segment} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{segment.segment}</h4>
                <Badge style={{ backgroundColor: segment.color, color: 'white' }}>
                  {segment.percentage}%
                </Badge>
              </div>
              <div className="space-y-2">
                <Progress value={segment.percentage} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>{segment.count} customers</span>
                  <span>${segment.avgSpend} avg</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Age Demographics */}
        <Card className="p-6">
          <h3 className="text-xl mb-4">Age Demographics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={demographicData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Customer Lifetime Value Trend */}
        <Card className="p-6">
          <h3 className="text-xl mb-4">Average Customer Lifetime Value</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={lifetimeValueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#059669" fill="#059669" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Geographic Distribution */}
      <Card className="p-6">
        <h3 className="text-xl mb-4">Top Customer Locations</h3>
        <div className="space-y-4">
          {geoData.map((location, index) => (
            <div key={location.location} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium">{location.location}</div>
                  <div className="text-sm text-gray-600">{location.customers} customers</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${location.revenue.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Revenue</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Customer Journey Funnel */}
      <Card className="p-6">
        <h3 className="text-xl mb-4">Customer Journey Conversion Funnel</h3>
        <div className="space-y-4">
          {customerJourneyData.map((stage, index) => (
            <div key={stage.stage} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{stage.stage}</span>
                <span className="text-sm text-gray-600">
                  {stage.visitors.toLocaleString()} visitors ({stage.conversion}%)
                </span>
              </div>
              <div className="relative">
                <Progress value={stage.conversion * 10} className="h-3" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}