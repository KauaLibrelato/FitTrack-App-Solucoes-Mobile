import React, { useCallback, useRef, useState } from "react";
import * as S from "./EditProfileStyles";
import * as Icons from "phosphor-react-native";
import {
  ControlledTextInput,
  FillButton,
  MainHeader,
  NoFillButton,
} from "../../../../components";
import { useForm } from "react-hook-form";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "styled-components";
import { ChangePasswordModal } from "./components/ChangePasswordModal/ChangePasswordModal";
import { Modalize } from "react-native-modalize";
import { IConfigurationsTabBarVisibilityProps } from "../../../../utils/types";
import { DeleteAccountModal } from "./components/DeleteAccountModal/DeleteAccountModal";
import { IUserDataRouteProps } from "./utils/types";
import apiAuth from "../../../../infra/apiAuth";
import { Toast } from "toastify-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function EditProfile({
  setIsTabBarVisibility,
}: IConfigurationsTabBarVisibilityProps) {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const changePasswordRef = useRef<Modalize>(null);
  const deleteAccountRef = useRef<Modalize>(null);
  const route = useRoute();
  const { userData } = route.params as IUserDataRouteProps;
  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      email: userData?.email,
      username: userData?.username,
      height: String(userData?.height),
      weight: String(userData?.weight),
    },
  });

  useFocusEffect(
    useCallback(() => {
      reset();
    }, [reset])
  );

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      apiAuth
        .put("/user/update", {
          email: data.email,
          username: data.username,
          height: Number(data?.height),
          weight: Number(data?.weight),
        })
        .then(async () => {
          const userInfos = await AsyncStorage.getItem("user");
          const userPropsToSave = {
            ...JSON.parse(userInfos || "{}"),
            username: data.username,
          };
          await AsyncStorage.setItem("user", JSON.stringify(userPropsToSave));
          setEditable(false);
          Toast.success("Perfil atualizado com sucesso", "bottom");
        });
    } catch (error: any) {
      Toast.error(error.response.data.message, "bottom");
    } finally {
      setLoading(false);
    }
  });

  const deleteAccount = async () => {
    setLoading(true);
    try {
      apiAuth.delete("/user/delete").then(() => {
        navigation.navigate("AuthenticationScreens", { screen: "Login" });
        Toast.success("Conta excluída com sucesso", "bottom");
      });
    } catch (error: any) {
      Toast.error(error.response.data.message, "bottom");
    } finally {
      setLoading(false);
    }
  };

  const openChangePasswordModal = () => {
    changePasswordRef.current?.open();
    setIsTabBarVisibility(false);
  };

  const closeChangePasswordModal = () => {
    changePasswordRef.current?.close();
    setIsTabBarVisibility(true);
  };

  const openDeleteAccountModal = () => {
    deleteAccountRef.current?.open();
    setIsTabBarVisibility(false);
  };

  const closeDeleteAccountModal = () => {
    deleteAccountRef.current?.close();
    setIsTabBarVisibility(true);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <MainHeader
            title="Editar perfil"
            iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
            onPressLeft={() => navigation.navigate("Configurations")}
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
                  onPress={
                    editable ? () => onSubmit() : () => setEditable(true)
                  }
                  loading={loading}
                />
                {editable && (
                  <NoFillButton
                    style={{ marginTop: 16 }}
                    text="Cancelar"
                    colorText={theme.colors.primary}
                    onPress={() => {
                      setEditable(false);
                    }}
                    loading={loading}
                  />
                )}

                {!editable && (
                  <S.DeleteAccountButton
                    onPress={() => openDeleteAccountModal()}
                  >
                    <Icons.Trash size={24} color={theme.colors.error} />
                    <S.DeleteAccountText>Excluir conta</S.DeleteAccountText>
                  </S.DeleteAccountButton>
                )}
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

      <DeleteAccountModal
        deleteAccount={() => deleteAccount()}
        setIsTabBarVisibility={setIsTabBarVisibility}
        isVisible={deleteAccountRef}
        closeDeleteAccountModal={closeDeleteAccountModal}
      />
    </>
  );
}
