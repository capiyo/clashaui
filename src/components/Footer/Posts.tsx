import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Clock, RefreshCw } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useRef, useEffect } from "react";

const API_BASE_URL = 'https://clashaapi.onrender.com';

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
  const containerRef = useRef<HTMLDivElement>(null);

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
        mode: 'cors',
        credentials: 'omit'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.success && Array.isArray(data.posts)) {
        const cleanedPosts = data.posts.map(post => ({
          ...post,
          image_url: cleanImageUrl(post.image_url)
        }));
        
        setPosts(cleanedPosts);
      } else {
        throw new Error("Invalid response format");
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching posts";
      setError(errorMessage);
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const cleanImageUrl = (imageUrl: string): string => {
    if (!imageUrl || 
        typeof imageUrl !== 'string' ||
        imageUrl.trim() === '' || 
        imageUrl === 'null' || 
        imageUrl === 'undefined' ||
        imageUrl === 'NaN' ||
        imageUrl.toLowerCase() === 'none' ||
        imageUrl === 'false' ||
        imageUrl === 'true') {
      return '';
    }
    
    let cleanedUrl = imageUrl.trim();
    
    if (cleanedUrl.startsWith('http://') || cleanedUrl.startsWith('https://')) {
      return cleanedUrl;
    }
    
    if (cleanedUrl.startsWith('//')) {
      return `https:${cleanedUrl}`;
    }
    
    if (cleanedUrl.startsWith('/')) {
      return `${API_BASE_URL}${cleanedUrl}`;
    }
    
    return `${API_BASE_URL}/${cleanedUrl}`;
  };

  const hasValidImage = (imageUrl: string): boolean => {
    if (!imageUrl || imageUrl.trim() === '') return false;
    
    const invalidValues = ['null', 'undefined', 'nan', 'none', 'false', 'true'];
    if (invalidValues.includes(imageUrl.toLowerCase())) return false;
    
    if (imageUrl.includes('placeholder') || 
        imageUrl.includes('default') || 
        imageUrl.includes('missing')) {
      return false;
    }
    
    return true;
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

  const useMockData = (): void => {
    const mockPosts: Post[] = [
      {
        id: '1',
        image_url: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=400&h=400&fit=crop',
        caption: 'Beautiful sunset at the beach! 🌅 The colors were absolutely breathtaking today. #sunset #beach #nature',
        user_name: 'John Doe',
        user_id: 'user123',
        created_at: Math.floor(Date.now() / 1000) - 2 * 60 * 60,
      },
      {
        id: '2',
        image_url: '', // No image - will be completely hidden
        caption: 'Exploring the mountains today! 🏔️ Fresh air and amazing views make every step worth it. #adventure #mountains #hiking',
        user_name: 'Jane Smith',
        user_id: 'user456',
        created_at: Math.floor(Date.now() / 1000) - 5 * 60 * 60,
      },
      {
        id: '3',
        image_url: 'null', // No image - will be completely hidden
        caption: 'Just a text update about my day! Thinking about life and coding. #thoughts #day',
        user_name: 'Mike Johnson',
        user_id: 'user789',
        created_at: Math.floor(Date.now() / 1000) - 3 * 60 * 60,
      },
    ];
    
    const cleanedPosts = mockPosts.map(post => ({
      ...post,
      image_url: cleanImageUrl(post.image_url)
    }));
    
    setPosts(cleanedPosts);
    setError("");
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-white overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="max-w-2xl mx-auto py-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-cyan-100/50 shadow-sm mb-4 animate-pulse">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-cyan-200 rounded-full"></div>
                    <div className="space-y-1 flex-1">
                      <div className="w-20 h-3 bg-cyan-200 rounded"></div>
                      <div className="w-16 h-2 bg-cyan-100 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-80 bg-cyan-200/50"></div>
                <div className="p-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-cyan-200 rounded"></div>
                    <div className="w-6 h-6 bg-cyan-200 rounded"></div>
                    <div className="w-6 h-6 bg-cyan-200 rounded"></div>
                  </div>
                  <div className="w-3/4 h-3 bg-cyan-200 rounded"></div>
                  <div className="w-1/2 h-2 bg-cyan-100 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-white flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-cyan-200/50 shadow-sm">
            <div className="text-cyan-400 mb-3 text-4xl">📷</div>
            <h3 className="text-cyan-800 font-semibold text-sm mb-2">Failed to load posts</h3>
            <p className="text-cyan-600 mb-4 text-xs">{error}</p>
            <div className="space-y-2">
              <button
                onClick={fetchPosts}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
              >
                <RefreshCw className="h-3 w-3" />
                Try Again
              </button>
              <button
                onClick={useMockData}
                className="w-full bg-cyan-100 hover:bg-cyan-200 text-cyan-700 px-4 py-2 rounded-xl border border-cyan-300/50 text-xs transition-all duration-200"
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-white overflow-hidden">
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-200 scrollbar-track-cyan-50/50"
      >
        <div className="max-w-2xl mx-auto py-4 px-2">
          <div className="w-full space-y-4">
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
              />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-cyan-100/50 shadow-sm p-8">
              <div className="text-center">
                <div className="text-cyan-400 mb-3 text-5xl">📷</div>
                <h3 className="text-cyan-800 font-semibold text-sm mb-2">No posts yet</h3>
                <p className="text-cyan-600 mb-4 text-xs">Be the first to share a moment!</p>
                <button
                  onClick={useMockData}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm"
                >
                  Load Demo Posts
                </button>
              </div>
            </div>
          )}

          {posts.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-cyan-100/50 shadow-sm p-4 mt-4 sticky bottom-2">
              <button
                onClick={fetchPosts}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-all duration-200 shadow-sm"
              >
                <RefreshCw className="h-3 w-3" />
                Load New Posts
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// SIMPLIFIED Post Card Component - No image state management for invalid images
interface PostCardProps {
  post: Post;
  isLiked: boolean;
  isSaved: boolean;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  formatTimeAgo: (timestamp: number) => string;
  getInitials: (name: string) => string;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  isLiked,
  isSaved,
  onLike,
  onSave,
  formatTimeAgo,
  getInitials,
}) => {
  const [showFullCaption, setShowFullCaption] = useState<boolean>(false);

  const shouldTruncate = post.caption && post.caption.length > 120;
  
  // Simple check - if no valid image URL, don't render ANY image-related code
  const hasValidImage = post.image_url && 
                       post.image_url.trim() !== '' && 
                       post.image_url !== 'null' && 
                       post.image_url !== 'undefined' &&
                       !post.image_url.toLowerCase().includes('null') &&
                       !post.image_url.toLowerCase().includes('undefined');

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-cyan-100/50 shadow-sm hover:shadow-md transition-all duration-300 hover:border-cyan-200/70">
      {/* Header */}
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-7 h-7 border border-cyan-300/50 shadow-sm">
              <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-cyan-500 text-white font-medium text-[10px]">
                {getInitials(post.user_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-cyan-900 text-xs">{post.user_name}</h3>
              <div className="flex items-center gap-1 text-cyan-600/80 text-[10px]">
                <Clock className="h-2.5 w-2.5" />
                <span>{formatTimeAgo(post.created_at)}</span>
              </div>
            </div>
          </div>
          <button className="text-cyan-600/60 hover:text-cyan-700 p-1 rounded-lg transition-colors">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Image Section - ONLY rendered when hasValidImage is TRUE */}
      {hasValidImage && (
        <ImageSection imageUrl={post.image_url} caption={post.caption} userName={post.user_name} />
      )}

      {/* Footer - No conditional padding needed */}
      <div className="p-3">
        {/* Actions */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onLike(post.id)}
              className={`p-1.5 transition-all duration-200 ${
                isLiked ? 'text-red-500 scale-110' : 'text-cyan-600/70 hover:text-red-500'
              }`}
            >
              <Heart className={`h-4.5 w-4.5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="text-cyan-600/70 hover:text-cyan-700 p-1.5 transition-colors">
              <MessageCircle className="h-4.5 w-4.5" />
            </button>
            <button className="text-cyan-600/70 hover:text-cyan-700 p-1.5 transition-colors">
              <Share className="h-4.5 w-4.5" />
            </button>
          </div>
          <button
            onClick={() => onSave(post.id)}
            className={`p-1.5 transition-all duration-200 ${
              isSaved ? 'text-cyan-500 scale-110' : 'text-cyan-600/70 hover:text-cyan-700'
            }`}
          >
            <Bookmark className={`h-4.5 w-4.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Likes */}
        <div className="mb-2">
          <p className="font-semibold text-cyan-900 text-xs">
            {Math.floor(Math.random() * 50)} likes
          </p>
        </div>

        {/* Caption */}
        {post.caption && (
          <div className="mb-2">
            <p className="text-cyan-800 text-xs leading-relaxed">
              <span className="font-semibold">{post.user_name}</span>{' '}
              {shouldTruncate && !showFullCaption 
                ? `${post.caption.slice(0, 120)}...`
                : post.caption
              }
              {shouldTruncate && (
                <button
                  onClick={() => setShowFullCaption(!showFullCaption)}
                  className="ml-1 text-cyan-500 hover:text-cyan-600 font-medium text-xs transition-colors"
                >
                  {showFullCaption ? 'Show less' : 'Show more'}
                </button>
              )}
            </p>
          </div>
        )}

        {/* Comments */}
        <div className="text-cyan-600/70 text-xs mb-2">
          <button className="hover:text-cyan-700 transition-colors">
            View {Math.floor(Math.random() * 15)} comments
          </button>
        </div>

        {/* Add Comment */}
        <div className="pt-2 border-t border-cyan-100/50">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add comment..."
              className="flex-1 text-xs text-cyan-900 bg-transparent border-none outline-none placeholder-cyan-600/40"
            />
            <button className="text-cyan-500 hover:text-cyan-600 font-semibold text-xs transition-colors">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Separate component for image handling - only used when we actually have an image
interface ImageSectionProps {
  imageUrl: string;
  caption?: string;
  userName: string;
}

const ImageSection: React.FC<ImageSectionProps> = ({ imageUrl, caption, userName }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // If image fails to load, don't show anything
  if (imageError) {
    return null;
  }

  return (
    <div className="relative bg-gradient-to-br from-cyan-50/50 to-cyan-100/30">
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-cyan-50/30">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-7 h-7 border-2 border-cyan-200 border-t-cyan-400 rounded-full animate-spin"></div>
            <p className="text-cyan-600/60 text-[10px]">Loading image...</p>
          </div>
        </div>
      )}
      
      <img
        src={imageUrl}
        alt={caption || `Post by ${userName}`}
        className={`w-full object-cover transition-all duration-500 ${
          imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        style={{ 
          maxHeight: '70vh',
          minHeight: '300px'
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default Posts;