import { MapPin, Clock, DollarSign, Building2, ThumbsUp, Eye, MessageSquare, 
  Heart, Share2, Trophy, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface GamesCardProps {
  awayTeam: string,
  homeTeam: string,
  date: string,
  time: string,
  day: string,
}

const Gamer = () => {
  const [myId, setMyId] = useState("")
  const [myName, setMyname] = useState("")
  const [workerEmail, setWorkerEmail] = useState("")

  const { toast } = useToast();

  const [games, setGames] = useState<GamesCardProps[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const user = JSON.parse(token);
      if (user) {
        setMyId(user._id)
        setMyname(user.userName)
        setWorkerEmail(user.userEmail)
      }
    }
  }, [])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setGames(data);
      } catch (err) {
        console.log(err)
        // For demo purposes, use mock data
        setGames([
          {
            homeTeam: "Manchester United",
            awayTeam: "Liverpool",
            date: "2024-01-15",
            time: "15:30",
            day: "Saturday"
          },
          {
            homeTeam: "Chelsea",
            awayTeam: "Arsenal",
            date: "2024-01-16",
            time: "17:45",
            day: "Sunday"
          },
          {
            homeTeam: "Manchester City",
            awayTeam: "Tottenham",
            date: "2024-01-17",
            time: "20:00",
            day: "Monday"
          }
        ]);
      } finally {
        console.log("Games loaded")
      }
    };

    getUsers();
  }, []);

  async function fetchUsers(): Promise<GamesCardProps[]> {
    try {
      const response = await fetch('http://localhost:8000/clash/getAllGames');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GamesCardProps[] = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  }

  return (
    <div className='flex overflow-auto mt-5 lg:ml-20 h-screen bg-gradient-to-br from-background to-muted/30'>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full'>
        {games.map((game, key) => <GameCard key={key} games={game} />)}
      </div>
    </div>
  );
};

interface GameCardProps {
  games: GamesCardProps;
}

function GameCard({ games }: GameCardProps) {
  const [myId, setMyId] = useState("")
  const [myName, setMyname] = useState('')
  const [workerEmail, setWorkerEmail] = useState("")
  const { toast } = useToast()
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10)
  const [comments] = useState(Math.floor(Math.random() * 30) + 5)
  const [pledges] = useState(Math.floor(Math.random() * 60) + 15)

  const showRequest = (jobId: string) => {
    const output = {
      "jobId": jobId,
      "workerName": myName,
      "workerId": myId,
      "workerEmail": workerEmail,
    }

    fetch("http://localhost:8000/clash/getgames", {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(output)
    })
      .then((res) => res.json())
      .then((result) => {
        toast({
          title: "Request Submitted",
          description: `Your request has been submitted successfully`,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: `An error occurred`,
          variant: "destructive"
        });
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const user = JSON.parse(token);
      if (user) {
        setMyId(user._id)
        setMyname(user.userName)
        setWorkerEmail(user.userEmail)
      }
    }
  }, [])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  return (
    <Card className="group relative overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 max-w-md">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      
      <CardContent className="p-6">
        {/* Header with avatars */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-sport-primary/20">
              <AvatarFallback className="bg-sport-primary text-primary-foreground font-bold text-sm">
                {games.homeTeam.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-muted-foreground font-medium">VS</div>
            <Avatar className="w-12 h-12 border-2 border-sport-accent/20">
              <AvatarFallback className="bg-sport-accent text-success-foreground font-bold text-sm">
                {games.awayTeam.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            <Trophy className="h-3 w-3" />
            Premier League
          </div>
        </div>

        {/* Match info */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h3 className="text-lg font-bold text-sport-primary">{games.homeTeam}</h3>
            <div className="text-2xl font-light text-muted-foreground">vs</div>
            <h3 className="text-lg font-bold text-sport-accent">{games.awayTeam}</h3>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{games.date}</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{games.time}</span>
            </div>
          </div>
          
          <div className="mt-2 text-sm font-medium text-foreground">{games.day}</div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLike}
            className={`flex-1 transition-colors ${
              isLiked 
                ? 'text-destructive bg-destructive/10' 
                : 'text-muted-foreground hover:text-destructive hover:bg-destructive/10'
            }`}
          >
            <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
            Like
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Comment
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => showRequest('game-' + games.homeTeam)}
            className="flex-1 text-muted-foreground hover:text-sport-accent hover:bg-sport-accent/10 transition-colors"
          >
            <Trophy className="h-4 w-4 mr-1" />
            Pledge
          </Button>
        </div>

        {/* Engagement stats */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-sport-primary rounded-full" />
            <span>{likes} likes</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span>{comments} comments</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-sport-accent rounded-full" />
            <span>{pledges} pledges</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Gamer;