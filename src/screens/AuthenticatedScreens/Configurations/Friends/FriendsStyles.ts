import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px 0;
`;

export const Content = styled.View`
  padding: 16px 32px;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 8px 16px;
  border-radius: 16px;
`;

export const SearchInput = styled.TextInput`
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

export const SearchButton = styled.View``;

export const SolicitaitonsContainer = styled.View`
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
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

export const EmptyListContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

export const EmptyListText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 8px;
`;
