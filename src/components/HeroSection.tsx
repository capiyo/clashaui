import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Leaf, 
  Activity,
  Calendar,
  MessageSquare,
  ArrowUpRight,
  Zap,
  Trophy,
  Target
} from "lucide-react";

const stats = [
  {
    title: "Active Bets",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Activity,
    description: "Live betting matches"
  },
  {
    title: "Players Online", 
    value: "156",
    change: "+8%",
    trend: "up",
    icon: Users,
    description: "Clashing right now"
  },
  {
    title: "Total Winnings",
    value: "2.4K",
    change: "+23%",
    trend: "up",
    icon: Trophy,
    description: "This month's earnings"
  },
  {
    title: "Win Rate",
    value: "68.2%",
    change: "+4.1%",
    trend: "up",
    icon: TrendingUp,
    description: "Monthly performance"
  }
];

const recentActivities = [
  { action: "New high-stakes match created", time: "2 hours ago", type: "match" },
  { action: "Tournament scheduled for weekend", time: "4 hours ago", type: "tournament" },
  { action: "Big win recorded in Premier League", time: "1 day ago", type: "win" },
  { action: "New betting feature added", time: "2 days ago", type: "feature" }
];

export default function HeroSection() {
  return (
    <div className="hidden md:flex flex-row ">
      {/* Welcome Section - Compact Cyan */}
      

      {/* Stats Grid - Compact Cyan Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white/90 backdrop-blur-xl border border-cyan-200/60 rounded-xl hover:shadow-cyan-200/30 hover:border-cyan-300 transition-all duration-200 h-32">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-3">
              <CardTitle className="text-xs font-semibold text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent className="px-4 pb-3">
              <div className="text-xl font-bold text-gray-800 mb-1">
                {stat.value}
              </div>
              <div className="flex items-center space-x-1">
                <Badge 
                  variant="secondary" 
                  className="bg-cyan-500/15 text-cyan-700 text-[10px] px-1.5 py-0 border border-cyan-300/50"
                >
                  <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                  {stat.change}
                </Badge>
              </div>
              <p className="text-[10px] text-gray-500 mt-1.5 leading-tight">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities - Compact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Quick Actions */}
        <Card className="bg-white/90 backdrop-blur-xl border border-cyan-200/60 rounded-xl h-40">
          <CardHeader className="pb-2 px-4 pt-3">
            <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Zap className="h-4 w-4 text-cyan-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <div className="space-y-2">
              <Button size="sm" className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-300/50 text-cyan-700 text-xs h-7">
                Create Match
              </Button>
              <Button size="sm" className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-300/50 text-cyan-700 text-xs h-7">
                Join Tournament
              </Button>
              <Button size="sm" className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-300/50 text-cyan-700 text-xs h-7">
                View Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white/90 backdrop-blur-xl border border-cyan-200/60 rounded-xl h-40">
          <CardHeader className="pb-2 px-4 pt-3">
            <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <div className="space-y-2 max-h-24 overflow-y-auto">
              {recentActivities.slice(0, 3).map((activity, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 truncate">{activity.action}</p>
                    <p className="text-[10px] text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}