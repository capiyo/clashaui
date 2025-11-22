import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Gamepad2, 
  Trophy, 
  Users, 
  Clock, 
  MessageSquare, 
  Heart, 
  Share2,
  Play,
  Star,
  Target
} from "lucide-react";
import GamesCard from "../GamesCard";
import Posts from "../Footer/Posts";

type PageType = "games" | "posts";

const SlidingPagesToggle = () => {
  const [activePage, setActivePage] = useState<PageType>("games");

  
  
  
    

  return (
    <div className="h-screen bg-red   overflow-y-scroll">
      {/* Header */}
     

      {/* Content Area with Sliding Pages */}
      <div className="sm:w-screen  pb-10">
        <div className="page-slide-container min-h-[calc(100vh-80px)]">
          <div 
            className={`page-slide ${
              activePage === "games" ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Posts/>
          </div>
          <div 
            className={`page-slide ${
              activePage === "posts" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <GamesCard/>
          </div>
        </div>
      </div>

      {/* Bottom Fixed Sliding Toggle */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50">
        <div className="sliding-toggle w-48 shadow-lg backdrop-blur-md bg-cyan-600 border border-border">
          <div 
            className={`sliding-toggle-slider ${
              activePage === "posts" ? "translate-x-full" : "translate-x-0"
            }`}
          />
          <button
            onClick={() => setActivePage("games")}
            className={`sliding-toggle-button  text-black  ${
              activePage === "games" ? "sliding-toggle-active" : "sliding-toggle-inactive"
            }`}
          >
            
            posts
          </button>
          <button
            onClick={() => setActivePage("posts")}
            className={`sliding-toggle-button  text-black  ${
              activePage === "posts" ? "sliding-toggle-active" : "sliding-toggle-inactive"
            }`}
          >
          
            games
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlidingPagesToggle;