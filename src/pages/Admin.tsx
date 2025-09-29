import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { ProductManagement } from "@/components/admin/ProductManagement";
import { OrderManagement } from "@/components/admin/OrderManagement";
import { Analytics } from "@/components/admin/Analytics";

export type AdminView = "dashboard" | "products" | "orders" | "analytics";

const Admin = () => {
  const [currentView, setCurrentView] = useState<AdminView>("dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <AdminDashboard />;
      case "products":
        return <ProductManagement />;
      case "orders":
        return <OrderManagement />;
      case "analytics":
        return <Analytics />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderContent()}
    </AdminLayout>
  );
};

export default Admin;