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
    gradient: "from-blue-500 to-blue-600"
  },
  {
    title: "Total Orders",
    value: "1,247",
    change: "+18%", 
    trend: "up",
    icon: ShoppingCart,
    gradient: "from-green-500 to-green-600"
  },
  {
    title: "Revenue",
    value: "₦2,456,789",
    change: "+24%",
    trend: "up", 
    icon: DollarSign,
    gradient: "from-purple-500 to-purple-600"
  },
  {
    title: "Visitors",
    value: "8,543",
    change: "+8%",
    trend: "up",
    icon: Eye,
    gradient: "from-orange-500 to-orange-600"
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
    <div className="space-y-4 lg:space-y-6">
      <div className="px-1">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className="shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-105 border-none overflow-hidden">
              <CardContent className="p-4 sm:p-5 lg:p-6 relative">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-bl-full`} />
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="text-xs bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent Orders */}
        <Card className="shadow-card border-none">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1 mb-2 sm:mb-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-medium text-xs sm:text-sm">{order.id}</span>
                      <Badge 
                        variant={order.status === 'completed' ? 'default' : 
                               order.status === 'pending' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-xs sm:text-sm font-medium mt-1">{order.product}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-semibold text-primary text-sm sm:text-base">{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="shadow-card border-none">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5 sm:space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm font-medium">Products Sold</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">847/1000</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500" style={{ width: '84.7%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm font-medium">Revenue Target</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">₦2.4M/₦3M</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm font-medium">Customer Satisfaction</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">4.8/5.0</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500" style={{ width: '96%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};