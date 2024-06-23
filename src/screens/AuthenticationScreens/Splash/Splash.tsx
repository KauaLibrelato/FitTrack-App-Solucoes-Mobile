import React, { useEffect } from "react";
import * as S from "./SplashStyles";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export function Splash() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  async function getUserLogged() {
    const token = await AsyncStorage.getItem("accessToken");

    if (token) {
      return "AuthenticatedRoutes";
    }
    return "AuthenticationRoutes";
  }

  async function redirectUser() {
    const route = await getUserLogged();
    navigation.navigate(route);
  }

  useEffect(() => {
    redirectUser();
  }, []);
  return (
    <S.Container>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <S.Description>Carregando informações do usuário...</S.Description>
    </S.Container>
  );
}
