import * as Icons from "phosphor-react-native";
import React from "react";
import { DefaultTheme } from "styled-components";
import * as S from "../AddFriendsStyles";

interface ListEmptyComponentProps {
  firstRender: boolean;
  theme: DefaultTheme;
}

const ListEmptyComponent: React.FC<ListEmptyComponentProps> = ({ firstRender, theme }) => (
  <S.EmptyContainer>
    <Icons.WarningCircle size={24} color={theme.colors.primary} />
    <S.EmptyText>{firstRender ? "Realize a pesquisa de usuário" : "Nenhum usuário encontrado"}</S.EmptyText>
  </S.EmptyContainer>
);

export default ListEmptyComponent;
