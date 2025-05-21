import React, { useState } from "react";
import * as S from "./FinishExerciseStyles";
import * as Icons from "phosphor-react-native";
import { useTheme } from "styled-components";
import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ControlledTextInput, FillButton, MainHeader } from "../../../../../components";
import { useForm } from "react-hook-form";
import { Toast } from "toastify-react-native";
import apiAuth from "../../../../../infra/apiAuth";

export function FinishExercise() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [loading, setLoading] = useState(false);
  const { params } = useRoute() as {
    params: { workoutId: string; description: string };
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      description: params.description,
    },
  });

  const startWorkout = handleSubmit(async (data) => {
    setLoading(true);
    try {
      await apiAuth
        .patch("/workout/finish", {
          workoutId: params.workoutId,
          description: data.description,
        })
        .then(() => {
          navigation.navigate("Exercises");
          Toast.success("Treino finalizado com sucesso", "bottom");
        });
    } catch (error: any) {
      Toast.error(error.response.data.message, "bottom");
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <S.Container>
        <MainHeader
          title="Finalizar Exercício"
          iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
          onPressLeft={() => navigation.navigate("Exercises")}
        />

        <S.Content>
          <S.Form>
            <ControlledTextInput
              label="Descrição do treino"
              control={control}
              name="description"
              placeholder="Digite a descrição do treino"
              multiline
              numberOfLines={4}
              style={{ textAlignVertical: "top" }}
            />

            <S.ButtonsContainer>
              <FillButton text="Finalizar treino" loading={loading} onPress={() => startWorkout()} />
            </S.ButtonsContainer>
          </S.Form>
        </S.Content>
      </S.Container>
    </>
  );
}
