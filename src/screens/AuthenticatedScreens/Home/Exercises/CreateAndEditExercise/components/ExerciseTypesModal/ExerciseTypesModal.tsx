import React from "react";
import { Modalize } from "react-native-modalize";
import * as S from "./ExerciseTypesModalStyles";
import { IExerciseTypesModalProps } from "./utils/types";
import * as Icons from "phosphor-react-native";
import { useTheme } from "styled-components";

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
          {types.length &&
            types.map((type) => (
              <S.TypeCardContainer key={type.id} onPress={() => callback(type)}>
                <S.TypeName>{type.name}</S.TypeName>
              </S.TypeCardContainer>
            ))}
        </S.ContentModal>
      </S.ContainerModal>
    </Modalize>
  );
}
