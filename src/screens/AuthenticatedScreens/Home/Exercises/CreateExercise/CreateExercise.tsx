import { type ParamListBase, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import * as Icons from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { Modalize } from "react-native-modalize";
import { useTheme } from "styled-components";
import { Toast } from "toastify-react-native";
import { ControlledTextInput, FillButton, MainHeader } from "../../../../../components";
import apiAuth from "../../../../../infra/apiAuth";
import { API_ENDPOINTS } from "../../../../../utils/apis";
import type { IConfigurationsTabBarVisibilityProps } from "../../../../../utils/types";
import { createValidationRules } from "../../../../../utils/validators";
import { ExerciseTypesModal } from "./components/ExerciseTypesModal/ExerciseTypesModal";
import * as S from "./CreateExerciseStyles";
import type { ITypesData } from "./utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaCreateExercise } from "./validations/validationSchemaCreateExercise";

export function CreateExercise({ setIsTabBarVisibility }: IConfigurationsTabBarVisibilityProps) {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [type, setType] = useState({
    value: "",
    label: "Selecione um tipo de treino",
  });
  const [typesData, setTypesData] = useState<ITypesData[]>([]);
  const exerciseTypeRef = useRef<Modalize>(null);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchemaCreateExercise),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function openExerciseTypesModal() {
    exerciseTypeRef.current?.open();
    setIsTabBarVisibility(false);
  }

  function closeExerciseTypesModal() {
    exerciseTypeRef.current?.close();
    setIsTabBarVisibility(true);
  }

  function typeSelected(type: { value: string; label: string }) {
    setType(type);
    closeExerciseTypesModal();
  }

  const fetchTypes = async () => {
    await apiAuth.get(API_ENDPOINTS.WORKOUT.TYPES_LIST).then((res) => {
      setTypesData(res.data.workoutTypes);
    });
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const startWorkout = handleSubmit(async (data) => {
    await apiAuth
      .post(API_ENDPOINTS.WORKOUT.START, {
        name: data.name,
        description: data.description,
        workoutType: type.value,
      })
      .then(() => {
        navigation.navigate("Exercises");
        Toast.success("Treino iniciado com sucesso", "bottom");
      });
  });

  return (
    <>
      <S.Container>
        <MainHeader
          title="Criar Exercício"
          iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
          onPressLeft={() => navigation.navigate("Exercises")}
        />

        <S.Content>
          <S.Form>
            <ControlledTextInput
              label="Nome do treino*"
              control={control}
              name="name"
              placeholder="Digite o nome do treino"
              rules={createValidationRules.required}
            />

            <ControlledTextInput
              label="Descrição do treino"
              control={control}
              name="description"
              placeholder="Digite a descrição do treino"
              multiline
              numberOfLines={4}
              style={{ textAlignVertical: "top" }}
            />

            <S.OtherButtonContainer>
              <S.Label>Tipo do treino*</S.Label>
              <S.OtherButtonPickerContainer onPress={() => openExerciseTypesModal()}>
                <S.OtherButton
                  style={{
                    color: type.value === "" ? theme.colors.placeholder : theme.colors.text,
                  }}
                >
                  {type.label}
                </S.OtherButton>
              </S.OtherButtonPickerContainer>
            </S.OtherButtonContainer>

            <S.ButtonsContainer>
              <FillButton text="Iniciar treino" onPress={() => startWorkout()} />
            </S.ButtonsContainer>
          </S.Form>
        </S.Content>
      </S.Container>

      <ExerciseTypesModal
        setIsTabBarVisibility={setIsTabBarVisibility}
        isVisible={exerciseTypeRef}
        closeExerciseTypesModal={() => closeExerciseTypesModal()}
        types={typesData}
        callback={(type: { value: string; label: string }) => typeSelected(type)}
      />
    </>
  );
}
