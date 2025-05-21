import styled, { css } from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<{ disabled?: boolean; bgColor?: string; loading?: boolean }>`
  ${(props) =>
    props.loading
      ? css`
          width: 12%;
        `
      : css`
          width: 100%;
        `}
  padding: 8px 16px;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.loading
      ? css`
          border-radius: 20px;
        `
      : css`
          border-radius: 16px;
        `}
  ${(props) =>
    !props.disabled || props.loading
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0.5;
        `}
        ${(props) =>
    props.bgColor
      ? css`
          background-color: ${props.bgColor};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.primary};
        `}
`;

export const Text = styled.Text<{ colorText?: string }>`
  font-size: 14px;
  color: ${({ theme, colorText }) => colorText ?? theme.colors.background};
`;

export const Loading = styled.ActivityIndicator.attrs<{ colorText?: string }>(({ colorText, theme }) => ({
  size: "small",
  color: colorText ?? theme.colors.background,
}))``;
