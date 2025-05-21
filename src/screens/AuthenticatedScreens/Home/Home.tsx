import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Icons from "phosphor-react-native";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, TouchableWithoutFeedback } from "react-native";
import * as Progress from "react-native-progress";
import { Easing } from "react-native-reanimated";
import { useTheme } from "styled-components";
import { Toast } from "toastify-react-native";
import apiAuth from "../../../infra/apiAuth";
import { formatTime } from "../../../utils/functions";
import { IUser } from "../../../utils/types";
import * as S from "./HomeStyles";
import { IHomeDataProps } from "./utils/types";

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [isLevelMenuVisible, setIsLevelMenuVisible] = useState(false);
  const [homeData, setHomeData] = useState<IHomeDataProps>();
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const personalResumeData = [
    {
      title: "Dias consecutivos",
      description: homeData?.consecutiveDays,
    },
    {
      title: "Treinos executados",
      description: homeData?.workoutsExecuted,
    },
    {
      title: "Tempo médio de treino",
      description: formatTime(homeData?.workoutsAverageTime ?? 0),
    },
    {
      title: "Missões completas",
      description: homeData?.missionsCompleted,
    },
  ];

  const funcionalitiesData = [
    {
      title: "Treinos",
      description: "Cadastre seus treinos e acompanhe seu progresso",
      icon: <Icons.Barbell color={theme.colors.primary} weight="fill" size={32} />,
      onPress: () => navigation.navigate("Exercises"),
    },
    {
      title: "Missões",
      description: "Complete missões para subir de nível",
      icon: <Icons.Trophy color={theme.colors.primary} weight="fill" size={32} />,
      onPress: () => navigation.navigate("ConfigurationsRoutes", { screen: "Missions" }),
    },
    {
      title: "Ranking",
      description: "Veja sua posição no ranking geral ou entre seus amigos",
      icon: <Icons.Crown color={theme.colors.primary} weight="fill" size={32} />,
      onPress: () => navigation.navigate("Ranking"),
    },
    {
      title: "Amigos",
      description: "Adicione amigos e veja o progresso deles",
      icon: <Icons.Users color={theme.colors.primary} weight="fill" size={32} />,
      onPress: () => navigation.navigate("ConfigurationsRoutes", { screen: "Friends" }),
    },
  ];

  const toggleLevelMenu = () => {
    if (isLevelMenuVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => setIsLevelMenuVisible(false));

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      setIsLevelMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  };

  const levelMenuTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  async function getHomeData() {
    setLoading(true);
    try {
      await apiAuth.get("/home/metrics").then((res) => {
        setHomeData(res.data);
      });
    } catch (error: any) {
      Toast.error(error.response.data.message, "bottom");
    } finally {
      setLoading(false);
    }
  }

  async function getUserData() {
    const userInfos = await AsyncStorage.getItem("user");
    if (userInfos) {
      setUser(JSON.parse(userInfos));
    }
  }

  useEffect(() => {
    getHomeData();
    getUserData();
  }, [navigation]);
  return loading ? (
    <ActivityIndicator size="large" color={theme.colors.primary} />
  ) : (
    <S.Container>
      <S.Header>
        <S.PresentationContainer>
          <S.PresentationText>Bem vindo, </S.PresentationText>
          <S.PresentationTextBold>{user?.username ?? ""}</S.PresentationTextBold>
        </S.PresentationContainer>
        <S.LevelContainer onPress={() => toggleLevelMenu()}>
          <S.LevelText>{`Nível ${homeData?.userLevel}`}</S.LevelText>
        </S.LevelContainer>
      </S.Header>

      <S.Content>
        <S.CategoryTitle>Resumo pessoal</S.CategoryTitle>
        <S.PersonalResumeCarousel horizontal showsHorizontalScrollIndicator={false}>
          <S.Line>
            {personalResumeData.map((data) => (
              <S.PersonalResumeCardContainer key={data?.title}>
                <S.PersonalResumeCardTitle>{data.title}</S.PersonalResumeCardTitle>
                <S.PersonalResumeCardDescription>{data.description}</S.PersonalResumeCardDescription>
              </S.PersonalResumeCardContainer>
            ))}
          </S.Line>
        </S.PersonalResumeCarousel>

        <S.CategoryTitle>Funcionalidades</S.CategoryTitle>

        {funcionalitiesData.map((data) => (
          <S.FuncionalityCardContainer key={data?.title} onPress={data.onPress}>
            <S.FuncionalityCardLeftContainer>{data.icon}</S.FuncionalityCardLeftContainer>
            <S.FuncionalityCardRightContainer>
              <S.TitleContainer>
                <S.FuncionalityCardTitle>{data.title}</S.FuncionalityCardTitle>
                {data.title === "Missões" && homeData?.hasMissionsToCollect && <S.PointHasMission />}
              </S.TitleContainer>
              <S.FuncionalityCardDescription>{data.description}</S.FuncionalityCardDescription>
            </S.FuncionalityCardRightContainer>
          </S.FuncionalityCardContainer>
        ))}
        <S.BottomSpacer />
      </S.Content>

      {isLevelMenuVisible && (
        <TouchableWithoutFeedback onPress={toggleLevelMenu}>
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: fadeAnim,
            }}
          />
        </TouchableWithoutFeedback>
      )}

      {isLevelMenuVisible && (
        <Animated.View
          style={{
            transform: [{ translateY: levelMenuTranslateY }],
            position: "absolute",
            top: 56,
            left: 0,
            right: 0,
          }}
        >
          <S.LevelMenu>
            <S.LevelMenuItem>
              <S.LevelMenuItemText>Nível do usuário:</S.LevelMenuItemText>
              <S.LevelMenuItemBold>{` ${homeData?.userLevel}`}</S.LevelMenuItemBold>
            </S.LevelMenuItem>
            <S.LevelMenuItem>
              <S.LevelMenuItemBold>{homeData?.experiencePoints ?? 0}</S.LevelMenuItemBold>
              <Progress.Bar
                progress={(homeData?.experiencePoints ?? 1) / (homeData?.experiencePointsToNextLevel ?? 1)}
                width={200}
                color={theme.colors.primary}
                unfilledColor={theme.colors.border}
                borderWidth={1}
                height={8}
                borderRadius={8}
                style={{ marginHorizontal: 8 }}
              />
              <S.LevelMenuItemBold>{homeData?.experiencePointsToNextLevel ?? 0}</S.LevelMenuItemBold>
            </S.LevelMenuItem>
          </S.LevelMenu>
        </Animated.View>
      )}
    </S.Container>
  );
}
