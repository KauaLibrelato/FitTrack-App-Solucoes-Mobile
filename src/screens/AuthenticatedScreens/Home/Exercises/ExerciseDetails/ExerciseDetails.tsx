import React from "react";
import * as S from "./ExerciseDetailsStyles";
import * as Icons from "phosphor-react-native";
import { MainHeader } from "../../../../../components";
import { useTheme } from "styled-components";
import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { IRouteParams } from "./utils/types";
import { convertValueToLabel, formatTime } from "../../../../../utils/functions";

export function ExerciseDetails() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const { exercise } = route.params as IRouteParams;

  return (
    <S.Container>
      <MainHeader
        title="Detalhes de treino"
        iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
        onPressLeft={() => navigation.goBack()}
      />
      <S.Content>
        <S.ExerciseDetails>
          <S.ExerciseSpaceContainer>
            <S.ExerciseLabel>Nome do treino</S.ExerciseLabel>
            <S.ExerciseValue>{exercise?.name}</S.ExerciseValue>
          </S.ExerciseSpaceContainer>

          <S.ExerciseSpaceContainer>
            <S.ExerciseLabel>Tipo de treino</S.ExerciseLabel>
            <S.ExerciseValue>{convertValueToLabel(exercise?.workoutType)}</S.ExerciseValue>
          </S.ExerciseSpaceContainer>

          {exercise?.description && (
            <S.ExerciseSpaceContainer>
              <S.ExerciseLabel>Descrição do treino</S.ExerciseLabel>
              <S.ExerciseValue>{exercise?.description}</S.ExerciseValue>
            </S.ExerciseSpaceContainer>
          )}

          <S.ExerciseSpaceContainer>
            <S.ExerciseLabel>Data do treino</S.ExerciseLabel>
            <S.ExerciseValue>{new Date(exercise?.createdAt).toLocaleDateString()}</S.ExerciseValue>
          </S.ExerciseSpaceContainer>

          <S.ExerciseSpaceContainer>
            <S.ExerciseLabel>Tempo de treino</S.ExerciseLabel>
            <S.ExerciseValue>{formatTime(exercise?.totalTime)}</S.ExerciseValue>
          </S.ExerciseSpaceContainer>
        </S.ExerciseDetails>
        <S.BottomSpacer />
      </S.Content>
    </S.Container>
  );
}
