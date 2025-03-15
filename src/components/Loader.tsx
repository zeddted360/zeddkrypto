import React from "react";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = "medium", color = "blue" }) => {
  // Size mappings
  const sizeMap = {
    small: "h-6 w-6",
    medium: "h-10 w-10",
    large: "h-16 w-16",
  };

  // Color mappings
  const colorMap = {
    blue: "border-blue-500",
    purple: "border-purple-500",
    white: "border-white",
    gray: "border-gray-300",
  };

  // Default to blue if color not in map
  const borderColor =
    colorMap[color as keyof typeof colorMap] || "border-blue-500";

  return (
    <div className="flex justify-center items-center py-2">
      <div
        className={`
        animate-spin rounded-full 
        ${sizeMap[size]} 
        border-t-2 border-b-2 ${borderColor}
        border-opacity-80
      `}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
