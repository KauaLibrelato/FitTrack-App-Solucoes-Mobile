import React, { useEffect, useRef, useState } from "react";
import * as S from "./CreateExerciseStyles";
import * as Icons from "phosphor-react-native";
import { useTheme } from "styled-components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  ControlledTextInput,
  FillButton,
  MainHeader,
} from "../../../../../components";
import { useForm } from "react-hook-form";
import { ExerciseTypesModal } from "./components/ExerciseTypesModal/ExerciseTypesModal";
import { IConfigurationsTabBarVisibilityProps } from "../../../../../utils/types";
import { Modalize } from "react-native-modalize";
import {} from "react-native";
import { ITypesData } from "./utils/types";
import { Toast } from "toastify-react-native";
import apiAuth from "../../../../../infra/apiAuth";

export function CreateExercise({
  setIsTabBarVisibility,
}: IConfigurationsTabBarVisibilityProps) {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [type, setType] = useState({
    value: "",
    label: "Selecione um tipo de treino",
  });
  const [typesData, setTypesData] = useState<ITypesData[]>([]);
  const [loading, setLoading] = useState(false);
  const exerciseTypeRef = useRef<Modalize>(null);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
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

  async function getTypes() {
    try {
      await apiAuth.get("/workout/types-list").then((res) => {
        setTypesData(res.data.workoutTypes);
      });
    } catch (error: any) {
      Toast.error(error.message, "bottom");
    }
  }

  useEffect(() => {
    getTypes();
  }, []);

  const startWorkout = handleSubmit(async (data) => {
    setLoading(true);
    try {
      await apiAuth
        .post("/workout/start", {
          title: data.title,
          description: data.description,
          workoutType: type.value,
        })
        .then(() => {
          Toast.success("Treino iniciado com sucesso", "bottom");
        });
    } catch (error: any) {
      Toast.error(error.message, "bottom");
    } finally {
      setLoading(false);
    }
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
              name="title"
              placeholder="Digite o nome do treino"
              rules={{ required: "Campo obrigatório" }}
            />

            <ControlledTextInput
              label="Descrição do treino"
              control={control}
              name="description"
              placeholder="Digite a descrição do treino"
              multiline
              numberOfLines={4}
            />

            <S.OtherButtonContainer>
              <S.Label>Tipo do treino*</S.Label>
              <S.OtherButtonPickerContainer
                onPress={() => openExerciseTypesModal()}
              >
                <S.OtherButton
                  style={{
                    color:
                      type.value === ""
                        ? theme.colors.placeholder
                        : theme.colors.text,
                  }}
                >
                  {type.label}
                </S.OtherButton>
              </S.OtherButtonPickerContainer>
            </S.OtherButtonContainer>

            <S.ButtonsContainer>
              <FillButton
                text="Iniciar treino"
                loading={loading}
                onPress={() => startWorkout()}
              />
            </S.ButtonsContainer>
          </S.Form>
        </S.Content>
      </S.Container>
      <ExerciseTypesModal
        setIsTabBarVisibility={setIsTabBarVisibility}
        isVisible={exerciseTypeRef}
        closeExerciseTypesModal={() => closeExerciseTypesModal()}
        types={typesData}
        callback={(type: { value: string; label: string }) =>
          typeSelected(type)
        }
      />
    </>
  );
}
