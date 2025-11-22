import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Clock, RefreshCw } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const API_BASE_URL = 'http://localhost:3000';

interface Post {
  id: string;
  image_url: string;
  caption?: string;
  user_name: string;
  user_id: string;
  created_at: number;
  updated_at?: number;
}

interface ApiResponse {
  success: boolean;
  posts: Post[];
  message?: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
      } else {
        throw new Error("Invalid response format: missing posts array");
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching posts";
      setError(errorMessage);
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (postId: string): void => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  const handleSave = (postId: string): void => {
    setSavedPosts(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(postId)) {
        newSaved.delete(postId);
      } else {
        newSaved.add(postId);
      }
      return newSaved;
    });
  };

  const formatTimeAgo = (timestamp: number): string => {
    try {
      const date = new Date(timestamp * 1000);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      
      if (diffInSeconds < 60) return 'Just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
      if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getFullImageUrl = (imageUrl: string): string => {
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    return `${API_BASE_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  };

  const useMockData = (): void => {
    const mockPosts: Post[] = [
      {
        id: '1',
        image_url: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=400&h=400&fit=crop',
        caption: 'Beautiful sunset at the beach! 🌅 #sunset #beach #nature',
        user_name: 'John Doe',
        user_id: 'user123',
        created_at: Math.floor(Date.now() / 1000) - 2 * 60 * 60,
      },
      {
        id: '2',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        caption: 'Exploring the mountains today! 🏔️ #adventure #mountains #hiking',
        user_name: 'Jane Smith',
        user_id: 'user456',
        created_at: Math.floor(Date.now() / 1000) - 5 * 60 * 60,
      },
    ];
    setPosts(mockPosts);
    setError("");
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-4 overflow-y-auto">
        <div className="max-w-md mx-auto px-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md border border-cyan-200 mb-4 animate-pulse">
              <div className="p-2 border-b border-cyan-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-cyan-200 rounded-full"></div>
                  <div className="space-y-1">
                    <div className="w-16 h-2 bg-cyan-200 rounded"></div>
                    <div className="w-10 h-1 bg-cyan-100 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="w-full h-[266px] bg-cyan-200"></div>
              <div className="p-2 space-y-1">
                <div className="flex gap-2">
                  <div className="w-5 h-5 bg-cyan-200 rounded"></div>
                  <div className="w-5 h-5 bg-cyan-200 rounded"></div>
                  <div className="w-5 h-5 bg-cyan-200 rounded"></div>
                </div>
                <div className="w-1/2 h-2 bg-cyan-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="bg-white rounded-xl p-4 border border-cyan-200 shadow-md">
            <div className="text-cyan-600 mb-2 text-3xl">⚠️</div>
            <h3 className="text-cyan-800 font-semibold text-sm mb-1">Failed to load posts</h3>
            <p className="text-cyan-600 mb-2 text-xs">{error}</p>
            <div className="space-y-1">
              <button
                onClick={fetchPosts}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded text-xs flex items-center justify-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                Try Again
              </button>
              <button
                onClick={useMockData}
                className="w-full bg-cyan-100 hover:bg-cyan-200 text-cyan-700 px-3 py-1 rounded border border-cyan-300 text-xs"
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-4 overflow-y-auto">
      <div className="max-w-md mx-auto px-4">
        {/* Posts Grid */}
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isLiked={likedPosts.has(post.id)}
              isSaved={savedPosts.has(post.id)}
              onLike={handleLike}
              onSave={handleSave}
              formatTimeAgo={formatTimeAgo}
              getInitials={getInitials}
              getFullImageUrl={getFullImageUrl}
            />
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-6 bg-white/80 backdrop-blur-sm rounded-xl border border-cyan-200 shadow-md">
            <div className="text-cyan-400 mb-2 text-3xl">📷</div>
            <h3 className="text-cyan-800 font-semibold text-sm mb-1">No posts yet</h3>
            <p className="text-cyan-600 mb-3 text-xs">Be the first to share a moment!</p>
            <button
              onClick={useMockData}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded text-xs"
            >
              Load Demo Posts
            </button>
          </div>
        )}

        {/* Load More */}
        {posts.length > 0 && (
          <div className="text-center py-3">
            <button
              onClick={fetchPosts}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded flex items-center gap-1 mx-auto text-xs"
            >
              <RefreshCw className="h-3 w-3" />
              Load New Posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Post Card Component
interface PostCardProps {
  post: Post;
  isLiked: boolean;
  isSaved: boolean;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  formatTimeAgo: (timestamp: number) => string;
  getInitials: (name: string) => string;
  getFullImageUrl: (url: string) => string;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  isLiked,
  isSaved,
  onLike,
  onSave,
  formatTimeAgo,
  getInitials,
  getFullImageUrl
}) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [showFullCaption, setShowFullCaption] = useState<boolean>(false);

  const shouldTruncate = post.caption && post.caption.length > 80;
  const fullImageUrl = getFullImageUrl(post.image_url);

  return (
    <div className="bg-white rounded-lg shadow-md border border-cyan-200 overflow-hidden hover:shadow-cyan-200/20 transition-all duration-300">
      {/* Header - Minimal height */}
      <div className="p-2 border-b border-cyan-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6 border border-cyan-300">
              <AvatarFallback className="bg-cyan-500 text-white font-semibold text-xs">
                {getInitials(post.user_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-cyan-800 text-xs">{post.user_name}</h3>
              <div className="flex items-center gap-1 text-cyan-600 text-xs">
                <Clock className="h-2 w-2" />
                <span>{formatTimeAgo(post.created_at)}</span>
              </div>
            </div>
          </div>
          <button className="text-cyan-500 hover:text-cyan-700 p-0.5 rounded-full transition-colors">
            <MoreHorizontal className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Image - Increased height by 10px */}
      <div className="relative bg-cyan-50">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-cyan-200 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={fullImageUrl}
          alt={post.caption || `Post by ${post.user_name}`}
          className={`w-full h-[350px] object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            console.error("Failed to load image:", fullImageUrl);
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNEOEU5RkYiLz48cGF0aCBkPSJNMTIwIDEyMEgxODBWMTgwSDEyMFYxMjBaIiBmaWxsPSIjQTdDQkZGIi8+PHBhdGggZD0iTTIyMCAxMjBIMjgwVjE4MEgyMjBWMTIwWiIgZmlsbD0iI0E3Q0JGRiIvPjxwYXRoIGQ9Ik0xMjAgMjAwSDE4MFYyNjBIMTIwVjIwMFoiIGZpbGw9IiNBN0NCRkYiLz48cGF0aCBkPSJNMjIwIDIwMEgyODBWMjYwSDIyMFYyMDBaIiBmaWxsPSIjQTdDQkZGIi8+PC9zdmc+';
          }}
        />
      </div>

      {/* Footer - Reduced height significantly */}
      <div className="p-2">
        {/* Actions - Compact */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onLike(post.id)}
              className={`p-0.5 transition-all duration-200 ${
                isLiked ? 'text-red-500 scale-105' : 'text-cyan-600 hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="text-cyan-600 hover:text-cyan-700 p-0.5 transition-colors">
              <MessageCircle className="h-4 w-4" />
            </button>
            <button className="text-cyan-600 hover:text-cyan-700 p-0.5 transition-colors">
              <Share className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => onSave(post.id)}
            className={`p-0.5 transition-all duration-200 ${
              isSaved ? 'text-cyan-600 scale-105' : 'text-cyan-600 hover:text-cyan-700'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Likes - Minimal */}
        <div className="mb-1">
          <p className="font-semibold text-cyan-800 text-xs">
            {Math.floor(Math.random() * 50)} likes
          </p>
        </div>

        {/* Caption - Compact */}
        {post.caption && (
          <div className="mb-1">
            <p className="text-cyan-800 text-xs">
              <span className="font-semibold">{post.user_name}</span>{' '}
              {shouldTruncate && !showFullCaption 
                ? `${post.caption.slice(0, 80)}...`
                : post.caption
              }
              {shouldTruncate && (
                <button
                  onClick={() => setShowFullCaption(!showFullCaption)}
                  className="ml-1 text-cyan-600 hover:text-cyan-700 font-medium text-xs"
                >
                  {showFullCaption ? 'Less' : 'More'}
                </button>
              )}
            </p>
          </div>
        )}

        {/* Comments - Minimal */}
        <div className="text-cyan-600 text-xs mb-1">
          <button className="hover:text-cyan-700 transition-colors">
            View {Math.floor(Math.random() * 15)} comments
          </button>
        </div>

        {/* Add Comment - Minimal */}
        <div className="pt-1 border-t border-cyan-100">
          <div className="flex gap-1">
            <input
              type="text"
              placeholder="Add comment..."
              className="flex-1 text-xs text-cyan-800 bg-transparent border-none outline-none placeholder-cyan-400"
            />
            <button className="text-cyan-500 hover:text-cyan-700 font-semibold text-xs transition-colors">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;