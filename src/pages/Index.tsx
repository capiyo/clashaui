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





const Index = () => {


  return (
    <div className="h-screen bg-background flex-row    overflow-hidden  md:flex ">
     
      
    <div className="flex flex-row w-full">
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
      <div className="flex flex-row w-screen ">   
         <div className="hidden md:flex  lg:w-[700px]"><Posts/></div> 
     <div className="hidden md:flex   overflow-auto"><GamesCard/>
     </div>
     
     </div>
     
     
      </div>
      </div>
      
      {/* Job Listings Section */}
      


      
      <MobileNavigation />
      <div className="md:hidden"><SlidingPagesToggle/></div>
      
     
      
    </div>
  );
};

export default Index;
