import React from "react";
import { Modalize } from "react-native-modalize";
import * as S from "./DeleteExerciseModalStyles";
import * as Icons from "phosphor-react-native";
import { FillButton, NoFillButton } from "../../../../../../components";
import { useTheme } from "styled-components";
import { IDeleteExerciseModalProps } from "./utils/types";

export function DeleteExerciseModal({
  isVisible,
  setIsTabBarVisibility,
  closeDeleteExerciseModal,
  title,
  deleteExercise,
}: IDeleteExerciseModalProps) {
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
          <S.XButtonModal onPress={closeDeleteExerciseModal}>
            <Icons.X size={24} color={theme.colors.text} />
          </S.XButtonModal>
          <S.TitleModal>Excluir treino</S.TitleModal>
        </S.HeaderModal>
        <S.ContentModal>
          <S.ContentTextModal>Você deseja mesmo excluir o treino {title}?</S.ContentTextModal>

          <FillButton text="Sim" onPress={() => deleteExercise()} style={{ marginBottom: 16 }} />
          <NoFillButton text="Não" onPress={closeDeleteExerciseModal} />
        </S.ContentModal>
      </S.ContainerModal>
    </Modalize>
  );
}
