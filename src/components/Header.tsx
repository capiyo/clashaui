import { Bell, Menu, User, MessageCircle, Code, MessageCircleCode, Zap, Target, Trophy, Heart, MessageSquare, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { 
  increment, 
  decrement, 
  incrementByAmount, 
  reset,
  incrementAsync 
} from '../components/ReduxPages/slices/counterSlice'
import { useAppDispatch, useAppSelector } from '../components/ReduxPages/reducers/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useForm } from "react-hook-form"
import { toast } from 'react-hot-toast';
import { Notifications } from "./Footer/Notifications";
import { Login } from "./Footer/Login";
import { Register } from "./Footer/Register";

const Header = () => {
  const dispatch = useAppDispatch();
  const { value, status } = useAppSelector((state) => state.counter);
  const [incrementAmount, setIncrementAmount] = useState("post-job");
  const [login, setLogin] = useState(false);
  const [bossId, setBossId] = useState("");
  const [posterName, setPosterName] = useState();
  const [bossPhone, setBossPhone] = useState();
  const [showLogin, setShowLogin] = useState(false);
  const timePosted = new Date().toLocaleTimeString();
  const datePosted = new Date().toLocaleDateString();
  const [notification, setNotifications] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [commentCount, setCommentCount] = useState(8);
  const [followerCount, setFollowerCount] = useState(127);

  const handleChange = () => {
    dispatch({ type: "footerOverlay", payload: "post-job" });
  };

  const hanldleNotfications = () => {
    setNotifications(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const changeLoging = () => {
    setLogin(!login);
  };

  const handleIncrement = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);

  const handleDecrement = useCallback(() => {
    dispatch(decrement());
  }, [dispatch]);

  const handleIncrementByAmount = useCallback((string: string) => {
    dispatch(incrementByAmount(string));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  const handleIncrementAsync = useCallback((amount: number) => {
    dispatch(incrementAsync(amount));
  }, [dispatch]);

  // Social interaction handlers
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? "Like removed" : "Post liked!");
  };

  const handleComment = () => {
    // This would typically open a comment modal/drawer
    toast.success("Comment section opened!");
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
    toast.success(isFollowing ? "Unfollowed" : "Following!");
  };

  useEffect(() => {
    const token = localStorage.getItem("user");
    const user = JSON.parse(token);
    if (user) {
      setShowLogin(true);
      setBossId(user._id);
      setPosterName(user.userName);
      setBossPhone(user.phoneNumber);
    }
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-cyan-200/60 shadow-lg hidden w-screen md:flex">
      <div className="container px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo - Cyan Theme */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Zap className="h-4 w-4 text-white" />
              </div>
            </div>
            <span className="text-lg font-black bg-gradient-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent">
              Fanclash
            </span>
          </div>

          {/* Social Interaction Buttons - Cyan Theme */}
          <div className="flex items-center space-x-2">
            {/* Like Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-all duration-200 ${
                isLiked 
                  ? "bg-cyan-500/20 text-cyan-700 border border-cyan-300/60" 
                  : "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 hover:text-cyan-700 border border-cyan-200/50"
              }`}
            >
              <Heart 
                className={`h-4 w-4 transition-colors ${
                  isLiked ? "fill-cyan-500 text-cyan-500" : ""
                }`} 
              />
              <span className="text-xs font-semibold">{likeCount}</span>
            </Button>

            {/* Comment Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleComment}
              className="flex items-center space-x-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 hover:text-cyan-700 border border-cyan-200/50 transition-all duration-200"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs font-semibold">{commentCount}</span>
            </Button>

            {/* Follow Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFollow}
              className={`flex items-center space-x-1 transition-all duration-200 ${
                isFollowing
                  ? "bg-cyan-500 text-white hover:bg-cyan-600 border border-cyan-500"
                  : "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 hover:text-cyan-700 border border-cyan-200/50"
              }`}
            >
              <UserPlus className="h-4 w-4" />
              <span className="text-xs font-semibold">{followerCount}</span>
            </Button>
          </div>

          {/* Notifications */}
          <Drawer>
            <DrawerTrigger>
              <Notifications />
            </DrawerTrigger>
          </Drawer>

          {/* Login Section */}
          <div className="flex items-center space-x-3">
            <Drawer>
              {showLogin !== true ? (
                <DrawerTrigger>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-300/50 text-cyan-700 hover:text-cyan-800 text-xs font-semibold"
                  >
                    login
                  </Button>
                </DrawerTrigger>
              ) : (
                ''
              )}
              <div className='justify-center'>
                
              </div>
            </Drawer>
          </div>

          {/* Desktop Navigation - Cyan Theme */}
          <div className="rounded-xl p-2 flex mr-10 flex-row bg-gradient-to-r from-white to-cyan-50 border border-cyan-200/60 shadow-sm">
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-cyan-700 hover:text-cyan-800 transition-colors font-semibold text-sm">
                live bets
              </a>
              <a href="#" className="text-cyan-700 hover:text-cyan-800 transition-colors font-semibold text-sm">
                tournament
              </a>
              <a href="#" className="text-cyan-700 hover:text-cyan-800 transition-colors font-semibold text-sm">
                create match
              </a>
              <a href="#" className="text-cyan-700 hover:text-cyan-800 transition-colors font-semibold text-sm">
                leaderboard
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden lg:hidden right-0 bg-cyan-500/10 hover:bg-cyan-500/20"
            >
              <Menu className="h-4 w-4 text-cyan-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;