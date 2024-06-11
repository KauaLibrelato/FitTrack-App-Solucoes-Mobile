import React from "react";
import { Modalize } from "react-native-modalize";
import * as S from "./DeleteFriendModalStyles";
import * as Icons from "phosphor-react-native";
import { FillButton, NoFillButton } from "../../../../../../components";
import { useTheme } from "styled-components";
import { IDeleteFriendModalProps } from "./utils/types";

export function DeleteFriendModal({
  isVisible,
  setIsTabBarVisibility,
  closeDeleteFriendModal,
  name,
}: IDeleteFriendModalProps) {
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
          <S.XButtonModal onPress={closeDeleteFriendModal}>
            <Icons.X size={24} color={theme.colors.text} />
          </S.XButtonModal>
          <S.TitleModal>Desfazer amizade</S.TitleModal>
        </S.HeaderModal>
        <S.ContentModal>
          <S.ContentTextModal>
            Você deseja mesmo desfazer a amizade com {name}?
          </S.ContentTextModal>

          <FillButton
            text="Sim"
            onPress={closeDeleteFriendModal}
            style={{ marginBottom: 16 }}
          />
          <NoFillButton text="Não" onPress={closeDeleteFriendModal} />
        </S.ContentModal>
      </S.ContainerModal>
    </Modalize>
  );
}
