import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Trophy, 
  Users, 
  Clock, 
  MessageSquare,
  Heart, 
  Share2,
  Play,
  Star,
  Target,
  Zap,
  Sparkles
} from "lucide-react";
import GamesCard from "../GamesCard";
import Posts from "../Footer/Posts";

type PageType = "games" | "posts";

const SlidingPagesToggle = () => {
  const [activePage, setActivePage] = useState<PageType>("games");

  const gamesData = [
    {
      id: 1,
      title: "Cyber Racing 2077",
      genre: "Racing",
      players: "1.2k",
      rating: 4.8,
      status: "Online",
      image: "🏎️"
    },
    {
      id: 2,
      title: "Space Warriors",
      genre: "Action",
      players: "3.5k",
      rating: 4.6,
      status: "Online",
      image: "🚀"
    },
    {
      id: 3,
      title: "Mystery Quest",
      genre: "Adventure",
      players: "890",
      rating: 4.9,
      status: "New",
      image: "🗝️"
    },
    {
      id: 4,
      title: "Battle Arena",
      genre: "Strategy",
      players: "2.1k",
      rating: 4.7,
      status: "Popular",
      image: "⚔️"
    }
  ];

  const postsData = [
    {
      id: 1,
      author: "Alex Chen",
      handle: "@alexgamer",
      time: "2h ago",
      content: "Just discovered this amazing indie game! The graphics are absolutely stunning and the gameplay is so addictive. Can't put it down! 🎮",
      likes: 24,
      comments: 8,
      shares: 3
    },
    {
      id: 2,
      author: "Sarah Kim",
      handle: "@sarahk",
      time: "4h ago",
      content: "Anyone else excited for the new gaming tournament next week? The prize pool is insane! Who's participating? 🏆",
      likes: 156,
      comments: 42,
      shares: 18
    },
    {
      id: 3,
      author: "Mike Torres",
      handle: "@miket",
      time: "6h ago",
      content: "Pro tip: Always check your settings before joining competitive matches. Lost 3 games in a row because of wrong key bindings 😅",
      likes: 89,
      comments: 23,
      shares: 12
    },
    {
      id: 4,
      author: "Luna Wang",
      handle: "@lunaw",
      time: "8h ago",
      content: "Building my first gaming PC! Any recommendations for a good graphics card under $500? Looking for 1440p gaming performance. 💻",
      likes: 67,
      comments: 34,
      shares: 9
    }
  ];

  const PostsPage = () => (
    <div className="space-y-6 p-4">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent">
          COMMUNITY BUZZ
        </h2>
        <p className="text-gray-600 text-sm font-light">Join the betting conversation & share your wins</p>
      </div>
      
      <div className="space-y-4">
        {postsData.map((post) => (
          <Card key={post.id} className="bg-white/90 backdrop-blur-xl border border-cyan-200/60 rounded-xl shadow-lg hover:shadow-cyan-200/30 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10 border border-cyan-300/50">
                  <AvatarFallback className="bg-cyan-500/10 text-cyan-700 font-semibold">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-gray-800">{post.author}</span>
                    <span className="text-cyan-600">{post.handle}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 flex items-center gap-1 text-xs">
                      <Clock className="h-3 w-3" />
                      {post.time}
                    </span>
                  </div>
                  
                  <p className="text-sm leading-relaxed text-gray-700">{post.content}</p>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <button className="flex items-center gap-1 text-gray-500 hover:text-cyan-600 transition-colors group">
                      <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-cyan-600 transition-colors group">
                      <MessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-cyan-600 transition-colors group">
                      <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold">{post.shares}</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
  <div className="h-screen overflow-auto bg-gradient-to-br from-white via-cyan-50 to-blue-50">
    {/* Content Area with Sliding Pages */}
    <div className="max-w-6xl mx-auto">
      <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
        {/* Games Page */}
        <div 
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
            activePage === "games" ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="overflow-auto h-full">
            <GamesCard />
          </div>
        </div>
        
        {/* Posts Page */}
        <div 
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
            activePage === "posts" ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="overflow-auto h-full">
            <PostsPage />
          </div>
        </div>
      </div>
    </div>

    {/* Modern Cyan Sliding Toggle - CORRECTED */}
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative bg-white/95 backdrop-blur-xl border border-cyan-200/60 rounded-full p-1 shadow-2xl shadow-cyan-500/20">
        {/* Sliding Background */}
        <div 
          className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full transition-all duration-500 ease-in-out ${
            activePage === "posts" ? "translate-x-full" : "translate-x-0"
          }`}
        />
        
        {/* Buttons - CORRECTED */}
        <div className="relative flex items-center">
          <button
            onClick={() => setActivePage("games")}
            className={`relative z-10 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
              activePage === "games" 
                ? "text-white" 
                : "text-cyan-700 hover:text-cyan-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <Target className={`h-4 w-4 ${activePage === "games" ? "text-white" : "text-cyan-600"}`} />
              BETS
            </div>
          </button>

          <button
            onClick={() => setActivePage("posts")}
            className={`relative z-10 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
              activePage === "posts" 
                ? "text-white" 
                : "text-cyan-700 hover:text-cyan-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className={`h-4 w-4 ${activePage === "posts" ? "text-white" : "text-cyan-600"}`} />
              FEED
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
);
};

export default SlidingPagesToggle;