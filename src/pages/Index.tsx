import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

import MobileNavigation from "@/components/Menu/MobileNavigation";
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
import GamesCard from "@/components/Home/Games/GamesCard";
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
     
      
    <div className="md:flex flex-row w-full  hidden">
       <div className="hidden md:flex"> 
        <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
     
      </main>
    </SidebarProvider>
    </div>



 <div className="flex-col  ">
      <div className="sm:hidden md:block"><Header />      </div>
     <div><HeroSection/></div>
      <div className="flex flex-row min-h-screen w-full">
  {/* Left Column - Posts */}
  <div className="hidden md:flex flex-1 max-w-[600px]">
    <Posts/>
  </div>
  
  {/* Right Column - GamesCard */}
  
   <div className="hidden md:flex  max-w-[900px] overflow-auto">
    <GamesCard/>
  </div>
  {/* Mobile View - Show only one component at a time */}
  
</div>
     
      </div>
      </div>
      
      {/* Job Listings Section */}
      


      
      <MobileNavigation />
      <div className="md:hidden"><BottomNavigation/></div>
      
     
      
    </div>
  );
};

export default Index;
