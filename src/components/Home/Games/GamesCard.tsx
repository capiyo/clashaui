import { MapPin, Clock, DollarSign, Building2, ThumbsUp, Eye, MessageSquare, 
  Heart, Share2, Zap, TrendingUp, Calendar, Trophy, Users, Sparkles, Target, 
  UserPlus, Flame, Crown, Star, TrendingDown, Award, Coins, Shield, Wallet } from "lucide-react";
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
  const [userBalance, setUserBalance] = useState(1250.75); // Mock user balance
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

  // Mock users for betting activity
  const mockBettors = [
    { name: "Alex", avatar: teamAvatars.user1, bet: "₿50", team: "HOME", won: true },
    { name: "Sarah", avatar: teamAvatars.user2, bet: "₿120", team: "AWAY", won: false },
    { name: "Mike", avatar: teamAvatars.user3, bet: "₿75", team: "DRAW", won: true }
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
        setError("Failed to load matches");
        toast({
          title: "Connection Error",
          description: "Unable to fetch live matches",
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
      console.log("Fetching matches from:", API_BASE_URL);
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
      console.log("Matches data received:", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch matches:", error);
      throw error;
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-emerald-950 p-1">
      {/* User Balance & Quick Stats */}
     

      {/* Live Stats Bar */}
      <div className="grid grid-cols-4 gap-3 mb-6 w-full max-w-[900px] mx-auto">
        <div className="bg-gradient-to-br from-emerald-900/60 to-gray-900/60 backdrop-blur-sm border border-emerald-700/30 rounded-lg p-3 transition-all duration-300 group hover:border-emerald-600 hover:shadow-lg hover:scale-[1.02]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 flex items-center justify-center shadow-inner border border-emerald-700/30">
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <p className="text-emerald-300/80 text-xs font-medium">LIVE MATCHES</p>
              <p className="text-white text-xl font-bold">{games.length}</p>
            </div>
          </div>
        </div>
        
       
        
        <div className="bg-gradient-to-br from-emerald-900/60 to-gray-900/60 backdrop-blur-sm border border-emerald-700/30 rounded-lg p-3 transition-all duration-300 group hover:border-emerald-600 hover:shadow-lg hover:scale-[1.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 flex items-center justify-center shadow-inner border border-emerald-700/30">
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-emerald-300/80 text-xs font-medium">ACTIVE BETTERS</p>
              <p className="text-white text-xl font-bold">1.2K</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-900/60 to-gray-900/60 backdrop-blur-sm border border-emerald-700/30 rounded-lg p-3 transition-all duration-300 group hover:border-emerald-600 hover:shadow-lg hover:scale-[1.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 flex items-center justify-center shadow-inner border border-emerald-700/30">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-emerald-300/80 text-xs font-medium">TODAY'S WINS</p>
              <p className="text-white text-xl font-bold">₿12.5K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="w-full max-w-[900px] mx-auto text-center py-8">
          <div className="bg-gradient-to-r from-red-900/20 to-gray-900/20 border border-red-700/50 rounded-lg p-6 shadow-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-900/30 to-gray-900/30 flex items-center justify-center border border-red-700/50">
              <TrendingDown className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-red-300 text-base font-medium mb-2">{error}</p>
            <p className="text-gray-400 text-sm mb-4">Please check your connection</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg transition-all duration-300"
            >
              <Zap className="w-4 h-4 mr-2" />
              Retry Connection
            </Button>
          </div>
        </div>
      )}

      {/* Scrollable Matches Container */}
      <div className="w-full max-w-[900px] mx-auto">
        <div className="h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-700 scrollbar-track-gray-900 hover:scrollbar-thumb-emerald-600 pr-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-1">
            {games.map((game, key) => (
              <div key={key} className="w-full transform transition-transform duration-300 hover:scale-[1.02]">
                <BettingMatchCard match={game} teamAvatars={teamAvatars} mockBettors={mockBettors} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="w-full max-w-[900px] mx-auto text-center py-16">
          <div className="relative inline-block mb-4">
            <div className="w-16 h-16 border-4 border-emerald-900/30 border-t-emerald-500 rounded-full animate-spin shadow-inner"></div>
            <div className="absolute inset-0 w-16 h-16 border-2 border-emerald-700/20 rounded-full animate-ping"></div>
          </div>
          <p className="text-emerald-300 text-base font-medium bg-gradient-to-r from-emerald-900/30 to-gray-900/30 inline-block px-6 py-3 rounded-full border border-emerald-700/30">
            Loading live odds...
          </p>
          <p className="text-gray-400 text-sm mt-2">Fetching best betting opportunities</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && games.length === 0 && !error && (
        <div className="w-full max-w-[900px] mx-auto text-center py-16">
          <div className="bg-gradient-to-br from-emerald-900/20 to-gray-900/20 rounded-xl p-10 border border-emerald-700/30 shadow-lg">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-emerald-700/30">
              <Trophy className="w-12 h-12 text-emerald-500" />
            </div>
            <p className="text-white text-xl font-semibold mb-3">No matches available</p>
            <p className="text-gray-400 text-sm mb-6">New betting opportunities coming soon</p>
            <div className="mt-6 flex justify-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function BettingMatchCard({ match, teamAvatars, mockBettors }: { match: GamesCardProps; teamAvatars: any; mockBettors: any[] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedBet, setSelectedBet] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100) + 50);
  const [commentCount, setCommentCount] = useState(Math.floor(Math.random() * 30) + 10);
  const [followerCount, setFollowerCount] = useState(Math.floor(Math.random() * 500) + 200);
  const { toast } = useToast();
  const local_BASE_URL = 'https://fanclash-api.onrender.com';

  const handleBetPlacement = async () => {
    if (!selectedBet || !betAmount) {
      toast({
        title: "Incomplete Bet",
        description: "Select outcome and enter stake",
        variant: "destructive"
      });
      return;
    }

    const selectedTeam = selectedBet === "homeTeam" ? match.home_team : 
                        selectedBet === "awayTeam" ? match.away_team : "Draw";
    
    // Simulate bet placement
    toast({
      title: "🎯 BET CONFIRMED! 🎯",
      description: `₿${betAmount} on ${selectedTeam} @ ${getSelectedOdds()} odds`,
      className: "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border-none shadow-lg"
    });
    
    // Reset form
    setBetAmount("");
    setSelectedBet("");
  };

  const handleTeamSelect = (option: string) => {
    setSelectedBet(option);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? "💔 Removed from favorites" : "❤️ Added to favorites!");
  };

  const handleComment = () => {
    toast.success("💬 Opening betting discussion...");
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
    toast.success(isFollowing ? "👋 Unfollowed match" : "✅ Tracking this match!");
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
    switch (selectedBet) {
      case "homeTeam":
        return match.home_win;
      case "awayTeam":
        return match.away_win;
      case "draw":
        return match.draw;
      default:
        return "0.00";
    }
  };

  const calculatePayout = () => {
    if (!betAmount || !selectedBet) return "0.00";
    const odds = parseFloat(getSelectedOdds());
    const stake = parseFloat(betAmount);
    return (stake * odds).toFixed(2);
  };

  const getRiskColor = (odds: string) => {
    const oddNum = parseFloat(odds);
    if (oddNum < 2.0) return "text-emerald-400"; // Low risk
    if (oddNum < 4.0) return "text-yellow-400"; // Medium risk
    return "text-red-400"; // High risk
  };

  return (
    <div
      className="relative group cursor-pointer w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect on Hover */}
      <div className={cn(
        "relative transition-all duration-300 w-full",
        isHovered ? "scale-[1.02]" : "scale-100"
      )}>
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-700/5 rounded-xl blur-xl -z-10"></div>
        )}
        
        {/* Main Betting Card */}
        <Card className="relative bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-sm border border-emerald-800/30 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full min-h-[420px] h-auto">
          {/* Top Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 rounded-t-xl"></div>
          
          <CardHeader className="pb-2 pt-6 px-6">
            <div className="flex items-center justify-between mb-3">
              <Badge className="bg-gradient-to-r from-emerald-900/60 to-emerald-800/40 border border-emerald-700/50 text-emerald-300 text-xs px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                <Crown className="w-3 h-3 text-emerald-400" />
                {match.league.toUpperCase()}
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse ml-1"></div>
              </Badge>
              <div className="flex items-center gap-2 text-emerald-300/80 text-xs bg-emerald-900/20 px-3 py-1.5 rounded-full border border-emerald-800/50">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span>{formatDate(match.date)}</span>
              </div>
            </div>

            {/* Teams & Odds Section */}
            <div className="text-center">
              <div className="flex items-center justify-between mb-4">
                {/* Home Team */}
                <div 
                  className="text-center flex-1 cursor-pointer transition-all duration-300 group/team"
                  onClick={() => handleTeamSelect("homeTeam")}
                >
                  <div className={cn(
                    "relative p-4 rounded-2xl transition-all duration-300 border-2",
                    selectedBet === "homeTeam" 
                      ? "bg-gradient-to-br from-emerald-900/40 to-gray-900/40 border-emerald-500 shadow-xl" 
                      : "border-emerald-800/30 hover:border-emerald-600 hover:bg-emerald-900/20 group-hover/team:scale-105"
                  )}>
                    <div className="relative">
                      <Avatar className={cn(
                        "w-16 h-16 border-2 mx-auto mb-3 transition-all duration-300 shadow-lg",
                        selectedBet === "homeTeam" 
                          ? "border-emerald-500 bg-gradient-to-br from-emerald-900 to-emerald-800 shadow-xl" 
                          : "border-emerald-800 group-hover/team:border-emerald-600 bg-gradient-to-br from-gray-900 to-gray-800"
                      )}>
                        <AvatarImage src={getTeamAvatar(match.home_team)} />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white text-sm font-bold">
                          {match.home_team.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {selectedBet === "homeTeam" && (
                        <div className="absolute -top-2 -right-2">
                          <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl animate-pulse ring-2 ring-emerald-400">
                            <Shield className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <p className={cn(
                      "text-sm truncate leading-tight transition-colors duration-300 font-bold mb-1",
                      selectedBet === "homeTeam" ? "text-white" : "text-gray-300"
                    )}>
                      {match.home_team}
                    </p>
                    <p className={cn(
                      "text-xl transition-colors duration-300 font-bold",
                      selectedBet === "homeTeam" ? "text-emerald-400" : getRiskColor(match.home_win)
                    )}>
                      {match.home_win}
                    </p>
                  </div>
                </div>

                {/* VS & Draw */}
                <div className="flex flex-col items-center mx-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-900/40 to-gray-900/40 border-2 border-emerald-800/50 flex items-center justify-center shadow-lg mb-3">
                    <span className="text-emerald-400 text-sm font-bold">VS</span>
                  </div>
                  <div 
                    className={cn(
                      "cursor-pointer transition-all duration-300 rounded-xl px-4 py-3 min-w-[80px] border-2 font-bold",
                      selectedBet === "draw" 
                        ? "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white border-emerald-500 shadow-xl scale-105" 
                        : "bg-gradient-to-br from-gray-900 to-gray-800 text-emerald-400 border-emerald-800/50 hover:bg-emerald-900/30 hover:border-emerald-600 hover:scale-105 shadow-lg"
                    )}
                    onClick={() => handleTeamSelect("draw")}
                  >
                    <p className="text-xs mb-1">DRAW</p>
                    <p className={cn("text-sm", getRiskColor(match.draw))}>{match.draw}</p>
                  </div>
                </div>

                {/* Away Team */}
                <div 
                  className="text-center flex-1 cursor-pointer transition-all duration-300 group/team"
                  onClick={() => handleTeamSelect("awayTeam")}
                >
                  <div className={cn(
                    "relative p-4 rounded-2xl transition-all duration-300 border-2",
                    selectedBet === "awayTeam" 
                      ? "bg-gradient-to-br from-emerald-900/40 to-gray-900/40 border-emerald-500 shadow-xl" 
                      : "border-emerald-800/30 hover:border-emerald-600 hover:bg-emerald-900/20 group-hover/team:scale-105"
                  )}>
                    <div className="relative">
                      <Avatar className={cn(
                        "w-16 h-16 border-2 mx-auto mb-3 transition-all duration-300 shadow-lg",
                        selectedBet === "awayTeam" 
                          ? "border-emerald-500 bg-gradient-to-br from-emerald-900 to-emerald-800 shadow-xl" 
                          : "border-emerald-800 group-hover/team:border-emerald-600 bg-gradient-to-br from-gray-900 to-gray-800"
                      )}>
                        <AvatarImage src={getTeamAvatar(match.away_team)} />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white text-sm font-bold">
                          {match.away_team.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {selectedBet === "awayTeam" && (
                        <div className="absolute -top-2 -right-2">
                          <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl animate-pulse ring-2 ring-emerald-400">
                            <Shield className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <p className={cn(
                      "text-sm truncate leading-tight transition-colors duration-300 font-bold mb-1",
                      selectedBet === "awayTeam" ? "text-white" : "text-gray-300"
                    )}>
                      {match.away_team}
                    </p>
                    <p className={cn(
                      "text-xl transition-colors duration-300 font-bold",
                      selectedBet === "awayTeam" ? "text-emerald-400" : getRiskColor(match.away_win)
                    )}>
                      {match.away_win}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pb-5 px-6">
            {/* Selection Badge */}
            {selectedBet && (
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full px-5 py-2.5 flex items-center gap-2 shadow-xl animate-pulse">
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <p className="text-sm font-bold">
                    {selectedBet === "homeTeam" 
                      ? `${match.home_team.substring(0, 12)}` 
                      : selectedBet === "awayTeam" 
                      ? `${match.away_team.substring(0, 12)}` 
                      : "DRAW"}
                  </p>
                  <div className="w-1 h-1 bg-emerald-300 rounded-full"></div>
                  <p className="text-sm font-bold">{getSelectedOdds()} ODDS</p>
                </div>
              </div>
            )}

            {/* Bet Amount Input */}
            {selectedBet && (
              <div className="space-y-3 animate-in fade-in duration-300">
                <label className="text-emerald-300 text-sm font-bold flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  ENTER STAKE (₿)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="Enter amount..."
                    className="flex-1 bg-gray-900/50 border border-emerald-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-base shadow-inner"
                  />
                  <Button
                    onClick={() => setBetAmount("")}
                    variant="ghost"
                    size="sm"
                    className="h-12 px-4 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/30 border border-emerald-700/50"
                  >
                    Clear
                  </Button>
                </div>
                
                {/* Quick Stake Buttons */}
                <div className="flex gap-2">
                  {["10", "50", "100", "500"].map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => setBetAmount(quickAmount)}
                      className="flex-1 text-sm h-9 bg-gray-900/50 border-emerald-800/50 text-emerald-400 hover:bg-emerald-900/30 hover:text-emerald-300 hover:border-emerald-600 shadow-lg transition-all duration-200"
                    >
                      ₿{quickAmount}
                    </Button>
                  ))}
                </div>

                {/* Potential Win Calculation */}
                {betAmount && (
                  <div className="bg-gradient-to-r from-emerald-900/30 to-gray-900/30 border border-emerald-700/50 rounded-lg p-4 shadow-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-emerald-300 text-xs font-semibold mb-1">POTENTIAL WIN</p>
                        <p className="text-white text-2xl font-bold">₿{calculatePayout()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-xs">Stake: ₿{betAmount}</p>
                        <p className="text-emerald-400 text-xs">Odds: {getSelectedOdds()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Target className="w-3 h-3 text-emerald-400" />
                      <p className="text-emerald-300 text-xs">Risk: {parseFloat(getSelectedOdds()) < 2.0 ? "LOW" : parseFloat(getSelectedOdds()) < 4.0 ? "MEDIUM" : "HIGH"}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Recent Bettors */}
            <div className="flex justify-between items-center bg-emerald-900/10 rounded-xl p-3 border border-emerald-800/30">
              <div className="flex -space-x-3">
                {mockBettors.map((bettor, index) => (
                  <div key={index} className="relative">
                    <Avatar className="w-9 h-9 border-2 border-emerald-900 shadow-lg">
                      <AvatarImage src={bettor.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white text-xs font-bold">
                        {bettor.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    {bettor.won && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border border-emerald-900"></div>
                    )}
                  </div>
                ))}
              </div>
              <span className="text-xs text-emerald-300 font-medium">
                +{mockBettors.length} bets placed
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center space-x-2 transition-all duration-300 h-9 px-4 rounded-lg border shadow-lg ${
                  isLiked 
                    ? "bg-gradient-to-r from-pink-900/30 to-emerald-900/30 text-pink-400 border-pink-700/50" 
                    : "bg-gray-900/50 text-emerald-400 hover:bg-emerald-900/30 border-emerald-800/50"
                }`}
              >
                <Heart 
                  className={`h-4 w-4 transition-all duration-300 ${
                    isLiked ? "fill-pink-500 text-pink-500" : ""
                  }`} 
                />
                <span className="text-xs font-bold">{likeCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleComment}
                className="flex items-center space-x-2 bg-gray-900/50 text-emerald-400 hover:bg-emerald-900/30 border border-emerald-800/50 transition-all duration-300 h-9 px-4 rounded-lg shadow-lg"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs font-bold">{commentCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleFollow}
                className={`flex items-center space-x-2 transition-all duration-300 h-9 px-4 rounded-lg border shadow-lg ${
                  isFollowing
                    ? "bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 text-emerald-300 border-emerald-600"
                    : "bg-gray-900/50 text-emerald-400 hover:bg-emerald-900/30 border-emerald-800/50"
                }`}
              >
                <UserPlus className="h-4 w-4" />
                <span className="text-xs font-bold">{followerCount}</span>
              </Button>
            </div>

            {/* Place Bet Button */}
            <div className="pt-2">
              <Button
                onClick={handleBetPlacement}
                className={cn(
                  "w-full transition-all duration-300 text-sm h-12 shadow-xl hover:shadow-2xl font-bold relative overflow-hidden group",
                  selectedBet && betAmount
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-0 ring-2 ring-emerald-500/50" 
                    : selectedBet
                    ? "bg-gradient-to-r from-emerald-900/40 to-emerald-800/40 text-emerald-300 border border-emerald-700/50 hover:from-emerald-800/40 hover:to-emerald-700/40"
                    : "bg-gradient-to-r from-gray-900 to-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed"
                )}
                disabled={!selectedBet || !betAmount}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-400/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Zap className="w-5 h-5 mr-2" />
                {!selectedBet ? "SELECT BET" : !betAmount ? "ENTER STAKE" : `PLACE BET - ₿${betAmount}`}
              </Button>
            </div>

            {/* Match Stats */}
            <div className="flex justify-center gap-6 pt-2">
              <div className="text-center">
                <div className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer bg-emerald-900/20 px-3 py-2 rounded-lg border border-emerald-800/50">
                  <Eye className="w-4 h-4" />
                  <span className="text-xs font-bold">2.1K</span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer bg-emerald-900/20 px-3 py-2 rounded-lg border border-emerald-800/50">
                  <Share2 className="w-4 h-4" />
                  <span className="text-xs font-bold">Share Bet</span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer bg-emerald-900/20 px-3 py-2 rounded-lg border border-emerald-800/50">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-bold">Stats</span>
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