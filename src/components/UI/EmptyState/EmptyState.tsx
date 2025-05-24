import * as Icons from "phosphor-react-native";
import type React from "react";
import { useTheme } from "styled-components";
import * as S from "./EmptyStateStyles";

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, icon }) => {
  const theme = useTheme();

  const defaultIcon = <Icons.WarningCircle size={24} color={theme.colors.primary} />;

  return (
    <S.Container>
      {icon ?? defaultIcon}
      <S.Message>{message}</S.Message>
    </S.Container>
  );
};
