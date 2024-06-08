import React, { useRef } from "react";
import * as S from "./ConfigurationsStyles";
import * as Icons from "phosphor-react-native";
import { FillButton, MainHeader, NoFillButton } from "../../../components";
import { useTheme } from "styled-components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Modalize } from "react-native-modalize";
import { IConfigurationsTabBarVisibilityProps } from "../../../utils/types";
import { IButtonsDataProps } from "./utils/types";
import { LogoutModal } from "./components/LogoutModal/LogoutModal";

export function Configurations({
  setIsTabBarVisibility,
}: IConfigurationsTabBarVisibilityProps) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const theme = useTheme();
  const logoutContainerRef = useRef<Modalize>(null);

  const mockUserData = {
    name: "Kauã Librelato",
    level: 12,
  };

  const openLogoutModal = () => {
    logoutContainerRef.current?.open();
    setIsTabBarVisibility(false);
  };

  const closeLogoutModal = () => {
    logoutContainerRef.current?.close();
    setIsTabBarVisibility(true);
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

  return (
    <>
      <S.Container>
        <MainHeader
          title="Configurações"
          iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
          onPressLeft={() => navigation.goBack()}
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
      </S.Container>

      <LogoutModal
        setIsTabBarVisibility={setIsTabBarVisibility}
        isVisible={logoutContainerRef}
        closeLogoutModal={() => closeLogoutModal()}
      />
    </>
  );
}
