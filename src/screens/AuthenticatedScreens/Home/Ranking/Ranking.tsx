import { type ParamListBase, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import * as Icons from "phosphor-react-native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useTheme } from "styled-components";
import { MainHeader, NoFillButton } from "../../../../components";
import { Avatar } from "../../../../components/UI/Avatar/Avatar";
import { LoadingSpinner } from "../../../../components/UI/LoadingSpinner/LoadingSpinner";
import { useApiRequest } from "../../../../hooks/useApiRequest";
import apiAuth from "../../../../infra/apiAuth";
import { API_ENDPOINTS } from "../../../../utils/apis";
import type { IRanking } from "../utils/types";
import * as S from "./RankingStyles";

export function Ranking() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [rankingData, setRankingData] = useState<IRanking[]>([]);
  const { loading, executeRequest } = useApiRequest({
    onSuccess: (data) => setRankingData(data.users),
  });

  const fetchRankingData = () => {
    executeRequest(() => apiAuth.get(API_ENDPOINTS.RANKING.GENERAL));
  };

  useEffect(() => {
    fetchRankingData();
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
          <NoFillButton text="Ranking de amigos" onPress={() => navigation.navigate("FriendsRanking")} />
        </S.FriendsRankingContainer>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={rankingData.sort((a, b) => b.level - a.level)}
            keyExtractor={(item) => String(item.username)}
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}
            renderItem={({ item }) => (
              <S.RankingCardContainer>
                <S.RankingCardLeftContainer>
                  <Avatar username={item.username} size={32} />
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
