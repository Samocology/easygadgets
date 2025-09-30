import { BarChart3, Package, ShoppingCart, Users, Settings, Home, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminView } from "@/pages/Admin";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
  isOpen: boolean;
  onClose: () => void;
}

const sidebarItems = [
  { id: "dashboard" as AdminView, label: "Dashboard", icon: BarChart3 },
  { id: "products" as AdminView, label: "Products", icon: Package },
  { id: "orders" as AdminView, label: "Orders", icon: ShoppingCart },
  { id: "analytics" as AdminView, label: "Analytics", icon: BarChart3 },
];

export const AdminSidebar = ({ currentView, onViewChange, isOpen, onClose }: AdminSidebarProps) => {
  const handleNavClick = (view: AdminView) => {
    onViewChange(view);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <aside className={cn(
      "fixed left-0 top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] bg-card border-r transition-all duration-300 z-30 shadow-lg lg:shadow-none",
      isOpen ? "w-64" : "w-0 lg:w-16",
      !isOpen && "lg:border-r"
    )}>
      <div className={cn(
        "p-3 sm:p-4 h-full overflow-y-auto",
        !isOpen && "lg:p-2"
      )}>
        <nav className="space-y-1 sm:space-y-2">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start transition-all text-sm sm:text-base",
                  isOpen ? "px-3 sm:px-4" : "lg:px-2 lg:justify-center px-3",
                  isActive && "bg-primary text-primary-foreground shadow-md"
                )}
                onClick={() => handleNavClick(item.id)}
              >
                <IconComponent className={cn("h-4 w-4 sm:h-5 sm:w-5", isOpen && "mr-2 sm:mr-3")} />
                {isOpen && <span>{item.label}</span>}
                {!isOpen && <span className="lg:hidden">{item.label}</span>}
              </Button>
            );
          })}
        </nav>

        {isOpen && (
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t">
            <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2 sm:mb-3 px-1">Quick Actions</h3>
            <Button 
              variant="outline" 
              className="w-full justify-start mb-2 text-sm"
              onClick={() => handleNavClick("products")}
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