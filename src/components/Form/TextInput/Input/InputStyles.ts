import styled from "styled-components/native";

export const Container = styled.View``;

export const Label = styled.Text<{
  errorMessage?: boolean;
  editable?: boolean;
}>`
  font-size: 12px;
  color: ${({ theme, errorMessage, editable }) => {
    let color;

    if (errorMessage) {
      color = theme.colors.error;
    } else if (editable) {
      color = theme.colors.text;
    } else {
      color = theme.colors.disabled;
    }

    return color;
  }};
`;

export const Input = styled.TextInput<{
  errorMessage?: boolean;
  editable?: boolean;
}>`
  background-color: ${({ theme }) => theme.colors.surface};
  border-color: ${({ errorMessage, theme }) => errorMessage && theme.colors.error};
  border-radius: 16px;
  font-size: 14px;
  border-width: ${({ errorMessage }) => (errorMessage ? 1 : 0)}px;
  color: ${({ theme, errorMessage, editable }) => {
    if (errorMessage) {
      return theme.colors.error;
    } else if (editable) {
      return theme.colors.text;
    } else {
      return theme.colors.disabled;
    }
  }};
  padding: 8px 16px;
  margin: 4px 0;
`;

export const ErrorMessage = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
`;
