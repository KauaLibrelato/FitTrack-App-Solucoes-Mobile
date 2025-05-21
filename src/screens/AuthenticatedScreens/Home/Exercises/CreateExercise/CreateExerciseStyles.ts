import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px 0;
`;

export const Content = styled.View`
  flex: 1;
  padding: 16px 32px;
`;

export const Form = styled.View``;

export const ButtonsContainer = styled.View`
  margin-top: 16px;
  align-items: center;
`;

export const OtherButtonContainer = styled.View``;

export const Label = styled.Text<{
  errorMessage?: boolean;
  editable?: boolean;
}>`
  font-size: 12px;
  color: ${({ theme, errorMessage, editable }) => (errorMessage ? theme.colors.error : theme.colors.text)};
`;

export const OtherButtonPickerContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<{
  errorMessage?: boolean;
  editable?: boolean;
}>`
  background-color: ${({ theme }) => theme.colors.surface};
  border-color: ${({ errorMessage, theme }) => errorMessage && theme.colors.error};
  border-radius: 16px;
  border-width: ${({ errorMessage }) => (errorMessage ? 1 : 0)}px;
  padding: 12px 16px;
  margin: 4px 0;
`;

export const OtherButton = styled.Text<{
  errorMessage?: boolean;
  editable?: boolean;
}>`
  color: ${({ theme, errorMessage, editable }) => (errorMessage ? theme.colors.error : theme.colors.text)};
  font-size: 14px;
`;
