import type React from "react";
import { formatUserLevel } from "../../../utils/formatters";
import * as S from "./LevelBadgeStyles";

interface LevelBadgeProps {
  level: number;
  onPress?: VoidFunction;
  size?: "small" | "medium" | "large";
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level, onPress, size = "medium" }) => {
  return (
    <S.Container onPress={onPress} size={size}>
      <S.Text size={size}>{formatUserLevel(level)}</S.Text>
    </S.Container>
  );
};
