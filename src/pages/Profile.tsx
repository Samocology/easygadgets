import { useState } from "react";
import { User, Settings, Heart, Package, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/hooks/useCart";

const Profile = () => {
  const { totalItems } = useCart();
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 801 234 5678",
    address: "123 Lagos Street, Victoria Island, Lagos"
  });

  const orderHistory = [
    {
      id: "ORD-001",
      date: "2024-09-20",
      total: 479199.60,
      status: "Delivered",
      items: 2
    },
    {
      id: "ORD-002", 
      date: "2024-09-15",
      total: 99799.75,
      status: "Processing",
      items: 1
    },
    {
      id: "ORD-003",
      date: "2024-09-10", 
      total: 159799.60,
      status: "Shipped",
      items: 1
    }
  ];

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log("Profile updated:", userInfo);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={totalItems} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Favorites
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={userInfo.address}
                          onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="gradient-primary text-primary-foreground border-0">
                      Update Profile
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()} • {order.items} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₦{order.total.toLocaleString('en-NG')}</p>
                          <p className={`text-sm ${
                            order.status === 'Delivered' ? 'text-green-600' :
                            order.status === 'Shipped' ? 'text-blue-600' :
                            'text-yellow-600'
                          }`}>
                            {order.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>Favorite Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Heart className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No favorite products yet.</p>
                    <p className="text-sm text-muted-foreground">
                      Start browsing and add products to your favorites!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about your orders and new products
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">SMS Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Get SMS updates for order status changes
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <Button variant="destructive" className="w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;