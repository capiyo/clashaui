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
  Sparkles,
  Trophy,
  Target,
  TrendingUp,
  Flame,
  Coins,
  Wallet,
  Shield,
  Award,
  Swords,
  Bell,
  Clock,
  TrendingDown,
  Percent,
  BarChart,
  TargetIcon,
  Crown,
  Users2,
  Settings2,
  Gamepad2,
  Radio,
  MapPin,
  Building2,
  ThumbsUp,
  Eye,
  UserPlus,
  Share2,
  Calendar as CalendarIcon,
  Heart as HeartIcon,
  MessageSquare as MessageSquareIcon,
  Bookmark,
  MoreHorizontal,
  RefreshCw,
  ImageIcon,
  DollarSign
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import loga from "../../assets/laptop.jpeg"
import { setLaydata } from "../ReduxPages/slices/overlaySlice";
import { incrementByAmount } from "../ReduxPages/slices/counterSlice";
import { useAppDispatch, useAppSelector } from '../ReduxPages/reducers/store';

// BETTING APP COLOR THEME
const BETTING_THEME = {
  primary: {
    from: "from-emerald-600",
    to: "to-emerald-700",
    bg: "bg-emerald-600",
    text: "text-emerald-600",
    border: "border-emerald-600",
    hover: "hover:bg-emerald-700",
    gradient: "bg-gradient-to-r from-emerald-600 to-emerald-700",
    light: "bg-emerald-600/10",
    dark: "bg-emerald-900/30"
  },
  background: {
    main: "bg-gray-950",
    secondary: "bg-gray-900",
    card: "bg-gray-900/80",
    overlay: "bg-gray-900/40"
  },
  accent: {
    success: "text-emerald-400",
    warning: "text-yellow-400",
    danger: "text-red-400",
    info: "text-cyan-400"
  },
  text: {
    primary: "text-white",
    secondary: "text-gray-300",
    muted: "text-gray-400",
    accent: "text-emerald-300"
  }
};

const navigationItems = [
  { title: "Dashboard", icon: Home, badge: "VIP", color: "emerald" },
  { title: "Live Bets", icon: Flame, badge: "24/7", color: "red" },
  { title: "P2P Arena", icon: Swords, badge: "HOT", color: "orange" },
  { title: "Stats", icon: TrendingUp, badge: null, color: "blue" },
  { title: "History", icon: BarChart3, badge: null, color: "purple" },
  { title: "Community", icon: Users2, badge: "2.4K", color: "cyan" },
  { title: "Tips", icon: Target, badge: "PRO", color: "yellow" },
  { title: "Wallet", icon: Wallet, badge: null, color: "green" },
  { title: "Notifications", icon: Bell, badge: "3", color: "pink" },
  { title: "Settings", icon: Settings2, badge: null, color: "gray" },
];

const quickBetOptions = [
  { title: "Quick Bet", icon: Zap, color: "emerald" },
  { title: "Parlay", icon: Award, color: "orange" },
  { title: "Live", icon: TargetIcon, color: "red" },
  { title: "My Picks", icon: Crown, color: "yellow" },
];

const bettingStats = {
  totalWins: 42,
  winRate: 68,
  totalProfit: 1250.75,
  activeBets: 7
};

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useAppDispatch();
  const [userBalance, setUserBalance] = useState(1250.75);

  const isActive = (path: string) => currentPath === path;

  const handleIncrementByAmount = useCallback((myValue: string) => {
    dispatch(setLaydata(myValue));
  }, [dispatch]);

  const getColorClass = (color: string, type: 'bg' | 'text' | 'border' = 'bg') => {
    const colorMap: Record<string, Record<string, string>> = {
      emerald: {
        bg: "from-emerald-600 to-emerald-700",
        text: "text-emerald-400",
        border: "border-emerald-600"
      },
      red: {
        bg: "from-red-600 to-red-700",
        text: "text-red-400",
        border: "border-red-600"
      },
      orange: {
        bg: "from-orange-600 to-orange-700",
        text: "text-orange-400",
        border: "border-orange-600"
      },
      blue: {
        bg: "from-blue-600 to-blue-700",
        text: "text-blue-400",
        border: "border-blue-600"
      },
      purple: {
        bg: "from-purple-600 to-purple-700",
        text: "text-purple-400",
        border: "border-purple-600"
      },
      cyan: {
        bg: "from-cyan-600 to-cyan-700",
        text: "text-cyan-400",
        border: "border-cyan-600"
      },
      yellow: {
        bg: "from-yellow-600 to-yellow-700",
        text: "text-yellow-400",
        border: "border-yellow-600"
      },
      green: {
        bg: "from-green-600 to-green-700",
        text: "text-green-400",
        border: "border-green-600"
      },
      pink: {
        bg: "from-pink-600 to-pink-700",
        text: "text-pink-400",
        border: "border-pink-600"
      },
      gray: {
        bg: "from-gray-600 to-gray-700",
        text: "text-gray-400",
        border: "border-gray-600"
      }
    };
    return colorMap[color]?.[type] || colorMap.emerald[type];
  };

  return (
    <Sidebar className={`${BETTING_THEME.background.main} border-r border-emerald-800/30 shadow-2xl backdrop-blur-xl transition-all duration-300`}>
      <SidebarHeader className="p-6 border-b border-emerald-800/30 bg-gradient-to-r from-emerald-900/20 to-gray-900/20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-14 h-14 border-2 border-emerald-600 shadow-2xl ring-2 ring-emerald-500/30">
              <AvatarImage src={loga} className="rounded-full" />
              <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white text-lg font-bold">
                CB
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
              <Crown className="w-3 h-3 text-white" />
            </div>
          </div>
          {open && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  @capiyo
                </h2>
                <Badge className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs px-2 py-0.5">
                  VIP PRO
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Wallet className="h-3 w-3 text-emerald-400" />
                <p className="text-sm text-emerald-300 font-medium">
                  ₿{userBalance.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* User Stats */}
      {open && (
        <div className="px-6 py-4 border-b border-emerald-800/30">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-gradient-to-br from-emerald-900/30 to-gray-900/30 rounded-lg p-3 border border-emerald-800/30">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="h-3 w-3 text-emerald-400" />
                <p className="text-emerald-300/80 text-xs">Win Rate</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-white text-lg font-bold">{bettingStats.winRate}%</p>
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
              <Progress value={bettingStats.winRate} className="h-1 mt-2 bg-gray-800/50">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" />
              </Progress>
            </div>
            <div className="bg-gradient-to-br from-emerald-900/30 to-gray-900/30 rounded-lg p-3 border border-emerald-800/30">
              <div className="flex items-center gap-2 mb-1">
                <Coins className="h-3 w-3 text-emerald-400" />
                <p className="text-emerald-300/80 text-xs">Profit</p>
              </div>
              <p className="text-white text-lg font-bold">₿{bettingStats.totalProfit}</p>
            </div>
          </div>
        </div>
      )}

      <SidebarContent className="p-4">
        {/* Quick Bet Actions */}
        {open && (
          <SidebarGroup className="mb-6">
            <SidebarGroupLabel className="text-emerald-300/80 font-semibold mb-3 text-xs uppercase tracking-wider">
              Quick Bet
            </SidebarGroupLabel>
            <div className="grid grid-cols-2 gap-2">
              {quickBetOptions.map((item) => (
                <Button
                  key={item.title}
                  className={`h-10 bg-gradient-to-br ${getColorClass(item.color, 'bg')} hover:opacity-90 text-white border-0 shadow-lg text-xs font-bold transition-all duration-200`}
                >
                  <item.icon className="h-3 w-3 mr-1" />
                  {item.title}
                </Button>
              ))}
            </div>
          </SidebarGroup>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-emerald-300/80 font-semibold mb-3 text-xs uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton   
                      asChild 
                      className={`
                        group relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer 
                        border border-emerald-900/30
                        ${active 
                          ? `bg-gradient-to-r ${getColorClass(item.color, 'bg')} text-white shadow-xl ring-2 ring-emerald-500/30 font-bold transform scale-[1.02]` 
                          : 'hover:bg-gray-800/50 hover:shadow-lg hover:border-emerald-800/50 hover:transform hover:scale-[1.02] text-gray-400 hover:text-white'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`
                            relative transition-all duration-300 group-hover:scale-110
                            ${active ? 'text-white' : getColorClass(item.color, 'text')}
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
                        </div>
                        {open && item.badge && (
                          <Badge className={`
                            text-xs px-2 py-0.5 font-bold
                            ${active 
                              ? 'bg-white/20 text-white' 
                              : 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/50'
                            }
                          `}>
                            {item.badge}
                          </Badge>
                        )}
                        {active && (
                          <div className="absolute inset-0 bg-white/10 animate-pulse" />
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Active Bets */}
        {open && (
          <div className="mt-8 p-4 bg-gradient-to-br from-emerald-900/20 to-gray-900/20 rounded-2xl border border-emerald-800/30 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Flame className="h-4 w-4 text-emerald-400" />
                Active Bets
              </h3>
              <Badge className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs px-2 py-0.5">
                {bettingStats.activeBets}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Football</span>
                <span className="text-emerald-400 font-bold">+₿120</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Basketball</span>
                <span className="text-yellow-400 font-bold">Pending</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Tennis</span>
                <span className="text-emerald-400 font-bold">+₿75</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3 justify-center bg-emerald-900/20 hover:bg-emerald-900/40 border-emerald-800/50 text-emerald-400 hover:text-emerald-300 hover:shadow-md transition-all duration-300 group text-xs"
            >
              <BarChart className="h-3 w-3 mr-2 group-hover:scale-110 transition-transform" />
              View All
            </Button>
          </div>
        )}

        {/* Deposit CTA */}
        {open && (
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-900/30 to-emerald-800/20 rounded-xl border border-emerald-700/50">
            <div className="text-center">
              <Coins className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-white mb-1">Boost Your Balance</p>
              <p className="text-emerald-300/80 text-xs mb-3">Deposit for 20% bonus</p>
              <Button 
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-xl text-xs font-bold py-2"
              >
                <Wallet className="h-3 w-3 mr-2" />
                Deposit Now
              </Button>
            </div>
          </div>
        )}
      </SidebarContent>

      {/* Bottom Status Bar */}
      {open && (
        <div className="p-4 border-t border-emerald-800/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
              </div>
              <span className="text-xs text-emerald-400 font-medium">Live</span>
            </div>
            <Badge variant="outline" className="border-emerald-800/50 text-emerald-400 text-xs">
              v2.4.1
            </Badge>
          </div>
        </div>
      )}
    </Sidebar>
  );
}