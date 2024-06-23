import React, { useEffect, useState } from "react";
import * as S from "./FriendsRankingStyles";
import * as Icons from "phosphor-react-native";
import { MainHeader } from "../../../../components";
import { useTheme } from "styled-components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ActivityIndicator, FlatList } from "react-native";
import apiAuth from "../../../../infra/apiAuth";
import { Toast } from "toastify-react-native";
import { IRanking } from "../utils/types";

export function FriendsRanking() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [rankingData, setRankingData] = useState<IRanking[]>([]);
  const [loading, setLoading] = useState(false);

  async function getRankingData() {
    setLoading(true);
    try {
      await apiAuth.get("/ranking/friends").then((res) => {
        setRankingData(res.data.users);
      });
    } catch (error: any) {
      Toast.error(error.response.data.message, "bottom");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRankingData();
  }, []);

  return (
    <S.Container>
      <MainHeader
        title="Ranking de amigos"
        iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
        onPressLeft={() => navigation.navigate("Ranking")}
      />
      <S.Content>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={rankingData?.sort((a, b) => b.level - a.level)}
            keyExtractor={(item) => String(item.username)}
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
            ListEmptyComponent={() => (
              <S.EmptyListContainer>
                <Icons.WarningCircle size={24} color={theme.colors.primary} />
                <S.EmptyListText>Você ainda não possui amigos</S.EmptyListText>
              </S.EmptyListContainer>
            )}
          />
        )}
      </S.Content>
    </S.Container>
  );
}
