import React, { useCallback, useRef, useState } from "react";
import * as S from "./EditProfileStyles";
import * as Icons from "phosphor-react-native";
import {
  ControlledTextInput,
  FillButton,
  MainHeader,
} from "../../../../components";
import { useForm } from "react-hook-form";
import { useFocusEffect } from "@react-navigation/native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "styled-components";
import { ChangePasswordModal } from "./components/ChangePasswordModal/ChangePasswordModal";
import { Modalize } from "react-native-modalize";
import { IConfigurationsTabBarVisibilityProps } from "../../../../utils/types";

export function EditProfile({
  setIsTabBarVisibility,
}: IConfigurationsTabBarVisibilityProps) {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [editable, setEditable] = useState(false);
  const changePasswordRef = useRef<Modalize>(null);
  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      email: "kaua@email.com",
      username: "kauakaua",
      height: "170cm",
      weight: "65kg",
      age: "19 anos",
    },
  });

  useFocusEffect(
    useCallback(() => {
      reset();
    }, [reset])
  );

  const openChangePasswordModal = () => {
    changePasswordRef.current?.open();
    setIsTabBarVisibility(false);
  };

  const closeChangePasswordModal = () => {
    changePasswordRef.current?.close();
    setIsTabBarVisibility(true);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <MainHeader
            title="Editar perfil"
            iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
            onPressLeft={() => navigation.goBack()}
          />
          <S.Content>
            <S.Form>
              <ControlledTextInput
                label="Email"
                control={control}
                name="email"
                placeholder="Email"
                keyboardType="email-address"
                rules={{
                  required: "Campo obrigatório",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Email inválido",
                  },
                }}
                editable={editable}
              />

              <ControlledTextInput
                label="Nome de usuário"
                control={control}
                name="username"
                placeholder="Nome de usuário"
                rules={{ required: "Campo obrigatório" }}
                editable={editable}
              />

              <ControlledTextInput
                label="Idade"
                control={control}
                name="age"
                placeholder="Idade"
                keyboardType="number-pad"
                editable={editable}
              />

              <ControlledTextInput
                label="Altura"
                control={control}
                name="height"
                placeholder="Altura(cm)"
                keyboardType="number-pad"
                editable={editable}
              />

              <ControlledTextInput
                label="Peso"
                control={control}
                name="weight"
                placeholder="Peso(kg)"
                keyboardType="number-pad"
                editable={editable}
              />
              <S.ChangePasswordButton onPress={() => openChangePasswordModal()}>
                <S.ChangePasswordText>Alterar senha</S.ChangePasswordText>
              </S.ChangePasswordButton>

              <S.ButtonsContainer>
                <FillButton
                  text={editable ? "Salvar" : "Editar"}
                  colorText={theme.colors.text}
                  onPress={
                    editable
                      ? () => setEditable(false)
                      : () => setEditable(true)
                  }
                />
              </S.ButtonsContainer>
            </S.Form>
          </S.Content>
        </S.Container>
      </TouchableWithoutFeedback>

      <ChangePasswordModal
        setIsTabBarVisibility={setIsTabBarVisibility}
        isVisible={changePasswordRef}
        closeChangePasswordModal={() => closeChangePasswordModal()}
      />
    </>
  );
}
