import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, User, Bell, Shield, Palette, Calendar } from "lucide-react";

type PageType = "page1" | "page2";

const SlidingBottomSheet = () => {
  const [activePage, setActivePage] = useState<PageType>("page1");

  const Page1Content = () => (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Profile Settings
          </CardTitle>
          <CardDescription>
            Manage your account preferences and personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Display Name</span>
            <Badge variant="secondary">John Doe</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Email</span>
            <Badge variant="secondary">john@example.com</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Status</span>
            <Badge className="bg-primary">Active</Badge>
          </div>
          <Button className="w-full">Edit Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <Badge variant="outline">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Email Updates</span>
              <Badge variant="outline">Disabled</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const Page2Content = () => (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            System Settings
          </CardTitle>
          <CardDescription>
            Configure your application preferences and security options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Two-Factor Auth</span>
            </div>
            <Badge className="bg-primary">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Theme</span>
            </div>
            <Badge variant="secondary">Dark</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Time Zone</span>
            </div>
            <Badge variant="secondary">UTC-5</Badge>
          </div>
          <Button className="w-full">Save Settings</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-sm">
              <div className="font-medium">Login Detected</div>
              <div className="text-muted-foreground">2 hours ago</div>
            </div>
            <div className="text-sm">
              <div className="font-medium">Settings Updated</div>
              <div className="text-muted-foreground">1 day ago</div>
            </div>
            <div className="text-sm">
              <div className="font-medium">Password Changed</div>
              <div className="text-muted-foreground">3 days ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="lg" className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-8">
          Open Settings Panel
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] overflow-hidden">
        <SheetHeader className="pb-4">
          <SheetTitle>Settings Panel</SheetTitle>
        </SheetHeader>
        
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActivePage("page1")}
            className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
              activePage === "page1" ? "tab-active" : "tab-inactive"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActivePage("page2")}
            className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
              activePage === "page2" ? "tab-active" : "tab-inactive"
            }`}
          >
            System
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="relative">
            <div 
              className={`transition-all duration-300 ease-in-out ${
                activePage === "page1" ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 absolute inset-0"
              }`}
            >
              <Page1Content />
            </div>
            <div 
              className={`transition-all duration-300 ease-in-out ${
                activePage === "page2" ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 absolute inset-0"
              }`}
            >
              <Page2Content />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SlidingBottomSheet;