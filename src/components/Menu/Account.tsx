import { useState,useEffect } from 'react';
import { User, Mail, Lock, LogOut, Edit, Eye, EyeOff, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Login } from '../Footer/Login';
import { Progress } from '@/components/ui/progress';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isVerified: boolean;
  trustScore: number;
  role: 'user' | 'admin' | 'moderator';
}

interface AccountProps {
  user?: Partial<UserProfile>;
  onUpdateProfile?: (data: Partial<UserProfile>) => void;
  onLogout?: () => void;
  onDeleteAccount?: () => void;
}

const defaultUser: UserProfile = {
  id: 'user_001',
  name: 'Guest User',
  email: 'guest@example.com',
  isVerified: false,
  trustScore: 0,
  role: 'user',
};

export const Account = ({ 
  user = defaultUser, 
  onUpdateProfile, 
  onLogout, 
  onDeleteAccount 
}: AccountProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProfile>({ ...defaultUser, ...user });
  const [showPassword, setShowPassword] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showLogin,setShowLogin]=useState(false)
  

  const safeUser = { ...defaultUser, ...user };

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };


   useEffect(() => {
      const token = localStorage.getItem("user");
      const user = JSON.parse(token);
      if (!user) {
        console.log(user)
        setShowLogin(true);        
       
      }
      else{
        console.log("No user")
      }
    }, []);
  
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

  return (
    <div>

    {showLogin?<Login/>:
    <div className="overflow-y-auto h-full rounded-xl font-sans">
      <div className="mx-auto p-3">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-sm font-bold text-cyan-900 font-mono tracking-tight">ACCOUNT</h1>
          </div>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant="ghost"
            size="sm"
            className="text-cyan-700 h-6 w-6 p-0 hover:bg-cyan-50 transition-all duration-200"
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1">
            <div className="border border-cyan-200/70 rounded-xl p-3 bg-gradient-to-br from-cyan-50/50 to-white shadow-sm">
              <div className="flex flex-col items-center text-center space-y-2">
                <Avatar className="h-16 w-16 border-2 border-cyan-100 shadow">
                  {safeUser.avatar ? (
                    <AvatarImage src={safeUser.avatar} alt={safeUser.name} />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white font-medium">
                    {getInitials(safeUser.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <h2 className="text-sm font-semibold text-cyan-900 truncate max-w-[120px] font-sans">
                    {isEditing ? editedUser.name : safeUser.name}
                  </h2>
                  <p className="text-xs text-cyan-600/80 font-light">{safeUser.email}</p>
                </div>

                <div className="w-full space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-cyan-700 font-medium">Trust Score</span>
                    <span className="font-bold text-cyan-800">{safeUser.trustScore}/100</span>
                  </div>
                  <Progress value={safeUser.trustScore} className="h-1.5 bg-cyan-100" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile">
              <TabsList className="grid grid-cols-3 mb-4 bg-cyan-100/70 h-8 rounded-lg">
                <TabsTrigger value="profile" className="text-xs font-medium data-[state=active]:bg-cyan-500 data-[state=active]:text-white rounded-md transition-all">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="security" className="text-xs font-medium data-[state=active]:bg-cyan-500 data-[state=active]:text-white rounded-md">
                  Security
                </TabsTrigger>
                <TabsTrigger value="danger" className="text-xs font-medium data-[state=active]:bg-rose-500 data-[state=active]:text-white rounded-md">
                  Danger
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-0">
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-cyan-800">Full Name</Label>
                    <Input
                      value={isEditing ? editedUser.name : safeUser.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                      className="border-cyan-300 text-sm h-8 rounded-md focus:ring-1 focus:ring-cyan-400 font-sans"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-cyan-800">Email Address</Label>
                    <Input
                      type="email"
                      value={isEditing ? editedUser.email : safeUser.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="border-cyan-300 text-sm h-8 rounded-md focus:ring-1 focus:ring-cyan-400 font-sans"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="mt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-cyan-200 rounded-lg bg-cyan-50/50">
                    <div>
                      <div className="flex items-center gap-2">
                        <Lock className="h-3.5 w-3.5 text-cyan-600" />
                        <span className="text-xs font-medium text-cyan-800">Two-Factor Auth</span>
                      </div>
                      <p className="text-xs text-cyan-600/70 mt-0.5">Extra security layer</p>
                    </div>
                    <Switch
                      checked={isEditing ? editedUser.isVerified : safeUser.isVerified}
                      onCheckedChange={(checked) => handleInputChange('isVerified', checked)}
                      disabled={!isEditing}
                      className="h-4 w-8 data-[state=checked]:bg-cyan-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-cyan-800">Change Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        disabled={!isEditing}
                        className="border-cyan-300 text-sm h-8 rounded-md pr-9 focus:ring-1 focus:ring-cyan-400 font-sans"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cyan-600 hover:text-cyan-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Danger Zone Tab */}
              <TabsContent value="danger" className="mt-0">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 border border-rose-200 rounded-lg bg-rose-50/50">
                    <div className="flex items-center gap-2">
                      <LogOut className="h-3.5 w-3.5 text-rose-600" />
                      <div>
                        <span className="text-xs font-medium text-rose-800">Sign Out</span>
                        <p className="text-xs text-rose-600/70">From all devices</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onLogout}
                      className="border-rose-300 text-rose-700 text-xs h-7 px-3 hover:bg-rose-50 font-medium"
                    >
                      Sign Out
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-rose-200 rounded-lg bg-rose-50/50">
                    <div className="flex items-center gap-2">
                      <Trash2 className="h-3.5 w-3.5 text-rose-600" />
                      <div>
                        <span className="text-xs font-medium text-rose-800">Delete Account</span>
                        <p className="text-xs text-rose-600/70">Permanent action</p>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={onDeleteAccount}
                      className="text-xs h-7 px-3 font-medium"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {isEditing && (
              <div className="mt-4 flex justify-end gap-2.5">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="border-cyan-300 text-cyan-700 text-xs h-7 px-3 font-medium hover:bg-cyan-50"
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSave}
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white text-xs h-7 px-3 font-medium shadow-sm"
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Activity Section with Scrollable Content */}
        <div className="mt-4 border-t border-cyan-100 pt-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowActivity(!showActivity)}
            className="w-full text-xs h-7 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 flex items-center justify-center gap-1.5 font-medium rounded-lg"
          >
            {showActivity ? (
              <>
                <ChevronUp className="h-3.5 w-3.5 transition-transform" />
                Hide Activity
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5 transition-transform" />
                View Activity Log
              </>
            )}
          </Button>

          {/* Scrollable Activity Content */}
          {showActivity && (
            <div className="mt-3 max-h-48 overflow-y-auto rounded-lg border border-cyan-200 bg-white/50">
              <div className="p-3 space-y-2.5">
                {[
                  { id: 1, action: 'Profile updated', time: '2 hours ago', icon: '📝' },
                  { id: 2, action: 'Password changed', time: '1 day ago', icon: '🔒' },
                  { id: 3, action: 'Login from new device', time: '2 days ago', icon: '📱' },
                  { id: 4, action: 'Trade completed', time: '3 days ago', icon: '💰' },
                  { id: 5, action: 'Connected with trader', time: '4 days ago', icon: '🤝' },
                  { id: 6, action: 'Account verified', time: '1 week ago', icon: '✅' },
                  { id: 7, action: 'First deposit', time: '1 week ago', icon: '💳' },
                  { id: 8, action: 'Welcome to platform', time: '2 weeks ago', icon: '🎉' },
                ].map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center gap-2.5 py-2 border-b border-cyan-100/50 last:border-0 group hover:bg-cyan-50/30 px-2 rounded transition-colors"
                  >
                    <div className="text-lg">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-cyan-800 truncate">{item.action}</p>
                      <p className="text-[11px] text-cyan-600/70 font-light">{item.time}</p>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-cyan-500 transition-colors"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
        }
        </div>
  );

};