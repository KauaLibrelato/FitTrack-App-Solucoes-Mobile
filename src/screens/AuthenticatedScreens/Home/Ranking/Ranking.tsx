import React, { useEffect, useState } from "react";
import * as S from "./RankingStyles";
import * as Icons from "phosphor-react-native";
import { MainHeader, NoFillButton } from "../../../../components";
import { useTheme } from "styled-components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ActivityIndicator, FlatList } from "react-native";
import { BottomSpacer } from "../HomeStyles";
import { Toast } from "toastify-react-native";
import apiAuth from "../../../../infra/apiAuth";

export function Ranking() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [rankingData, setRankingData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function getRankingData() {
    setLoading(true);
    try {
      await apiAuth.get("/ranking/general").then((res) => {
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
        title="Ranking Global"
        iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
        onPressLeft={() => navigation.navigate("Home")}
      />
      <S.Content>
        <S.FriendsRankingContainer>
          <NoFillButton
            text="Ranking de amigos"
            onPress={() => navigation.navigate("FriendsRanking")}
          />
        </S.FriendsRankingContainer>

        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={rankingData.sort((a, b) => b.level - a.level)}
            keyExtractor={(item) => String(item.username)}
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}
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
        )}
      </S.Content>
    </S.Container>
  );
}
