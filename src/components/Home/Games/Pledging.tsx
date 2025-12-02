import React from 'react'
import { useState } from 'react';

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
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';
import {useForm} from 'react-hook-form'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Trophy } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Pledging = () => {

  const url="https://fanclash-api.onrender.com"







const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()



     const [isHovered, setIsHovered] = useState(false);
      const [isPledging, setIsPledging] = useState(false);
      const [selectedOption, setSelectedOption] = useState("");
      const [amount, setAmount] = useState("");
      const [isLiked, setIsLiked] = useState(false);
      const [isFollowing, setIsFollowing] = useState(false);
      const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100) + 50);
      const [commentCount, setCommentCount] = useState(Math.floor(Math.random() * 30) + 10);
      const [followerCount, setFollowerCount] = useState(Math.floor(Math.random() * 500) + 200);
     
    
     
    
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
    
      
    







   const onSubmit = async (data) => {
          console.log(data)
          // send data to backend API
          fetch(url, {
              method: "POST",
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(data)
          })
              .then((res) => res.json())
              .then((result) => {
                  console.log(result);
                  if (result.success) {
                      localStorage.setItem("usertoken", result.token)
                      localStorage.setItem("user", JSON.stringify(result.user));
  
                     // setLoginData(result.token)
                      
                      toast.success('Successfully toasted!')
                      //navigate('/'); 
                  }
                  else
                    console.log("hellooo")
                      ////oast.error(result.error)
              })
              .catch((err) => {
                 // toast.error("An error occured")
                  console.log(err);
              })
      }
  
  
  
  
  
  




























  return (
  <div className="space-y-4 justify-center ml-[200px]">
                 <div >
  <SheetContent className="bg-white border-l border-gray-200 w-full max-w-md">
                  <SheetHeader>
                    <SheetTitle className="text-cyan-700 text-base flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-cyan-600" />
                      bet placement
                    </SheetTitle>
                    <SheetDescription className="text-gray-600 text-sm">
                   
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
                 
                      className="w-full bg-cyan-100 hover:bg-cyan-200 text-cyan-700 border border-cyan-300 rounded-lg py-2 text-sm shadow hover:shadow-md transition-all duration-300"
                    >
                      🎯 confirm bet
                    </Button>
                  </div>
                </SheetContent>
  </div>
              </div>
  )
}
