import { User, Clock, Plus, MessageCircle, Menu } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Addpost from "../Footer/Addpost";
import Pledges from "../Footer/PledgeCard";
import { Chats } from "../Footer/ChatList";
import { Account } from './Account';
import { useAppDispatch } from '../ReduxPages/reducers/store';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  id: string;
  isActive: boolean;
}

const MobileNavigation = () => {
  const location = useLocation();
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const navItems: NavItem[] = [
    {
      icon: User,
      label: "account",
      id: 'account',
      isActive: location.pathname === "/account",
    },
    {
      icon: Plus,
      label: "post",
      id: "addpost",
      isActive: location.pathname === "/chats",
    },
    {
      icon: Clock,
      label: "pledges",
      id: 'pending',
      isActive: location.pathname === "/pending",
    },
    {
      icon: MessageCircle,
      label: "chats",
      id: "chats",
      isActive: location.pathname === "/chats",
    },
  ];

  const handleChange = (id: string | null) => {
    setActiveDrawer(id);
    dispatch({ type: "footerOverlay", payload: id });
  };

  const getDrawerContent = (id: string) => {
    switch (id) {
      case "account":
        return {
          content: <Account />,
          title: "Your Account",
          description: "Manage your profile and settings"
        };
      case "pending":
        return {
          title: "Awaiting Admin",
          description: "Apply to be admin, supervise the gig",
          content: <Pledges />
        };
      case "addpost":
        return {
          title: "Create Post",
          description: "Share something with the community",
          content: <Addpost />
        };
      case "chats":
        return {
          title: "Chat History",
          description: "Your messages and conversations",
          content: <Chats />
        };
      default:
        return { 
          title: "", 
          description: "", 
          content: null 
        };
    }
  };

  return (
    <div className="z-100">
      {/* Dropdown Menu Trigger */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="absolute rounded-e-full z-40 top-5 text-[#300669] right-5 p-2 hover:bg-gray-100 transition-colors">
            <Menu className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeDrawer === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleChange(item.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[#300669] text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#300669]"
                    }`}
                  >
                    <Icon className="h-5 w-5 mb-1" />
                    <span className="text-xs font-medium capitalize">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Drawers for each navigation item */}
      {navItems.map((item) => {
        const drawerContent = getDrawerContent(item.id);
        
        return (
          <Sheet
            key={item.id}
            open={activeDrawer === item.id}
            onOpenChange={(open) => !open && handleChange(null)}
          >
            <SheetContent 
              className="h-screen bottom-0 mt-[400px] lg:mr-[300px] transition-transform duration-500 ease-out w-[400px] rounded-lg right-0" 
              side="right"
            >
              <SheetHeader>
                <SheetTitle>{drawerContent.title}</SheetTitle>
                <SheetDescription>{drawerContent.description}</SheetDescription>
              </SheetHeader>
              {drawerContent.content}
            </SheetContent>
          </Sheet>
        );
      })}
    </div>
  );
};

export default MobileNavigation;