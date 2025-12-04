import { MapPin, Clock, DollarSign, Building2, ThumbsUp, Eye, MessageSquare, 
  Heart, Share2, Zap, TrendingUp, Calendar, Trophy, Users, Sparkles, Target, 
  UserPlus, Flame, Crown, Star, ShieldCheck, Swords, TargetIcon, AlertCircle, 
  Coins, Award, Wallet, TrendingDown, Users2, Bell, CheckCircle, XCircle, 
  BarChart3, Lock, Unlock, Gavel, Scale, Percent, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PledgeCardProps {
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
  selection: string; // "homeTeam" or "awayTeam" or "draw"
  fan: string;
  username: string;
  phone: string;
  time: string;
  _id?: string;
  created_at?: string;
  odds?: {
    home_win?: string;
    away_win?: string;
    draw?: string;
  };
  status?: 'active' | 'matched' | 'completed' | 'cancelled';
  potential_payout?: number;
  match_time?: string;
  sport_type?: string;
}

interface BetAgainstData {
  amount: number;
  against_selection: string; // Opposite of existing selection
  against_amount: number;
  against_username: string;
  pledge_id: string;
}

const PledgeCard = () => {
  const [myId, setMyId] = useState("");
  const [myName, setMyname] = useState("");
  const [workerEmail, setWorkerEmail] = useState("");
  const [pledges, setPledges] = useState<PledgeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState<'all' | 'available' | 'matched'>('all');
  const [userBalance, setUserBalance] = useState(1250.75);
  const API_BASE_URL = 'https://fanclash-api.onrender.com/api/pledges';

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

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      try {
        const user = JSON.parse(token);
        if (user) {
          setMyId(user._id);
          setMyname(user.userName);
          
        }
      } catch (err) {
        console.error("Error parsing user token:", err);
      }
    }
  }, []);

  useEffect(() => {
    const getPledges = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchPledges();
        setPledges(data);
      } catch (err) {
        console.error("Error fetching pledges:", err);
        setError("Failed to load P2P bets");
        toast({
          title: "Connection Error",
          description: "Unable to fetch betting opportunities",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    getPledges();
  }, []);

  async function fetchPledges(): Promise<PledgeData[]> {
    try {
      console.log("Fetching P2P bets from:", API_BASE_URL);
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: PledgeData[] = await response.json();
      // Add mock data for enhanced display
      const enhancedData = data.map(pledge => ({
        ...pledge,
        status: pledge.status || 'active',
        potential_payout: pledge.amount * (Math.random() * 3 + 1.5),
        sport_type: ['Football', 'Basketball', 'Tennis', 'Cricket'][Math.floor(Math.random() * 4)],
        match_time: new Date(Date.now() + Math.random() * 86400000).toISOString(),
        odds: pledge.odds || {
          home_win: (Math.random() * 4 + 1.2).toFixed(2),
          away_win: (Math.random() * 4 + 1.2).toFixed(2),
          draw: (Math.random() * 4 + 1.2).toFixed(2)
        }
      }));
      
      console.log("P2P bets data received:", enhancedData);
      return enhancedData;
    } catch (error) {
      console.error("Failed to fetch P2P bets:", error);
      throw error;
    }
  }

  const filteredPledges = pledges.filter(pledge => {
    if (activeFilter === 'available') return pledge.status === 'active';
    if (activeFilter === 'matched') return pledge.status === 'matched';
    return true;
  });

  return (
    <div className="h-screen  p-4">
      {/* Header with User Balance */}
     

      {/* Stats Bar */}
     

      {/* Filter Tabs */}
      <div className="max-w-[900px] mx-auto ">
        <div className="flex gap-3">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              activeFilter === 'all' 
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg' 
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            All Bets ({pledges.length})
          </button>
          <button
            onClick={() => setActiveFilter('available')}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              activeFilter === 'available' 
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg' 
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700/50'
            }`}
          >
            <Unlock className="w-4 h-4" />
            Available ({pledges.filter(p => p.status === 'active').length})
          </button>
          <button
            onClick={() => setActiveFilter('matched')}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              activeFilter === 'matched' 
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg' 
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700/50'
            }`}
          >
            <Gavel className="w-4 h-4" />
            Matched ({pledges.filter(p => p.status === 'matched').length})
          </button>
        </div>
      </div>

      {error && (
        <div className="max-w-[900px] mx-auto text-center py-12">
          <div className="bg-gradient-to-r from-red-900/20 to-gray-900/20 border border-red-700/50 rounded-xl p-8 shadow-xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-900/30 to-gray-900/30 flex items-center justify-center border border-red-700/50">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <h3 className="text-red-300 text-lg font-bold mb-2">Connection Failed</h3>
            <p className="text-gray-400 mb-6">{error}</p>
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg"
              >
                <Zap className="w-4 h-4 mr-2" />
                Retry Connection
              </Button>
              <Button
                variant="outline"
                className="border-emerald-700/50 text-emerald-400 hover:bg-emerald-900/30"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notify Me
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* P2P Bets Grid */}
      <div className="max-w-[900px] mx-auto">
        <div className="h-[calc(100vh-320px)] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-700 scrollbar-track-gray-900 hover:scrollbar-thumb-emerald-600 pr-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-1">
            {filteredPledges.map((pledge, key) => (
              <div key={key} className="w-full transform transition-transform duration-300 hover:scale-[1.02]">
                <P2PBettingCard pledge={pledge} teamAvatars={teamAvatars} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <div className="max-w-[900px] mx-auto text-center py-16">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 border-4 border-emerald-900/30 border-t-emerald-500 rounded-full animate-spin shadow-inner"></div>
            <div className="absolute inset-0 w-20 h-20 border-2 border-emerald-700/20 rounded-full animate-ping"></div>
          </div>
          <p className="text-emerald-300 text-lg font-bold bg-gradient-to-r from-emerald-900/30 to-gray-900/30 inline-block px-6 py-3 rounded-xl border border-emerald-800/30">
            Loading P2P betting opportunities...
          </p>
          <p className="text-gray-400 text-sm mt-3">Finding the best bets against other players</p>
        </div>
      )}

      {!loading && filteredPledges.length === 0 && !error && (
        <div className="max-w-[900px] mx-auto text-center py-16">
          <div className="bg-gradient-to-br from-emerald-900/20 to-gray-900/20 rounded-xl p-12 border border-emerald-800/30 shadow-xl">
            <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald-900/30 to-gray-900/30 flex items-center justify-center border border-emerald-800/30 shadow-inner">
              <Swords className="w-14 h-14 text-emerald-500" />
            </div>
            <h3 className="text-white text-2xl font-bold mb-3">No P2P Bets Available</h3>
            <p className="text-gray-400 text-lg mb-8">Be the first to create a peer-to-peer bet!</p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-6 text-lg shadow-xl">
                <Plus className="w-5 h-5 mr-2" />
                Create P2P Bet
              </Button>
              <Button 
                variant="outline" 
                className="border-emerald-700/50 text-emerald-400 hover:bg-emerald-900/30 px-8 py-6 text-lg"
              >
                <Timer className="w-5 h-5 mr-2" />
                Set Reminder
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced P2P Betting Card Component
function P2PBettingCard({ pledge, teamAvatars }: { pledge: PledgeData; teamAvatars: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const [betAgainstAmount, setBetAgainstAmount] = useState("");
  const [betAgainstOption, setBetAgainstOption] = useState("");
  const [isBetting, setIsBetting] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();
  
  const existingSelection = pledge.selection;
  
  const getOppositeOptions = () => {
    const options = [];
    if (existingSelection !== "homeTeam") options.push({ 
      value: "homeTeam", 
      label: `${pledge.home_team} Win`, 
      odds: pledge.odds?.home_win || "2.00" 
    });
    if (existingSelection !== "awayTeam") options.push({ 
      value: "awayTeam", 
      label: `${pledge.away_team} Win`, 
      odds: pledge.odds?.away_win || "2.00" 
    });
    if (existingSelection !== "draw") options.push({ 
      value: "draw", 
      label: "Draw", 
      odds: pledge.odds?.draw || "3.50" 
    });
    return options;
  };

  const oppositeOptions = getOppositeOptions();

  const sendBetAgainst = async () => {
    if (!betAgainstAmount || !betAgainstOption) {
      toast({
        title: "Incomplete Bet",
        description: "Select your prediction and enter stake",
        variant: "destructive"
      });
      return;
    }
     const betData: BetAgainstData = {
      amount: Number(betAgainstAmount),
      against_selection: betAgainstOption,
      against_amount: Number(betAgainstAmount),
      against_username: "Current User",
      pledge_id: pledge._id || ""
    };

    try {
      console.log("Sending P2P counter bet:", betData);
      const response = await fetch(`https://fanclash-api.onrender.com/api/pledges/bet-against`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(betData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      toast({
        title: "⚔️ BET ACCEPTED! ⚔️",
        description: `You're now betting ₿${betAgainstAmount} against ${pledge.username}`,
        className: "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border-none shadow-xl"
      });
      
      setBetAgainstAmount("");
      setBetAgainstOption("");
      setIsBetting(false);
      
    } catch (error) {
      console.error("Error accepting bet:", error);
      toast({
        title: "Bet Failed",
        description: "Unable to place counter bet",
        variant: "destructive"
      });
    }

   
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return "Time TBD";
    }
  };

  const getTeamAvatar = (teamName: string) => {
    const teams = [teamAvatars.team1, teamAvatars.team2, teamAvatars.team3];
    return teams[teamName.length % teams.length];
  };

  const getSelectionLabel = (selection: string) => {
    switch (selection) {
      case "homeTeam": return `${pledge.home_team} Win`;
      case "awayTeam": return `${pledge.away_team} Win`;
      case "draw": return "Draw";
      default: return "Unknown";
    }
  };

  const calculatePotentialWin = (amount: string, odds: string) => {
    if (!amount || !odds) return "0.00";
    return (parseFloat(amount) * parseFloat(odds)).toFixed(2);
  };

  const getRiskLevel = (odds: string) => {
    const oddNum = parseFloat(odds);
    if (oddNum < 2.0) return { label: "LOW", color: "text-emerald-400" };
    if (oddNum < 4.0) return { label: "MEDIUM", color: "text-yellow-400" };
    return { label: "HIGH", color: "text-red-400" };
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
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-700/5 rounded-xl blur-xl -z-10"></div>
        )}
        
        {/* Main Card */}
        <Card className="relative bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-sm border border-emerald-800/30 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full min-h-[420px] h-auto">
          {/* Top Status Bar */}
          <div className={cn(
            "absolute top-0 left-0 right-0 h-1.5 rounded-t-xl",
            pledge.status === 'active' 
              ? "bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500" 
              : pledge.status === 'matched'
              ? "bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500"
              : "bg-gradient-to-r from-gray-500 via-gray-600 to-gray-500"
          )}></div>
          
          <CardHeader className="pb-2 pt-6 px-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-gradient-to-r from-emerald-900/60 to-emerald-800/40 border border-emerald-700/50 text-emerald-300 text-xs px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                  <Crown className="w-3 h-3 text-emerald-400" />
                  {pledge.sport_type?.toUpperCase() || "SPORTS BET"}
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                </Badge>
                <div className="flex items-center gap-2 text-emerald-300/80 text-xs bg-emerald-900/20 px-3 py-1.5 rounded-full border border-emerald-800/50">
                  <Timer className="w-3 h-3 text-emerald-400" />
                  <span>{formatDate(pledge.match_time || pledge.created_at || "")}</span>
                </div>
              </div>
              <Badge className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold",
                pledge.status === 'active'
                  ? "bg-emerald-900/40 text-emerald-400 border border-emerald-700/50"
                  : "bg-yellow-900/40 text-yellow-400 border border-yellow-700/50"
              )}>
                {pledge.status === 'active' ? "OPEN" : "MATCHED"}
              </Badge>
            </div>

            {/* Bettor Profile */}
            <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-emerald-900/20 to-gray-900/20 rounded-xl p-4 border border-emerald-800/30">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="w-14 h-14 border-2 border-emerald-600 shadow-lg">
                    <AvatarFallback className="bg-gradient-to-br from-emerald-700 to-emerald-800 text-white text-lg font-bold">
                      {pledge.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-white text-base font-bold">{pledge.username}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-300 text-xs">Win Rate: 68%</span>
                    </div>
                    <div className="w-1 h-1 bg-emerald-800/50 rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <Coins className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-300 text-xs">Bets: 124</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFollowing(!isFollowing)}
                className={`h-8 px-3 rounded-lg border ${
                  isFollowing
                    ? "bg-emerald-900/30 text-emerald-400 border-emerald-700/50"
                    : "bg-gray-800/30 text-gray-400 hover:text-emerald-400 hover:border-emerald-700/50 border-gray-700/50"
                }`}
              >
                <UserPlus className="w-3 h-3 mr-1" />
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>

            {/* Matchup Display */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-between">
                {/* Home Team */}
                <div className={cn(
                  "text-center flex-1 p-4 rounded-xl border-2 transition-all duration-300",
                  existingSelection === "homeTeam" 
                    ? "bg-gradient-to-br from-emerald-900/40 to-gray-900/40 border-emerald-600 shadow-xl" 
                    : "bg-gray-900/30 border-emerald-800/30 group-hover:border-emerald-700/50"
                )}>
                  <Avatar className="w-16 h-16 border-2 border-emerald-600/50 mx-auto mb-3 shadow-lg">
                    <AvatarImage src={getTeamAvatar(pledge.home_team)} />
                    <AvatarFallback className="bg-gradient-to-br from-gray-800 to-gray-900 text-white text-base font-bold">
                      {pledge.home_team.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-sm text-white mb-1">{pledge.home_team}</p>
                  <p className="text-emerald-400 text-xs">Odds: {pledge.odds?.home_win || "2.00"}</p>
                  {existingSelection === "homeTeam" && (
                    <div className="mt-2">
                      <Badge className=" text-emerald-300 text-xs px-2 py-0.5">
                        <TargetIcon className="w-2.5 h-2.5 mr-1" />
                        Betting On
                      </Badge>
                    </div>
                  )}
                </div>

                {/* VS Center */}
                <div className="flex flex-col items-center mx-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-900/40 to-gray-900/40 border-2 border-emerald-800/50 flex items-center justify-center shadow-xl mb-3">
                    <Swords className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-emerald-300/80 text-xs font-bold mb-1">VS</p>
                    <div className="bg-emerald-900/20 px-3 py-1 rounded-lg border border-emerald-800/30">
                      <p className="text-emerald-400 text-xs">P2P BET</p>
                    </div>
                  </div>
                </div>

                {/* Away Team */}
                <div className={cn(
                  "text-center flex-1 p-4 rounded-xl border-2 transition-all duration-300",
                  existingSelection === "awayTeam" 
                    ? "bg-gradient-to-br from-emerald-900/40 to-gray-900/40 border-emerald-600 shadow-xl" 
                    : "bg-gray-900/30 border-emerald-800/30 group-hover:border-emerald-700/50"
                )}>
                  <Avatar className="w-16 h-16 border-2 border-emerald-600/50 mx-auto mb-3 shadow-lg">
                    <AvatarImage src={getTeamAvatar(pledge.away_team)} />
                    <AvatarFallback className="bg-gradient-to-br from-gray-800 to-gray-900 text-white text-base font-bold">
                      {pledge.away_team.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-bold text-white mb-1">{pledge.away_team}</p>
                  <p className="text-emerald-400 text-xs">Odds: {pledge.odds?.away_win || "2.00"}</p>
                  {existingSelection === "awayTeam" && (
                    <div className="mt-2">
                      <Badge className="bg-emerald-900/40 text-emerald-300 text-xs px-2 py-0.5">
                        <TargetIcon className="w-2.5 h-2.5 mr-1" />
                        Betting On
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Draw Option */}
              <div className="flex justify-center mt-4">
                <div className={cn(
                  "px-5 py-2.5 rounded-xl border-2 min-w-[120px] transition-all duration-300",
                  existingSelection === "draw"
                    ? "bg-gradient-to-br from-emerald-900/40 to-gray-900/40 border-emerald-600 shadow-xl" 
                    : "border-emerald-800/30 bg-gray-900/30"
                )}>
                  <p className="text-sm font-bold text-white mb-1">Draw</p>
                  <p className="text-emerald-400 text-xs">Odds: {pledge.odds?.draw || "3.50"}</p>
                  {existingSelection === "draw" && (
                    <div className="mt-2">
                      <Badge className="bg-emerald-900/40 text-emerald-300 text-xs px-2 py-0.5">
                        <TargetIcon className="w-2.5 h-2.5 mr-1" />
                        Betting On
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pb-5 px-6">
            {/* P2P Bet Against Section */}
            <div className="bg-gradient-to-r from-emerald-900/20 to-gray-900/20 border border-emerald-800/30 rounded-xl p-4 shadow-inner">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-white text-sm font-bold">Bet Against {pledge.username}</p>
                    <p className="text-emerald-300/80 text-xs">Current Stake: ₿{pledge.amount}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 text-xs">Potential Pot</p>
                  <p className="text-white text-lg font-bold">₿{(pledge.potential_payout || 0).toFixed(2)}</p>
                </div>
              </div>
              
              {!isBetting ? (
                <Button
                  onClick={() => setIsBetting(true)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-xl transition-all duration-300 h-12 font-bold"
                >
                  <Swords className="w-5 h-5 mr-2" />
                  ACCEPT THIS P2P BET
                </Button>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {/* Select Counter Prediction */}
                  <div>
                    <label className="text-white text-sm font-bold mb-3 block">
                      SELECT YOUR PREDICTION
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {oppositeOptions.map((option) => {
                        const risk = getRiskLevel(option.odds);
                        return (
                          <Button
                            key={option.value}
                            variant={betAgainstOption === option.value ? "default" : "outline"}
                            onClick={() => setBetAgainstOption(option.value)}
                            className={cn(
                              "h-12 justify-between transition-all duration-300 group",
                              betAgainstOption === option.value
                                ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border-0"
                                : "bg-gray-900/50 text-gray-300 hover:text-white hover:bg-gray-800 border-gray-700/50"
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              <span className="text-sm font-medium">{option.label}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`text-sm font-bold ${risk.color}`}>
                                {option.odds} odds
                              </span>
                              <Badge className="bg-gray-800/50 text-gray-400 text-xs">
                                {risk.label} RISK
                              </Badge>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Enter Stake Amount */}
                  <div>
                    <label className="text-white text-sm font-bold mb-3 block">
                      ENTER YOUR STAKE (₿)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={betAgainstAmount}
                        onChange={(e) => setBetAgainstAmount(e.target.value)}
                        placeholder="Enter stake amount..."
                        className="flex-1 bg-gray-900/50 border border-emerald-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-base shadow-inner"
                      />
                      <Button
                        onClick={() => setBetAgainstAmount(pledge.amount.toString())}
                        variant="outline"
                        className="border-emerald-700/50 text-emerald-400 hover:bg-emerald-900/30"
                      >
                        Match
                      </Button>
                    </div>
                    
                    {/* Quick Stake Buttons */}
                    <div className="flex gap-2 mt-3">
                      {["100", "500", "1000", pledge.amount.toString()].map((quickAmount) => (
                        <Button
                          key={quickAmount}
                          variant="outline"
                          size="sm"
                          onClick={() => setBetAgainstAmount(quickAmount)}
                          className="flex-1 text-sm h-9 bg-gray-900/50 border-emerald-800/50 text-emerald-400 hover:bg-emerald-900/30 hover:text-emerald-300 hover:border-emerald-600 shadow-lg transition-all duration-200"
                        >
                          ₿{quickAmount}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Potential Win & Action */}
                  {betAgainstAmount && betAgainstOption && (
                    <div className="bg-gradient-to-r from-emerald-900/30 to-gray-900/30 rounded-lg p-4 border border-emerald-800/50">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-emerald-300 text-xs font-bold mb-1">POTENTIAL WIN</p>
                          <p className="text-white text-2xl font-bold">
                            ₿{calculatePotentialWin(betAgainstAmount, 
                              oppositeOptions.find(o => o.value === betAgainstOption)?.odds || "1.00")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-xs">Stake: ₿{betAgainstAmount}</p>
                          <p className="text-emerald-400 text-xs">
                            Odds: {oppositeOptions.find(o => o.value === betAgainstOption)?.odds}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={sendBetAgainst}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-xl h-12 font-bold"
                      disabled={!betAgainstOption || !betAgainstAmount}
                    >
                      <Scale className="w-5 h-5 mr-2" />
                      PLACE COUNTER BET
                    </Button>
                    <Button
                      onClick={() => {
                        setIsBetting(false);
                        setBetAgainstAmount("");
                        setBetAgainstOption("");
                      }}
                      variant="outline"
                      className="border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-800/50 h-12"
                    >
                      <XCircle className="w-5 h-5 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center bg-gray-900/30 border border-emerald-800/30 rounded-lg p-3 shadow-sm">
                <p className="text-emerald-300/80 text-xs font-bold mb-1">INITIAL STAKE</p>
                <div className="flex items-center justify-center gap-2">
                  <Coins className="w-4 h-4 text-emerald-400" />
                  <p className="text-white text-lg font-bold">₿{pledge.amount}</p>
                </div>
              </div>
              <div className="text-center bg-gray-900/30 border border-emerald-800/30 rounded-lg p-3 shadow-sm">
                <p className="text-emerald-300/80 text-xs font-bold mb-1">CONTACT</p>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <p className="text-white text-sm font-medium">{pledge.phone}</p>
                </div>
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-gradient-to-r from-emerald-900/40 to-emerald-800/20 border border-emerald-700/50 text-emerald-300 px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  P2P SECURED
                </Badge>
                
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-emerald-400 hover:bg-gray-800/50"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-emerald-400 hover:bg-gray-800/50"
                >
                  <Bell className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Missing icon component
const Phone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

// Missing icon component
const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export default PledgeCard;