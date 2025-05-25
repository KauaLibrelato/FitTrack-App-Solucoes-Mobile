import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Icons from "phosphor-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "styled-components";
import Logo from "../../../assets/pngs/logo.png";
import { ControlledTextInput, FillButton, MainHeader } from "../../../components";
import * as S from "./ForgotPasswordStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaForgotPassword } from "./validations/validationSchemaForgotPassword";

export function ForgotPassword() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchemaForgotPassword),
    defaultValues: {
      email: "",
    },
  });

  const handleRecovery = handleSubmit(() => {
    setLoading(true);
    try {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <MainHeader
          title="Recuperar senha"
          iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
          onPressLeft={() => navigation.goBack()}
        />

        <S.LogoContainer>
          <S.ImageLogo source={Logo} />
        </S.LogoContainer>

        <S.Content>
          <S.TextInformation>Insira o email cadastrado na sua conta para recuperar a senha</S.TextInformation>
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
            />
            <S.ButtonsContainer>
              <FillButton text="Recuperar" onPress={() => handleRecovery()} loading={loading} />
            </S.ButtonsContainer>
          </S.Form>
        </S.Content>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}
