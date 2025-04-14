import { Database } from "lucide-react";
import React from "react";

interface DBIconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

const DBIcon: React.FC<DBIconProps> = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
  style,
}) => {
  return (
    <Database
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      style={style}
    />
  );
};

export default DBIcon;
