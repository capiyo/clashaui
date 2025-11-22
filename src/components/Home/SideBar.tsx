import { useState, useCallback } from "react";
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  Calendar, 
  MessageSquare, 
  ShoppingBag, 
  Heart, 
  Leaf,
  Zap,
  Sparkles
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import loga from "../../assets/laptop.jpeg"
import { setLaydata } from "../ReduxPages/slices/overlaySlice";
import { incrementByAmount } from "../ReduxPages/slices/counterSlice";
import { useAppDispatch, useAppSelector } from '../ReduxPages/reducers/store';

const navigationItems = [
  { title: "home", icon: Home },
  { title: "pending", icon: BarChart3 },
  { title: "post", icon: Users },
  { title: "softwawre", url: "/documents", icon: FileText },
  { title: "calendar", url: "/calendar", icon: Calendar },
  { title: "messages", url: "/messages", icon: MessageSquare },
  { title: "products", url: "/products", icon: ShoppingBag },
  { title: "favorites", url: "/favorites", icon: Heart },
  { title: "nature", url: "/nature", icon: Leaf },
  { title: "settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useAppDispatch();
  const { value, status } = useAppSelector((state) => state.counter);

  const handleClick = () => {};

  const isActive = (path: string) => currentPath === path;
  const hasActiveItem = navigationItems.some((item) => isActive(item.url));

  const handleIncrementByAmount = useCallback((myValue: string) => {
    dispatch(setLaydata(myValue));
  }, [dispatch]);

  return (
    <Sidebar className="bg-gradient-to-b from-cyan-50 via-cyan-50/80 to-blue-50/60 border-cyan-200/50 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
      <SidebarHeader className="p-6 border-b border-cyan-200/40 bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/25 ring-2 ring-white/20 backdrop-blur-sm">
            <img src={loga} className="rounded-xl w-10 h-10 object-cover ring-1 ring-white/30" />
          </div>
          {open && (
            <div className="flex flex-col">
              <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                @capiyo
              </h2>
              <p className="text-xs text-cyan-600/70 font-medium">
                engineercpiyo@gmail.com
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-cyan-600/80 font-semibold mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton   
                      asChild 
                      className={`
                        group relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer 
                        border border-transparent
                        ${active 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/40 ring-2 ring-cyan-200/50 font-semibold transform scale-[1.02]' 
                          : 'hover:bg-white/80 hover:shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-200/50 hover:transform hover:scale-[1.02] text-cyan-700/80'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 px-3 py-3">
                        <div className={`
                          relative transition-all duration-300 group-hover:scale-110
                          ${active ? 'text-white' : 'text-cyan-500 group-hover:text-cyan-600'}
                        `}>
                          <item.icon className="h-5 w-5 relative z-10" />
                          {active && (
                            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
                          )}
                        </div>
                        {open && (
                          <span className="text-sm font-medium transition-colors duration-300" onClick={() => handleIncrementByAmount(item.title)}>
                            {item.title}
                          </span>
                        )}
                        {active && (
                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        )}
                        {/* Animated border effect on hover */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        {open && (
          <div className="mt-8 p-5 bg-gradient-to-br from-cyan-400/10 via-blue-400/5 to-cyan-400/10 rounded-2xl border border-cyan-200/40 shadow-lg shadow-cyan-500/10 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-cyan-700 mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-500" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start bg-white/60 hover:bg-white border-cyan-200 text-cyan-700 hover:text-cyan-800 hover:shadow-md hover:border-cyan-300 transition-all duration-300 group"
              >
                <Calendar className="h-4 w-4 mr-2 text-cyan-500 group-hover:scale-110 transition-transform" />
                Schedule Meeting
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start bg-white/60 hover:bg-white border-cyan-200 text-cyan-700 hover:text-cyan-800 hover:shadow-md hover:border-cyan-300 transition-all duration-300 group"
              >
                <FileText className="h-4 w-4 mr-2 text-cyan-500 group-hover:scale-110 transition-transform" />
                Create Report
              </Button>
            </div>
          </div>
        )}

        {/* Status Indicator */}
        {open && (
          <div className="mt-6 p-3 bg-cyan-500/5 rounded-xl border border-cyan-200/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-cyan-600/80 font-medium">All systems operational</span>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}