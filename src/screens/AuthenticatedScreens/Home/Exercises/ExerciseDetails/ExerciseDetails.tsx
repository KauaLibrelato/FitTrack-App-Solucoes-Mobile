import { type ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import * as Icons from "phosphor-react-native";
import { useTheme } from "styled-components";
import { MainHeader } from "../../../../../components";
import { formatDate, formatTime } from "../../../../../utils/formatters";
import { convertValueToLabel } from "../../../../../utils/functions";
import * as S from "./ExerciseDetailsStyles";
import type { IRouteParams } from "./utils/types";

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
            <S.ExerciseValue>{formatDate(exercise?.createdAt)}</S.ExerciseValue>
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
