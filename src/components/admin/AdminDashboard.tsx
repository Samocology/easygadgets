import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, TrendingUp, DollarSign, Eye, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDashboardStats, DashboardStats } from "@/services/analyticsService";
import { Skeleton } from "@/components/ui/skeleton";

export const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      setError("Failed to fetch dashboard data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 lg:space-y-6">
        <div className="px-1">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="shadow-card border-none">
              <CardContent className="p-4 sm:p-5 lg:p-6">
                <Skeleton className="h-8 w-8 mb-3" />
                <Skeleton className="h-4 w-1/2 mb-1" />
                <Skeleton className="h-8 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <Card className="shadow-card border-none">
            <CardHeader><Skeleton className="h-6 w-1/3" /></CardHeader>
            <CardContent className="space-y-3">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
            </CardContent>
          </Card>
          <Card className="shadow-card border-none">
            <CardHeader><Skeleton className="h-6 w-1/3" /></CardHeader>
            <CardContent className="space-y-5">
              {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const dashboardStats = [
    {
      title: "Total Products",
      value: stats?.totalProducts ?? 0,
      icon: Package,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Total Orders",
      value: stats?.orderCount ?? 0,
      icon: ShoppingCart,
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Revenue",
      value: `₦${(stats?.totalRevenue ?? 0).toLocaleString()}`,
      icon: DollarSign,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  const recentOrders = stats?.topSellingProducts || [];

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="px-1 flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Dashboard Overview</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <Button onClick={fetchStats} variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {dashboardStats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className="shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-105 border-none overflow-hidden">
              <CardContent className="p-4 sm:p-5 lg:p-6 relative">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-bl-full`} />
                <div className="relative">
                  <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-lg mb-3`}>
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
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
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order: any) => (
                <div key={order.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1 mb-2 sm:mb-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-medium text-xs sm:text-sm">{order.name}</span>
                      <Badge 
                        variant={'outline'}
                        className="text-xs"
                      >
                        {order.totalSold} sold
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm font-medium mt-1">{order.category}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-semibold text-primary text-sm sm:text-base">₦{(order.price || 0).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


      </div>
    </div>
  );
};