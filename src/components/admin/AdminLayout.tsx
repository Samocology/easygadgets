import { ReactNode, useState, useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminView } from "@/pages/Admin";

interface AdminLayoutProps {
  children: ReactNode;
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
}

export const AdminLayout = ({ children, currentView, onViewChange }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-muted/10">
      <AdminHeader 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex">
        <AdminSidebar 
          currentView={currentView}
          onViewChange={onViewChange}
          isOpen={sidebarOpen}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-16'
        }`}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};