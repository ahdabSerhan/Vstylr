import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, ShoppingBag, Package } from "lucide-react";

const sizeSalesData = [
  { size: "XS", sold: 45, inventory: 120, demand: "Low" },
  { size: "S", sold: 89, inventory: 95, demand: "High" },
  { size: "M", sold: 156, inventory: 45, demand: "Critical" },
  { size: "L", sold: 134, inventory: 78, demand: "High" },
  { size: "XL", sold: 67, inventory: 110, demand: "Medium" },
  { size: "XXL", sold: 23, inventory: 140, demand: "Low" }
];

const weeklySalesData = [
  { week: "Week 1", sales: 2400, returns: 240 },
  { week: "Week 2", sales: 1398, returns: 140 },
  { week: "Week 3", sales: 9800, returns: 980 },
  { week: "Week 4", sales: 3908, returns: 390 },
  { week: "Week 5", sales: 4800, returns: 480 },
  { week: "Week 6", sales: 3800, returns: 380 }
];

const topProducts = [
  { name: "Classic White T-Shirt", sales: 234, revenue: 4680, trend: "up" },
  { name: "Blue Denim Jeans", sales: 189, revenue: 11340, trend: "up" },
  { name: "Black Hoodie", sales: 156, revenue: 7800, trend: "down" },
  { name: "Summer Dress", sales: 145, revenue: 8700, trend: "up" },
  { name: "Leather Jacket", sales: 78, revenue: 15600, trend: "down" }
];

const categoryData = [
  { name: "Tops", value: 45, color: "#0088FE" },
  { name: "Bottoms", value: 30, color: "#00C49F" },
  { name: "Dresses", value: 15, color: "#FFBB28" },
  { name: "Outerwear", value: 10, color: "#FF8042" }
];

export function ProductAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl">Product Analytics</h2>
        <Button variant="outline" className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* AI Recommendations */}
      <div className="grid gap-4 md:grid-cols-2">
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Size M Alert:</strong> Critical inventory level detected. Recommend increasing production by 200 units for Size M items based on current demand trends.
          </AlertDescription>
        </Alert>
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            <strong>Size XS/XXL:</strong> Overstock detected. Consider reducing production by 30% and implementing promotional campaigns.
          </AlertDescription>
        </Alert>
      </div>

      {/* Size Performance Dashboard */}
      <Card className="p-6">
        <h3 className="text-xl mb-4">Size Performance & Inventory Status</h3>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {sizeSalesData.map((size) => (
            <div key={size.size} className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold">{size.size}</div>
                <Badge variant={
                  size.demand === "Critical" ? "destructive" :
                  size.demand === "High" ? "default" :
                  size.demand === "Medium" ? "secondary" : "outline"
                }>
                  {size.demand}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sold: {size.sold}</span>
                  <span>Stock: {size.inventory}</span>
                </div>
                <Progress 
                  value={(size.sold / (size.sold + size.inventory)) * 100} 
                  className="h-2"
                />
                <div className="text-xs text-gray-600 text-center">
                  {Math.round((size.sold / (size.sold + size.inventory)) * 100)}% sold
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sales Trend */}
        <Card className="p-6">
          <h3 className="text-xl mb-4">Weekly Sales & Returns</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
              <Line type="monotone" dataKey="returns" stroke="#dc2626" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6">
          <h3 className="text-xl mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Products */}
      <Card className="p-6">
        <h3 className="text-xl mb-4">Top Performing Products</h3>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-600">{product.sales} units sold</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-medium">${product.revenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Revenue</div>
                </div>
                {product.trend === "up" ? (
                  <TrendingUp className="h-5 w-5 text-green-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}