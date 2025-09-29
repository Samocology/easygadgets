import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, TrendingUp, DollarSign, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Total Products",
    value: "156",
    change: "+12%",
    trend: "up",
    icon: Package,
    color: "text-blue-600"
  },
  {
    title: "Total Orders",
    value: "1,247",
    change: "+18%", 
    trend: "up",
    icon: ShoppingCart,
    color: "text-green-600"
  },
  {
    title: "Revenue",
    value: "₦2,456,789",
    change: "+24%",
    trend: "up", 
    icon: DollarSign,
    color: "text-purple-600"
  },
  {
    title: "Visitors",
    value: "8,543",
    change: "+8%",
    trend: "up",
    icon: Eye,
    color: "text-orange-600"
  }
];

const recentOrders = [
  { id: "#ORD-001", customer: "John Doe", product: "iPhone 15 Pro Max", amount: "₦479,199", status: "completed" },
  { id: "#ORD-002", customer: "Jane Smith", product: "MacBook Air M3", amount: "₦439,199", status: "pending" },
  { id: "#ORD-003", customer: "Mike Johnson", product: "AirPods Pro", amount: "₦99,799", status: "shipped" },
  { id: "#ORD-004", customer: "Sarah Wilson", product: "Samsung Galaxy S24", amount: "₦479,199", status: "completed" },
];

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <Badge 
                      variant="secondary" 
                      className="mt-2 text-green-600 bg-green-50 border-green-200"
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <IconComponent className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-sm">{order.id}</span>
                      <Badge 
                        variant={order.status === 'completed' ? 'default' : 
                               order.status === 'pending' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-sm font-medium">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Products Sold</span>
                  <span className="text-sm text-muted-foreground">847/1000</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '84.7%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Revenue Target</span>
                  <span className="text-sm text-muted-foreground">₦2.4M/₦3M</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Customer Satisfaction</span>
                  <span className="text-sm text-muted-foreground">4.8/5.0</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};