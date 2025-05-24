import type React from "react";
import { Image, type ImageProps } from "react-native";
import { generateAvatarUrl } from "../../../utils/ui";

interface AvatarProps extends Omit<ImageProps, "source"> {
  username: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ username, size = 32, style, ...props }) => {
  return (
    <Image
      {...props}
      source={{ uri: generateAvatarUrl(username) }}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    />
  );
};
