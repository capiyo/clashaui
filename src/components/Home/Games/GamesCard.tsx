import { MapPin, Clock, DollarSign, Building2, ThumbsUp, Eye, MessageSquare, 
  Heart, Share2, Zap, TrendingUp, Calendar, Trophy, Users, Sparkles, Target, 
  UserPlus, Flame, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface GamesCardProps {
  away_team: string;
  home_team: string;
  date: string;
  draw: string;
  away_win: string;
  home_win: string;
  league: string;
}

const GamesCard = () => {
  const [myId, setMyId] = useState("");
  const [myName, setMyname] = useState("");
  const [workerEmail, setWorkerEmail] = useState("");
  const [games, setGames] = useState<GamesCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE_URL = 'https://clashaapi.onrender.com/api/games';

  const { toast } = useToast();

  // Team avatar images
  const teamAvatars = {
    team1: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=100&h=100&fit=crop",
    team2: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=100&h=100&fit=crop",
    team3: "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?w=100&h=100&fit=crop",
    user1: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    user2: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
    user3: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  };

  // Mock users for social proof
  const mockUsers = [
    { name: "Alex", avatar: teamAvatars.user1, bet: "₿50" },
    { name: "Sarah", avatar: teamAvatars.user2, bet: "₿120" },
    { name: "Mike", avatar: teamAvatars.user3, bet: "₿75" }
  ];

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      try {
        const user = JSON.parse(token);
        if (user) {
          setMyId(user._id);
          setMyname(user.userName);
          setWorkerEmail(user.userEmail);
        }
      } catch (err) {
        console.error("Error parsing user token:", err);
      }
    }
  }, []);

  useEffect(() => {
    const getGames = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchGames();
        setGames(data);
      } catch (err) {
        console.error("Error fetching games:", err);
        setError("Failed to load games");
        toast({
          title: "Error",
          description: "Failed to load games data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    getGames();
  }, []);

  async function fetchGames(): Promise<GamesCardProps[]> {
    try {
      console.log("Fetching games from:", API_BASE_URL);
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: GamesCardProps[] = await response.json();
      console.log("Games data received:", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch games:", error);
      throw error;
    }
  }

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Enhanced Stats Bar */}
      <div className="grid grid-cols-3 gap-3 mb-6 w-full max-w-[900px] mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg p-3 transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-gray-600" />
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-xs">live games</p>
              <p className="text-gray-700 text-lg">{games.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-3 transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <Zap className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">active now</p>
              <p className="text-gray-700 text-lg">24/7</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-3 transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">players</p>
              <p className="text-gray-700 text-lg">1.2K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="w-full max-w-[900px] mx-auto text-center py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-base">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-2 bg-red-600 hover:bg-red-700 text-white"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Scrollable Games Container - FIXED */}
      <div className="w-full max-w-[900px] mx-auto">
        <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-200 scrollbar-track-gray-100 hover:scrollbar-thumb-cyan-300 pr-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {games.map((game, key) => (
              <div key={key} className="w-full">
                <GameCardCyan games={game} teamAvatars={teamAvatars} mockUsers={mockUsers} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="w-full max-w-[900px] mx-auto text-center py-16">
          <div className="relative inline-block mb-4">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-500 text-base">Loading epic clashes...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && games.length === 0 && !error && (
        <div className="w-full max-w-[900px] mx-auto text-center py-16">
          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No games available at the moment</p>
            <p className="text-gray-400 text-sm mt-2">Check back later for new matches</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ... Keep the rest of your GameCardCyan component exactly the same ...
function GameCardCyan({ games, teamAvatars, mockUsers }: { games: GamesCardProps; teamAvatars: any; mockUsers: any[] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPledging, setIsPledging] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [amount, setAmount] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100) + 50);
  const [commentCount, setCommentCount] = useState(Math.floor(Math.random() * 30) + 10);
  const [followerCount, setFollowerCount] = useState(Math.floor(Math.random() * 500) + 200);
  const { toast } = useToast();

  const handlePledge = () => {
    if (!selectedOption || !amount) {
      toast({
        title: "Missing Information",
        description: "Please select a team and enter amount",
        variant: "destructive"
      });
      return;
    }

    const selectedTeam = selectedOption === "homeTeam" ? games.home_team : selectedOption === "awayTeam" ? games.away_team : "Draw";
    toast({
      title: "🎉 BET PLACED! 🎉",
      description: `₿${amount} on ${selectedTeam}`,
      className: "bg-green-500 text-white"
    });
    setIsPledging(false);
    setAmount("");
    setSelectedOption("");
  };

  const handleTeamSelect = (option: string) => {
    setSelectedOption(option);
    setAmount(""); // Reset amount when team changes
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? "💔 Like removed" : "❤️ Match liked!");
  };

  const handleComment = () => {
    toast.success("💬 Comments section opened!");
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
    toast.success(isFollowing ? "👋 Unfollowed match" : "✅ Following match!");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTeamAvatar = (teamName: string) => {
    const teams = [teamAvatars.team1, teamAvatars.team2, teamAvatars.team3];
    return teams[teamName.length % teams.length];
  };

  const getSelectedOdds = () => {
    switch (selectedOption) {
      case "homeTeam":
        return games.home_win;
      case "awayTeam":
        return games.away_win;
      case "draw":
        return games.draw;
      default:
        return "0.00";
    }
  };

  const calculatePayout = () => {
    if (!amount || !selectedOption) return "0.00";
    const odds = parseFloat(getSelectedOdds());
    const betAmount = parseFloat(amount);
    return (betAmount * odds).toFixed(2);
  };

  return (
    <div
      className="relative group cursor-pointer w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "relative transition-all duration-300 w-full",
        isHovered ? "scale-[1.02]" : "scale-100"
      )}>
        {/* Main Card - Fixed 450px width */}
        <Card className="relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-full min-h-[380px] h-auto">
          <CardHeader className="pb-2 pt-4 px-5">
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-white border border-cyan-200 text-cyan-600 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <Crown className="w-3 h-3" />
                {games.league.split(' ')[0].toLowerCase()}
              </Badge>
              <div className="flex items-center gap-1 text-gray-600 text-xs">
                <Calendar className="w-3 h-3 text-cyan-600" />
                <span>{formatDate(games.date)}</span>
              </div>
            </div>

            {/* Teams Section with Clear Clickable Areas */}
            <div className="text-center">
              <div className="flex items-center justify-between mb-3">
                {/* Home Team */}
                <div 
                  className="text-center flex-1 cursor-pointer transition-all duration-300 group/team"
                  onClick={() => handleTeamSelect("homeTeam")}
                >
                  <div className={cn(
                    "relative p-3 rounded-lg transition-all duration-300",
                    selectedOption === "homeTeam" 
                      ? "" 
                      : "border-transparent hover:border-cyan-300 hover:bg-cyan-50/50 group-hover/team:scale-105"
                  )}>
                    <div className="relative">
                      <Avatar className={cn(
                        "w-14 h-14 border-2 mx-auto mb-2 transition-all duration-300",
                        selectedOption === "homeTeam" 
                          ? "border-cyan-500 shadow-lg" 
                          : "border-cyan-200 group-hover/team:border-cyan-300"
                      )}>
                        <AvatarImage src={getTeamAvatar(games.home_team)} />
                        <AvatarFallback className="bg-cyan-100 text-cyan-600 text-sm">
                          {games.home_team.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {selectedOption === "homeTeam" && (
                        <div className="absolute -top-1 -right-1">
                          <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center shadow">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        </div>
                      )}
                    </div>
                    <p className={cn(
                      "text-sm truncate leading-tight transition-colors duration-300 font-medium",
                      selectedOption === "homeTeam" ? "text-cyan-700" : "text-gray-800"
                    )}>
                      {games.home_team}
                    </p>
                    <p className={cn(
                      "text-lg mt-1 transition-colors duration-300 font-bold",
                      selectedOption === "homeTeam" ? "text-cyan-600" : "text-cyan-500"
                    )}>
                      {games.home_win}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center mx-3">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-cyan-200 flex items-center justify-center shadow">
                    <span className="text-cyan-600 text-xs">VS</span>
                  </div>
                  {/* Draw Option */}
                  <div 
                    className={cn(
                      "mt-2 cursor-pointer transition-all duration-300 rounded-lg px-3 py-2 min-w-[70px] border-2",
                      selectedOption === "draw" 
                        ? "bg-cyan-500 text-white border-cyan-500 shadow-md scale-105" 
                        : "bg-white text-gray-600 border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300 hover:scale-105"
                    )}
                    onClick={() => handleTeamSelect("draw")}
                  >
                    <p className="text-xs font-medium">Draw</p>
                    <p className="text-xs font-bold">{games.draw}</p>
                  </div>
                </div>

                {/* Away Team */}
                <div 
                  className="text-center flex-1 cursor-pointer transition-all duration-300 group/team"
                  onClick={() => handleTeamSelect("awayTeam")}
                >
                  <div className={cn(
                    "relative p-3 rounded-lg transition-all duration-300",
                    selectedOption === "awayTeam" 
                      ? "" 
                      : "border-transparent hover:border-cyan-300 hover:bg-cyan-50/50 group-hover/team:scale-105"
                  )}>
                    <div className="relative">
                      <Avatar className={cn(
                        "w-14 h-14 border-2 mx-auto mb-2 transition-all duration-300",
                        selectedOption === "awayTeam" 
                          ? "border-cyan-500 shadow-lg" 
                          : "border-cyan-200 group-hover/team:border-cyan-300"
                      )}>
                        <AvatarImage src={getTeamAvatar(games.away_team)} />
                        <AvatarFallback className="bg-cyan-100 text-cyan-600 text-sm">
                          {games.away_team.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {selectedOption === "awayTeam" && (
                        <div className="absolute -top-1 -right-1">
                          <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center shadow">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        </div>
                      )}
                    </div>
                    <p className={cn(
                      "text-sm truncate leading-tight transition-colors duration-300 font-medium",
                      selectedOption === "awayTeam" ? "text-cyan-700" : "text-gray-800"
                    )}>
                      {games.away_team}
                    </p>
                    <p className={cn(
                      "text-lg mt-1 transition-colors duration-300 font-bold",
                      selectedOption === "awayTeam" ? "text-cyan-600" : "text-cyan-500"
                    )}>
                      {games.away_win}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 pb-4 px-5">
            {/* Selected Team Display - Minimal Circular Badge */}
            {selectedOption && (
              <div className="flex justify-center">
                <div className="bg-cyan-500 text-white rounded-full px-3 py-1.5 flex items-center gap-2 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <p className="text-xs font-medium">
                    {selectedOption === "homeTeam" 
                      ? games.home_team.substring(0, 10) 
                      : selectedOption === "awayTeam" 
                      ? games.away_team.substring(0, 10) 
                      : "Draw"}
                  </p>
                  <div className="w-0.5 h-0.5 bg-white/50 rounded-full"></div>
                  <p className="text-xs font-bold">{getSelectedOdds()}</p>
                </div>
              </div>
            )}

            {/* Amount Input - Only shows when team is selected */}
            {selectedOption && (
              <div className="space-y-2 animate-in fade-in duration-300">
                <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-cyan-600" />
                  Enter Bet Amount (₿)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 bg-white border border-cyan-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600/30 focus:border-cyan-500 transition-all text-base shadow"
                  />
                  <Button
                    onClick={() => setAmount("")}
                    variant="ghost"
                    size="sm"
                    className="h-10 px-3 text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </Button>
                </div>
                
                {/* Quick Amount Buttons */}
                <div className="flex gap-2">
                  {["10", "50", "100", "500"].map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(quickAmount)}
                      className="flex-1 text-xs h-8 bg-white border-cyan-200 text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700"
                    >
                      ₿{quickAmount}
                    </Button>
                  ))}
                </div>

                {/* Potential Payout */}
                {amount && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                    <p className="text-green-700 text-xs font-medium text-center">
                      🎯 Potential Payout: ₿{calculatePayout()}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Recent Bettors */}
            <div className="flex justify-between items-center">
              <div className="flex -space-x-2">
                {mockUsers.slice(0, 3).map((user, index) => (
                  <Avatar key={index} className="w-8 h-8 border-2 border-white shadow">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-cyan-100 text-cyan-600 text-xs">
                      {user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                +{mockUsers.length} placed bets
              </span>
            </div>

            {/* Social Interaction Buttons */}
            <div className="flex justify-center gap-3 pt-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-all duration-300 h-8 px-2 rounded-lg ${
                  isLiked 
                    ? "bg-pink-500/10 text-pink-600 border border-pink-300" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-700 border border-gray-200"
                }`}
              >
                <Heart 
                  className={`h-4 w-4 transition-all duration-300 ${
                    isLiked ? "fill-pink-500 text-pink-500" : ""
                  }`} 
                />
                <span className="text-xs">{likeCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleComment}
                className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-700 border border-gray-200 transition-all duration-300 h-8 px-2 rounded-lg"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs">{commentCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleFollow}
                className={`flex items-center space-x-1 transition-all duration-300 h-8 px-2 rounded-lg ${
                  isFollowing
                    ? "bg-cyan-100 text-cyan-600 border border-cyan-300 shadow"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-700 border border-gray-200"
                }`}
              >
                <UserPlus className="h-4 w-4" />
                <span className="text-xs">{followerCount}</span>
              </Button>
            </div>

            {/* Bet Button with Light Cyan "Select a Team First" state */}
            <div className="pt-1">
              <Sheet open={isPledging} onOpenChange={setIsPledging}>
                <SheetTrigger asChild>
                  <Button
                    className={cn(
                      "w-full transition-all duration-300 text-sm h-10 shadow hover:shadow-md font-medium",
                      selectedOption && amount
                        ? "bg-cyan-500 hover:bg-cyan-600 text-white border border-cyan-600 ring-2 ring-cyan-500/20" 
                        : selectedOption
                        ? "bg-cyan-100 hover:bg-cyan-200 text-cyan-700 border border-cyan-300"
                        : "bg-cyan-50 hover:bg-cyan-100 text-cyan-600 border border-cyan-200"
                    )}
                    disabled={!selectedOption || !amount}
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    {!selectedOption ? "Select a Team First" : !amount ? "Enter Amount" : `Place Bet of ₿${amount}`}
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-white border-l border-gray-200 w-full max-w-md">
                  <SheetHeader>
                    <SheetTitle className="text-cyan-700 text-lg flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-cyan-600" />
                      Confirm Your Bet
                    </SheetTitle>
                    <SheetDescription className="text-gray-600">
                      Review your bet before placing
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="space-y-6 mt-6">
                    {/* Match Info */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-center flex-1">
                          <p className="text-sm font-medium text-gray-800">{games.home_team}</p>
                          <p className="text-cyan-600 text-lg font-bold">{games.home_win}</p>
                        </div>
                        <div className="mx-4 text-gray-500">VS</div>
                        <div className="text-center flex-1">
                          <p className="text-sm font-medium text-gray-800">{games.away_team}</p>
                          <p className="text-cyan-600 text-lg font-bold">{games.away_win}</p>
                        </div>
                      </div>
                      <div className="text-center pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500">Draw Odds</p>
                        <p className="text-cyan-600 font-medium">{games.draw}</p>
                      </div>
                    </div>

                    {/* Bet Summary */}
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                      <p className="text-cyan-700 text-sm font-medium text-center">
                        You're betting <span className="font-bold">₿{amount}</span> on{" "}
                        <span className="font-bold">
                          {selectedOption === "homeTeam" 
                            ? games.home_team 
                            : selectedOption === "awayTeam" 
                            ? games.away_team 
                            : "Draw"}
                        </span>
                      </p>
                      <p className="text-cyan-600 text-xs text-center mt-1">
                        Odds: {getSelectedOdds()} • Potential Payout: ₿{calculatePayout()}
                      </p>
                    </div>

                    {/* Confirm Button */}
                    <Button
                      onClick={handlePledge}
                      size="lg"
                      className="w-full bg-cyan-600 hover:bg-cyan-700 text-white border border-cyan-700 rounded-lg py-3 text-base font-medium shadow hover:shadow-md transition-all duration-300"
                    >
                      🎯 Confirm Bet
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Additional Stats */}
            <div className="flex justify-center gap-4 pt-1">
              <div className="text-center">
                <div className="flex items-center gap-1 text-gray-500 hover:text-cyan-700 transition-colors cursor-pointer">
                  <Eye className="w-3 h-3" />
                  <span className="text-xs">2.1K</span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-gray-500 hover:text-cyan-700 transition-colors cursor-pointer">
                  <Share2 className="w-3 h-3" />
                  <span className="text-xs">Share</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default GamesCard;