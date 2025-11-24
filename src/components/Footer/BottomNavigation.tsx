import { useState } from "react";
import { Gamepad2, Radio, FileText } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Posts from "./Posts";
import GamesCard from "../GamesCard";

type TabType = "posts" | "games" | "live";

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabConfig[] = [
  { id: "posts", label: "Posts", icon: <FileText className="w-4 h-4" /> },
  { id: "games", label: "Games", icon: <Gamepad2 className="w-4 h-4" /> },
  { id: "live", label: "Live", icon: <Radio className="w-4 h-4" /> },
];

export const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState<TabType>("posts");
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const getIndicatorPosition = () => {
    const index = tabs.findIndex((tab) => tab.id === activeTab);
    return `${(index * 100) / tabs.length}%`;
  };

  const getContentOffset = () => {
    const index = tabs.findIndex((tab) => tab.id === activeTab);
    return `-${index * 100}%`;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left
      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1].id);
      }
    }

    if (touchStart - touchEnd < -75) {
      // Swiped right
      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
      if (currentIndex > 0) {
        setActiveTab(tabs[currentIndex - 1].id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-hidden pb-5"> {/* Added padding-bottom to prevent content from being hidden behind absolute nav */}
        <div className="max-w-4xl mx-auto h-full">
          {/* Main Content Area with Sliding Effect */}
          <div 
            className="overflow-hidden h-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex h-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${getContentOffset()})` }}
            >
              {/* Posts Section */}
              <div className="w-full flex-shrink-0 overflow-y-auto h-full">
                <Posts/>
              </div>

              {/* Games Section */}
              <div className="w-full flex-shrink-0 overflow-y-auto h-full">
                <GamesCard/>
              </div>

              {/* Live Section */}
              <div className="w-full flex-shrink-0 overflow-y-auto h-full">
                <GamesCard/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Toggle - Now Absolute */}
      <nav className="absolute bottom-0 left-0 right-0 bg-nav-bg border-t border-border/50 backdrop-blur-sm z-[999]">
        <div className="max-w-4xl mx-auto">
          <div className="relative inline-flex bg-muted/50 p-1 rounded-full w-full max-w-md mx-auto">
            {/* Sliding Indicator with Light Cyan Background */}
            <div
              className="absolute top-1 bottom-1 bg-cyan-200 rounded-full transition-all duration-300 ease-out"
              style={{
                width: `calc(${100 / tabs.length}% - 0.5rem)`,
                left: `calc(${getIndicatorPosition()} + 0.25rem)`,
              }}
            />
            
            {/* Toggle Group */}
            <ToggleGroup
              type="single"
              value={activeTab}
              onValueChange={(value) => value && setActiveTab(value as TabType)}
              className="relative z-10 gap-0 w-full"
            >
              {tabs.map((tab) => (
                <ToggleGroupItem
                  key={tab.id}
                  value={tab.id}
                  className="relative flex items-center justify-center gap-2 px-4 py-2.5 flex-1 data-[state=on]:bg-transparent
                   data-[state=on]:text-background data-[state=off]:text-nav-inactive hover:text-foreground transition-all"
                >
                  {tab.icon}
                  <span className="text-sm">{tab.label}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </nav>
    </div>
  );
};