import { useState, useRef } from "react";
import { Image as ImageIcon, Send, X } from "lucide-react";

const API_BASE_URL = 'https://clashaapi-4.onrender.com';

const AddPost = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("File input triggered!");
    const files = event.target.files;
    const file = files ? files[0] : null;
    console.log("Selected file:", file);
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        setMessage("Please select an image file");
        return;
      }

      setSelectedImage(file);
      
      const objectUrl = URL.createObjectURL(file);
      console.log("Object URL created:", objectUrl);
      setImagePreview(objectUrl);
      setMessage("");
    } else {
      console.log("No file selected");
    }
  };

  const handleUploadAreaClick = (): void => {
    console.log("Upload area clicked");
    // Reset the file input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!selectedImage) {
      setMessage("Please select an image first");
      return;
    }

    setIsUploading(true);
    setMessage("");

    try {
      const user = JSON.parse(localStorage.getItem("user") || '{}');
      
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('caption', caption);
      formData.append('userId', user._id || 'user123');
      formData.append('userName', user.userName || 'User');
      formData.append('userEmail', user.userEmail || 'user@example.com');

      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage("Image posted successfully!");
        setSelectedImage(null);
        setCaption("");
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);
        // Reset file input after successful upload
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setMessage("Failed to post image. Please try again.");
      }
    } catch (error) {
      setMessage("Error posting image");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setSelectedImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    // Reset file input when removing image
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-1/2 bg-white border-t border-cyan-200 shadow-2xl rounded-t-3xl overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="p-6 pb-20">
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
                onClick={handleUploadAreaClick}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageSelect}
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
                      onClick={removeImage}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 py-4">
                    <ImageIcon className="h-10 w-10 text-cyan-400 mx-auto" />
                    <p className="text-cyan-700 font-medium text-sm">Click to upload image</p>
                    <p className="text-cyan-500 text-xs">PNG, JPG, GIF - Any size</p>
                  </div>
                )}
              </div>
            </div>

            {/* Caption Input */}
            <div>
              <label className="block text-cyan-700 font-medium mb-2 text-sm">Caption</label>
              <textarea
                value={caption}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCaption(e.target.value)}
                placeholder="Write a caption for your image..."
                className="w-full p-3 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white resize-none text-sm"
                rows={2}
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
                disabled={!selectedImage || isUploading}
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