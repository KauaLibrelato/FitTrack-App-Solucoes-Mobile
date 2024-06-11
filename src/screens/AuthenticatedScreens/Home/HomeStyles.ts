import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px 0;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0px 16px;
  flex-direction: row;
  justify-content: space-between;
`;

export const PresentationContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PresentationText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: bold;
`;

export const PresentationTextBold = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  font-weight: bold;
`;

export const LevelContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0px 8px;
  border-radius: 16px;
`;

export const LevelText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.background};
  font-weight: bold;
`;

export const LevelMenu = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

export const LevelMenuItem = styled.View`
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

export const LevelMenuItemText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const LevelMenuItemBold = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 16px 32px;
`;

export const CategoryTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
`;

export const PersonalResumeCarousel = styled.ScrollView`
  margin-bottom: 16px;
`;

export const Line = styled.View`
  flex-direction: row;
  gap: 16px;
`;

export const PersonalResumeCardContainer = styled.View`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 8px 16px;
  align-items: center;
  gap: 8px;
`;

export const PersonalResumeCardTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

export const PersonalResumeCardDescription = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const FuncionalityCardContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 8px 16px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const FuncionalityCardLeftContainer = styled.View``;

export const FuncionalityCardRightContainer = styled.View`
  margin-left: 16px;
  flex: 1;
`;

export const FuncionalityCardTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const FuncionalityCardDescription = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 8px;
`;

export const BottomSpacer = styled.View`
  height: 80px;
`;
