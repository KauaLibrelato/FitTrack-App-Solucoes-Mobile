import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px 0;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 16px 32px;
`;

export const Form = styled.View``;

export const ChangePasswordButton = styled.Pressable`
  width: 40%;
`;

export const ChangePasswordText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: bold;
  margin-top: 4px;
`;

export const ButtonsContainer = styled.View`
  margin-top: 8px;
`;
