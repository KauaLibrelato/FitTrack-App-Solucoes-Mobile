import { type ParamListBase, useFocusEffect, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import Logo from "../../../assets/pngs/logo.png";
import { ControlledTextInput, FillButton, NoFillButton } from "../../../components";
import { useAuthContext } from "../../../context/Auth/UseAuthContext";
import { useApiRequest } from "../../../hooks/useApiRequest";
import { createValidationRules } from "../../../utils/validators";
import * as S from "./LoginStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaLogin } from "./validations/validationSchemaLogin";

interface LoginFormData {
  email: string;
  password: string;
}

export function Login() {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { signin } = useAuthContext();

  const { loading, executeRequest } = useApiRequest({
    onSuccess: () => {
      navigation.navigate("AuthenticatedRoutes", { screen: "HomeRoutes" });
    },
  });

  const { control, reset, handleSubmit } = useForm<LoginFormData>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(validationSchemaLogin),
  });

  const handleLogin = handleSubmit(async (data) => {
    await executeRequest(() =>
      signin({
        email: data.email,
        password: data.password,
        logged: () => navigation.navigate("AuthenticatedRoutes", { screen: "HomeRoutes" }),
      })
    );
  });

  const navigateToRegister = () => navigation.navigate("Register");
  const navigateToForgotPassword = () => navigation.navigate("ForgotPassword");

  useFocusEffect(
    useCallback(() => {
      reset();
    }, [reset])
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.LogoContainer>
          <S.LogoImage source={Logo} />
        </S.LogoContainer>

        <S.Form>
          <ControlledTextInput
            label="Email"
            control={control}
            name="email"
            placeholder="Email"
            keyboardType="email-address"
            rules={createValidationRules.email}
          />

          <ControlledTextInput
            label="Senha"
            control={control}
            name="password"
            placeholder="Senha"
            secureTextEntry
            rules={createValidationRules.required}
          />

          <S.ForgotPasswordButton activeOpacity={0.7} onPress={navigateToForgotPassword}>
            <S.ForgotPasswordText>Esqueceu a senha?</S.ForgotPasswordText>
          </S.ForgotPasswordButton>

          <S.ButtonsContainer>
            <FillButton text="Login" onPress={handleLogin} loading={loading} disabled={loading} />

            <S.OrText>ou</S.OrText>

            <NoFillButton text="Cadastre-se" onPress={navigateToRegister} loading={loading} disabled={loading} />
          </S.ButtonsContainer>
        </S.Form>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}
