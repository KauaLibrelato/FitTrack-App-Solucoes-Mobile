import * as Icons from "phosphor-react-native";
import React from "react";
import { Modalize } from "react-native-modalize";
import { useTheme } from "styled-components";
import * as S from "./ExerciseTypesModalStyles";
import { IExerciseTypesModalProps } from "./utils/types";

export function ExerciseTypesModal({
  closeExerciseTypesModal,
  isVisible,
  setIsTabBarVisibility,
  types,
  callback,
}: IExerciseTypesModalProps) {
  const theme = useTheme();
  return (
    <Modalize
      ref={isVisible}
      adjustToContentHeight
      modalStyle={{ backgroundColor: theme.colors.background }}
      onClosed={() => setIsTabBarVisibility(true)}
    >
      <S.ContainerModal>
        <S.HeaderModal>
          <S.XButtonModal onPress={closeExerciseTypesModal}>
            <Icons.X size={24} color={theme.colors.text} />
          </S.XButtonModal>
          <S.TitleModal>Tipos de treino</S.TitleModal>
        </S.HeaderModal>
        <S.ContentModal>
          {types.length > 0 &&
            types.map((type) => (
              <S.TypeCardContainer key={type.value} onPress={() => callback(type)}>
                <S.TypeName>{type.label}</S.TypeName>
              </S.TypeCardContainer>
            ))}
        </S.ContentModal>
      </S.ContainerModal>
    </Modalize>
  );
}
