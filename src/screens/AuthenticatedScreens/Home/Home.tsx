import React, { useRef, useState } from "react";
import * as S from "./HomeStyles";
import { TouchableWithoutFeedback, Animated } from "react-native";
import * as Progress from "react-native-progress";
import { useTheme } from "styled-components";
import { Easing } from "react-native-reanimated";
import * as Icons from "phosphor-react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [isLevelMenuVisible, setLevelMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mockUserData = {
    name: "Kauã Librelato",
    level: 12,
    progress: {
      current: 750,
      total: 1500,
    },
    offensive: 12,
    exercisesDone: 200,
    averageTime: "01:30h",
    missionDone: 15,
  };

  const personalResumeData = [
    {
      title: "Dias consecutivos",
      description: mockUserData.offensive,
    },
    {
      title: "Treinos executados",
      description: mockUserData.exercisesDone,
    },
    {
      title: "Tempo médio de treino",
      description: mockUserData.averageTime,
    },
    {
      title: "Missões completas",
      description: mockUserData.missionDone,
    },
  ];

  const funcionalitiesData = [
    {
      title: "Treinos",
      description: "Cadastre seus treinos e acompanhe seu progresso",
      icon: (
        <Icons.Barbell color={theme.colors.primary} weight="fill" size={32} />
      ),
    },
    {
      title: "Missões",
      description: "Complete missões para subir de nível",
      icon: (
        <Icons.Trophy color={theme.colors.primary} weight="fill" size={32} />
      ),
      onPress: () =>
        navigation.navigate("ConfigurationsRoutes", { screen: "Missions" }),
    },
    {
      title: "Ranking",
      description: "Veja sua posição no ranking geral ou entre seus amigos",
      icon: (
        <Icons.Crown color={theme.colors.primary} weight="fill" size={32} />
      ),
    },
    {
      title: "Amigos",
      description: "Adicione amigos e veja o progresso deles",
      icon: (
        <Icons.Users color={theme.colors.primary} weight="fill" size={32} />
      ),
      onPress: () =>
        navigation.navigate("ConfigurationsRoutes", { screen: "Friends" }),
    },
  ];

  const toggleLevelMenu = () => {
    if (isLevelMenuVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => setLevelMenuVisible(false));

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      setLevelMenuVisible(true);
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

  return (
    <S.Container>
      <S.Header>
        <S.PresentationContainer>
          <S.PresentationText>Bem vindo, </S.PresentationText>
          <S.PresentationTextBold>{mockUserData.name}</S.PresentationTextBold>
        </S.PresentationContainer>
        <S.LevelContainer onPress={() => toggleLevelMenu()}>
          <S.LevelText>{`Nível ${mockUserData.level}`}</S.LevelText>
        </S.LevelContainer>
      </S.Header>
      <S.Content>
        <S.CategoryTitle>Resumo pessoal</S.CategoryTitle>
        <S.PersonalResumeCarousel
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <S.Line>
            {personalResumeData.map((data, index) => (
              <S.PersonalResumeCardContainer key={index}>
                <S.PersonalResumeCardTitle>
                  {data.title}
                </S.PersonalResumeCardTitle>
                <S.PersonalResumeCardDescription>
                  {data.description}
                </S.PersonalResumeCardDescription>
              </S.PersonalResumeCardContainer>
            ))}
          </S.Line>
        </S.PersonalResumeCarousel>

        <S.CategoryTitle>Funcionalidades</S.CategoryTitle>

        {funcionalitiesData.map((data, index) => (
          <S.FuncionalityCardContainer key={index} onPress={data.onPress}>
            <S.FuncionalityCardLeftContainer>
              {data.icon}
            </S.FuncionalityCardLeftContainer>
            <S.FuncionalityCardRightContainer>
              <S.FuncionalityCardTitle>{data.title}</S.FuncionalityCardTitle>
              <S.FuncionalityCardDescription>
                {data.description}
              </S.FuncionalityCardDescription>
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
              <S.LevelMenuItemBold>{` ${mockUserData.level}`}</S.LevelMenuItemBold>
            </S.LevelMenuItem>
            <S.LevelMenuItem>
              <S.LevelMenuItemBold>0</S.LevelMenuItemBold>
              <Progress.Bar
                progress={
                  mockUserData.progress.current / mockUserData.progress.total
                }
                width={200}
                color={theme.colors.primary}
                unfilledColor={theme.colors.border}
                borderWidth={1}
                height={8}
                borderRadius={8}
                style={{ marginHorizontal: 8 }}
              />
              <S.LevelMenuItemBold>1500</S.LevelMenuItemBold>
            </S.LevelMenuItem>
          </S.LevelMenu>
        </Animated.View>
      )}
    </S.Container>
  );
}
