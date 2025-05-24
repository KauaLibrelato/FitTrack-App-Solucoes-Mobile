import type React from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "styled-components";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  fullScreen?: boolean;
  testID?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "large", fullScreen = false, testID }) => {
  const theme = useTheme();

  const containerStyle = fullScreen
    ? {
        flex: 1,
        justifyContent: "center" as const,
        alignItems: "center" as const,
        backgroundColor: theme.colors.background,
      }
    : {};

  return (
    <View style={containerStyle} testID={testID}>
      <ActivityIndicator size={size} color={theme.colors.primary} />
    </View>
  );
};
