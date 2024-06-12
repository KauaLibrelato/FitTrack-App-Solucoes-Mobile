import React from "react";
import * as S from "./FriendsRankingStyles";
import * as Icons from "phosphor-react-native";
import { MainHeader, NoFillButton } from "../../../../components";
import { useTheme } from "styled-components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList } from "react-native";

export function FriendsRanking() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const mockRankingData = [
    {
      id: 1,
      username: "Jean Nesi",
      level: 10,
    },
    {
      id: 2,
      username: "Kauan Candido",
      level: 15,
    },
    {
      id: 3,
      username: "Lucas Guidi",
      level: 30,
    },
    {
      id: 4,
      username: "Joao Vitor",
      level: 8,
    },
  ];

  return (
    <S.Container>
      <MainHeader
        title="Ranking de amigos"
        iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
        onPressLeft={() => navigation.navigate("Ranking")}
      />
      <S.Content>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={mockRankingData.sort((a, b) => b.level - a.level)}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <S.RankingCardContainer>
              <S.RankingCardLeftContainer>
                <S.RankingAvatar
                  source={{
                    uri: `https://api.dicebear.com/8.x/initials/png?seed=${item.username}&backgroundColor=FF9800&textColor=FEFEFE`,
                  }}
                />
                <S.RankingName>{item.username}</S.RankingName>
              </S.RankingCardLeftContainer>
              <S.RankingCardRightContainer>
                <S.RankingLevelContainer>
                  <S.RankingLevelText>{item.level}</S.RankingLevelText>
                </S.RankingLevelContainer>
              </S.RankingCardRightContainer>
            </S.RankingCardContainer>
          )}
        />
      </S.Content>
    </S.Container>
  );
}
