import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Icons from "phosphor-react-native";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Easing, TouchableWithoutFeedback, View } from "react-native";
import { Modalize } from "react-native-modalize";
import * as Progress from "react-native-progress";
import { useTheme } from "styled-components";
import { Toast } from "toastify-react-native";
import { MainHeader } from "../../../components";
import { useAuthContext } from "../../../context/Auth/UseAuthContext";
import apiAuth from "../../../infra/apiAuth";
import { IConfigurationsTabBarVisibilityProps } from "../../../utils/types";
import { LogoutModal } from "./components/LogoutModal/LogoutModal";
import * as S from "./ConfigurationsStyles";
import { IButtonsDataProps, IUserDataProps } from "./utils/types";

type Props = Readonly<IConfigurationsTabBarVisibilityProps>;

export function Configurations({ setIsTabBarVisibility }: Props) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const theme = useTheme();
  const { signout } = useAuthContext();
  const logoutContainerRef = useRef<Modalize>(null);
  const [isLevelMenuVisible, seIsLevelMenuVisible] = useState(false);
  const [userData, setUserData] = useState<IUserDataProps>();
  const [loading, setLoading] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  async function getUserData() {
    setLoading(true);
    try {
      await apiAuth.get("/user/info").then((res) => {
        setUserData(res.data.user);
      });
    } catch {
      Toast.error("Erro ao buscar informações do usuário", "bottom");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserData();
    });
  }, [navigation]);

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
      }).start(() => seIsLevelMenuVisible(false));

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      seIsLevelMenuVisible(true);
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
      function: () => navigation.navigate("EditProfile", { userData }),
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
      icon: <Icons.Users size={24} color={theme.colors.text} />,
      title: "Amigos",
      function: () => navigation.navigate("Friends"),
    },
    {
      id: 4,
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
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.background,
          }}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <S.Container>
          <MainHeader
            title="Configurações"
            onPressRight={() => toggleLevelMenu()}
            iconRight={
              <S.LevelContainer>
                <S.LevelText>{`Nível ${userData?.level}`}</S.LevelText>
              </S.LevelContainer>
            }
          />
          <S.Content>
            <S.UserInformations>
              <S.UserImage
                source={{
                  uri: `https://api.dicebear.com/8.x/initials/png?seed=${userData?.username}&backgroundColor=FF9800&textColor=FEFEFE`,
                }}
              />
              <S.UserInformationsTitle>{userData?.username}</S.UserInformationsTitle>
            </S.UserInformations>

            <S.ButtonsContainer>{buttonsData.map(renderButton)}</S.ButtonsContainer>
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
                  <S.LevelMenuItemBold>{` ${userData?.level}`}</S.LevelMenuItemBold>
                </S.LevelMenuItem>
                <S.LevelMenuItem>
                  <S.LevelMenuItemBold>{userData?.experiencePoints}</S.LevelMenuItemBold>
                  <Progress.Bar
                    progress={(userData?.experiencePoints ?? 1) / (userData?.experiencePointsToNextLevel ?? 1)}
                    width={200}
                    color={theme.colors.primary}
                    unfilledColor={theme.colors.border}
                    borderWidth={1}
                    height={8}
                    borderRadius={8}
                    style={{ marginHorizontal: 8 }}
                  />
                  <S.LevelMenuItemBold>{userData?.experiencePointsToNextLevel}</S.LevelMenuItemBold>
                </S.LevelMenuItem>
              </S.LevelMenu>
            </Animated.View>
          )}
        </S.Container>
      )}

      <LogoutModal
        signout={() => {
          signout();
          navigation.navigate("AuthenticationRoutes");
        }}
        setIsTabBarVisibility={setIsTabBarVisibility}
        isVisible={logoutContainerRef}
        closeLogoutModal={() => closeLogoutModal()}
      />
    </>
  );
}
