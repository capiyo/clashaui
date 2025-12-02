import { MapPin, Clock, DollarSign, Building2, ThumbsUp, Eye, MessageSquare, 
  Heart, Share2, Zap, TrendingUp, Calendar, Trophy, Users, Sparkles, Target, 
  UserPlus, Flame, Crown, Star, ShieldCheck, Swords, TargetIcon, AlertCircle } from "lucide-react";
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
  // Add odds fields for P2P betting
  odds?: {
    home_win?: string;
    away_win?: string;
    draw?: string;
  };
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
          setWorkerEmail(user.userEmail);
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
        setError("Failed to load pledges");
        toast({
          title: "Error",
          description: "Failed to load pledges data",
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
      console.log("Fetching pledges from:", API_BASE_URL);
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
      console.log("Pledges data received:", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch pledges:", error);
      throw error;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50/30 p-4">
      <div className="grid grid-cols-3 gap-3 mb-6 w-full max-w-[900px] mx-auto">
        <div className="bg-white/80 backdrop-blur-sm border border-cyan-100 rounded-lg p-3 transition-all duration-300 group hover:border-cyan-200 hover:shadow-md hover:bg-cyan-50/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center shadow-inner">
                <Swords className="w-5 h-5 text-cyan-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <p className="text-cyan-700/80 text-xs font-medium">Active Bets</p>
              <p className="text-cyan-800 text-lg font-bold">{pledges.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm border border-cyan-100 rounded-lg p-3 transition-all duration-300 group hover:border-cyan-200 hover:shadow-md hover:bg-cyan-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center shadow-inner">
              <Zap className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-cyan-700/80 text-xs font-medium">P2P Available</p>
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
              <p className="text-cyan-700/80 text-xs font-medium">Bettors Online</p>
              <p className="text-cyan-800 text-lg font-bold">1.2K</p>
            </div>
          </div>
        </div>
      </div>

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

      <div className="w-full max-w-[900px] mx-auto">
        <div className="h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-300 scrollbar-track-cyan-100/50 hover:scrollbar-thumb-cyan-400 pr-2 rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-1">
            {pledges.map((pledge, key) => (
              <div key={key} className="w-full transform transition-transform duration-300 hover:scale-[1.02]">
                <PledgeCardCyan pledge={pledge} teamAvatars={teamAvatars} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <div className="w-full max-w-[900px] mx-auto text-center py-16">
          <div className="relative inline-block mb-4">
            <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin shadow-inner"></div>
            <div className="absolute inset-0 w-16 h-16 border-2 border-cyan-100 rounded-full animate-ping"></div>
          </div>
          <p className="text-cyan-700/80 text-base font-medium bg-gradient-to-r from-cyan-100 to-blue-100 inline-block px-4 py-2 rounded-full">
            Loading peer-to-peer bets...
          </p>
        </div>
      )}

      {!loading && pledges.length === 0 && !error && (
        <div className="w-full max-w-[900px] mx-auto text-center py-16">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-8 border border-cyan-200 shadow-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Users className="w-10 h-10 text-cyan-600" />
            </div>
            <p className="text-cyan-800 text-lg font-semibold mb-2">No active P2P bets</p>
            <p className="text-cyan-600/80 text-sm">Create the first bet!</p>
          </div>
        </div>
      )}
    </div>
  );
};

function PledgeCardCyan({ pledge, teamAvatars }: { pledge: PledgeData; teamAvatars: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const [betAgainstAmount, setBetAgainstAmount] = useState("");
  const [betAgainstOption, setBetAgainstOption] = useState("");
  const [isBetting, setIsBetting] = useState(false);
  const { toast } = useToast();
  
  // Determine existing selection
  const existingSelection = pledge.selection;
  
  // Calculate available options to bet against
  const getOppositeOptions = () => {
    const options = [];
    if (existingSelection !== "homeTeam") options.push({ value: "homeTeam", label: "Home Win" });
    if (existingSelection !== "awayTeam") options.push({ value: "awayTeam", label: "Away Win" });
    if (existingSelection !== "draw") options.push({ value: "draw", label: "Draw" });
    return options;
  };

  const oppositeOptions = getOppositeOptions();

  const sendBetAgainst = async () => {
    if (!betAgainstAmount || !betAgainstOption) {
      toast({
        title: "Missing Information",
        description: "Please select an option and enter amount",
        variant: "destructive"
      });
      return;
    }

    const betData: BetAgainstData = {
      amount: Number(betAgainstAmount),
      against_selection: betAgainstOption,
      against_amount: Number(betAgainstAmount),
      against_username: "Current User", // Replace with actual user
      pledge_id: pledge._id || ""
    };

    try {
      console.log("Sending P2P bet against:", betData);
      const response = await fetch(`http://localhost:3000/api/pledges/bet-against`, {
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
        title: "🎯 BET ACCEPTED! 🎯",
        description: `You're now betting ₿${betAgainstAmount} against ${pledge.username}`,
        className: "bg-gradient-to-r from-cyan-500 to-green-500 text-white border-none"
      });
      
      setBetAgainstAmount("");
      setBetAgainstOption("");
      setIsBetting(false);
      
    } catch (error) {
      console.error("Error accepting bet:", error);
      toast({
        title: "Error",
        description: "Failed to accept bet",
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
      return "Date TBD";
    }
  };

  const getTeamAvatar = (teamName: string) => {
    const teams = [teamAvatars.team1, teamAvatars.team2, teamAvatars.team3];
    return teams[teamName.length % teams.length];
  };

  const getSelectionLabel = (selection: string) => {
    switch (selection) {
      case "homeTeam": return "Home Win";
      case "awayTeam": return "Away Win";
      case "draw": return "Draw";
      default: return "Unknown";
    }
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
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg blur-xl -z-10 animate-pulse"></div>
        )}
        
        <Card className="relative bg-white/90 backdrop-blur-sm border border-cyan-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 w-full min-h-[380px] h-auto group/card">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 rounded-t-xl"></div>
          
          <CardHeader className="pb-2 pt-5 px-5">
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-gradient-to-r from-cyan-100 to-cyan-50 border border-cyan-200 text-cyan-700 text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                <Swords className="w-3 h-3 text-cyan-600" />
                P2P Bet Available
              </Badge>
              <div className="flex items-center gap-1 text-cyan-700/80 text-xs bg-cyan-50/50 px-2 py-1 rounded-full border border-cyan-100">
                <Calendar className="w-3 h-3 text-cyan-600" />
                <span>{formatDate(pledge.time || pledge.created_at || "")}</span>
              </div>
            </div>

            {/* Existing Bettor Info */}
            <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-cyan-50/70 to-blue-50/50 rounded-lg p-3 border border-cyan-200">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-cyan-300 shadow-sm">
                  <AvatarFallback className="bg-gradient-to-br from-cyan-200 to-cyan-300 text-cyan-800 text-sm font-semibold">
                    {pledge.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-cyan-800 text-sm font-semibold">{pledge.username}</p>
                  <p className="text-cyan-600/80 text-xs">Betting ₿{pledge.amount} on {getSelectionLabel(pledge.selection)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-cyan-700/80 text-xs">Fan of</p>
                <p className="text-cyan-800 text-sm font-medium">{pledge.fan}</p>
              </div>
            </div>

            {/* Matchup Display */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-between">
                {/* Home Team */}
                <div className={cn(
                  "text-center flex-1 p-3 rounded-full border-2 transition-all duration-300",
                  existingSelection === "homeTeam" 
                    ? "bg-gradient-to-br from-cyan-100 to-cyan-200/80 border-cyan-400 shadow-lg" 
                    : "bg-cyan-50/30 border-cyan-200"
                )}>
                  <Avatar className="w-14 h-14 border-2 border-cyan-300 mx-auto mb-2 shadow-inner">
                    <AvatarFallback className="bg-gradient-to-br from-cyan-100 to-cyan-200 text-cyan-700 text-sm font-semibold">
                      {pledge.home_team.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-semibold text-cyan-800">{pledge.home_team}</p>
                  {existingSelection === "homeTeam" && (
                    <p className="text-cyan-600 text-xs mt-1 font-medium flex items-center justify-center gap-1">
                      <TargetIcon className="w-3 h-3" />
                      Already Bet On
                    </p>
                  )}
                </div>

                {/* VS Center */}
                <div className="flex flex-col items-center mx-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-100 to-cyan-50 border-2 border-cyan-200 flex items-center justify-center shadow-inner">
                    <span className="text-cyan-600 text-xs font-bold">VS</span>
                  </div>
                  <div className="mt-2">
                    <p className="text-cyan-700/80 text-xs font-medium">Bet Against</p>
                  </div>
                </div>

                {/* Away Team */}
                <div className={cn(
                  "text-center flex-1 p-3  transition-all duration-300",
                  existingSelection === "awayTeam" 
                    ? "bg-gradient-to-br from-cyan-100 to-cyan-200/80 border-cyan-400 shadow-lg" 
                    : "bg-cyan-50/30 border-cyan-200"
                )}>
                  <Avatar className="w-14 h-14 border-2 border-cyan-300 mx-auto mb-2 shadow-inner">
                    <AvatarFallback className="bg-gradient-to-br from-cyan-100 to-cyan-200 text-cyan-700 text-sm font-semibold">
                      {pledge.away_team.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-semibold text-cyan-800">{pledge.away_team}</p>
                  {existingSelection === "awayTeam" && (
                    <p className="text-cyan-600 text-xs mt-1 font-medium flex items-center justify-center gap-1">
                      <TargetIcon className="w-3 h-3" />
                      Already Bet On
                    </p>
                  )}
                </div>
              </div>

              {/* Draw Option */}
              <div className="flex justify-center mt-3">
                <div className={cn(
                  "px-4 py-2 rounded-lg border-2 min-w-[100px] transition-all duration-300",
                  existingSelection === "draw"
                    ? "bg-gradient-to-br from-cyan-100 to-cyan-200/80 border-cyan-400 shadow-lg" 
                    : "border-cyan-200 bg-cyan-50/30"
                )}>
                  <p className="text-sm font-semibold text-cyan-800">Draw</p>
                  {existingSelection === "draw" && (
                    <p className="text-cyan-600 text-xs mt-0.5 font-medium flex items-center justify-center gap-1">
                      <TargetIcon className="w-2.5 h-2.5" />
                      Already Bet On
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pb-4 px-5">
            {/* P2P Bet Against Section */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-cyan-600" />
                <p className="text-cyan-800 text-sm font-semibold">Bet Against {pledge.username}</p>
              </div>
              
              {!isBetting ? (
                <Button
                  onClick={() => setIsBetting(true)}
                  className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white shadow-lg transition-all duration-300"
                >
                  <Swords className="w-4 h-4 mr-2" />
                  Accept This Bet
                </Button>
              ) : (
                <div className="space-y-3 animate-in fade-in duration-300">
                  {/* Select Opposite Outcome */}
                  <div>
                    <label className="text-cyan-800 text-sm font-semibold mb-2 block">
                      Select Your Prediction
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {oppositeOptions.map((option) => (
                        <Button
                          key={option.value}
                          variant={betAgainstOption === option.value ? "default" : "outline"}
                          onClick={() => setBetAgainstOption(option.value)}
                          className={cn(
                            "text-xs h-9 transition-all duration-300",
                            betAgainstOption === option.value
                              ? "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white border-0"
                              : "bg-white text-cyan-600 hover:bg-cyan-50 border-cyan-200"
                          )}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Enter Amount */}
                  <div>
                    <label className="text-cyan-800 text-sm font-semibold mb-2 block">
                      Your Bet Amount (Ksh.)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={betAgainstAmount}
                        onChange={(e) => setBetAgainstAmount(e.target.value)}
                        placeholder="Enter amount..."
                        className="flex-1 bg-white border border-cyan-300 rounded-lg px-4 py-2 text-cyan-800 placeholder-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all text-base shadow-inner"
                      />
                    </div>
                    
                    {/* Quick Amount Buttons */}
                    <div className="flex gap-2 mt-2">
                      {["100", "500", "1000", pledge.amount.toString()].map((quickAmount) => (
                        <Button
                          key={quickAmount}
                          variant="outline"
                          size="sm"
                          onClick={() => setBetAgainstAmount(quickAmount)}
                          className="flex-1 text-xs h-8 bg-white border-cyan-200 text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300 shadow-sm transition-all duration-200"
                        >
                          ₿{quickAmount}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={sendBetAgainst}
                      className="flex-1 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white shadow-lg"
                      disabled={!betAgainstOption || !betAgainstAmount}
                    >
                      <Swords className="w-4 h-4 mr-2" />
                      Place Counter Bet
                    </Button>
                    <Button
                      onClick={() => {
                        setIsBetting(false);
                        setBetAgainstAmount("");
                        setBetAgainstOption("");
                      }}
                      variant="outline"
                      className="border-cyan-300 text-cyan-700 hover:bg-cyan-50"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Bet Details */}
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center bg-white border border-cyan-200 rounded-lg p-2 shadow-sm">
                <p className="text-cyan-700/80 text-xs">Existing Bet</p>
                <p className="text-cyan-800 text-sm font-semibold">₿{pledge.amount}</p>
              </div>
              <div className="text-center bg-white border border-cyan-200 rounded-lg p-2 shadow-sm">
                <p className="text-cyan-700/80 text-xs">Phone</p>
                <p className="text-cyan-800 text-sm font-semibold">{pledge.phone}</p>
              </div>
            </div>

            {/* Status */}
            <div className="text-center">
              <Badge className="bg-gradient-to-r from-green-100 to-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full flex items-center gap-1 mx-auto w-fit">
                <ShieldCheck className="w-3 h-3 text-green-600" />
                P2P Bet Available
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PledgeCard;