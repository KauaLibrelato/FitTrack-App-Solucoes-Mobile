import React, { useRef, useState } from "react";
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
import { set, useForm } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ExerciseTypesModal } from "./components/ExerciseTypesModal/ExerciseTypesModal";
import { IConfigurationsTabBarVisibilityProps } from "../../../../../utils/types";
import { Modalize } from "react-native-modalize";

export function CreateExercise({
  setIsTabBarVisibility,
}: IConfigurationsTabBarVisibilityProps) {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isInitialHourPickerVisible, setInitialHourPickerVisibility] =
    useState(false);
  const [isFinalHourPickerVisible, setFinalHourPickerVisibility] =
    useState(false);
  const [date, setDate] = useState(new Date());
  const [initialHour, setInitialHour] = useState(new Date());
  const [finalHour, setFinalHour] = useState(new Date());
  const [type, setType] = useState({
    id: 0,
    name: "Selecione um tipo de treino",
  });
  const exerciseTypeRef = useRef<Modalize>(null);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const changeDatePickerStatus = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const changeInitialHourPickerStatus = () => {
    setInitialHourPickerVisibility(!isInitialHourPickerVisible);
  };

  const changeFinalHourPickerStatus = () => {
    setFinalHourPickerVisibility(!isFinalHourPickerVisible);
  };

  const handleConfirmDatePicker = (date: Date) => {
    setDate(date);
    changeDatePickerStatus();
  };

  const handleConfirmInitialHourPicker = (hour: Date) => {
    setInitialHour(hour);
    changeInitialHourPickerStatus();
  };

  const handleConfirmFinalHourPicker = (hour: Date) => {
    setFinalHour(hour);
    changeFinalHourPickerStatus();
  };

  function openExerciseTypesModal() {
    exerciseTypeRef.current?.open();
    setIsTabBarVisibility(false);
  }

  function closeExerciseTypesModal() {
    exerciseTypeRef.current?.close();
    setIsTabBarVisibility(true);
  }

  const mockExerciseTypes = [
    { id: 1, name: "Musculação" },
    { id: 2, name: "Corrida" },
    { id: 3, name: "Ciclismo" },
    { id: 4, name: "Outro" },
  ];

  function typeSelected(type: { id: number; name: string }) {
    console.log(type);
    setType(type);
    closeExerciseTypesModal();
  }
  return (
    <>
      <S.Container>
        <MainHeader
          title="Criar Exercício"
          iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
          onPressLeft={() => navigation.navigate("Home")}
        />

        <S.Content>
          <S.Form>
            <ControlledTextInput
              label="Nome do treino"
              control={control}
              name="title"
              placeholder="Digite o nome do treino"
              rules={{ required: "Campo obrigatório" }}
            />

            <S.OtherButtonContainer>
              <S.Label>Tipo do treino</S.Label>
              <S.OtherButtonPickerContainer
                onPress={() => openExerciseTypesModal()}
              >
                <S.OtherButton
                  style={{
                    color:
                      type.id === 0
                        ? theme.colors.placeholder
                        : theme.colors.text,
                  }}
                >
                  {type.name}
                </S.OtherButton>
              </S.OtherButtonPickerContainer>
            </S.OtherButtonContainer>

            {type.id === 4 && (
              <ControlledTextInput
                label="Descrição"
                control={control}
                name="description"
                placeholder="Digite a descrição do treino"
              />
            )}

            <S.OtherButtonContainer>
              <S.Label>Data do Treino</S.Label>
              <S.OtherButtonPickerContainer
                onPress={() => changeDatePickerStatus()}
              >
                <S.OtherButton>
                  {date.toLocaleDateString("pt-Br")}
                </S.OtherButton>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirmDatePicker}
                  onCancel={changeDatePickerStatus}
                  themeVariant="dark"
                  isDarkModeEnabled
                />
              </S.OtherButtonPickerContainer>
            </S.OtherButtonContainer>

            <S.OtherButtonContainer>
              <S.Label>Hora Inicial</S.Label>
              <S.OtherButtonPickerContainer
                onPress={() => changeInitialHourPickerStatus()}
              >
                <S.OtherButton>
                  {initialHour.toLocaleTimeString("pt-Br", {
                    timeStyle: "short",
                  })}
                </S.OtherButton>
                <DateTimePickerModal
                  isVisible={isInitialHourPickerVisible}
                  mode="time"
                  onConfirm={handleConfirmInitialHourPicker}
                  onCancel={changeInitialHourPickerStatus}
                  themeVariant="dark"
                  isDarkModeEnabled
                />
              </S.OtherButtonPickerContainer>
            </S.OtherButtonContainer>

            <S.OtherButtonContainer>
              <S.Label>Hora Final</S.Label>
              <S.OtherButtonPickerContainer
                onPress={() => changeFinalHourPickerStatus()}
              >
                <S.OtherButton>
                  {finalHour.toLocaleTimeString("pt-Br", {
                    timeStyle: "short",
                  })}
                </S.OtherButton>
                <DateTimePickerModal
                  isVisible={isFinalHourPickerVisible}
                  mode="time"
                  onConfirm={handleConfirmFinalHourPicker}
                  onCancel={changeFinalHourPickerStatus}
                  themeVariant="dark"
                  isDarkModeEnabled
                />
              </S.OtherButtonPickerContainer>
            </S.OtherButtonContainer>

            <S.ButtonsContainer>
              <FillButton text="Cadastrar" />
            </S.ButtonsContainer>
          </S.Form>
        </S.Content>
      </S.Container>
      <ExerciseTypesModal
        setIsTabBarVisibility={setIsTabBarVisibility}
        isVisible={exerciseTypeRef}
        closeExerciseTypesModal={() => closeExerciseTypesModal()}
        types={mockExerciseTypes}
        callback={(type: { id: number; name: string }) => typeSelected(type)}
      />
    </>
  );
}
