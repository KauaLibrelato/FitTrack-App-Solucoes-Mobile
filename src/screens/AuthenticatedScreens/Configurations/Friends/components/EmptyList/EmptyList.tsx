import * as Icons from "phosphor-react-native";
import React from "react";
import { DefaultTheme } from "styled-components";
import * as S from "../../FriendsStyles";

type Props = {
  readonly theme: DefaultTheme;
};

export function EmptyList({ theme }: Props) {
  return (
    <S.EmptyListContainer>
      <Icons.WarningCircle size={24} color={theme.colors.primary} />
      <S.EmptyListText>Você ainda não possui amigos</S.EmptyListText>
    </S.EmptyListContainer>
  );
}
