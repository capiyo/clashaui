import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

import MobileNavigation from "@/components/MobileNavigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Drawer } from "@/components/ui/drawer";
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Home/SideBar";
import Base from "@/components/Slider/base";
import SlidingPagesToggle from "@/components/components/SlidingPagesToggle";
import GamesCard from "@/components/GamesCard";
import Posts from "@/components/Footer/Posts";
import JobCard  from "@/components/Core/JobCard"
import Gamer from "@/components/Gamer";
import {
 
  
  DropdownMenuPortal,
 
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
 
} from "@/components/ui/dropdown-menu"
import { BottomNavigation } from "@/components/Footer/BottomNavigation";





const Index = () => {


  return (
    <div className="h-screen bg-background flex-row    overflow-hidden  md:flex ">
     
      
    
      <div className=""><BottomNavigation/></div>
      
     
      
    </div>
  );
};

export default Index;
