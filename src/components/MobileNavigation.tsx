import { User, Clock, Plus, MessageCircle,} from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import Addpost from "./Footer/Addpost";
import Pending from "./Footer/PledgeCard";
import {useDispatch,useSelector} from 'react-redux'
import { Chats } from "./Footer/ChatList";
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';
//import SwipeableViews from 'react-swipeable-views';
import Pledges from "./Footer/PledgeCard";
import {
  Sheet,
  SheetContent,

  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DollarSign } from 'lucide-react';

import { useCallback ,useEffect} from "react";
import { 
  increment, 
  decrement, 
  incrementByAmount, 
  reset,
  incrementAsync 
} from '../components/ReduxPages/slices/counterSlice'
import { useAppDispatch, useAppSelector } from '../components/ReduxPages/reducers/store';
import {Account} from './Footer/Account'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"








interface footerLay {
  footerOverlay: string;

}

const MobileNavigation = () => {

  const location = useLocation();
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const[myValue,setValue]=useState("")
//   const dispatch = useDispatch()
       // const  Value=useSelector((state)=>state.footerOverlay)
        //const footerLay: footerLay = useSelector<footerLay>((state) => state.footerOverlay);
          const dispatch = useAppDispatch();
  const { value, status } = useAppSelector((state) => state.counter);

      const handleChange = ( newValue:string) => {
        setActiveDrawer(newValue)
      

             dispatch({type:"footerOverlay",payload:newValue})
             setValue(newValue);
        

       // setHeight("h-[50px]");
  
      console.log(newValue)

    };
const handleIncrement = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);









        useEffect(() => {
          console.log(value)
          
            
             
                
    
          
        }, [value])
        






  const navItems = [
    {
      icon: User,
      label: "profile",
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

  const getDrawerContent = (id: string) => {
    console.log(id)
    switch (id) {
      case "account":
        return {
        
          content: (
            <div className="p-6 space-y-4 overflow-y-auto  ">
            <Account/>
            </div>
          )
        };
      case "pending":
        return {
          title: "Awaiting Amin",
          description: "apply to be admin,supervise the gig",
          content: (
            <div className="p-6 space-y-4 overflow-y-auto">
              <Pledges/>
          
            </div>
          )
        };
      case "addpost":
        return {
          
          content: (
            <div className="p-1 space-y-1">
            <Addpost/>
            </div>
          )
        };
      case "chats":
        return {
          title: "Chat history",
          description: "Your messages and conversations",
          content: (
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <Chats/>
                
              </div>
            </div>
          )
        };
      default:
        return { title: "", description: "", content: null };
    }
  };

  return (
    <div className="z-100">
 <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="absolute  rounded-e-full z-40 top-5  text-[#300669] right-5"><Menu /></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <div className="fixed top-20 right-0 z-50 ">
        <div className="bg-white border-t border-border shadow-strong rounded-xl">
          <div className="grid grid-row-4 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleChange(item.id)}
                  className={`flex flex-col items-center justify-center  rounded-lg transition-all duration-200 ${
                    activeDrawer === item.id
                      ? "bg-primary text-gray shadow-soft"
                      : "text-gray hover:text-primary-dark hover:bg-accent"
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
       
      </DropdownMenuContent>
    </DropdownMenu>































    <>
      

      {/* Drawers for each navigation item */}
      {navItems.map((item) => {
        const drawerContent = getDrawerContent(item.id);
        return (
          <Sheet
            key={item.id}
            open={activeDrawer === item.id}
            onOpenChange={(open) => !open && handleChange("null")}
          >
            <SheetContent className="h-screen bottom-0 mt-[400px]  lg:mr-[300px] transition-transform duration-500 ease-out w-[400px] 
             rounded-lg right-0" side="right">
              <SheetHeader>
                <SheetTitle>{drawerContent.title}</SheetTitle>
                <SheetDescription>{drawerContent.description}</SheetDescription>
              </SheetHeader>
              {drawerContent.content}
            </SheetContent>
          </Sheet>
        );
      })}
    </>
    </div>
  );
};

export default MobileNavigation;