import { useState, useRef, useEffect } from "react";
import { Image as ImageIcon, Send, X } from "lucide-react";

const API_BASE_URL = 'https://fanclash-api.onrender.com';

const AddPost = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const userString = localStorage.getItem("user");
      console.log("User string from localStorage:", userString);
      
      if (userString) {
        const user = JSON.parse(userString);
        console.log("Parsed user object:", user);
        
        // Your user object has these exact fields:
        // id, username, phone, balance
        setUsername(user.username || "");
        setPhone(user.phone || "");
        setUserId(user.id || "");
        
        console.log("Set values - Username:", user.username, "Phone:", user.phone, "UserId:", user.id);
      } else {
        console.log("No user found in localStorage");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!userId || !username) {
      setMessage("Please login first");
      return;
    }

    if (!caption.trim()) {
      setMessage("Please write a caption");
      return;
    }

    if (!selectedImage) {
      setMessage("Please select an image first");
      return;
    }

    setIsUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('caption', caption.trim());
      
      // Try different combinations - your Rust API might expect different field names
      
      // OPTION 1: Your current fields
      formData.append('user_id', userId);
      formData.append('user_name', username);
      
      // OPTION 2: Try without underscores
      formData.append('userId', userId);
      formData.append('userName', username);
      
      // OPTION 3: Try exact fields from your user object
      formData.append('username', username);
      formData.append('phone', phone);
      
      // OPTION 4: Try sending the entire user object as JSON
      const userObj = {
        id: userId,
        username: username,
        phone: phone
      };
      formData.append('user', JSON.stringify(userObj));

      console.log("🔍 Submitting with these fields:");
      console.log("user_id:", userId);
      console.log("user_name:", username);
      console.log("phone:", phone);
      console.log("caption:", caption);
      console.log("image:", selectedImage.name);

      // Log all form data entries
      console.log("📋 All FormData entries:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value instanceof File ? `${value.name} (${value.type}, ${value.size} bytes)` : value);
      }

      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        body: formData,
      });

      console.log("📥 Response status:", response.status);
      
      const result = await response.json();
      console.log("📥 API Response:", result);

      if (response.ok) {
        setMessage("Post created successfully!");
        setSelectedImage(null);
        setCaption("");
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        // Try to get more details about the error
        console.log("❌ Full error response:", result);
        setMessage(result.error || result.message || `Failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      setMessage("Network error. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // ... rest of your component (handleImageSelect, removeImage, etc.) remains the same

  return (
    <div className="fixed bottom-0 left-0 right-0 h-1/2 bg-white border-t border-cyan-200 shadow-2xl rounded-t-3xl overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="p-6 pb-20">
          {/* Debug Info */}
          <div className="mb-4 p-3 bg-cyan-50 rounded-lg border border-cyan-200">
            <p className="text-xs font-medium text-cyan-700 mb-1">Current User Data:</p>
            <p className="text-xs text-cyan-600">ID: {userId || "Not set"}</p>
            <p className="text-xs text-cyan-600">Username: {username || "Not set"}</p>
            <p className="text-xs text-cyan-600">Phone: {phone || "Not set"}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image Upload Area */}
            <div>
              <label className="block text-cyan-700 font-medium mb-2 text-sm">Select Image</label>
              <div
                className={`border-2 border-dashed rounded-xl p-4 text-center transition-all duration-300 cursor-pointer ${
                  imagePreview 
                    ? 'border-cyan-400 bg-cyan-50' 
                    : 'border-cyan-300 bg-cyan-50/50 hover:bg-cyan-100/50'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (!file.type.startsWith('image/')) {
                        setMessage("Please select an image file");
                        return;
                      }
                      if (file.size > 5 * 1024 * 1024) {
                        setMessage("Image size should be less than 5MB");
                        return;
                      }
                      setSelectedImage(file);
                      const objectUrl = URL.createObjectURL(file);
                      setImagePreview(objectUrl);
                      setMessage("");
                    }
                  }}
                  className="hidden"
                />
                
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-32 mx-auto rounded-lg shadow-md object-contain"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                        if (imagePreview) URL.revokeObjectURL(imagePreview);
                        setImagePreview(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 py-4">
                    <ImageIcon className="h-10 w-10 text-cyan-400 mx-auto" />
                    <p className="text-cyan-700 font-medium text-sm">Click to upload image</p>
                    <p className="text-cyan-500 text-xs">PNG, JPG, GIF up to 5MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Caption Input */}
            <div>
              <label className="block text-cyan-700 font-medium mb-2 text-sm">Caption</label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption for your image..."
                className="w-full p-3 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white resize-none text-sm"
                rows={2}
                required
              />
            </div>

            {/* Message */}
            {message && (
              <div className={`p-3 rounded-lg text-center text-sm ${
                message.includes("success") 
                  ? "bg-green-100 text-green-700 border border-green-200" 
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}>
                {message}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!selectedImage || isUploading || !caption.trim() || !userId}
                className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Posting...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span className="text-sm">Post Image</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;