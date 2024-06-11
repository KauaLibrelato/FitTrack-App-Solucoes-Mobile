import styled from "styled-components/native";

export const ContainerModal = styled.View`
  padding: 16px;
`;

export const HeaderModal = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TitleModal = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 8px;
`;

export const XButtonModal = styled.Pressable`
  padding: 8px;
  margin: -8px;
`;

export const ContentModal = styled.View`
  margin-top: 16px;
`;

export const FriendCardContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px;
`;

export const FriendCardLeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FriendAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const FriendName = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 8px;
`;

export const FriendCardRightContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FriendLevelContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 24px;
  height: 24px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const FriendLevelText = styled.Text`
  color: ${({ theme }) => theme.colors.background};
  font-weight: bold;
  font-size: 14px;
`;

export const FriendButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding: 8px;
  margin: -8px;
`;
