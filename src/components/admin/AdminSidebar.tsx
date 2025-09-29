import { BarChart3, Package, ShoppingCart, Users, Settings, Home, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminView } from "@/pages/Admin";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
  isOpen: boolean;
}

const sidebarItems = [
  { id: "dashboard" as AdminView, label: "Dashboard", icon: BarChart3 },
  { id: "products" as AdminView, label: "Products", icon: Package },
  { id: "orders" as AdminView, label: "Orders", icon: ShoppingCart },
  { id: "analytics" as AdminView, label: "Analytics", icon: BarChart3 },
];

export const AdminSidebar = ({ currentView, onViewChange, isOpen }: AdminSidebarProps) => {
  return (
    <aside className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r transition-all duration-300 z-30",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="p-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start transition-all",
                  isOpen ? "px-4" : "px-2 justify-center",
                  isActive && "bg-primary text-primary-foreground shadow-md"
                )}
                onClick={() => onViewChange(item.id)}
              >
                <IconComponent className={cn("h-5 w-5", isOpen && "mr-3")} />
                {isOpen && <span>{item.label}</span>}
              </Button>
            );
          })}
        </nav>

        {isOpen && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Quick Actions</h3>
            <Button 
              variant="outline" 
              className="w-full justify-start mb-2"
              onClick={() => onViewChange("products")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};