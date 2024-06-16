import React from "react";
import { Modalize } from "react-native-modalize";
import * as S from "./FriendSoliciationModalStyles";
import { IFriendSolicitaionsModalProps } from "./utils/types";
import * as Icons from "phosphor-react-native";
import { useTheme } from "styled-components";
import apiAuth from "../../../../../../infra/apiAuth";
import { Toast } from "toastify-react-native";

export function FriendSoliciationModal({
  closeFriendSolicitaionsModal,
  isVisible,
  setIsTabBarVisibility,
  users,
}: IFriendSolicitaionsModalProps) {
  const theme = useTheme();

  async function handleAcceptFriendRequest(id: string) {
    try {
      await apiAuth
        .put("/friendship/accept-invitation", {
          friendshipId: id,
        })
        .then(() => {
          closeFriendSolicitaionsModal();
          Toast.success("Solicitação aceita!", "bottom");
        });
    } catch (error: any) {
      Toast.error(error.message, "bottom");
    }
  }

  async function handleDeclineFriendRequest(id: string) {
    try {
      await apiAuth.delete(`/friendship/delete?friendshipId=${id}`).then(() => {
        closeFriendSolicitaionsModal();
        Toast.success("Solicitação rejeitada!", "bottom");
      });
    } catch (error: any) {
      Toast.error(error.message, "bottom");
    }
  }
  return (
    <Modalize
      ref={isVisible}
      adjustToContentHeight
      modalStyle={{ backgroundColor: theme.colors.background }}
      onClosed={() => setIsTabBarVisibility(true)}
    >
      <S.ContainerModal>
        <S.HeaderModal>
          <S.XButtonModal onPress={closeFriendSolicitaionsModal}>
            <Icons.X size={24} color={theme.colors.text} />
          </S.XButtonModal>
          <S.TitleModal>Solicitações de amizade</S.TitleModal>
        </S.HeaderModal>
        <S.ContentModal>
          {users?.count > 0 &&
            users?.friendships.map((user: any) => (
              <S.FriendCardContainer key={user.id}>
                <S.FriendCardLeftContainer>
                  <S.FriendAvatar
                    source={{
                      uri: `https://api.dicebear.com/8.x/initials/png?seed=${user.username}&backgroundColor=FF9800&textColor=FEFEFE`,
                    }}
                  />
                  <S.FriendName>{user.username}</S.FriendName>
                </S.FriendCardLeftContainer>
                <S.FriendCardRightContainer>
                  <S.FriendButton
                    onPress={() => handleDeclineFriendRequest(user.id)}
                  >
                    <Icons.X size={24} color={theme.colors.error} />
                  </S.FriendButton>
                  <S.FriendButton
                    style={{ marginLeft: 4 }}
                    onPress={() => handleAcceptFriendRequest(user.id)}
                  >
                    <Icons.Check size={24} color={theme.colors.success} />
                  </S.FriendButton>
                </S.FriendCardRightContainer>
              </S.FriendCardContainer>
            ))}
        </S.ContentModal>
      </S.ContainerModal>
    </Modalize>
  );
}
