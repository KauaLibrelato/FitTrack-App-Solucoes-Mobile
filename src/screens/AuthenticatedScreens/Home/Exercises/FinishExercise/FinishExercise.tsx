import { type ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import * as Icons from "phosphor-react-native";
import { useForm } from "react-hook-form";
import { useTheme } from "styled-components";
import { Toast } from "toastify-react-native";
import { ControlledTextInput, FillButton, MainHeader } from "../../../../../components";
import { useApiRequest } from "../../../../../hooks/useApiRequest";
import apiAuth from "../../../../../infra/apiAuth";
import { API_ENDPOINTS } from "../../../../../utils/apis";
import * as S from "./FinishExerciseStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaFinishExercise } from "./validations/validationSchemaFinishExercise";

export function FinishExercise() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { params } = useRoute() as {
    params: { workoutId: string; description: string };
  };

  const { loading, executeRequest } = useApiRequest({
    onSuccess: () => {
      navigation.navigate("Exercises");
      Toast.success("Treino finalizado com sucesso", "bottom");
    },
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchemaFinishExercise),
    defaultValues: {
      description: params.description,
    },
  });

  const finishWorkout = handleSubmit(async (data) => {
    await executeRequest(() =>
      apiAuth.patch(API_ENDPOINTS.WORKOUT.FINISH, {
        workoutId: params.workoutId,
        description: data.description,
      })
    );
  });

  return (
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
            <FillButton text="Finalizar treino" loading={loading} onPress={() => finishWorkout()} />
          </S.ButtonsContainer>
        </S.Form>
      </S.Content>
    </S.Container>
  );
}
