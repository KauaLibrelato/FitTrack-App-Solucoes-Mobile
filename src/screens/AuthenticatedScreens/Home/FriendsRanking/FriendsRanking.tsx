import { type ParamListBase, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import * as Icons from "phosphor-react-native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useTheme } from "styled-components";
import { MainHeader } from "../../../../components";
import { Avatar } from "../../../../components/UI/Avatar/Avatar";
import { EmptyState } from "../../../../components/UI/EmptyState/EmptyState";
import { LoadingSpinner } from "../../../../components/UI/LoadingSpinner/LoadingSpinner";
import { useApiRequest } from "../../../../hooks/useApiRequest";
import apiAuth from "../../../../infra/apiAuth";
import { API_ENDPOINTS } from "../../../../utils/apis";
import type { IRanking } from "../utils/types";
import * as S from "./FriendsRankingStyles";

export function FriendsRanking() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [rankingData, setRankingData] = useState<IRanking[]>([]);
  const { loading, executeRequest } = useApiRequest({
    onSuccess: (data) => {
      setRankingData(data.friendships);
    },
  });

  const fetchRankingData = () => {
    executeRequest(async () => await apiAuth.get(API_ENDPOINTS.RANKING.FRIENDS));
  };

  useEffect(() => {
    fetchRankingData();
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
          <LoadingSpinner />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={rankingData}
            keyExtractor={(item) => String(item.friend.username)}
            renderItem={({ item }) => (
              <S.RankingCardContainer>
                <S.RankingCardLeftContainer>
                  <Avatar username={item.friend.username} size={32} />
                  <S.RankingName>{item.friend.username}</S.RankingName>
                </S.RankingCardLeftContainer>
                <S.RankingCardRightContainer>
                  <S.RankingLevelContainer>
                    <S.RankingLevelText>{item.friend.level}</S.RankingLevelText>
                  </S.RankingLevelContainer>
                </S.RankingCardRightContainer>
              </S.RankingCardContainer>
            )}
            ListEmptyComponent={() => <EmptyState message="Você ainda não possui amigos" />}
          />
        )}
      </S.Content>
    </S.Container>
  );
}
