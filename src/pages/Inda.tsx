import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Leaf, 
  Activity,
  Calendar,
  MessageSquare,
  ArrowUpRight 
} from "lucide-react";

const stats = [
  {
    title: "Total Projects",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Activity,
    description: "Active environmental projects"
  },
  {
    title: "Team Members",
    value: "156",
    change: "+8%",
    trend: "up", 
    icon: Users,
    description: "Contributing to sustainability"
  },
  {
    title: "Carbon Saved",
    value: "2.4T",
    change: "+23%",
    trend: "up",
    icon: Leaf,
    description: "CO2 equivalent this month"
  },
  {
    title: "Growth Rate",
    value: "18.2%",
    change: "+4.1%",
    trend: "up",
    icon: TrendingUp,
    description: "Monthly sustainability metrics"
  }
];

const recentActivities = [
  { action: "New sustainability report generated", time: "2 hours ago", type: "report" },
  { action: "Team meeting scheduled for green initiatives", time: "4 hours ago", type: "meeting" },
  { action: "Carbon footprint analysis completed", time: "1 day ago", type: "analysis" },
  { action: "New eco-friendly supplier added", time: "2 days ago", type: "supplier" }
];

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground shadow-elevated">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to GreenSpace</h1>
            <p className="text-primary-foreground/90 text-lg">
              Manage your sustainable initiatives and track environmental impact
            </p>
          </div>
          <div className="hidden md:block">
            <Leaf className="h-16 w-16 text-primary-foreground/20" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-background to-sage/30 border-sage hover:shadow-soft transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="secondary" 
                  className="bg-emerald-light text-forest text-xs"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-mint to-sage/50 border-sage">
          <CardHeader>
            <CardTitle className="text-forest flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-forest/70">
              Common tasks and workflows
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start bg-background/80 hover:bg-background text-forest border border-sage/50 hover:border-sage"
              variant="outline"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Green Meeting
            </Button>
            <Button 
              className="w-full justify-start bg-background/80 hover:bg-background text-forest border border-sage/50 hover:border-sage"
              variant="outline"
            >
              <Leaf className="mr-2 h-4 w-4" />
              Generate Eco Report
            </Button>
            <Button 
              className="w-full justify-start bg-background/80 hover:bg-background text-forest border border-sage/50 hover:border-sage"
              variant="outline"
            >
              <Users className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-sage/50">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Recent Activity
              </span>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-sage/30 transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="bg-sage text-sage-foreground text-xs"
                  >
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;