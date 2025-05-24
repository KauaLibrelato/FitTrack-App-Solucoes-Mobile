import styled from "styled-components/native";
import { UI_CONSTANTS } from "../../../utils/ui";

interface LevelBadgeProps {
  size: "small" | "medium" | "large";
}

const getSizeStyles = ({ size }: LevelBadgeProps) => {
  switch (size) {
    case "small":
      return {
        padding: `${UI_CONSTANTS.SPACING.XS}px ${UI_CONSTANTS.SPACING.SM}px`,
        fontSize: 12,
      };
    case "large":
      return {
        padding: `${UI_CONSTANTS.SPACING.SM}px ${UI_CONSTANTS.SPACING.MD}px`,
        fontSize: 18,
      };
    default:
      return {
        padding: `0px ${UI_CONSTANTS.SPACING.SM}px`,
        fontSize: 16,
      };
  }
};

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<{ size: LevelBadgeProps }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${UI_CONSTANTS.BORDER_RADIUS.MEDIUM}px;
  ${({ size }) => {
    const styles = getSizeStyles(size);
    return `padding: ${styles.padding};`;
  }}
`;

export const Text = styled.Text<{ size: LevelBadgeProps }>`
  color: ${({ theme }) => theme.colors.background};
  font-weight: bold;
  ${({ size }) => {
    const styles = getSizeStyles(size);
    return `font-size: ${styles.fontSize}px;`;
  }}
`;
