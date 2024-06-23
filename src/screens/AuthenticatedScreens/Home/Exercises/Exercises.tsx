import React, { useEffect, useRef, useState } from "react";
import * as S from "./ExercisesStyles";
import * as Icons from "phosphor-react-native";
import { FillButton, MainHeader } from "../../../../components";
import { useTheme } from "styled-components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { IConfigurationsTabBarVisibilityProps } from "../../../../utils/types";
import { ActivityIndicator, Alert, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";
import { DeleteExerciseModal } from "./components/DeleteExerciseModal/DeleteExerciseModal";
import { IExercisesList } from "./utils/types";
import apiAuth from "../../../../infra/apiAuth";
import { Toast } from "toastify-react-native";

export function Exercises({
  setIsTabBarVisibility,
}: IConfigurationsTabBarVisibilityProps) {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const deleteExerciseRef = useRef<Modalize>(null);
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [exercisesData, setExercisesData] = useState<IExercisesList[]>([]);
  const [loading, setLoading] = useState(false);

  function openDeleteExerciseModal(name: string) {
    setExerciseTitle(name);
    deleteExerciseRef.current?.open();
    setIsTabBarVisibility(false);
  }

  function closeDeleteExerciseModal() {
    setExerciseTitle("");
    deleteExerciseRef.current?.close();
    setIsTabBarVisibility(true);
  }

  async function getExercises() {
    setLoading(true);
    try {
      await apiAuth.post("/workout/list").then((res) => {
        setExercisesData(res.data.workouts);
      });
    } catch (error: any) {
      Toast.error(error.message, "bottom");
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
          title="Treinos"
          iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
          onPressLeft={() => navigation.navigate("Home")}
          iconRight={
            <Icons.Info size={24} color={theme.colors.primary} weight="fill" />
          }
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
                onLongPress={() => openDeleteExerciseModal(item.name)}
                onPress={() =>
                  navigation.navigate("CreateAndEditExercise", {
                    exercise: item,
                  })
                }
              >
                <S.ExerciseTitle>{item.name}</S.ExerciseTitle>
                <S.ExerciseType>{item.workoutType}</S.ExerciseType>
                <S.ExerciseDateTimeContainer>
                  <S.ExerciseDate>
                    {new Date(item.initialDateTime).toLocaleDateString()}
                  </S.ExerciseDate>
                  <S.ExerciseTimeContainer>
                    <Icons.Timer size={16} color={theme.colors.disabled} />
                    <S.ExerciseTime>{item.totalTime}</S.ExerciseTime>
                  </S.ExerciseTimeContainer>
                </S.ExerciseDateTimeContainer>
                {item.finalDateTime == null && (
                  <FillButton
                    text="Finalizar treino"
                    style={{ marginTop: 8 }}
                  />
                )}
              </S.ExerciseContainer>
            )}
            ListEmptyComponent={() => (
              <S.EmptyListContainer>
                <Icons.WarningCircle size={24} color={theme.colors.primary} />
                <S.EmptyListText>
                  Você ainda não realizou treinos
                </S.EmptyListText>
              </S.EmptyListContainer>
            )}
          />
        </S.Content>
        <S.AddExerciseButton
          onPress={() => navigation.navigate("CreateExercise")}
        >
          <Icons.Plus size={24} color={theme.colors.background} />
        </S.AddExerciseButton>
      </S.Container>

      <DeleteExerciseModal
        isVisible={deleteExerciseRef}
        setIsTabBarVisibility={setIsTabBarVisibility}
        closeDeleteExerciseModal={() => closeDeleteExerciseModal()}
        title={exerciseTitle}
      />
    </>
  );
}
