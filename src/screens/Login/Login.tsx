import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "styled-components";
import * as S from "./LoginStyles";
import GymIcon from "../../assets/svgs/gym 1.svg";
import {
  ControlledTextInput,
  FillButton,
  NoFillButton,
} from "../../components";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export function Login() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { control } = useForm();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.LogoContainer>
          <GymIcon />
        </S.LogoContainer>

        <S.Form>
          <ControlledTextInput
            control={control}
            name="email"
            placeholder="Nome de usuário ou email"
            keyboardType="email-address"
            rules={{ required: "Campo obrigatório" }}
          />

          <ControlledTextInput
            control={control}
            name="password"
            placeholder="Senha"
            secureTextEntry
            rules={{ required: "Campo obrigatório" }}
          />

          <S.ForgotPasswordButton activeOpacity={0.7}>
          <S.ForgotPasswordText>Esqueceu a senha?</S.ForgotPasswordText>
          </S.ForgotPasswordButton>

          <S.ButtonsContainer>
            <FillButton text="Login" colorText={theme.colors.text} />

            <S.OrText>ou</S.OrText>

            <NoFillButton
              text="Cadastre-se"
              onPress={() => navigation.navigate("Register")}
            />
          </S.ButtonsContainer>
        </S.Form>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}
