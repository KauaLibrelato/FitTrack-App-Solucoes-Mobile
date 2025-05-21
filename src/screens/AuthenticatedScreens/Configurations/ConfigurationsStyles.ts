import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px 0;
`;

export const LevelContainer = styled.View`
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

export const Content = styled.View`
  flex: 1;
  padding: 32px;
`;

export const UserInformations = styled.View`
  align-items: center;
`;

export const UserImage = styled.Image`
  width: 96px;
  height: 96px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 48px;
`;

export const UserInformationsTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 10px;
`;

export const ButtonsContainer = styled.View`
  margin-top: 32px;
`;

export const ButtonContainer = styled.TouchableOpacity<{ isExit?: boolean }>`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  border: 1px solid ${({ theme, isExit }) => (isExit ? theme.colors.error : theme.colors.text)};
  border-radius: 16px;
  padding: 8px 16px 8px 8px;
`;

export const ButtonLeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ButtonText = styled.Text<{ isExit?: boolean }>`
  font-size: 16px;
  color: ${({ theme, isExit }) => (isExit ? theme.colors.error : theme.colors.text)};
  margin-left: 8px;
`;

export const PointHasMission = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.error};
  border-radius: 5px;
  margin-left: auto;
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
