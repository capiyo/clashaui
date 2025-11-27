
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Clock, RefreshCw } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState,useRef,useEffect } from "react";

const API_BASE_URL = 'https://clashaapi.onrender.com';
const localUrl="http://localhost:3000"

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
      
      console.log("Fetching posts from:", `${API_BASE_URL}/api/posts`);
      
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit'
      });
      
      console.log("Response status:", response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
      }
      
      const data: ApiResponse = await response.json();
      console.log("API Response:", data);
      
      if (data.success && Array.isArray(data.posts)) {
        const postsWithValidatedUrls = data.posts.map(post => ({
          ...post,
          image_url: validateImageUrl(post.image_url)
        }));
        setPosts(postsWithValidatedUrls);
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

  const validateImageUrl = (imageUrl: string): string => {
    if (!imageUrl || imageUrl.trim() === '') {
      return '';
    }
    
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it starts with //, add https:
    if (imageUrl.startsWith('//')) {
      return `https:${imageUrl}`;
    }
    
    // If it's an absolute path, prepend the API base URL
    if (imageUrl.startsWith('/')) {
      return `${API_BASE_URL}${imageUrl}`;
    }
    
    // For relative paths, prepend API base URL with slash
    return `${API_BASE_URL}/${imageUrl}`;
  };

  const getFullImageUrl = (imageUrl: string): string => {
    const validatedUrl = validateImageUrl(imageUrl);
    
    // If no valid URL, return empty string
    if (!validatedUrl) return '';
    
    // Add cache busting parameter to avoid cached broken images
    const separator = validatedUrl.includes('?') ? '&' : '?';
    return `${validatedUrl}${separator}t=${Date.now()}`;
  };

  // Diagnostic effect to check image loading
  useEffect(() => {
    if (posts.length > 0) {
      console.log("=== IMAGE DIAGNOSTICS ===");
      console.log("User Agent:", navigator.userAgent);
      console.log("Platform:", navigator.platform);
      
      posts.forEach((post, index) => {
        const fullUrl = getFullImageUrl(post.image_url);
        console.log(`Post ${index} (${post.id}):`, {
          original: post.image_url,
          validated: validateImageUrl(post.image_url),
          full: fullUrl,
          hasImage: !!post.image_url && post.image_url.trim() !== ''
        });
        
        // Preload images for diagnostics
        if (fullUrl) {
          const img = new Image();
          img.src = fullUrl;
          img.onload = () => console.log(`✅ Image preloaded: ${fullUrl}`);
          img.onerror = () => console.log(`❌ Image preload failed: ${fullUrl}`);
        }
      });
    }
  }, [posts]);

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
        image_url: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=600&h=600&fit=crop',
        caption: 'Beautiful sunset at the beach! 🌅 #sunset #beach #nature',
        user_name: 'John Doe',
        user_id: 'user123',
        created_at: Math.floor(Date.now() / 1000) - 2 * 60 * 60,
      },
      {
        id: '2',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
        caption: 'Exploring the mountains today! 🏔️ #adventure #mountains #hiking',
        user_name: 'Jane Smith',
        user_id: 'user456',
        created_at: Math.floor(Date.now() / 1000) - 5 * 60 * 60,
      },
      {
        id: '3',
        image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop',
        caption: 'Fashion week vibes! 👗✨ #fashion #style #ootd',
        user_name: 'Emma Wilson',
        user_id: 'user789',
        created_at: Math.floor(Date.now() / 1000) - 8 * 60 * 60,
      },
      {
        id: '4',
        image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop',
        caption: 'Healthy breakfast to start the day right! 🥑🍳 #healthy #food #breakfast',
        user_name: 'Mike Johnson',
        user_id: 'user101',
        created_at: Math.floor(Date.now() / 1000) - 12 * 60 * 60,
      },
    ];
    setPosts(mockPosts);
    setError("");
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-screen bg-white overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white border-b border-gray-200 animate-pulse">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="space-y-1 flex-1">
                      <div className="w-24 h-4 bg-gray-200 rounded"></div>
                      <div className="w-20 h-3 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-96 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
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
      <div className="h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="bg-white rounded-lg p-6 border border-cyan-200 shadow-md">
            <div className="text-cyan-600 mb-3 text-4xl">⚠️</div>
            <h3 className="text-cyan-800 font-semibold text-lg mb-2">Failed to load posts</h3>
            <p className="text-cyan-600 mb-4 text-sm">{error}</p>
            <div className="space-y-2">
              <button
                onClick={fetchPosts}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded-lg text-sm flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
              <button
                onClick={useMockData}
                className="w-full bg-cyan-100 hover:bg-cyan-200 text-cyan-700 px-4 py-3 rounded-lg border border-cyan-300 text-sm"
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
    <div className="h-screen bg-white overflow-hidden">
      {/* Scrollable container */}
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-200 scrollbar-track-gray-100"
      >
        {/* Centered content for large screens */}
        <div className="max-w-2xl mx-auto">
          {/* Posts Grid */}
          <div className="w-full">
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
            <div className="w-full p-8 bg-white border-b border-cyan-200">
              <div className="text-center">
                <div className="text-cyan-400 mb-4 text-5xl">📷</div>
                <h3 className="text-cyan-800 font-semibold text-xl mb-3">No posts yet</h3>
                <p className="text-cyan-600 mb-6 text-base">Be the first to share a moment!</p>
                <button
                  onClick={useMockData}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg text-base font-semibold"
                >
                  Load Demo Posts
                </button>
              </div>
            </div>
          )}

          {/* Load More */}
          {posts.length > 0 && (
            <div className="w-full p-6 border-t border-gray-100 bg-white sticky bottom-0">
              <button
                onClick={fetchPosts}
                className="w-full  text-white py-4 rounded-lg flex items-center justify-center gap-3 text-base font-semibold shadow-lg"
              >
                <RefreshCw className="h-5 w-5" />
                Load New Posts
              </button>
            </div>
          )}
        </div>
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
  const [imageError, setImageError] = useState<boolean>(false);
  const [hasValidImage, setHasValidImage] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);

  const shouldTruncate = post.caption && post.caption.length > 80;
  
  // Enhanced URL with retry mechanism
  const getImageUrlWithRetry = () => {
    const baseUrl = getFullImageUrl(post.image_url);
    if (retryCount > 0) {
      const separator = baseUrl.includes('?') ? '&' : '?';
      return `${baseUrl}${separator}retry=${retryCount}&t=${Date.now()}`;
    }
    return baseUrl;
  };

  const fullImageUrl = getImageUrlWithRetry();

  useEffect(() => {
    const isValid = post.image_url && 
                   post.image_url.trim() !== '' && 
                   post.image_url !== 'null' && 
                   post.image_url !== 'undefined';
    setHasValidImage(isValid);
    setImageError(false);
    setImageLoaded(false);
    setRetryCount(0);
  }, [post.image_url, post.id]);

  const handleImageError = () => {
    console.error(`❌ Failed to load image (attempt ${retryCount + 1}):`, fullImageUrl);
    
    if (retryCount < 3) {
      // Retry loading the image
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setImageError(false);
        setImageLoaded(false);
      }, 1000 * (retryCount + 1)); // Exponential backoff
    } else {
      setImageError(true);
      setImageLoaded(true);
      setHasValidImage(false);
    }
  };

  const handleImageLoad = () => {
    console.log("✅ Image loaded successfully:", fullImageUrl);
    setImageLoaded(true);
    setImageError(false);
    setHasValidImage(true);
  };

  const handleRetry = () => {
    setRetryCount(0);
    setImageError(false);
    setImageLoaded(false);
  };

  return (
    <div className="bg-white border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border border-cyan-300 shadow-sm">
              <AvatarFallback className="bg-cyan-500 text-white font-semibold text-sm">
                {getInitials(post.user_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-base">{post.user_name}</h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Clock className="h-3 w-3" />
                <span>{formatTimeAgo(post.created_at)}</span>
              </div>
            </div>
          </div>
          <button className="text-gray-500 hover:text-cyan-600 p-2 rounded-full transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Image Section with Enhanced Error Handling */}
      {hasValidImage ? (
        <div className="relative bg-gray-50 w-full">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 border-2 border-gray-300 border-t-cyan-500 rounded-full animate-spin"></div>
                <p className="text-gray-500 text-sm">Loading image...</p>
                {retryCount > 0 && (
                  <p className="text-gray-400 text-xs">Attempt {retryCount + 1}/3</p>
                )}
              </div>
            </div>
          )}
          
          {imageError ? (
            <div className="w-full aspect-square flex flex-col items-center justify-center bg-gray-100 p-4">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-3">📷</div>
                <p className="text-base mb-2">Image not available</p>
                <p className="text-sm text-gray-400 mb-4">
                  {retryCount > 0 ? `Tried ${retryCount} times` : 'Failed to load'}
                </p>
                <button
                  onClick={handleRetry}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <img
              src={fullImageUrl}
              alt={post.caption || `Post by ${post.user_name}`}
              className={`w-full object-contain transition-opacity duration-300 bg-gray-100 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
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
          )}
        </div>
      ) : (
        <div className="w-full aspect-square flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-3">📷</div>
            <p className="text-base">No image available</p>
            {post.image_url && (
              <p className="text-sm text-gray-400 mt-2">URL: {post.image_url}</p>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-4">
        {/* Actions */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLike(post.id)}
              className={`p-2 transition-all duration-200 ${
                isLiked ? 'text-red-500 scale-110' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="text-gray-600 hover:text-cyan-600 p-2 transition-colors">
              <MessageCircle className="h-6 w-6" />
            </button>
            <button className="text-gray-600 hover:text-cyan-600 p-2 transition-colors">
              <Share className="h-6 w-6" />
            </button>
          </div>
          <button
            onClick={() => onSave(post.id)}
            className={`p-2 transition-all duration-200 ${
              isSaved ? 'text-cyan-600 scale-110' : 'text-gray-600 hover:text-cyan-600'
            }`}
          >
            <Bookmark className={`h-6 w-6 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Likes */}
        <div className="mb-3">
          <p className="font-semibold text-gray-800 text-base">
            {Math.floor(Math.random() * 50)} likes
          </p>
        </div>

        {/* Caption */}
        {post.caption && (
          <div className="mb-3">
            <p className="text-gray-800 text-base">
              <span className="font-semibold">{post.user_name}</span>{' '}
              {shouldTruncate && !showFullCaption 
                ? `${post.caption.slice(0, 80)}...`
                : post.caption
              }
              {shouldTruncate && (
                <button
                  onClick={() => setShowFullCaption(!showFullCaption)}
                  className="ml-2 text-cyan-600 hover:text-cyan-700 font-medium text-base"
                >
                  {showFullCaption ? 'Show less' : 'Show more'}
                </button>
              )}
            </p>
          </div>
        )}

        {/* Comments */}
        <div className="text-gray-600 text-base mb-3">
          <button className="hover:text-cyan-600 transition-colors">
            View {Math.floor(Math.random() * 15)} comments
          </button>
        </div>

        {/* Add Comment */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Add comment..."
              className="flex-1 text-base text-gray-800 bg-transparent border-none outline-none placeholder-gray-400"
            />
            <button className="text-cyan-600 hover:text-cyan-700 font-semibold text-base transition-colors">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;