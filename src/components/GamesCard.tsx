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
  away_team: string,
  home_team: string,
  date: string,
  draw: string,
  away_win: string,
  home_win: string,
  league: string
}

const GamesCard = () => {
  const [myId, setMyId] = useState("")
  const [myName, setMyname] = useState("")
  const [workerEmail, setWorkerEmail] = useState("")
  const [games, setGames] = useState<GamesCardProps[]>([]);
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
    const user = JSON.parse(token);
    if(user){
      setMyId(user._id)
      setMyname(user.userName)
      setWorkerEmail(user.userEmail)
    }
  }, [])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setGames(data);
      } catch (err) {
        console.log(err)
      }
    };
    getUsers();
  }, []);

  async function fetchUsers(): Promise<GamesCardProps[]> {
    try {
      const response = await fetch('https://clashaapi.onrender.com/api/games');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GamesCardProps[] = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  }

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Enhanced Stats Bar */}
      <div className="grid grid-cols-3 gap-3 mb-6 w-full max-w-6xl mx-auto">
        <div className="bg-white border border-cyan-200/60 rounded-xl p-4 hover:border-cyan-300 transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center shadow">
                <TrendingUp className="w-6 h-6 text-cyan-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-semibold">live games</p>
              <p className="text-cyan-600 text-xl font-black">{games.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-cyan-200/60 rounded-xl p-4 hover:border-cyan-300 transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center shadow">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs font-semibold">active now</p>
              <p className="text-orange-600 text-xl font-black">24/7</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-cyan-200/60 rounded-xl p-4 hover:border-cyan-300 transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center shadow">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs font-semibold">players</p>
              <p className="text-purple-600 text-xl font-black">1.2K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid - Fixed 500px width with 2 columns on large screens */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 justify-center">
        {games.map((game, key) => (
          <div key={key} className="flex justify-center">
            <GameCardCyan games={game} teamAvatars={teamAvatars} mockUsers={mockUsers} />
          </div>
        ))}
      </div>

      {/* Loading State */}
      {games.length === 0 && (
        <div className="w-full max-w-6xl mx-auto text-center py-16">
          <div className="relative inline-block mb-4">
            <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-500 text-base font-semibold">Loading epic clashes...</p>
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

  const handlePledge = (homeTeam: string, awayTeam: string, date: string) => {
    if (!selectedOption || !amount) {
      toast({
        title: "Missing Information",
        description: "Please select a team and enter amount",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "🎉 BET PLACED! 🎉",
      description: `₿${amount} on ${selectedOption === "homeTeam" ? homeTeam : awayTeam}`,
      className: "bg-gradient-to-r from-green-500 to-cyan-500 text-white"
    });
    setIsPledging(false);
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

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "relative transition-all duration-300",
        isHovered ? "scale-[1.02]" : "scale-100"
      )}>
        {/* Main Card - Fixed 500px width */}
        <Card className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 w-[500px] min-h-[450px] h-auto">
          {/* Header Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-t-xl"></div>
          
          <CardHeader className="pb-3 pt-5 px-6">
            <div className="flex items-center justify-between mb-3">
              <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 text-sm px-4 py-1.5 rounded-full font-bold flex items-center gap-2">
                <Crown className="w-4 h-4" />
                {games.league.split(' ')[0].toLowerCase()}
              </Badge>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Calendar className="w-4 h-4 text-cyan-600" />
                <span className="font-semibold">{formatDate(games.date)}</span>
              </div>
            </div>

            {/* Teams Section with Avatars */}
            <div className="text-center">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1">
                  <Avatar className="w-16 h-16 border-2 border-cyan-300 mx-auto mb-3 group-hover:border-cyan-400 transition-all duration-300">
                    <AvatarImage src={getTeamAvatar(games.home_team)} />
                    <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg">
                      {games.home_team.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-bold text-gray-800 text-base truncate leading-tight">{games.home_team}</p>
                  <p className="text-cyan-600 text-xl font-black mt-2">{games.home_win}</p>
                </div>

                <div className="flex flex-col items-center mx-4">
                  {/* VS Button */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-black">VS</span>
                  </div>
                </div>

                <div className="text-center flex-1">
                  <Avatar className="w-16 h-16 border-2 border-cyan-300 mx-auto mb-3 group-hover:border-cyan-400 transition-all duration-300">
                    <AvatarImage src={getTeamAvatar(games.away_team)} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg">
                      {games.away_team.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-bold text-gray-800 text-base truncate leading-tight">{games.away_team}</p>
                  <p className="text-cyan-600 text-xl font-black mt-2">{games.away_win}</p>
                </div>
              </div>

              {/* Draw Odds */}
              <div className="pt-3 border-t border-cyan-200/50">
                <p className="text-gray-600 text-sm mb-2 font-semibold">draw odds</p>
                <p className="text-cyan-700 text-lg font-black bg-cyan-500/10 py-2 rounded-lg">{games.draw}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pb-5 px-6">
            {/* Recent Bettors */}
            <div className="flex justify-between items-center">
              <div className="flex -space-x-3">
                {mockUsers.slice(0, 3).map((user, index) => (
                  <Avatar key={index} className="w-10 h-10 border-2 border-white shadow-md">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm">
                      {user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-sm text-gray-500 font-semibold">
                +{mockUsers.length} placed bets
              </span>
            </div>

            {/* Social Interaction Buttons */}
            <div className="flex justify-center gap-4 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center space-x-2 transition-all duration-300 h-9 px-3 rounded-xl ${
                  isLiked 
                    ? "bg-gradient-to-r from-pink-500/20 to-red-500/20 text-pink-600 border border-pink-300/60 shadow-lg" 
                    : "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 hover:text-cyan-700 border border-cyan-200/50 hover:shadow-md"
                }`}
              >
                <Heart 
                  className={`h-5 w-5 transition-all duration-300 ${
                    isLiked ? "fill-pink-500 text-pink-500" : ""
                  }`} 
                />
                <span className="text-sm font-bold">{likeCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleComment}
                className="flex items-center space-x-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 hover:text-cyan-700 border border-cyan-200/50 transition-all duration-300 h-9 px-3 rounded-xl hover:shadow-md"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="text-sm font-bold">{commentCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleFollow}
                className={`flex items-center space-x-2 transition-all duration-300 h-9 px-3 rounded-xl ${
                  isFollowing
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                    : "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 hover:text-cyan-700 border border-cyan-200/50 hover:shadow-md"
                }`}
              >
                <UserPlus className="h-5 w-5" />
                <span className="text-sm font-bold">{followerCount}</span>
              </Button>
            </div>

            {/* Bet Button */}
            <div className="pt-2">
              <Sheet open={isPledging} onOpenChange={setIsPledging}>
                <SheetTrigger asChild>
                  <Button 
                    size="lg"
                    className={cn(
                      "w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 text-base h-12 shadow-xl hover:shadow-cyan-600/25",
                      selectedOption && "ring-2 ring-cyan-500/50"
                    )}
                    disabled={!selectedOption}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    pledge now
                  </Button>
                </SheetTrigger>
                
                <SheetContent className="bg-white border-l border-cyan-200/50 w-full max-w-md">
                  <SheetHeader>
                    <SheetTitle className="text-cyan-700 text-lg font-black flex items-center gap-2">
                      <Trophy className="w-6 h-6 text-cyan-600" />
                      bet placement
                    </SheetTitle>
                    <SheetDescription className="text-gray-600 text-sm">
                      Enter amount for {selectedOption === "homeTeam" ? games.home_team : games.away_team}
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <label className="text-gray-700 text-sm font-bold">amount (₿)</label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-white border border-cyan-300/50 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600/30 focus:border-cyan-500 transition-all text-base font-semibold shadow-lg"
                      />
                    </div>
                    
                    <Button
                      size="lg"
                      onClick={() => handlePledge(games.home_team, games.away_team, games.date)}
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-black rounded-xl py-3 text-base shadow-2xl hover:shadow-cyan-600/25 transition-all duration-300"
                    >
                      🎯 confirm  bet
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Additional Stats */}
            <div className="flex justify-center gap-6 pt-2">
              <div className="text-center">
                <div className="flex items-center gap-1 text-gray-500 hover:text-cyan-700 transition-colors cursor-pointer">
                  <Eye className="w-4 h-4" />
                  <span className="text-xs font-semibold">2.1K</span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-gray-500 hover:text-cyan-700 transition-colors cursor-pointer">
                  <Share2 className="w-4 h-4" />
                  <span className="text-xs font-semibold">Share</span>
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