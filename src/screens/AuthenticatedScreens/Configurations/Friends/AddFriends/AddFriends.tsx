import React, { useState } from "react";
import * as S from "./AddFriendsStyles";
import * as Icons from "phosphor-react-native";
import { MainHeader } from "../../../../../components";
import { useTheme } from "styled-components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Toast } from "toastify-react-native";

export function AddFriends() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [firstRender, setFirstRender] = useState(true);

  const mockUsersForAdd = [
    {
      id: 1,
      username: "Thierry",
    },
    {
      id: 2,
      username: "Roberto",
    },
    {
      id: 3,
      username: "João",
    },
    {
      id: 4,
      username: "Maria",
    },
  ];

  function addUser(id: number) {
    console.log("Adicionando usuário de id: ", id);
    Toast.success("Usuário adicionado com sucesso!", "bottom");
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <MainHeader
          title="Adicionar amigos"
          iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
          onPressLeft={() => navigation.navigate("Friends")}
        />

        <S.Content>
          <S.SearchContainer>
            <S.SearchInput
              placeholder="Digite o nome do usuário"
              placeholderTextColor={theme.colors.placeholder}
            />
            <S.SearchButton>
              <Icons.MagnifyingGlass size={24} color={theme.colors.text} />
            </S.SearchButton>
          </S.SearchContainer>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={mockUsersForAdd}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <S.AddFriendContainer>
                <S.AddFriendLeftContainer>
                  <S.AddFriendAvatar
                    source={{
                      uri: `https://api.dicebear.com/8.x/initials/png?seed=${item.username}&backgroundColor=FF9800&textColor=FEFEFE`,
                    }}
                  />
                  <S.AddFriendName>{item.username}</S.AddFriendName>
                </S.AddFriendLeftContainer>
                <S.AddFriendRightContainer>
                  <S.AddFriendButton onPress={() => addUser(item.id)}>
                    <Icons.UserPlus size={24} color={theme.colors.text} />
                  </S.AddFriendButton>
                </S.AddFriendRightContainer>
              </S.AddFriendContainer>
            )}
            ListEmptyComponent={() => (
              <S.EmptyContainer>
                <Icons.WarningCircle size={24} color={theme.colors.primary} />
                <S.EmptyText>
                  {firstRender
                    ? "Realize a pesquisa de usuário"
                    : "Nenhum usuário encontrado"}
                </S.EmptyText>
              </S.EmptyContainer>
            )}
          />
        </S.Content>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}
