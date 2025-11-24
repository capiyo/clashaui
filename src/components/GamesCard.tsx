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

      {/* Scrollable Games Container */}
      <div className="w-full overflow-x-auto">
        {/* Games Grid - 900px container with 450px cards in two columns */}
        <div className="w-[900px] mx-auto grid grid-cols-2 gap-6 min-h-0">
          {games.map((game, key) => (
            <div key={key} className="w-[450px]">
              <GameCardCyan games={game} teamAvatars={teamAvatars} mockUsers={mockUsers} />
            </div>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {games.length === 0 && (
        <div className="w-full max-w-[900px] mx-auto text-center py-16">
          <div className="relative inline-block mb-4">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-500 text-base">Loading epic clashes...</p>
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
      className: "bg-green-500 text-white"
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
              {/* Country Badge - White background with light cyan text */}
              <Badge className="bg-white border border-cyan-200 text-cyan-600 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <Crown className="w-3 h-3" />
                {games.league.split(' ')[0].toLowerCase()}
              </Badge>
              <div className="flex items-center gap-1 text-gray-600 text-xs">
                <Calendar className="w-3 h-3 text-cyan-600" />
                <span>{formatDate(games.date)}</span>
              </div>
            </div>

            {/* Teams Section with Avatars */}
            <div className="text-center">
              <div className="flex items-center justify-between mb-3">
                <div className="text-center flex-1">
                  <Avatar className="w-14 h-14 border-2 border-cyan-200 mx-auto mb-2 group-hover:border-cyan-300 transition-all duration-300">
                    <AvatarImage src={getTeamAvatar(games.home_team)} />
                    <AvatarFallback className="bg-cyan-100 text-cyan-600 text-sm">
                      {games.home_team.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-gray-800 text-sm truncate leading-tight">{games.home_team}</p>
                  <p className="text-cyan-600 text-lg mt-1">{games.home_win}</p>
                </div>

                <div className="flex flex-col items-center mx-3">
                  {/* VS Button - White background with light cyan border */}
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-cyan-200 flex items-center justify-center shadow">
                    <span className="text-cyan-600 text-xs">VS</span>
                  </div>
                </div>

                <div className="text-center flex-1">
                  <Avatar className="w-14 h-14 border-2 border-cyan-200 mx-auto mb-2 group-hover:border-cyan-300 transition-all duration-300">
                    <AvatarImage src={getTeamAvatar(games.away_team)} />
                    <AvatarFallback className="bg-cyan-100 text-cyan-600 text-sm">
                      {games.away_team.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-gray-800 text-sm truncate leading-tight">{games.away_team}</p>
                  <p className="text-cyan-600 text-lg mt-1">{games.away_win}</p>
                </div>
              </div>

              {/* Draw Odds - White background */}
              <div className="pt-2 border-t border-gray-200">
                <p className="text-gray-600 text-xs mb-1">draw odds</p>
                <p className="text-cyan-600 text-sm bg-white border border-cyan-200 py-1 rounded">{games.draw}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 pb-4 px-5">
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

            {/* Bet Button - Light cyan background */}
            <div className="pt-1">
              <Sheet open={isPledging} onOpenChange={setIsPledging}>
                <SheetTrigger asChild>
                  <Button 
                    size="lg"
                    className={cn(
                      "w-full bg-cyan-100 hover:bg-cyan-200 text-cyan-700 border border-cyan-300 rounded-lg transition-all duration-300 text-sm h-10 shadow hover:shadow-md",
                      selectedOption && "ring-2 ring-cyan-500/50"
                    )}
                    disabled={!selectedOption}
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    pledge now
                  </Button>
                </SheetTrigger>
                
                <SheetContent className="bg-white border-l border-gray-200 w-full max-w-md">
                  <SheetHeader>
                    <SheetTitle className="text-cyan-700 text-base flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-cyan-600" />
                      bet placement
                    </SheetTitle>
                    <SheetDescription className="text-gray-600 text-sm">
                      Enter amount for {selectedOption === "homeTeam" ? games.home_team : games.away_team}
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-gray-700 text-sm">amount (₿)</label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600/30 focus:border-cyan-500 transition-all text-sm shadow"
                      />
                    </div>
                    
                    <Button
                      size="lg"
                      onClick={() => handlePledge(games.home_team, games.away_team, games.date)}
                      className="w-full bg-cyan-100 hover:bg-cyan-200 text-cyan-700 border border-cyan-300 rounded-lg py-2 text-sm shadow hover:shadow-md transition-all duration-300"
                    >
                      🎯 confirm bet
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