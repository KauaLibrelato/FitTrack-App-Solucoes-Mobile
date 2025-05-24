import { type ParamListBase, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import * as Icons from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, TouchableWithoutFeedback } from "react-native";
import type { Modalize } from "react-native-modalize";
import { useTheme } from "styled-components";
import { Toast } from "toastify-react-native";
import { MainHeader, NoFillButton } from "../../../../components";
import { Avatar } from "../../../../components/UI/Avatar/Avatar";
import { EmptyState } from "../../../../components/UI/EmptyState/EmptyState";
import { LoadingSpinner } from "../../../../components/UI/LoadingSpinner/LoadingSpinner";
import { useApiRequest } from "../../../../hooks/useApiRequest";
import apiAuth from "../../../../infra/apiAuth";
import { API_ENDPOINTS } from "../../../../utils/apis";
import type { IConfigurationsTabBarVisibilityProps } from "../../../../utils/types";
import { DeleteFriendModal } from "./components/DeleteFriendModal/DeleteFriendModal";
import { FriendSoliciationModal } from "./components/FriendSoliciationModal/FriendSolicitationModal";
import * as S from "./FriendsStyles";

type Props = Readonly<IConfigurationsTabBarVisibilityProps>;

export function Friends({ setIsTabBarVisibility }: Props) {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const deleteFriendRef = useRef<Modalize>(null);
  const friendSolicitationRef = useRef<Modalize>(null);
  const { loading, executeRequest } = useApiRequest({
    showErrorToast: true,
  });
  const [friendsData, setFriendsData] = useState<any>([]);
  const [friendSolicitations, setFriendSolicitations] = useState<any>([]);
  const [nameModal, setNameModal] = useState("");
  const [userId, setUserId] = useState("");
  const [search, setSearch] = useState("");

  const fetchFriendsData = () => {
    executeRequest(() =>
      apiAuth
        .post(API_ENDPOINTS.FRIENDSHIP.LIST, {
          pendingFriendships: false,
        })
        .then((res) => {
          setFriendsData(res.data.friendships);
        })
    );
  };

  const fetchFriendSolicitations = () => {
    executeRequest(() =>
      apiAuth
        .post(API_ENDPOINTS.FRIENDSHIP.LIST, {
          pendingFriendships: true,
        })
        .then((res) => {
          setFriendSolicitations(res.data);
        })
    );
  };

  useEffect(() => {
    fetchFriendsData();
    fetchFriendSolicitations();
  }, []);

  function openDeleteFriendModal(name: string, userId: string) {
    setNameModal(name);
    setUserId(userId);
    deleteFriendRef.current?.open();
    setIsTabBarVisibility(false);
  }

  function closeDeleteFriendModal() {
    setNameModal("");
    setUserId("");
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

  const handleAcceptFriendRequest = (id: string) => {
    executeRequest(() =>
      apiAuth
        .put(API_ENDPOINTS.FRIENDSHIP.ACCEPT_INVITATION, {
          friendshipId: id,
        })
        .then(() => {
          closeFriendSolicitaionsModal();
          fetchFriendsData();
          fetchFriendSolicitations();
          Toast.success("Solicitação aceita!", "bottom");
        })
    );
  };

  async function handleDeclineFriendRequest(id: string) {
    try {
      await apiAuth.delete(`/friendship/delete?friendshipId=${id}`).then(() => {
        closeFriendSolicitaionsModal();
        fetchFriendsData();
        fetchFriendSolicitations();
        Toast.success("Solicitação rejeitada!", "bottom");
      });
    } catch (error: any) {
      Toast.error(error.response.data, "bottom");
    }
  }

  async function handleDeleteFriend(id: string) {
    try {
      await apiAuth.delete(`/friendship/delete?friendshipId=${id}`).then(() => {
        closeDeleteFriendModal();
        fetchFriendsData();
        Toast.success("Amigo removido!", "bottom");
      });
    } catch (error: any) {
      Toast.error(error.response.data, "bottom");
    }
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
              <LoadingSpinner />
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
                  data={friendsData.filter((friend: any) => {
                    return friend.user?.username.toLowerCase().includes(search.toLowerCase());
                  })}
                  keyExtractor={(item) => String(item.id)}
                  renderItem={({ item }) => (
                    <S.FriendCardContainer>
                      <S.FriendCardLeftContainer>
                        <Avatar username={item.user?.username ?? ""} size={32} />
                        <S.FriendName>{item.user?.username}</S.FriendName>
                      </S.FriendCardLeftContainer>
                      <S.FriendCardRightContainer>
                        <S.FriendLevelContainer>
                          <S.FriendLevelText>{item.user?.level}</S.FriendLevelText>
                        </S.FriendLevelContainer>
                        <S.FriendButton onPress={() => openDeleteFriendModal(item.user?.username, item?.id)}>
                          <Icons.X size={24} color={theme.colors.error} />
                        </S.FriendButton>
                      </S.FriendCardRightContainer>
                    </S.FriendCardContainer>
                  )}
                  ListEmptyComponent={() => <EmptyState message="Você ainda não possui amigos" />}
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
        handleDeleteFriend={() => handleDeleteFriend(userId)}
      />
      <FriendSoliciationModal
        handleAcceptFriendRequest={(id: string) => handleAcceptFriendRequest(id)}
        handleDeclineFriendRequest={(id: string) => handleDeclineFriendRequest(id)}
        users={friendSolicitations}
        isVisible={friendSolicitationRef}
        setIsTabBarVisibility={setIsTabBarVisibility}
        closeFriendSolicitaionsModal={() => closeFriendSolicitaionsModal()}
      />
    </>
  );
}
