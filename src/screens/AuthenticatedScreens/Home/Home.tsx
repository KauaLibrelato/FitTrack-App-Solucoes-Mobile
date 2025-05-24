import { type ParamListBase, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import * as Icons from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import * as Progress from "react-native-progress";
import { Easing } from "react-native-reanimated";
import { useTheme } from "styled-components";
import { LevelBadge } from "../../../components/UI/LevelBadge/LevelBadge";
import { LoadingSpinner } from "../../../components/UI/LoadingSpinner/LoadingSpinner";
import { useApiRequest } from "../../../hooks/useApiRequest";
import { useUserData } from "../../../hooks/useUserData";
import apiAuth from "../../../infra/apiAuth";
import { API_ENDPOINTS } from "../../../utils/apis";
import { formatTime } from "../../../utils/formatters";
import { UI_CONSTANTS } from "../../../utils/ui";
import * as S from "./HomeStyles";
import type { IHomeDataProps } from "./utils/types";

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { user } = useUserData();

  const [isLevelMenuVisible, setIsLevelMenuVisible] = useState(false);
  const [homeData, setHomeData] = useState<IHomeDataProps>();

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { loading, executeRequest } = useApiRequest({
    onSuccess: (data) => setHomeData(data),
  });

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

  const functionalitiesData = [
    {
      title: "Treinos",
      description: "Cadastre seus treinos e acompanhe seu progresso",
      icon: <Icons.Barbell color={theme.colors.primary} weight="fill" size={UI_CONSTANTS.ICON_SIZES.LARGE} />,
      onPress: () => navigation.navigate("Exercises"),
    },
    {
      title: "Missões",
      description: "Complete missões para subir de nível",
      icon: <Icons.Trophy color={theme.colors.primary} weight="fill" size={UI_CONSTANTS.ICON_SIZES.LARGE} />,
      onPress: () => navigation.navigate("ConfigurationsRoutes", { screen: "Missions" }),
      hasNotification: homeData?.hasMissionsToCollect,
    },
    {
      title: "Ranking",
      description: "Veja sua posição no ranking geral ou entre seus amigos",
      icon: <Icons.Crown color={theme.colors.primary} weight="fill" size={UI_CONSTANTS.ICON_SIZES.LARGE} />,
      onPress: () => navigation.navigate("Ranking"),
    },
    {
      title: "Amigos",
      description: "Adicione amigos e veja o progresso deles",
      icon: <Icons.Users color={theme.colors.primary} weight="fill" size={UI_CONSTANTS.ICON_SIZES.LARGE} />,
      onPress: () => navigation.navigate("ConfigurationsRoutes", { screen: "Friends" }),
    },
  ];

  const toggleLevelMenu = () => {
    const toValue = isLevelMenuVisible ? 0 : 1;
    const duration = UI_CONSTANTS.ANIMATION_DURATION;

    if (!isLevelMenuVisible) {
      setIsLevelMenuVisible(true);
    }

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue,
        duration,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue,
        duration,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (isLevelMenuVisible) {
        setIsLevelMenuVisible(false);
      }
    });
  };

  const levelMenuTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const fetchHomeData = () => {
    executeRequest(() => apiAuth.get(API_ENDPOINTS.HOME.METRICS));
  };

  useEffect(() => {
    fetchHomeData();
  }, [navigation]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <S.Container>
      <S.Header>
        <S.PresentationContainer>
          <S.PresentationText>Bem vindo, </S.PresentationText>
          <S.PresentationTextBold>{user?.username ?? ""}</S.PresentationTextBold>
        </S.PresentationContainer>

        <LevelBadge level={homeData?.userLevel ?? 1} onPress={toggleLevelMenu} />
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

        {functionalitiesData.map((data) => (
          <S.FuncionalityCardContainer key={data?.title} onPress={data.onPress}>
            <S.FuncionalityCardLeftContainer>{data.icon}</S.FuncionalityCardLeftContainer>
            <S.FuncionalityCardRightContainer>
              <S.TitleContainer>
                <S.FuncionalityCardTitle>{data.title}</S.FuncionalityCardTitle>
                {data.hasNotification && <S.PointHasMission />}
              </S.TitleContainer>
              <S.FuncionalityCardDescription>{data.description}</S.FuncionalityCardDescription>
            </S.FuncionalityCardRightContainer>
          </S.FuncionalityCardContainer>
        ))}
        <S.BottomSpacer />
      </S.Content>

      {isLevelMenuVisible && (
        <>
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
        </>
      )}
    </S.Container>
  );
}
