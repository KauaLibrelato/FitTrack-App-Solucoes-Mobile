import React from "react";
import { Modalize } from "react-native-modalize";
import * as S from "./LogoutModalStyles";
import * as Icons from "phosphor-react-native";
import { FillButton, NoFillButton } from "../../../../../components";
import { useTheme } from "styled-components";
import { ILogoutModalProps } from "./utils/types";

export function LogoutModal({
  isVisible,
  setIsTabBarVisibility,
  closeLogoutModal,
  signout,
}: ILogoutModalProps) {
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
          <S.XButtonModal onPress={closeLogoutModal}>
            <Icons.X size={24} color={theme.colors.text} />
          </S.XButtonModal>
          <S.TitleModal>Sair do aplicativo</S.TitleModal>
        </S.HeaderModal>
        <S.ContentModal>
          <S.ContentTextModal>
            Você deseja mesmo sair deste aplicativo?
          </S.ContentTextModal>

          <FillButton
            text="Sair"
            onPress={signout}
            style={{ marginBottom: 16 }}
          />
          <NoFillButton text="Cancelar" onPress={closeLogoutModal} />
        </S.ContentModal>
      </S.ContainerModal>
    </Modalize>
  );
}
