import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Icons from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList } from "react-native";
import { useTheme } from "styled-components";
import { Toast } from "toastify-react-native";
import { FillButton, MainHeader, NoFillButton } from "../../../../components";
import apiAuth from "../../../../infra/apiAuth";
import { convertValueToLabel } from "../../../../utils/functions";
import * as S from "./ExercisesStyles";
import { IExercisesList } from "./utils/types";

export function Exercises() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [exercisesData, setExercisesData] = useState<IExercisesList[]>([]);
  const [loading, setLoading] = useState(false);

  async function getExercises() {
    setLoading(true);
    try {
      await apiAuth.post("/workout/list", { completedWorkouts: false }).then((res) => {
        setExercisesData(res.data.workouts);
      });
    } catch (error: any) {
      Toast.error(error.response.data.message, "bottom");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      getExercises();
    });
  }, [navigation]);

  return loading ? (
    <ActivityIndicator size="large" color={theme.colors.primary} />
  ) : (
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
          ListEmptyComponent={() => (
            <S.EmptyListContainer>
              <Icons.WarningCircle size={24} color={theme.colors.primary} />
              <S.EmptyListText>Você ainda não realizou treinos</S.EmptyListText>
            </S.EmptyListContainer>
          )}
        />
      </S.Content>
      <S.AddExerciseButton onPress={() => navigation.navigate("CreateExercise")}>
        <Icons.Plus size={24} color={theme.colors.background} />
      </S.AddExerciseButton>
    </S.Container>
  );
}
