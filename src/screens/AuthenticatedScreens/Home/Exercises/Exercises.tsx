import { type ParamListBase, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import * as Icons from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useTheme } from "styled-components";
import { FillButton, MainHeader, NoFillButton } from "../../../../components";
import { EmptyState } from "../../../../components/UI/EmptyState/EmptyState";
import { LoadingSpinner } from "../../../../components/UI/LoadingSpinner/LoadingSpinner";
import { useApiRequest } from "../../../../hooks/useApiRequest";
import apiAuth from "../../../../infra/apiAuth";
import { API_ENDPOINTS } from "../../../../utils/apis";
import { convertValueToLabel } from "../../../../utils/functions";
import * as S from "./ExercisesStyles";
import type { IExercisesList } from "./utils/types";

export function Exercises() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [exercisesData, setExercisesData] = useState<IExercisesList[]>([]);
  const { loading, executeRequest } = useApiRequest({
    onSuccess: (data) => setExercisesData(data.workouts),
  });

  const fetchExercises = () => {
    executeRequest(() => apiAuth.post(API_ENDPOINTS.WORKOUT.LIST, { completedWorkouts: false }));
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      fetchExercises();
    });
  }, [navigation]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <S.Container>
      <MainHeader
        title="Treinos pendentes"
        iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
        onPressLeft={() => navigation.navigate("Home")}
        iconRight={<Icons.Info size={24} color={theme.colors.primary} weight="fill" />}
        onPressRight={() => Alert.alert("Informações", "Ao clicar no treino, você poderá visualizar mais detalhes.")}
      />
      <S.Content>
        <S.FinishedExercisesContainer>
          <NoFillButton text="Treinos finalizados" onPress={() => navigation.navigate("FinishedExercises")} />
        </S.FinishedExercisesContainer>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={exercisesData}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <S.ExerciseContainer
              onPress={() =>
                navigation.navigate("ExerciseDetails", {
                  exercise: item,
                })
              }
            >
              <S.ExerciseTitle>{item.name}</S.ExerciseTitle>
              <S.ExerciseType>{convertValueToLabel(item.workoutType)}</S.ExerciseType>
              <S.ExerciseDateTimeContainer>
                <S.ExerciseDate>{new Date(item.initialDateTime).toLocaleDateString()}</S.ExerciseDate>
              </S.ExerciseDateTimeContainer>
              {item.finalDateTime == null && (
                <FillButton
                  text="Finalizar treino"
                  style={{ marginTop: 8 }}
                  onPress={() =>
                    navigation.navigate("FinishExercise", {
                      workoutId: item.id,
                      description: item.description,
                    })
                  }
                />
              )}
            </S.ExerciseContainer>
          )}
          ListEmptyComponent={() => <EmptyState message="Você ainda não realizou treinos" />}
        />
      </S.Content>
      <S.AddExerciseButton onPress={() => navigation.navigate("CreateExercise")}>
        <Icons.Plus size={24} color={theme.colors.background} />
      </S.AddExerciseButton>
    </S.Container>
  );
}
