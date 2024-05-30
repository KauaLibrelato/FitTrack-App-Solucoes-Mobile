import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "styled-components";
import * as S from "./RegisterStyles";
import GymIcon from "../../../assets/svgs/gym 1.svg";
import BackButtonIcon from "../../../assets/svgs/backbutton.svg";
import { ControlledTextInput, FillButton } from "../../../components";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export function Register() {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = handleSubmit(async (data) => {
    setLoading(true);
    try {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  });
  const password = watch("password");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.BackButton
            onPress={() => navigation.navigate("Login")}
            activeOpacity={0.7}
          >
            <BackButtonIcon />
          </S.BackButton>
          <S.HeaderTitle>Criar conta</S.HeaderTitle>
        </S.Header>

        <S.Content>
          <S.LogoContainer>
            <GymIcon />
          </S.LogoContainer>

          <S.Form>
            <ControlledTextInput
              control={control}
              name="username"
              placeholder="Nome de usuário"
              rules={{ required: "Campo obrigatório" }}
            />

            <ControlledTextInput
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

            <ControlledTextInput
              control={control}
              name="password"
              placeholder="Senha"
              secureTextEntry
              rules={{ required: "Campo obrigatório" }}
            />

            <ControlledTextInput
              control={control}
              name="confirmPassword"
              placeholder="Confirmar senha"
              secureTextEntry
              rules={{
                required: "Campo obrigatório",
                validate: (value) =>
                  value === password || "As senhas não correspondem",
              }}
            />

            <S.ButtonsContainer>
              <FillButton
                text="Cadastrar"
                colorText={theme.colors.text}
                onPress={() => handleRegister()}
                loading={loading}
              />
            </S.ButtonsContainer>
          </S.Form>
        </S.Content>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}
