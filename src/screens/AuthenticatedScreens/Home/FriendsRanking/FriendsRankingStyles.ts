import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px 0;
`;

export const Content = styled.View`
  padding: 16px 32px;
`;

export const FriendsRankingContainer = styled.View``;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin: 16px 0;
`;

export const RankingCardContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px;
`;

export const RankingCardLeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RankingAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const RankingName = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 8px;
`;

export const RankingCardRightContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RankingLevelContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 24px;
  height: 24px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const RankingLevelText = styled.Text`
  color: ${({ theme }) => theme.colors.background};
  font-weight: bold;
  font-size: 14px;
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
