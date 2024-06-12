import React, { useRef, useState } from "react";
import * as S from "./ExercisesStyles";
import * as Icons from "phosphor-react-native";
import { MainHeader } from "../../../../components";
import { useTheme } from "styled-components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { IConfigurationsTabBarVisibilityProps } from "../../../../utils/types";
import { Alert, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";
import { DeleteExerciseModal } from "./components/DeleteExerciseModal/DeleteExerciseModal";

export function Exercises({
  setIsTabBarVisibility,
}: IConfigurationsTabBarVisibilityProps) {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const deleteExerciseRef = useRef<Modalize>(null);
  const [exerciseTitle, setExerciseTitle] = useState("");
  const mockExercisesData = [
    {
      id: 1,
      title: "Exercício 1",
      type: "Musculação",
      date: "11/06/2024",
      time: "01:30",
    },
    {
      id: 2,
      title: "Exercício 2",
      type: "Corrida",
      date: "11/06/2024",
      time: "01:00",
    },
    {
      id: 3,
      title: "Exercício 3",
      type: "Musculação",
      date: "12/06/2024",
      time: "02:00",
    },
  ];

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

  return (
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
            data={mockExercisesData}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <S.ExerciseContainer
                onLongPress={() => openDeleteExerciseModal(item.title)}
                onPress={() =>
                  navigation.navigate("CreateAndEditExercise", {
                    exercise: item,
                  })
                }
              >
                <S.ExerciseTitle>{item.title}</S.ExerciseTitle>
                <S.ExerciseType>{item.type}</S.ExerciseType>
                <S.ExerciseDateTimeContainer>
                  <S.ExerciseDate>{item.date}</S.ExerciseDate>
                  <S.ExerciseTimeContainer>
                    <Icons.Timer size={16} color={theme.colors.disabled} />
                    <S.ExerciseTime>{item.time}</S.ExerciseTime>
                  </S.ExerciseTimeContainer>
                </S.ExerciseDateTimeContainer>
              </S.ExerciseContainer>
            )}
          />
        </S.Content>
        <S.AddExerciseButton
          onPress={() => navigation.navigate("CreateAndEditExercise")}
        >
          <Icons.Plus size={24} color={theme.colors.text} />
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
