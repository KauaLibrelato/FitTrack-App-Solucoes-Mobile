import React, { useRef, useState } from "react";
import * as S from "./FriendsStyles";
import * as Icons from "phosphor-react-native";
import { MainHeader, NoFillButton } from "../../../../components";
import { useTheme } from "styled-components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Modalize } from "react-native-modalize";
import { DeleteFriendModal } from "./components/DeleteFriendModal/DeleteFriendModal";
import { IConfigurationsTabBarVisibilityProps } from "../../../../utils/types";
import { FriendSoliciationModal } from "./components/FriendSoliciationModal/FriendSolicitationModal";

export function Friends({
  setIsTabBarVisibility,
}: IConfigurationsTabBarVisibilityProps) {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const deleteFriendRef = useRef<Modalize>(null);
  const friendSolicitationRef = useRef<Modalize>(null);
  const [nameModal, setNameModal] = useState("");

  const mockFriendsData = [
    {
      id: 1,
      username: "Jean Nesi",
      level: 10,
    },
    {
      id: 2,
      username: "Kauan Candido",
      level: 15,
    },
    {
      id: 3,
      username: "Lucas Guidi",
      level: 30,
    },
    {
      id: 4,
      username: "Joao Vitor",
      level: 8,
    },
  ];

  const mockUserSoliciations = [
    {
      id: 1,
      username: "Robertinho",
    },
    {
      id: 2,
      username: "Joaozinho",
    },
    {
      id: 3,
      username: "Mariazinha",
    },
    {
      id: 4,
      username: "Josezinho",
    },
  ];

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
              />
              <S.SearchButton>
                <Icons.MagnifyingGlass size={24} color={theme.colors.text} />
              </S.SearchButton>
            </S.SearchContainer>

            <S.SolicitaitonsContainer>
              <NoFillButton
                onPress={() => openFriendSolicitationModal()}
                text="Solicitações de amizade"
              />
            </S.SolicitaitonsContainer>

            <S.Title>Seus amigos</S.Title>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={mockFriendsData}
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
                  <Icons.WarningCircle size={24} color={theme.colors.primary} />
                  <S.EmptyListText>
                    Você ainda não possui amigos
                  </S.EmptyListText>
                </S.EmptyListContainer>
              )}
            />
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
        users={mockUserSoliciations}
        isVisible={friendSolicitationRef}
        setIsTabBarVisibility={setIsTabBarVisibility}
        closeFriendSolicitaionsModal={() => closeFriendSolicitaionsModal()}
      />
    </>
  );
}
