
// components/Account.tsx
import { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Shield, 
  Globe, 
  CreditCard, 
  Bell, 
  Lock, 
  LogOut, 
  Edit,
  Camera,
  CheckCircle,
  AlertCircle,
  Settings,
  Key,
  Eye,
  EyeOff,
  Trash2,
  ChevronUp,
  ChevronDown,
  Scroll
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  phone?: string;
  location?: string;
  joinDate: string;
  isVerified: boolean;
  is2FAEnabled: boolean;
  trustScore: number;
  role: 'user' | 'admin' | 'moderator';
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
    currency: string;
  };
  stats: {
    completedTrades: number;
    activeConnections: number;
    disputeRate: number;
    avgResponseTime: string;
  };
}

interface AccountProps {
  user?: Partial<UserProfile>;
  onUpdateProfile?: (data: Partial<UserProfile>) => void;
  onLogout?: () => void;
  onDeleteAccount?: () => void;
  maxHeight?: string | number;
}

const defaultUser: UserProfile = {
  id: 'user_001',
  name: 'Guest User',
  username: 'guest',
  email: 'guest@example.com',
  joinDate: new Date().toLocaleDateString(),
  isVerified: false,
  is2FAEnabled: false,
  trustScore: 0,
  role: 'user',
  preferences: {
    notifications: true,
    darkMode: false,
    language: 'English',
    currency: 'USD',
  },
  stats: {
    completedTrades: 0,
    activeConnections: 0,
    disputeRate: 0,
    avgResponseTime: 'N/A',
  },
};

export const Account = ({ 
  user = defaultUser, 
  onUpdateProfile, 
  onLogout, 
  onDeleteAccount,
  maxHeight = 'calc(100vh - 4rem)' // Default max height
}: AccountProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProfile>({ ...defaultUser, ...user });
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Safe access with fallbacks
  const safeUser = { ...defaultUser, ...user };
  const safeEditedUser = editedUser;

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      if (scrollAreaRef.current) {
        const { scrollTop } = scrollAreaRef.current;
        setShowScrollTop(scrollTop > 300);
      }
    };

    const scrollElement = scrollAreaRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ 
        top: scrollAreaRef.current.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (key: keyof UserProfile['preferences'], value: any) => {
    setEditedUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    onUpdateProfile?.(editedUser);
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'moderator': return 'bg-amber-100 text-amber-800 border-amber-300';
      default: return 'bg-cyan-100 text-cyan-800 border-cyan-300';
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-cyan-50/30 to-white">
      {/* Scroll Area Container */}
      <ScrollArea 
        ref={scrollAreaRef}
        className="h-full"
        style={{ maxHeight: typeof maxHeight === 'string' ? maxHeight : `${maxHeight}px` }}
      >
        <div className="p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 sticky top-0 bg-gradient-to-b from-cyan-50/30 to-transparent backdrop-blur-sm z-10 pt-4 pb-6">
              <div>
                <h1 className="text-3xl font-bold text-cyan-900">Account Settings</h1>
                <p className="text-cyan-600/70 mt-1">Manage your profile and preferences</p>
              </div>
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        setEditedUser({ ...defaultUser, ...user });
                      }}
                      className="border-cyan-300 text-cyan-700"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSave}
                      className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
                    >
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="border-cyan-300 text-cyan-700 hover:bg-cyan-50"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Profile Card */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="border-cyan-200/50 shadow-lg shadow-cyan-100/20 sticky top-24">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      {/* Avatar with Edit */}
                      <div className="relative">
                        <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                          {safeUser.avatar ? (
                            <AvatarImage 
                              src={safeUser.avatar} 
                              alt={safeUser.name}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : null}
                          <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-cyan-600 text-white text-3xl">
                            {getInitials(safeUser.name)}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button
                            size="icon"
                            className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      {/* User Info */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <h2 className="text-2xl font-bold text-cyan-900">
                            {isEditing ? editedUser.name : safeUser.name}
                          </h2>
                          {safeUser.isVerified && (
                            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-cyan-600/70">@{isEditing ? editedUser.username : safeUser.username}</p>
                        <Badge className={getRoleColor(safeUser.role)}>
                          {safeUser.role.charAt(0).toUpperCase() + safeUser.role.slice(1)}
                        </Badge>
                      </div>

                      {/* Trust Score */}
                      <div className="w-full space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-cyan-800 font-medium">Trust Score</span>
                          <span className="text-cyan-700 font-bold">{safeUser.trustScore}/100</span>
                        </div>
                        <Progress value={safeUser.trustScore} className="h-2 bg-cyan-100" />
                      </div>

                      {/* Member Since */}
                      <div className="text-sm text-cyan-600/70">
                        <Globe className="h-4 w-4 inline mr-2" />
                        Member since {safeUser.joinDate}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="border-cyan-200/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-cyan-900">
                      <User className="h-5 w-5 text-cyan-500" />
                      Activity Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-cyan-50/50 rounded-lg">
                        <div className="text-2xl font-bold text-cyan-700">{safeUser.stats.completedTrades}</div>
                        <div className="text-sm text-cyan-600/70">Trades</div>
                      </div>
                      <div className="text-center p-3 bg-cyan-50/50 rounded-lg">
                        <div className="text-2xl font-bold text-cyan-700">{safeUser.stats.activeConnections}</div>
                        <div className="text-sm text-cyan-600/70">Connections</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-cyan-700">Dispute Rate</span>
                        <span className="font-medium">{safeUser.stats.disputeRate}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-cyan-700">Avg Response</span>
                        <span className="font-medium">{safeUser.stats.avgResponseTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Tabs Content */}
              <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-6 bg-cyan-100/50 sticky top-0 z-10">
                    <TabsTrigger value="profile" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger value="security" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                      <Shield className="h-4 w-4 mr-2" />
                      Security
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                      <Settings className="h-4 w-4 mr-2" />
                      Preferences
                    </TabsTrigger>
                    <TabsTrigger value="danger" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Danger Zone
                    </TabsTrigger>
                  </TabsList>

                  {/* Profile Tab */}
                  <TabsContent value="profile" className="space-y-6">
                    <Card className="border-cyan-200/50">
                      <CardHeader>
                        <CardTitle className="text-cyan-900">Personal Information</CardTitle>
                        <CardDescription>Update your personal details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-cyan-800">Full Name</Label>
                            <Input
                              id="name"
                              value={isEditing ? editedUser.name : safeUser.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              disabled={!isEditing}
                              className="border-cyan-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="username" className="text-cyan-800">Username</Label>
                            <Input
                              id="username"
                              value={isEditing ? editedUser.username : safeUser.username}
                              onChange={(e) => handleInputChange('username', e.target.value)}
                              disabled={!isEditing}
                              className="border-cyan-300"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-cyan-800">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={isEditing ? editedUser.email : safeUser.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            disabled={!isEditing}
                            className="border-cyan-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-cyan-800">Phone Number</Label>
                          <Input
                            id="phone"
                            value={isEditing ? editedUser.phone || '' : safeUser.phone || ''}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            disabled={!isEditing}
                            className="border-cyan-300"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-cyan-800">Location</Label>
                          <Input
                            id="location"
                            value={isEditing ? editedUser.location || '' : safeUser.location || ''}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            disabled={!isEditing}
                            className="border-cyan-300"
                            placeholder="City, Country"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Alert className="bg-cyan-50 border-cyan-200">
                      <CheckCircle className="h-4 w-4 text-cyan-600" />
                      <AlertDescription className="text-cyan-700">
                        Verified profiles receive 30% more connection requests. 
                        {!safeUser.isVerified && (
                          <Button variant="link" className="h-auto p-0 ml-1 text-cyan-600">
                            Get verified now →
                          </Button>
                        )}
                      </AlertDescription>
                    </Alert>

                    {/* Additional content to make scrollable */}
                    <Card className="border-cyan-200/50">
                      <CardHeader>
                        <CardTitle className="text-cyan-900">Activity History</CardTitle>
                        <CardDescription>Recent account activity</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <div key={item} className="flex items-center justify-between p-3 border border-cyan-100 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center">
                                <User className="h-4 w-4 text-cyan-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-cyan-800">Profile viewed by trader</p>
                                <p className="text-xs text-cyan-600/70">2 hours ago</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="border-cyan-300 text-cyan-700">
                              View
                            </Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Security Tab */}
                  <TabsContent value="security" className="space-y-6">
                    <Card className="border-cyan-200/50">
                      <CardHeader>
                        <CardTitle className="text-cyan-900">Security Settings</CardTitle>
                        <CardDescription>Manage your account security</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 border border-cyan-200 rounded-lg">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Lock className="h-4 w-4 text-cyan-500" />
                              <span className="font-medium text-cyan-800">Two-Factor Authentication</span>
                            </div>
                            <p className="text-sm text-cyan-600/70">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch
                            checked={isEditing ? editedUser.is2FAEnabled : safeUser.is2FAEnabled}
                            onCheckedChange={(checked) => handleInputChange('is2FAEnabled', checked)}
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-cyan-800">Change Password</Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter new password"
                              disabled={!isEditing}
                              className="border-cyan-300 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 bg-cyan-50/50 rounded-lg">
                          <h4 className="font-medium text-cyan-800 mb-2 flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Security Tips
                          </h4>
                          <ul className="space-y-2 text-sm text-cyan-700">
                            <li className="flex items-start gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mt-1.5"></div>
                              Use a strong, unique password
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mt-1.5"></div>
                              Enable 2FA for added security
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mt-1.5"></div>
                              Review login activity regularly
                            </li>
                          </ul>
                        </div>

                        {/* Active Sessions */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-cyan-800">Active Sessions</h4>
                          {[1, 2].map((session) => (
                            <div key={session} className="flex items-center justify-between p-3 border border-cyan-100 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center">
                                  <Globe className="h-4 w-4 text-cyan-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-cyan-800">Chrome • Windows 11</p>
                                  <p className="text-xs text-cyan-600/70">New York, USA • 2 hours ago</p>
                                </div>
                              </div>
                              <Button size="sm" variant="ghost" className="text-rose-600 hover:text-rose-700">
                                Revoke
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Preferences Tab */}
                  <TabsContent value="preferences" className="space-y-6">
                    <Card className="border-cyan-200/50">
                      <CardHeader>
                        <CardTitle className="text-cyan-900">Preferences</CardTitle>
                        <CardDescription>Customize your experience</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Bell className="h-4 w-4 text-cyan-500" />
                                <span className="font-medium text-cyan-800">Notifications</span>
                              </div>
                              <p className="text-sm text-cyan-600/70">
                                Receive notifications for new messages and trades
                              </p>
                            </div>
                            <Switch
                              checked={isEditing ? editedUser.preferences.notifications : safeUser.preferences.notifications}
                              onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)}
                              disabled={!isEditing}
                            />
                          </div>

                          <Separator className="bg-cyan-100" />

                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Moon className="h-4 w-4 text-cyan-500" />
                                <span className="font-medium text-cyan-800">Dark Mode</span>
                              </div>
                              <p className="text-sm text-cyan-600/70">
                                Switch to dark theme
                              </p>
                            </div>
                            <Switch
                              checked={isEditing ? editedUser.preferences.darkMode : safeUser.preferences.darkMode}
                              onCheckedChange={(checked) => handlePreferenceChange('darkMode', checked)}
                              disabled={!isEditing}
                            />
                          </div>

                          <Separator className="bg-cyan-100" />

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="language" className="text-cyan-800">Language</Label>
                              <select
                                id="language"
                                value={isEditing ? editedUser.preferences.language : safeUser.preferences.language}
                                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                                disabled={!isEditing}
                                className="w-full border border-cyan-300 rounded-md px-3 py-2 text-sm bg-white"
                              >
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="currency" className="text-cyan-800">Currency</Label>
                              <select
                                id="currency"
                                value={isEditing ? editedUser.preferences.currency : safeUser.preferences.currency}
                                onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                                disabled={!isEditing}
                                className="w-full border border-cyan-300 rounded-md px-3 py-2 text-sm bg-white"
                              >
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                                <option value="JPY">JPY (¥)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Notification Preferences */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-cyan-800">Notification Preferences</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {['Messages', 'Trade Requests', 'Price Alerts', 'Security Alerts'].map((pref) => (
                              <div key={pref} className="flex items-center justify-between p-3 border border-cyan-100 rounded-lg">
                                <span className="text-sm text-cyan-700">{pref}</span>
                                <Switch defaultChecked size="sm" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Danger Zone Tab */}
                  <TabsContent value="danger" className="space-y-6">
                    <Card className="border-rose-200/50">
                      <CardHeader>
                        <CardTitle className="text-rose-900">Danger Zone</CardTitle>
                        <CardDescription className="text-rose-700/70">
                          Irreversible actions - proceed with caution
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="p-4 border border-rose-200 rounded-lg bg-rose-50/50">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <LogOut className="h-4 w-4 text-rose-500" />
                                <span className="font-medium text-rose-800">Sign Out</span>
                              </div>
                              <p className="text-sm text-rose-600/70">
                                Sign out from all devices
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              onClick={onLogout}
                              className="border-rose-300 text-rose-700 hover:bg-rose-50"
                            >
                              <LogOut className="h-4 w-4 mr-2" />
                              Sign Out
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 border border-rose-200 rounded-lg bg-rose-50/50">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Trash2 className="h-4 w-4 text-rose-500" />
                                <span className="font-medium text-rose-800">Delete Account</span>
                              </div>
                              <p className="text-sm text-rose-600/70">
                                Permanently delete your account and all data
                              </p>
                            </div>
                            <Button
                              variant="destructive"
                              onClick={onDeleteAccount}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Account
                            </Button>
                          </div>
                        </div>

                        <Alert className="bg-amber-50 border-amber-200">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                          <AlertDescription className="text-amber-700">
                            These actions are permanent and cannot be undone. 
                            Make sure you have exported any important data before proceeding.
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Spacer at bottom */}
            <div className="h-20"></div>
          </div>
        </div>
      </ScrollArea>

      {/* Scroll To Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg shadow-cyan-500/30 z-50"
          size="icon"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}

      {/* Scroll To Bottom Button */}
      <Button
        onClick={scrollToBottom}
        className="fixed bottom-6 right-6 h-10 w-10 rounded-full bg-cyan-100 border border-cyan-300 text-cyan-700 hover:bg-cyan-200 shadow-md z-50"
        size="icon"
        variant="outline"
      >
        <ChevronDown className="h-5 w-5" />
      </Button>
    </div>
  );
};

// Add Moon icon component
const Moon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);