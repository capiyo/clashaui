import { MessageSquare, Heart, Share2, Zap, Calendar, Trophy, Users, Crown,RefreshCw ,Eye} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
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
  const [games, setGames] = useState<GamesCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
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
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setGames(data);
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
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

  const useMockData = (): void => {
    const mockGames: GamesCardProps[] = [
      {
        away_team: "Manchester United",
        home_team: "Liverpool",
        date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        draw: "3.25",
        away_win: "2.10",
        home_win: "3.50",
        league: "Premier League"
      },
      {
        away_team: "Barcelona",
        home_team: "Real Madrid",
        date: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        draw: "3.40",
        away_win: "2.80",
        home_win: "2.45",
        league: "La Liga"
      },
      {
        away_team: "Bayern Munich",
        home_team: "Borussia Dortmund",
        date: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        draw: "3.75",
        away_win: "1.95",
        home_win: "3.80",
        league: "Bundesliga"
      },
      {
        away_team: "PSG",
        home_team: "Marseille",
        date: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
        draw: "3.60",
        away_win: "1.65",
        home_win: "4.20",
        league: "Ligue 1"
      }
    ];
    setGames(mockGames);
    setError("");
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-screen bg-white overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg animate-pulse">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-20 h-6 bg-gray-200 rounded"></div>
                      <div className="w-24 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                        <div className="w-20 h-4 bg-gray-200 rounded mx-auto"></div>
                        <div className="w-12 h-5 bg-gray-200 rounded mx-auto mt-1"></div>
                      </div>
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="text-center flex-1">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                        <div className="w-20 h-4 bg-gray-200 rounded mx-auto"></div>
                        <div className="w-12 h-5 bg-gray-200 rounded mx-auto mt-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between">
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white"></div>
                        ))}
                      </div>
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex justify-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-full h-9 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-gray-600 mb-3 text-4xl">⚠️</div>
            <h3 className="text-gray-800 font-semibold text-lg mb-2">Failed to load games</h3>
            <p className="text-gray-600 mb-4 text-sm">{error}</p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setLoading(true);
                  fetchUsers();
                }}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg text-sm flex items-center justify-center gap-2 border border-gray-300"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
              <button
                onClick={useMockData}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg border border-gray-300 text-sm"
              >
                Use Demo Data
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white overflow-hidden">
      {/* Scrollable container */}
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100"
      >
        {/* Responsive grid layout */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Games Grid - 2 columns on medium+ screens, 1 column on small screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((game, key) => (
              <GameCard 
                key={key} 
                games={game} 
                teamAvatars={teamAvatars} 
                mockUsers={mockUsers} 
              />
            ))}
          </div>

          {/* Empty State */}
          {games.length === 0 && (
            <div className="w-full p-8 bg-white border border-gray-200 rounded-lg">
              <div className="text-center">
                <div className="text-gray-400 mb-4 text-5xl">⚽</div>
                <h3 className="text-gray-800 font-semibold text-xl mb-3">No games available</h3>
                <p className="text-gray-600 mb-6 text-base">Check back later for upcoming matches!</p>
                <button
                  onClick={useMockData}
                  className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg text-base font-semibold border border-gray-300"
                >
                  Load Demo Games
                </button>
              </div>
            </div>
          )}

          {/* Load More */}
          {games.length > 0 && (
            <div className="w-full p-6 border-t border-gray-100 bg-white sticky bottom-0 mt-6">
              <button
                onClick={() => {
                  setLoading(true);
                  fetchUsers();
                }}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 py-4 rounded-lg flex items-center justify-center gap-3 text-base font-semibold border border-gray-300"
              >
                <RefreshCw className="h-5 w-5" />
                Load New Games
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Game Card Component
interface GameCardProps {
  games: GamesCardProps;
  teamAvatars: any;
  mockUsers: any[];
}

const GameCard: React.FC<GameCardProps> = ({
  games,
  teamAvatars,
  mockUsers
}) => {
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
    });
    setIsPledging(false);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleComment = () => {
    toast({
      title: "Comments",
      description: "Comments section opened!",
    });
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
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
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 w-full">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <Badge className="bg-white text-gray-700 border border-gray-300 text-sm px-3 py-1 rounded-full font-bold flex items-center gap-2">
            <Crown className="w-4 h-4" />
            {games.league}
          </Badge>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Calendar className="w-4 h-4" />
            <span className="font-semibold">{formatDate(games.date)}</span>
          </div>
        </div>

        {/* Teams Section */}
        <div className="text-center">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center flex-1">
              <Avatar className="w-16 h-16 border-2 border-gray-300 mx-auto mb-3">
                <AvatarImage src={getTeamAvatar(games.home_team)} />
                <AvatarFallback className="bg-white text-gray-700 font-bold text-lg border border-gray-300">
                  {games.home_team.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className="font-bold text-gray-800 text-base truncate leading-tight">{games.home_team}</p>
              <p className="text-gray-700 text-xl font-black mt-2">{games.home_win}</p>
            </div>

            <div className="flex flex-col items-center mx-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-300">
                <span className="text-gray-700 text-sm font-black">VS</span>
              </div>
            </div>

            <div className="text-center flex-1">
              <Avatar className="w-16 h-16 border-2 border-gray-300 mx-auto mb-3">
                <AvatarImage src={getTeamAvatar(games.away_team)} />
                <AvatarFallback className="bg-white text-gray-700 font-bold text-lg border border-gray-300">
                  {games.away_team.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className="font-bold text-gray-800 text-base truncate leading-tight">{games.away_team}</p>
              <p className="text-gray-700 text-xl font-black mt-2">{games.away_win}</p>
            </div>
          </div>

          {/* Draw Odds - Removed gray background */}
          <div className="pt-3 border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-2 font-semibold">draw odds</p>
            <p className="text-gray-700 text-lg font-black py-2 rounded-lg border border-gray-300">{games.draw}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4">
        {/* Recent Bettors */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex -space-x-3">
            {mockUsers.slice(0, 3).map((user, index) => (
              <Avatar key={index} className="w-10 h-10 border-2 border-white">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-white text-gray-700 text-sm border border-gray-300">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="text-sm text-gray-500 font-semibold">
            +{mockUsers.length} placed bets
          </span>
        </div>

        {/* Social Interaction Buttons - Removed gray backgrounds */}
        <div className="flex justify-center gap-4 mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-all duration-300 h-9 px-3 rounded-xl ${
              isLiked 
                ? "text-red-600 border border-red-200" 
                : "text-gray-600 hover:text-gray-700 border border-gray-300"
            }`}
          >
            <Heart 
              className={`h-5 w-5 transition-all duration-300 ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`} 
            />
            <span className="text-sm font-bold">{likeCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleComment}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 border border-gray-300 transition-all duration-300 h-9 px-3 rounded-xl"
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
                ? "text-gray-700 border border-gray-300"
                : "text-gray-600 hover:text-gray-700 border border-gray-300"
            }`}
          >
            <Users className="h-5 w-5" />
            <span className="text-sm font-bold">{followerCount}</span>
          </Button>
        </div>

        {/* Bet Button - KEEPING CYAN COLOR FOR THIS BUTTON ONLY */}
        <div className="mb-3">
          <Sheet open={isPledging} onOpenChange={setIsPledging}>
            <SheetTrigger asChild>
              <Button 
                size="lg"
                className={cn(
                  "w-full bg-cyan-100 hover:bg-cyan-200 text-cyan-700 font-bold rounded-xl transition-all duration-300 text-base h-12 border border-cyan-200",
                  selectedOption && "ring-2 ring-cyan-300"
                )}
                disabled={!selectedOption}
              >
                <Zap className="w-5 h-5 mr-2" />
                pledge now
              </Button>
            </SheetTrigger>
            
            <SheetContent className="bg-white border-l border-gray-200 w-full max-w-md">
              <SheetHeader>
                <SheetTitle className="text-gray-700 text-lg font-black flex items-center gap-2">
                  <Trophy className="w-6 h-6" />
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
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all text-base font-semibold"
                  />
                </div>
                
                <Button
                  size="lg"
                  onClick={() => handlePledge(games.home_team, games.away_team, games.date)}
                  className="w-full bg-cyan-100 hover:bg-cyan-200 text-cyan-700 font-black rounded-xl py-3 text-base border border-cyan-200 transition-all duration-300"
                >
                  🎯 confirm bet
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Additional Stats */}
        <div className="flex justify-center gap-6 pt-2 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
              <Eye className="w-4 h-4" />
              <span className="text-xs font-semibold">2.1K</span>
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
              <Share2 className="w-4 h-4" />
              <span className="text-xs font-semibold">Share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamesCard;