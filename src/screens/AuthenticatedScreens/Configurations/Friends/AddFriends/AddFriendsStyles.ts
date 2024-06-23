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
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
`;

export const SearchButton = styled.View``;

export const AddFriendContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px;
`;

export const AddFriendLeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AddFriendAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const AddFriendName = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 8px;
`;

export const AddFriendRightContainer = styled.View``;

export const AddFriendButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding: 8px;
  margin: -8px;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 8px;
`;
