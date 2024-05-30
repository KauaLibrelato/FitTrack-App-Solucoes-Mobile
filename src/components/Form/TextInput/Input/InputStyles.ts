import styled from "styled-components/native";

export const Container = styled.View``;

export const Label = styled.Text<{ errorMessage?: boolean }>`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  ${({ errorMessage, theme }) =>
    errorMessage && `color: ${theme.colors.error}`};
`;

export const Input = styled.TextInput<{ errorMessage?: boolean }>`
  background-color: ${({ theme }) => theme.colors.surface};
  border-color: ${({ errorMessage, theme }) =>
    errorMessage && theme.colors.error};
  border-radius: 16px;
  font-size: 14px;
  border-width: ${({ errorMessage }) => (errorMessage ? 1 : 0)}px;
  color: ${({ theme }) => theme.colors.text};
  ${({ errorMessage, theme }) =>
    errorMessage && `color: ${theme.colors.error}`};
  padding: 8px 16px;
  margin: 4px 0;
`;

export const ErrorMessage = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
`;
