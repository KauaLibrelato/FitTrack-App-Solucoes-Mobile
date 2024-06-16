import React, { useEffect, useState } from "react";
import * as S from "./AddFriendsStyles";
import * as Icons from "phosphor-react-native";
import { MainHeader } from "../../../../../components";
import { useTheme } from "styled-components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Toast } from "toastify-react-native";
import apiAuth from "../../../../../infra/apiAuth";
import { useAuthContext } from "../../../../../context/Auth/UseAuthContext";

export function AddFriends() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [firstRender, setFirstRender] = useState(true);
  const [users, setUsers] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { user: myUser } = useAuthContext();

  async function getUsers() {
    setLoading(true);
    try {
      await apiAuth.get("/user/list?page=1&offset=50").then((res) => {
        setUsers(res.data.users);
        setFirstRender(false);
      });
    } catch (error: any) {
      Toast.error(error.message, "bottom");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  function addUser(id: string) {
    try {
      apiAuth
        .post("/friendship/send-invitation", {
          userId: id,
        })
        .then(() => {
          Toast.success("Solicitação enviada com sucesso!", "bottom");
        });
    } catch (error: any) {
      Toast.error(error.message, "bottom");
    }
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
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
            <S.SearchButton>
              <Icons.MagnifyingGlass size={24} color={theme.colors.text} />
            </S.SearchButton>
          </S.SearchContainer>
          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={users
                ?.filter((user: any) => {
                  return user.username
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })
                .filter(
                  (userFilter: any) => userFilter.username !== myUser?.username
                )}
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
          )}
        </S.Content>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}
