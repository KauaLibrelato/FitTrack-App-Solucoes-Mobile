import * as Icons from "phosphor-react-native";
import { Modalize } from "react-native-modalize";
import { useTheme } from "styled-components";
import { Avatar } from "../../../../../../components/UI/Avatar/Avatar";
import * as S from "./FriendSoliciationModalStyles";
import type { IFriendSolicitaionsModalProps } from "./utils/types";

export function FriendSoliciationModal({
  closeFriendSolicitaionsModal,
  isVisible,
  setIsTabBarVisibility,
  users,
  handleDeclineFriendRequest,
  handleAcceptFriendRequest,
}: IFriendSolicitaionsModalProps) {
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
          <S.XButtonModal onPress={closeFriendSolicitaionsModal}>
            <Icons.X size={24} color={theme.colors.text} />
          </S.XButtonModal>
          <S.TitleModal>Solicitações de amizade</S.TitleModal>
        </S.HeaderModal>
        <S.ContentModal>
          {users?.count > 0 &&
            users?.friendships.map((user: { id: string; user: { username: string } }) => (
              <S.FriendCardContainer key={user.id}>
                <S.FriendCardLeftContainer>
                  <Avatar username={user?.user?.username ?? ""} size={32} />
                  <S.FriendName>{user?.user?.username}</S.FriendName>
                </S.FriendCardLeftContainer>
                <S.FriendCardRightContainer>
                  <S.FriendButton onPress={() => handleDeclineFriendRequest(user.id)}>
                    <Icons.X size={24} color={theme.colors.error} />
                  </S.FriendButton>
                  <S.FriendButton style={{ marginLeft: 4 }} onPress={() => handleAcceptFriendRequest(user.id)}>
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
