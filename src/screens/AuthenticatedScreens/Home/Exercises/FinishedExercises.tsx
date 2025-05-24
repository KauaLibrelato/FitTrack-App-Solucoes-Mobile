import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Icons from "phosphor-react-native";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";
import { useTheme } from "styled-components";
import { Toast } from "toastify-react-native";
import { MainHeader } from "../../../../components";
import apiAuth from "../../../../infra/apiAuth";
import { formatDate, formatTime } from "../../../../utils/formatters";
import { convertValueToLabel } from "../../../../utils/functions";
import { IConfigurationsTabBarVisibilityProps } from "../../../../utils/types";
import { DeleteExerciseModal } from "./components/DeleteExerciseModal/DeleteExerciseModal";
import * as S from "./FinishedExercisesStyles";
import { IExercisesList } from "./utils/types";

export function FinishedExercises({ setIsTabBarVisibility }: IConfigurationsTabBarVisibilityProps) {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const deleteExerciseRef = useRef<Modalize>(null);
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [exercisesData, setExercisesData] = useState<IExercisesList[]>([]);
  const [loading, setLoading] = useState(false);
  const [workoutId, setWorkoutId] = useState("");

  function openDeleteExerciseModal(name: string, id: string) {
    setWorkoutId(id);
    setExerciseTitle(name);
    deleteExerciseRef.current?.open();
    setIsTabBarVisibility(false);
  }

  function closeDeleteExerciseModal() {
    setWorkoutId("");
    setExerciseTitle("");
    deleteExerciseRef.current?.close();
    setIsTabBarVisibility(true);
  }

  async function deleteExercise(id: string) {
    try {
      await apiAuth.delete(`/workout/delete?workoutId=${id}`).then(() => {
        getExercises();
        closeDeleteExerciseModal();
        Toast.success("Treino excluído com sucesso", "bottom");
      });
    } catch (error: any) {
      Toast.error(error.response.data.message, "bottom");
    }
  }

  async function getExercises() {
    setLoading(true);
    try {
      await apiAuth.post("/workout/list", { completedWorkouts: true }).then((res) => {
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
    <>
      <S.Container>
        <MainHeader
          title="Treinos finalizados"
          iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
          onPressLeft={() => navigation.navigate("Exercises")}
          iconRight={<Icons.Info size={24} color={theme.colors.primary} weight="fill" />}
          onPressRight={() =>
            Alert.alert(
              "Informações",
              "Ao clicar no treino, você poderá visualizar mais detalhes. Ao clicar e segurar, você poderá excluir o treino."
            )
          }
        />
        <S.Content>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={exercisesData}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <S.ExerciseContainer
                onLongPress={() => openDeleteExerciseModal(item.name, item.id)}
                onPress={() =>
                  navigation.navigate("ExerciseDetails", {
                    exercise: item,
                  })
                }
              >
                <S.ExerciseTitle>{item.name}</S.ExerciseTitle>
                <S.ExerciseType>{convertValueToLabel(item.workoutType)}</S.ExerciseType>
                <S.ExerciseDateTimeContainer>
                  <S.ExerciseDate>{formatDate(item.createdAt)}</S.ExerciseDate>
                  <S.ExerciseTimeContainer>
                    <Icons.Timer size={16} color={theme.colors.disabled} />
                    <S.ExerciseTime>{formatTime(item.totalTime)}</S.ExerciseTime>
                  </S.ExerciseTimeContainer>
                </S.ExerciseDateTimeContainer>
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
      </S.Container>

      <DeleteExerciseModal
        isVisible={deleteExerciseRef}
        setIsTabBarVisibility={setIsTabBarVisibility}
        closeDeleteExerciseModal={() => closeDeleteExerciseModal()}
        title={exerciseTitle}
        deleteExercise={() => deleteExercise(workoutId)}
      />
    </>
  );
}
