import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px 0;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 8px;
`;

export const BackButton = styled.Pressable`
  padding: 8px;
  margin: -8px;
`;

export const HeaderTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 16px;
`;

export const Content = styled.View`
  flex: 1;
  padding: 16px 32px;
`;

export const TextInformation = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

export const LogoContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 32px;
`;

export const ImageLogo = styled.Image``;

export const Form = styled.View`
  margin-top: 16px;
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
