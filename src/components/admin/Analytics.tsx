import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign, Eye } from "lucide-react";

const analyticsData = {
  revenue: {
    current: 2456789,
    previous: 2102450,
    change: 16.9
  },
  orders: {
    current: 1247,
    previous: 1089,
    change: 14.5
  },
  customers: {
    current: 8543,
    previous: 7892,
    change: 8.2
  },
  pageViews: {
    current: 45672,
    previous: 42150,
    change: 8.4
  }
};

const topProducts = [
  { name: "iPhone 15 Pro Max", sales: 156, revenue: 74715036 },
  { name: "MacBook Air M3", sales: 89, revenue: 39088824 },
  { name: "AirPods Pro", sales: 234, revenue: 23345143 },
  { name: "Samsung Galaxy S24", sales: 98, revenue: 46961561 },
  { name: "Sony WH-1000XM5", sales: 167, revenue: 26686894 }
];

const recentActivity = [
  { type: "order", message: "New order #ORD-157 received", time: "2 minutes ago" },
  { type: "product", message: "iPhone 15 Pro Max stock updated", time: "15 minutes ago" },
  { type: "customer", message: "New customer registration", time: "1 hour ago" },
  { type: "order", message: "Order #ORD-156 shipped", time: "2 hours ago" },
  { type: "product", message: "New product added: iPad Air M2", time: "3 hours ago" }
];

export const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Analytics & Reports</h2>
        <p className="text-muted-foreground">Monitor your store's performance and growth</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₦{analyticsData.revenue.current.toLocaleString()}</p>
                <Badge 
                  variant="secondary" 
                  className="mt-2 text-green-600 bg-green-50 border-green-200"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{analyticsData.revenue.change}%
                </Badge>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{analyticsData.orders.current.toLocaleString()}</p>
                <Badge 
                  variant="secondary" 
                  className="mt-2 text-green-600 bg-green-50 border-green-200"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{analyticsData.orders.change}%
                </Badge>
              </div>
              <ShoppingBag className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customers</p>
                <p className="text-2xl font-bold">{analyticsData.customers.current.toLocaleString()}</p>
                <Badge 
                  variant="secondary" 
                  className="mt-2 text-green-600 bg-green-50 border-green-200"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{analyticsData.customers.change}%
                </Badge>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                <p className="text-2xl font-bold">{analyticsData.pageViews.current.toLocaleString()}</p>
                <Badge 
                  variant="secondary" 
                  className="mt-2 text-green-600 bg-green-50 border-green-200"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{analyticsData.pageViews.change}%
                </Badge>
              </div>
              <Eye className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="w-8 h-8 flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">₦{product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'order' ? 'bg-green-500' :
                    activity.type === 'product' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Revenue chart would be displayed here</p>
              <p className="text-sm text-muted-foreground">Integration with charts library needed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};