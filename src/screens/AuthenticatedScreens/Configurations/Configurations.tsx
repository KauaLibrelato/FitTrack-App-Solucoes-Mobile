import React, { useRef, useState } from "react";
import * as S from "./ConfigurationsStyles";
import * as Icons from "phosphor-react-native";
import { MainHeader } from "../../../components";
import { useTheme } from "styled-components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Modalize } from "react-native-modalize";
import { IConfigurationsTabBarVisibilityProps } from "../../../utils/types";
import { IButtonsDataProps } from "./utils/types";
import { LogoutModal } from "./components/LogoutModal/LogoutModal";
import { Animated, Easing, TouchableWithoutFeedback, View } from "react-native";
import * as Progress from "react-native-progress";

export function Configurations({
  setIsTabBarVisibility,
}: IConfigurationsTabBarVisibilityProps) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const theme = useTheme();
  const logoutContainerRef = useRef<Modalize>(null);
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
  };

  const openLogoutModal = () => {
    logoutContainerRef.current?.open();
    setIsTabBarVisibility(false);
  };

  const closeLogoutModal = () => {
    logoutContainerRef.current?.close();
    setIsTabBarVisibility(true);
  };

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

  const buttonsData = [
    {
      id: 1,
      icon: <Icons.User size={24} color={theme.colors.text} />,
      title: "Editar Perfil",
      function: () => navigation.navigate("EditProfile"),
    },
    {
      id: 2,
      icon: <Icons.Medal size={24} color={theme.colors.text} />,
      title: "Missões",
      hasMission: true,
      function: () => navigation.navigate("Missions"),
    },
    {
      id: 3,
      icon: <Icons.Power size={24} color={theme.colors.error} />,
      title: "Sair",
      isExit: true,
      function: () => openLogoutModal(),
    },
  ];

  const handleButtonPress = (button: IButtonsDataProps) => {
    if (button.function) {
      button.function();
    }
  };

  const renderButton = (button: IButtonsDataProps) => (
    <S.ButtonContainer
      key={button.id}
      isExit={button.isExit}
      activeOpacity={0.7}
      onPress={() => handleButtonPress(button)}
    >
      <S.ButtonLeftContainer>
        {button.icon}
        <S.ButtonText isExit={button.isExit}>{button.title}</S.ButtonText>
      </S.ButtonLeftContainer>
      {button.hasMission && <S.PointHasMission />}
    </S.ButtonContainer>
  );

  const levelMenuTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <>
      <S.Container>
        <MainHeader
          title="Configurações"
          onPressRight={() => toggleLevelMenu()}
          iconRight={
            <S.LevelContainer>
              <S.LevelText>{`Nível ${mockUserData.level}`}</S.LevelText>
            </S.LevelContainer>
          }
        />
        <S.Content>
          <S.UserInformations>
            <S.UserImage
              source={{
                uri: `https://api.dicebear.com/8.x/initials/png?seed=${mockUserData.name}&backgroundColor=FF9800&textColor=FEFEFE`,
              }}
            />
            <S.UserInformationsTitle>
              {mockUserData.name}
            </S.UserInformationsTitle>
          </S.UserInformations>

          <S.ButtonsContainer>
            {buttonsData.map(renderButton)}
          </S.ButtonsContainer>
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

      <LogoutModal
        setIsTabBarVisibility={setIsTabBarVisibility}
        isVisible={logoutContainerRef}
        closeLogoutModal={() => closeLogoutModal()}
      />
    </>
  );
}
