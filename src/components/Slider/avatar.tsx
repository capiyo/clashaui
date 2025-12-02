// components/ui/avatar.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { User, Users, Star, Shield, Zap, Award } from "lucide-react"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        default: "h-10 w-10",
        md: "h-12 w-12 text-base",
        lg: "h-14 w-14 text-lg",
        xl: "h-16 w-16 text-xl",
        "2xl": "h-20 w-20 text-2xl",
        "3xl": "h-24 w-24 text-3xl",
      },
      variant: {
        default: "bg-gradient-to-br from-cyan-100 to-cyan-200 text-cyan-700",
        premium: "bg-gradient-to-br from-cyan-400 to-cyan-600 text-white",
        outline: "border-2 border-cyan-300 bg-white",
        subtle: "bg-cyan-50 text-cyan-600",
        online: "ring-2 ring-emerald-400 bg-gradient-to-br from-cyan-200 to-cyan-300",
        offline: "bg-gradient-to-br from-cyan-100 to-gray-200 text-cyan-600/70",
        trust: "bg-gradient-to-br from-emerald-100 to-cyan-100 text-emerald-700",
        verified: "bg-gradient-to-br from-cyan-300 to-blue-300 text-white",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-lg",
        rounded: "rounded-xl",
      }
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      shape: "circle",
    },
  }
)

export interface AvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof avatarVariants> {
  fallbackType?: "initials" | "icon" | "custom"
  fallbackIcon?: React.ReactNode
  fallbackText?: string
  status?: "online" | "offline" | "away" | "busy" | null
  badge?: "verified" | "premium" | "star" | "shield" | null
  badgePosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  glow?: boolean
  glowColor?: "cyan" | "emerald" | "amber" | "rose" | "violet"
}

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ 
    className, 
    size, 
    variant, 
    shape,
    fallbackType = "initials",
    fallbackIcon,
    fallbackText,
    status,
    badge,
    badgePosition = "bottom-right",
    glow = false,
    glowColor = "cyan",
    src,
    alt,
    ...props 
  }, ref) => {
    const getInitials = (name: string = "") => {
      return name
        .split(" ")
        .map(part => part.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }

    const getStatusColor = () => {
      switch (status) {
        case "online": return "bg-emerald-400 border-2 border-white"
        case "away": return "bg-amber-400 border-2 border-white"
        case "busy": return "bg-rose-400 border-2 border-white"
        case "offline": return "bg-cyan-300 border-2 border-white"
        default: return ""
      }
    }

    const getStatusPosition = () => {
      switch (badgePosition) {
        case "top-right": return "top-0 right-0"
        case "top-left": return "top-0 left-0"
        case "bottom-left": return "bottom-0 left-0"
        default: return "bottom-0 right-0"
      }
    }

    const getBadgeIcon = () => {
      switch (badge) {
        case "verified": return <Shield className="h-2.5 w-2.5 md:h-3 md:w-3" />
        case "premium": return <Star className="h-2.5 w-2.5 md:h-3 md:w-3" fill="currentColor" />
        case "star": return <Star className="h-2.5 w-2.5 md:h-3 md:w-3" />
        case "shield": return <Shield className="h-2.5 w-2.5 md:h-3 md:w-3" />
        default: return null
      }
    }

    const getBadgeColor = () => {
      switch (badge) {
        case "verified": return "bg-emerald-500 text-white"
        case "premium": return "bg-gradient-to-r from-amber-400 to-amber-500 text-white"
        case "star": return "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white"
        case "shield": return "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
        default: return ""
      }
    }

    const getGlowColor = () => {
      switch (glowColor) {
        case "cyan": return "shadow-lg shadow-cyan-500/30"
        case "emerald": return "shadow-lg shadow-emerald-500/30"
        case "amber": return "shadow-lg shadow-amber-500/30"
        case "rose": return "shadow-lg shadow-rose-500/30"
        case "violet": return "shadow-lg shadow-violet-500/30"
        default: return "shadow-lg shadow-cyan-500/30"
      }
    }

    const renderFallback = () => {
      if (fallbackType === "custom" && fallbackIcon) {
        return fallbackIcon
      }
      
      if (fallbackType === "icon") {
        return <User className="h-1/2 w-1/2" />
      }
      
      // Default to initials
      const initials = fallbackText ? getInitials(fallbackText) : "??"
      return <span className="font-semibold">{initials}</span>
    }

    return (
      <div className="relative inline-flex">
        {/* Glow Effect */}
        {glow && (
          <div className={`absolute -inset-1 rounded-full blur ${getGlowColor()} opacity-70`}></div>
        )}
        
        <div className={cn(avatarVariants({ size, variant, shape, className }))}>
          {src ? (
            <AvatarImage 
              ref={ref}
              src={src}
              alt={alt || "Avatar"}
              className="h-full w-full object-cover"
              {...props}
            />
          ) : (
            <AvatarFallback className="h-full w-full flex items-center justify-center">
              {renderFallback()}
            </AvatarFallback>
          )}
        </div>

        {/* Status Indicator */}
        {status && (
          <div className={`absolute h-3 w-3 ${getStatusPosition()} rounded-full ${getStatusColor()} ${size === "xs" || size === "sm" ? "h-2 w-2" : ""}`}>
            {status === "online" && (
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75"></div>
            )}
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div className={`absolute ${getStatusPosition()} flex items-center justify-center h-5 w-5 rounded-full ${getBadgeColor()} border-2 border-white ${size === "xs" || size === "sm" ? "h-4 w-4" : size === "lg" || size === "xl" || size === "2xl" || size === "3xl" ? "h-6 w-6" : ""}`}>
            {getBadgeIcon()}
          </div>
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

// AvatarGroup component for displaying multiple avatars
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  max?: number
  overlap?: "sm" | "md" | "lg"
  direction?: "horizontal" | "vertical"
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max, overlap = "md", direction = "horizontal", className, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children)
    const visibleAvatars = max ? childrenArray.slice(0, max) : childrenArray
    const remainingCount = max ? childrenArray.length - max : 0

    const getOverlapClass = () => {
      switch (overlap) {
        case "sm": return "-space-x-1"
        case "lg": return "-space-x-4"
        default: return "-space-x-2"
      }
    }

    const getVerticalOverlapClass = () => {
      switch (overlap) {
        case "sm": return "-space-y-1"
        case "lg": return "-space-y-4"
        default: return "-space-y-2"
      }
    }

    return (
      <div 
        ref={ref} 
        className={cn(
          "flex items-center",
          direction === "horizontal" ? getOverlapClass() : getVerticalOverlapClass(),
          direction === "vertical" && "flex-col",
          className
        )}
        {...props}
      >
        {visibleAvatars.map((child, index) => (
          <div 
            key={index} 
            className={cn(
              "ring-2 ring-background rounded-full",
              direction === "horizontal" && "hover:-translate-y-1",
              direction === "vertical" && "hover:-translate-x-1"
            )}
            style={{ 
              transition: "transform 0.2s ease",
              zIndex: visibleAvatars.length - index 
            }}
          >
            {child}
          </div>
        ))}
        
        {remainingCount > 0 && (
          <div 
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-100 to-cyan-200 text-cyan-700 ring-2 ring-background",
              direction === "horizontal" && "hover:-translate-y-1",
              direction === "vertical" && "hover:-translate-x-1"
            )}
            style={{ transition: "transform 0.2s ease", zIndex: 0 }}
          >
            <span className="text-sm font-semibold">+{remainingCount}</span>
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }