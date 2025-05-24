import { type ParamListBase, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import * as Icons from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, TouchableWithoutFeedback } from "react-native";
import type { Modalize } from "react-native-modalize";
import * as Progress from "react-native-progress";
import { useTheme } from "styled-components";
import { MainHeader } from "../../../components";
import { Avatar } from "../../../components/UI/Avatar/Avatar";
import { LevelBadge } from "../../../components/UI/LevelBadge/LevelBadge";
import { LoadingSpinner } from "../../../components/UI/LoadingSpinner/LoadingSpinner";
import { useAuthContext } from "../../../context/Auth/UseAuthContext";
import { useApiRequest } from "../../../hooks/useApiRequest";
import { userService } from "../../../services/userService";
import type { IConfigurationsTabBarVisibilityProps } from "../../../utils/types";
import { UI_CONSTANTS } from "../../../utils/ui";
import { LogoutModal } from "./components/LogoutModal/LogoutModal";
import * as S from "./ConfigurationsStyles";
import type { IButtonsDataProps, IUserDataProps } from "./utils/types";

type Props = Readonly<IConfigurationsTabBarVisibilityProps>;

export function Configurations({ setIsTabBarVisibility }: Props) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const theme = useTheme();
  const { signout } = useAuthContext();
  const logoutContainerRef = useRef<Modalize>(null);
  const [isLevelMenuVisible, setIsLevelMenuVisible] = useState(false);
  const [userData, setUserData] = useState<IUserDataProps>();
  const [hasMission, setHasMission] = useState(false);

  const { loading, executeRequest } = useApiRequest({
    onSuccess: (data) => {
      setUserData(data?.user);
      setHasMission(data?.hasMissionToCollect);
    },
    showErrorToast: true,
  });

  const fetchUserData = () => {
    executeRequest(() => userService.getUserInfo());
  };

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.addListener("focus", () => {
      fetchUserData();
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
        duration: UI_CONSTANTS.ANIMATION_DURATION,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => setIsLevelMenuVisible(false));

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: UI_CONSTANTS.ANIMATION_DURATION,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      setIsLevelMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: UI_CONSTANTS.ANIMATION_DURATION,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: UI_CONSTANTS.ANIMATION_DURATION,
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
      hasMission: hasMission,
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
        <LoadingSpinner fullScreen />
      ) : (
        <S.Container>
          <MainHeader
            title="Configurações"
            onPressRight={() => toggleLevelMenu()}
            iconRight={<LevelBadge level={userData?.level ?? 1} onPress={toggleLevelMenu} />}
          />
          <S.Content>
            <S.UserInformations>
              <Avatar username={userData?.username ?? ""} size={96} />
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
