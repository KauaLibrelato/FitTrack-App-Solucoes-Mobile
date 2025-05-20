import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Icons from "phosphor-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "styled-components";
import { Toast } from "toastify-react-native";
import Logo from "../../../assets/pngs/logo.png";
import { ControlledTextInput, FillButton, MainHeader } from "../../../components";
import api from "../../../infra/api";
import * as S from "./RegisterStyles";

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
      await api
        .post("/auth/register", {
          username: data.username,
          email: data.email,
          password: data.password,
        })
        .then(() => {
          Toast.success("Usuário cadastrado com sucesso", "bottom");
          navigation.navigate("Login");
        });
    } catch (error: any) {
      Toast.error(error.response.data.message, "bottom");
    } finally {
      setLoading(false);
    }
  });

  const password = watch("password");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <MainHeader
          title="Cadastrar"
          iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
          onPressLeft={() => navigation.goBack()}
        />

        <S.Content>
          <S.LogoContainer>
            <S.LogoImage source={Logo} />
          </S.LogoContainer>

          <S.Form>
            <ControlledTextInput
              label="Nome de usuário"
              control={control}
              name="username"
              placeholder="Nome de usuário"
              rules={{ required: "Campo obrigatório" }}
            />

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

            <ControlledTextInput
              label="Senha"
              control={control}
              name="password"
              placeholder="Senha"
              secureTextEntry
              rules={{ required: "Campo obrigatório" }}
            />

            <ControlledTextInput
              label="Confirmar senha"
              control={control}
              name="confirmPassword"
              placeholder="Confirmar senha"
              secureTextEntry
              rules={{
                required: "Campo obrigatório",
                validate: (value) => value === password || "As senhas não correspondem",
              }}
            />

            <S.ButtonsContainer>
              <FillButton text="Cadastrar" onPress={() => handleRegister()} loading={loading} />
            </S.ButtonsContainer>
          </S.Form>
        </S.Content>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}
