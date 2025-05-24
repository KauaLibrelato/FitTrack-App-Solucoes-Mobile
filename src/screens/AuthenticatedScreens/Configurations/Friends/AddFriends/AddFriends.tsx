import { type ParamListBase, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import * as Icons from "phosphor-react-native";
import { useEffect, useState } from "react";
import { FlatList, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "styled-components";
import { Toast } from "toastify-react-native";
import { MainHeader } from "../../../../../components";
import { Avatar } from "../../../../../components/UI/Avatar/Avatar";
import { EmptyState } from "../../../../../components/UI/EmptyState/EmptyState";
import { LoadingSpinner } from "../../../../../components/UI/LoadingSpinner/LoadingSpinner";
import { useApiRequest } from "../../../../../hooks/useApiRequest";
import apiAuth from "../../../../../infra/apiAuth";
import { userService } from "../../../../../services/userService";
import * as S from "./AddFriendsStyles";
import type { IUser } from "./utils/types";

export function AddFriends() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [firstRender, setFirstRender] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const { loading, executeRequest } = useApiRequest({
    onSuccess: (data) => {
      setUsers(data?.users);
      setFirstRender(false);
    },
  });

  const fetchUsers = () => {
    executeRequest(() => userService.getUserList(1, 50));
  };

  useEffect(() => {
    fetchUsers();
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
      Toast.error(error.response.data.message, "bottom");
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
            <LoadingSpinner />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={users?.filter((user: { username: string }) => {
                return user.username.toLowerCase().includes(search.toLowerCase());
              })}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <S.AddFriendContainer>
                  <S.AddFriendLeftContainer>
                    <Avatar username={item.username} size={32} />
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
                <EmptyState message={firstRender ? "Realize a pesquisa de usuário" : "Nenhum usuário encontrado"} />
              )}
            />
          )}
        </S.Content>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}
