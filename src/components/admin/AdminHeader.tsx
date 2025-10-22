import { useState, useEffect } from "react";
import { Menu, Bell, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { ProfileSettings } from "./ProfileSettings";
import { SettingsPanel } from "./SettingsPanel";
import { NotificationDropdown } from "./NotificationDropdown";
import { adminService, AdminProfile } from "@/services/adminService";
import { notificationService } from "@/services/notificationService";

interface AdminHeaderProps {
  onMenuToggle: () => void;
  sidebarOpen: boolean;
}

export const AdminHeader = ({ onMenuToggle, sidebarOpen }: AdminHeaderProps) => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [profile, setProfile] = useState<AdminProfile | null>(null);

  useEffect(() => {
    // Fetch admin profile
    const fetchProfile = async () => {
      try {
        const profileData = await adminService.getProfile();
        setProfile(profileData);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();

    // Initial fetch of unread count
    const fetchUnreadCount = async () => {
      try {
        const data = await notificationService.getNotifications(1, 1);
        setUnreadCount(data.unreadCount || 0);
      } catch (error) {
        console.error('Failed to fetch unread count:', error);
      }
    };

    fetchUnreadCount();

    // Set up polling for real-time updates (every 30 seconds)
    const interval = setInterval(fetchUnreadCount, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    navigate("/admin/login");
  };

  return (
    <header className="h-14 sm:h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-40 shadow-sm">
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 h-full">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onMenuToggle}
            className="hover:bg-muted h-8 w-8 sm:h-10 sm:w-10"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent tracking-tight">
              EasyGadgets
            </h1>
            <div className="hidden sm:block">
              <h2 className="text-base sm:text-xl font-semibold text-foreground">Admin Dashboard</h2>
              <p className="text-xs sm:text-sm text-muted-foreground hidden md:block">Management Portal</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
          {/* Notifications */}
          <NotificationDropdown
            unreadCount={unreadCount}
            onUnreadCountChange={setUnreadCount}
          />

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2">
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-xs sm:text-sm">AD</AvatarFallback>
                </Avatar>
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-medium">{profile?.name || "Admin User"}</p>
                  <p className="text-xs text-muted-foreground">{profile?.email || "admin@easygadgets.com"}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 sm:w-56">
              <DropdownMenuItem onClick={() => setProfileOpen(true)}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/')}>
                <LogOut className="mr-2 h-4 w-4" />
                Back to Store
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Profile and Settings Modals */}
      <ProfileSettings open={profileOpen} onOpenChange={setProfileOpen} />
      <SettingsPanel open={settingsOpen} onOpenChange={setSettingsOpen} />
    </header>
  );
};