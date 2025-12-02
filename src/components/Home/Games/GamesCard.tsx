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

interface PledgeData {
  amount: number;
  away_team: string;
  home_team: string;
  selection: string;
  fan: string;
  username: string;
  phone: string;
}



const GamesCard = () => {
  const [myId, setMyId] = useState("");
  const [myName, setMyname] = useState("");
  const [workerEmail, setWorkerEmail] = useState("");
  const [games, setGames] = useState<GamesCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE_URL = 'https://fanclash-api.onrender.com/api/games';

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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50/30 p-4">
      {/* Enhanced Stats Bar with Cyan Touches */}
      <div className="grid grid-cols-3 gap-3 mb-6 w-full max-w-[900px] mx-auto">
        <div className="bg-white/80 backdrop-blur-sm border border-cyan-100 rounded-lg p-3 transition-all duration-300 group hover:border-cyan-200 hover:shadow-md hover:bg-cyan-50/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center shadow-inner">
                <TrendingUp className="w-5 h-5 text-cyan-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <p className="text-cyan-700/80 text-xs font-medium">live games</p>
              <p className="text-cyan-800 text-lg font-bold">{games.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm border border-cyan-100 rounded-lg p-3 transition-all duration-300 group hover:border-cyan-200 hover:shadow-md hover:bg-cyan-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center shadow-inner">
              <Zap className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-cyan-700/80 text-xs font-medium">active now</p>
              <p className="text-cyan-800 text-lg font-bold">24/7</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm border border-cyan-100 rounded-lg p-3 transition-all duration-300 group hover:border-cyan-200 hover:shadow-md hover:bg-cyan-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center shadow-inner">
              <Users className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-cyan-700/80 text-xs font-medium">players</p>
              <p className="text-cyan-800 text-lg font-bold">1.2K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error State with Cyan Touches */}
      {error && (
        <div className="w-full max-w-[900px] mx-auto text-center py-8">
          <div className="bg-gradient-to-r from-red-50 to-cyan-50 border border-red-200 rounded-lg p-4 shadow-sm">
            <p className="text-red-700 text-base font-medium">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white shadow-md transition-all duration-300"
            >
              <Zap className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Scrollable Games Container - FULL HEIGHT */}
      <div className="w-full max-w-[900px] mx-auto">
        <div className="h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-300 scrollbar-track-cyan-100/50 hover:scrollbar-thumb-cyan-400 pr-2 rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-1">
            {games.map((game, key) => (
              <div key={key} className="w-full transform transition-transform duration-300 hover:scale-[1.02]">
                <GameCardCyan games={game} teamAvatars={teamAvatars} mockUsers={mockUsers} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State with Cyan Theme */}
      {loading && (
        <div className="w-full max-w-[900px] mx-auto text-center py-16">
          <div className="relative inline-block mb-4">
            <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin shadow-inner"></div>
            <div className="absolute inset-0 w-16 h-16 border-2 border-cyan-100 rounded-full animate-ping"></div>
          </div>
          <p className="text-cyan-700/80 text-base font-medium bg-gradient-to-r from-cyan-100 to-blue-100 inline-block px-4 py-2 rounded-full">
            Loading epic clashes...
          </p>
        </div>
      )}

      {/* Empty State with Cyan Theme */}
      {!loading && games.length === 0 && !error && (
        <div className="w-full max-w-[900px] mx-auto text-center py-16">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-8 border border-cyan-200 shadow-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Users className="w-10 h-10 text-cyan-600" />
            </div>
            <p className="text-cyan-800 text-lg font-semibold mb-2">No games available at the moment</p>
            <p className="text-cyan-600/80 text-sm">Check back later for new matches</p>
            <div className="mt-4 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
  const local_BASE_URL = 'https://fanclash-api.onrender.com';
  //https://clashaapi.onrender.com




const sendPledges = async (
  amount: number, 
  selectedOption: string, 
  away_team: string, 
  home_team: string
): Promise<void> => {
  const data: PledgeData = {
    amount: 4000.0,
    away_team: away_team,
    home_team: home_team,
    selection: selectedOption,
    fan: "Man United",
    username: "capiyo",
    phone: "0704306867"
  };

  try {
    console.log("Sending pledge data...");
    console.log(data)
    
    const response = await fetch(`${local_BASE_URL}/api/pledges`, {    
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Pledge sent successfully:", result);
    
  } catch (error) {
    console.error("Error sending pledge:", error);
    // You might want to handle the error differently here
    // e.g., show a notification to the user
  }
};




















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
      className: "bg-gradient-to-r from-cyan-500 to-green-500 text-white border-none"
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
      {/* Cyan Glow Effect on Hover */}
      <div className={cn(
        "relative transition-all duration-300 w-full",
        isHovered ? "scale-[1.02]" : "scale-100"
      )}>
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg blur-xl -z-10 animate-pulse"></div>
        )}
        
        {/* Main Card with Enhanced Cyan Theme */}
        <Card className="relative bg-white/90 backdrop-blur-sm border border-cyan-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 w-full min-h-[380px] h-auto group/card">
          {/* Cyan Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 rounded-t-xl"></div>
          
          <CardHeader className="pb-2 pt-5 px-5">
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-gradient-to-r from-cyan-100 to-cyan-50 border border-cyan-200 text-cyan-700 text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                <Crown className="w-3 h-3 text-cyan-600" />
                {games.league.split(' ')[0].toLowerCase()}
              </Badge>
              <div className="flex items-center gap-1 text-cyan-700/80 text-xs bg-cyan-50/50 px-2 py-1 rounded-full border border-cyan-100">
                <Calendar className="w-3 h-3 text-cyan-600" />
                <span>{formatDate(games.date)}</span>
              </div>
            </div>

            {/* Teams Section with Enhanced Cyan Effects */}
            <div className="text-center">
              <div className="flex items-center justify-between mb-3">
                {/* Home Team */}
                <div 
                  className="text-center flex-1 cursor-pointer transition-all duration-300 group/team"
                  onClick={() => handleTeamSelect("homeTeam")}
                >
                  <div className={cn(
                    "relative p-3 rounded-full transition-all duration-300 border-2",
                    selectedOption === "homeTeam" 
                      ? "bg-gradient-to-br from-cyan-50 to-cyan-100/50 border-cyan-300 shadow-md" 
                      : "border-transparent hover:border-cyan-200 hover:bg-cyan-50/30 group-hover/team:scale-105"
                  )}>
                    <div className="relative">
                      <Avatar className={cn(
                        "w-14 h-14 border-2 mx-auto mb-2 transition-all duration-300 shadow-inner",
                        selectedOption === "homeTeam" 
                          ? "border-cyan-500 shadow-lg bg-cyan-100" 
                          : "border-cyan-200 group-hover/team:border-cyan-300 bg-cyan-50"
                      )}>
                        <AvatarImage src={getTeamAvatar(games.home_team)} />
                        <AvatarFallback className="bg-gradient-to-br from-cyan-100 to-cyan-200 text-cyan-700 text-sm font-semibold">
                          {games.home_team.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {selectedOption === "homeTeam" && (
                        <div className="absolute -top-1 -right-1">
                          <div className="w-5 h-5 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        </div>
                      )}
                    </div>
                    <p className={cn(
                      "text-sm truncate leading-tight transition-colors duration-300 font-semibold",
                      selectedOption === "homeTeam" ? "text-cyan-800" : "text-gray-800"
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-100 to-cyan-50 border-2 border-cyan-200 flex items-center justify-center shadow-inner">
                    <span className="text-cyan-600 text-xs font-bold">VS</span>
                  </div>
                  {/* Draw Option */}
                  <div 
                    className={cn(
                      "mt-2 cursor-pointer transition-all duration-300 rounded-lg px-3 py-2 min-w-[70px] border-2 font-medium",
                      selectedOption === "draw" 
                        ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-cyan-600 shadow-lg scale-105" 
                        : "bg-white text-cyan-700 border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300 hover:scale-105 shadow-sm"
                    )}
                    onClick={() => handleTeamSelect("draw")}
                  >
                    <p className="text-xs">Draw</p>
                    <p className="text-xs font-bold">{games.draw}</p>
                  </div>
                </div>

                {/* Away Team */}
                <div 
                  className="text-center flex-1 cursor-pointer transition-all duration-300 group/team"
                  onClick={() => handleTeamSelect("awayTeam")}
                >
                  <div className={cn(
                    "relative p-3 rounded-full transition-all duration-300 border-2",
                    selectedOption === "awayTeam" 
                      ? "bg-gradient-to-br from-cyan-50 to-cyan-100/50 border-cyan-300 shadow-md" 
                      : "border-transparent hover:border-cyan-200 hover:bg-cyan-50/30 group-hover/team:scale-105"
                  )}>
                    <div className="relative">
                      <Avatar className={cn(
                        "w-14 h-14 border-2 mx-auto mb-2 transition-all duration-300 shadow-inner",
                        selectedOption === "awayTeam" 
                          ? "border-cyan-500 shadow-lg bg-cyan-100" 
                          : "border-cyan-200 group-hover/team:border-cyan-300 bg-cyan-50"
                      )}>
                        <AvatarImage src={getTeamAvatar(games.away_team)} />
                        <AvatarFallback className="bg-gradient-to-br from-cyan-100 to-cyan-200 text-cyan-700 text-sm font-semibold">
                          {games.away_team.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {selectedOption === "awayTeam" && (
                        <div className="absolute -top-1 -right-1">
                          <div className="w-5 h-5 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        </div>
                      )}
                    </div>
                    <p className={cn(
                      "text-sm truncate leading-tight transition-colors duration-300 font-semibold",
                      selectedOption === "awayTeam" ? "text-cyan-800" : "text-gray-800"
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
            {/* Selected Team Display - Enhanced Cyan Badge */}
            {selectedOption && (
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg animate-pulse">
                  <Sparkles className="w-3 h-3 text-cyan-100" />
                  <p className="text-xs font-medium">
                    {selectedOption === "homeTeam" 
                      ? games.home_team.substring(0, 10) 
                      : selectedOption === "awayTeam" 
                      ? games.away_team.substring(0, 10) 
                      : "Draw"}
                  </p>
                  <div className="w-1 h-1 bg-cyan-200 rounded-full"></div>
                  <p className="text-xs font-bold">{getSelectedOdds()}</p>
                </div>
              </div>
            )}

            {/* Amount Input - Cyan Enhanced */}
            {selectedOption && (
              <div className="space-y-2 animate-in fade-in duration-300">
                <label className="text-cyan-800 text-sm font-semibold flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-cyan-600" />
                  Enter Bet Amount (Ksh.)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 bg-white border border-cyan-300 rounded-lg px-4 py-2 text-cyan-800 placeholder-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all text-base shadow-inner"
                  />
                  <Button
                    onClick={() => setAmount("")}
                    variant="ghost"
                    size="sm"
                    className="h-10 px-3 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 border border-cyan-200"
                  >
                    Clear
                  </Button>
                </div>
                
                {/* Quick Amount Buttons - Cyan Theme */}
                <div className="flex gap-2">
                  {["10", "50", "100", "500"].map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(quickAmount)}
                      className="flex-1 text-xs h-8 bg-white border-cyan-200 text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300 shadow-sm transition-all duration-200"
                    >
                      ₿{quickAmount}
                    </Button>
                  ))}
                </div>

                {/* Potential Payout - Enhanced */}
                {amount && (
                  <div className="bg-gradient-to-r from-green-50 to-cyan-50 border border-green-200 rounded-lg p-3 shadow-sm">
                    <p className="text-green-700 text-xs font-semibold text-center flex items-center justify-center gap-2">
                      <Target className="w-3 h-3" />
                      Potential Payout: ₿{calculatePayout()}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Recent Bettors with Cyan Accent */}
            <div className="flex justify-between items-center bg-cyan-50/30 rounded-lg p-2 border border-cyan-100">
              <div className="flex -space-x-2">
                {mockUsers.slice(0, 3).map((user, index) => (
                  <Avatar key={index} className="w-8 h-8 border-2 border-cyan-50 shadow-sm">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-cyan-100 to-cyan-200 text-cyan-700 text-xs font-semibold">
                      {user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-cyan-700/80 font-medium">
                +{mockUsers.length} placed bets
              </span>
            </div>

            {/* Social Interaction Buttons - Cyan Enhanced */}
            <div className="flex justify-center gap-3 pt-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-all duration-300 h-8 px-3 rounded-lg border shadow-sm ${
                  isLiked 
                    ? "bg-gradient-to-r from-pink-50 to-cyan-50 text-pink-600 border-pink-300" 
                    : "bg-white text-cyan-600 hover:bg-cyan-50 border-cyan-200"
                }`}
              >
                <Heart 
                  className={`h-4 w-4 transition-all duration-300 ${
                    isLiked ? "fill-pink-500 text-pink-500" : ""
                  }`} 
                />
                <span className="text-xs font-medium">{likeCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleComment}
                className="flex items-center space-x-1 bg-white text-cyan-600 hover:bg-cyan-50 border border-cyan-200 transition-all duration-300 h-8 px-3 rounded-lg shadow-sm"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs font-medium">{commentCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleFollow}
                className={`flex items-center space-x-1 transition-all duration-300 h-8 px-3 rounded-lg border shadow-sm ${
                  isFollowing
                    ? "bg-gradient-to-r from-cyan-50 to-cyan-100 text-cyan-600 border-cyan-300"
                    : "bg-white text-cyan-600 hover:bg-cyan-50 border-cyan-200"
                }`}
              >
                <UserPlus className="h-4 w-4" />
                <span className="text-xs font-medium">{followerCount}</span>
              </Button>
            </div>

            {/* Bet Button - Enhanced Cyan Gradient */}
            <div className="pt-1">
              <div>
                <div  >
                  <Button
                   onClick={()=>sendPledges(amount,selectedOption,games.home_team,games.away_team,games.date)}
                   
                    className={cn(
                      "w-full transition-all duration-300 text-sm h-11 shadow-lg hover:shadow-xl font-semibold relative overflow-hidden",
                      selectedOption && amount
                        ? "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0 ring-2 ring-cyan-500/30" 
                        : selectedOption
                        ? "bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-700 border border-cyan-300 hover:from-cyan-200 hover:to-cyan-300"
                        : "bg-gradient-to-r from-cyan-50 to-cyan-100 text-cyan-600 border border-cyan-200 hover:from-cyan-100 hover:to-cyan-200"
                    )}
                    disabled={!selectedOption || !amount}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    {!selectedOption ? "Select a Team First" : !amount ? "Enter Amount" : `Place Bet of ₿${amount}`}
                  </Button>
                </div>
               
              </div>
            </div>

            {/* Additional Stats - Cyan Theme */}
            <div className="flex justify-center gap-4 pt-1">
              <div className="text-center">
                <div className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer bg-cyan-50/50 px-2 py-1 rounded-full border border-cyan-100">
                  <Eye className="w-3 h-3" />
                  <span className="text-xs font-medium">2.1K</span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer bg-cyan-50/50 px-2 py-1 rounded-full border border-cyan-100">
                  <Share2 className="w-3 h-3" />
                  <span className="text-xs font-medium">Share</span>
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