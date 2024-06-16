import React, { useEffect, useRef, useState } from "react";
import * as S from "./FriendsStyles";
import * as Icons from "phosphor-react-native";
import { MainHeader, NoFillButton } from "../../../../components";
import { useTheme } from "styled-components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { DeleteFriendModal } from "./components/DeleteFriendModal/DeleteFriendModal";
import { IConfigurationsTabBarVisibilityProps } from "../../../../utils/types";
import { FriendSoliciationModal } from "./components/FriendSoliciationModal/FriendSolicitationModal";
import { Toast } from "toastify-react-native";
import apiAuth from "../../../../infra/apiAuth";

export function Friends({
  setIsTabBarVisibility,
}: IConfigurationsTabBarVisibilityProps) {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const deleteFriendRef = useRef<Modalize>(null);
  const friendSolicitationRef = useRef<Modalize>(null);
  const [loading, setLoading] = useState(false);
  const [friendsData, setFriendsData] = useState<any>([]);
  const [friendSolicitations, setFriendSolicitations] = useState<any>([]);
  const [nameModal, setNameModal] = useState("");
  const [search, setSearch] = useState("");

  async function getFriendsData() {
    setLoading(true);
    try {
      await apiAuth.get("/ranking/friends").then((res) => {
        setFriendsData(res.data.users);
      });
    } catch (error: any) {
      Toast.error(error.message, "bottom");
    } finally {
      setLoading(false);
    }
  }

  async function getFriendSolicitations() {
    setLoading(true);
    try {
      await apiAuth
        .post("/friendship/list", {
          pendingFriendships: true,
        })
        .then((res) => {
          setFriendSolicitations(res.data);
        });
    } catch (error: any) {
      Toast.error(error.message, "bottom");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFriendsData();
    getFriendSolicitations();
  }, []);

  function openDeleteFriendModal(name: string) {
    setNameModal(name);
    deleteFriendRef.current?.open();
    setIsTabBarVisibility(false);
  }

  function closeDeleteFriendModal() {
    setNameModal("");
    deleteFriendRef.current?.close();
    setIsTabBarVisibility(true);
  }

  function openFriendSolicitationModal() {
    friendSolicitationRef.current?.open();
    setIsTabBarVisibility(false);
  }

  function closeFriendSolicitaionsModal() {
    friendSolicitationRef.current?.close();
    setIsTabBarVisibility(true);
  }
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <MainHeader
            title="Amigos"
            iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
            onPressLeft={() => navigation.navigate("Configurations")}
            iconRight={<Icons.UserPlus size={24} color={theme.colors.text} />}
            onPressRight={() => navigation.navigate("AddFriends")}
          />
          <S.Content>
            <S.SearchContainer>
              <S.SearchInput
                placeholder="Pesquisar amigos"
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
              <>
                <S.SolicitaitonsContainer>
                  <NoFillButton
                    onPress={() => openFriendSolicitationModal()}
                    text={`Solicitações de amizade: ${friendSolicitations?.count}`}
                  />
                </S.SolicitaitonsContainer>
                <S.Title>Seus amigos</S.Title>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={friendsData?.friendships?.filter((user: any) => {
                    return user.username
                      .toLowerCase()
                      .includes(search.toLowerCase());
                  })}
                  keyExtractor={(item) => String(item.id)}
                  renderItem={({ item }) => (
                    <S.FriendCardContainer>
                      <S.FriendCardLeftContainer>
                        <S.FriendAvatar
                          source={{
                            uri: `https://api.dicebear.com/8.x/initials/png?seed=${item.username}&backgroundColor=FF9800&textColor=FEFEFE`,
                          }}
                        />
                        <S.FriendName>{item.username}</S.FriendName>
                      </S.FriendCardLeftContainer>
                      <S.FriendCardRightContainer>
                        <S.FriendLevelContainer>
                          <S.FriendLevelText>{item.level}</S.FriendLevelText>
                        </S.FriendLevelContainer>
                        <S.FriendButton
                          onPress={() => openDeleteFriendModal(item.username)}
                        >
                          <Icons.X size={24} color={theme.colors.error} />
                        </S.FriendButton>
                      </S.FriendCardRightContainer>
                    </S.FriendCardContainer>
                  )}
                  ListEmptyComponent={() => (
                    <S.EmptyListContainer>
                      <Icons.WarningCircle
                        size={24}
                        color={theme.colors.primary}
                      />
                      <S.EmptyListText>
                        Você ainda não possui amigos
                      </S.EmptyListText>
                    </S.EmptyListContainer>
                  )}
                />
              </>
            )}
          </S.Content>
        </S.Container>
      </TouchableWithoutFeedback>

      <DeleteFriendModal
        isVisible={deleteFriendRef}
        setIsTabBarVisibility={setIsTabBarVisibility}
        closeDeleteFriendModal={() => closeDeleteFriendModal()}
        name={nameModal}
      />
      <FriendSoliciationModal
        users={friendSolicitations}
        isVisible={friendSolicitationRef}
        setIsTabBarVisibility={setIsTabBarVisibility}
        closeFriendSolicitaionsModal={() => closeFriendSolicitaionsModal()}
      />
    </>
  );
}
