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

export const LogoContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

export const LogoImage = styled.Image``;

export const Form = styled.View`
  margin-top: 32px;
  gap: 8px;
`;

export const OrText = styled.Text`
  color: ${({ theme }) => theme.colors.placeholder};
  font-size: 16px;
  text-align: center;
`;

export const ButtonsContainer = styled.View`
  margin-top: 8px;
  gap: 8px;
`;
