import React from "react";
import { Modalize } from "react-native-modalize";
import * as S from "./DeleteAccountModalStyles";
import * as Icons from "phosphor-react-native";
import { FillButton, NoFillButton } from "../../../../../../components";
import { useTheme } from "styled-components";
import { IDeleteAccountModalProps } from "./utils/types";

export function DeleteAccountModal({
  isVisible,
  setIsTabBarVisibility,
  closeDeleteAccountModal,
  deleteAccount,
}: IDeleteAccountModalProps) {
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
          <S.XButtonModal onPress={closeDeleteAccountModal}>
            <Icons.X size={24} color={theme.colors.text} />
          </S.XButtonModal>
          <S.TitleModal>Excluir conta</S.TitleModal>
        </S.HeaderModal>
        <S.ContentModal>
          <S.ContentTextModal>Você deseja mesmo deletar a conta deste aplicativo?</S.ContentTextModal>

          <FillButton text="Sim, deletar conta" onPress={deleteAccount} style={{ marginBottom: 16 }} />
          <NoFillButton text="Não" onPress={closeDeleteAccountModal} />
        </S.ContentModal>
      </S.ContainerModal>
    </Modalize>
  );
}
