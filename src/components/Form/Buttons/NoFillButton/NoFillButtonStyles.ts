import styled, {css} from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<{disabled?: boolean; borderColor?: string; loading?: boolean}>`
  ${props =>
    props.loading
      ? css`
          width: 10%;
        `
      : css`
          width: 100%;
        `}
  padding: 7px 15px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  ${props =>
    props.loading
      ? css`
          border-radius: 16px;
        `
      : css`
          border-radius: 8px;
        `}
  ${props =>
    !props.disabled || props.loading
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0.5;
        `}
        ${props =>
    props.borderColor
      ? css`
          border-color: ${props.borderColor};
        `
      : css`
          border-color: ${({theme}) => theme.colors.primary};
        `}
`;

export const Text = styled.Text<{colorText?: string}>`
  font-size: 16px;
  color: ${({theme, colorText}) =>
    colorText ? colorText : theme.colors.primary};
`;

export const Loading = styled.ActivityIndicator.attrs<{colorText?: string}>(
  ({colorText, theme}) => ({
    size: 'small',
    color: colorText ? colorText : theme.colors.primary,
  }),
)``;
