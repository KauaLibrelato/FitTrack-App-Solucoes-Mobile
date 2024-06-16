import React, { useState } from "react";
import { Modalize } from "react-native-modalize";
import * as S from "./ChangePasswordModalStyles";
import * as Icons from "phosphor-react-native";
import {
  ControlledTextInput,
  FillButton,
  NoFillButton,
} from "../../../../../../components";
import { useTheme } from "styled-components";
import { IChangePasswordModalProps } from "./utils/types";
import { useForm } from "react-hook-form";
import { Toast } from "toastify-react-native";
import apiAuth from "../../../../../../infra/apiAuth";

export function ChangePasswordModal({
  isVisible,
  setIsTabBarVisibility,
  closeChangePasswordModal,
}: IChangePasswordModalProps) {
  const theme = useTheme();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const newPassword = watch("newPassword");

  const handleChangePassword = handleSubmit(async (data) => {
    setLoading(true);
    try {
      await apiAuth
        .put("/user/update/password", {
          password: data.oldPassword,
          newPassword: data.newPassword,
        })
        .then(() => {
          Toast.success("Senha alterada com sucesso!", "bottom");
          closeChangePasswordModal();
        });
    } catch (error: any) {
      Toast.error(error.message, "bottom");
    } finally {
      setLoading(false);
    }
  });

  return (
    <Modalize
      ref={isVisible}
      adjustToContentHeight
      modalStyle={{ backgroundColor: theme.colors.background }}
      onClosed={() => setIsTabBarVisibility(true)}
    >
      <S.ContainerModal>
        <S.HeaderModal>
          <S.XButtonModal onPress={closeChangePasswordModal}>
            <Icons.X size={24} color={theme.colors.text} />
          </S.XButtonModal>
          <S.TitleModal>Alterar Senha</S.TitleModal>
        </S.HeaderModal>
        <S.ContentModal>
          <ControlledTextInput
            control={control}
            name="oldPassword"
            placeholder="Senha antiga"
            secureTextEntry
            rules={{
              required: "Campo obrigatório",
            }}
          />
          <ControlledTextInput
            control={control}
            name="newPassword"
            placeholder="Senha"
            secureTextEntry
            rules={{ required: "Campo obrigatório" }}
          />

          <ControlledTextInput
            control={control}
            name="confirmNewPassword"
            placeholder="Confirmar senha"
            secureTextEntry
            rules={{
              required: "Campo obrigatório",
              validate: (value) =>
                value === newPassword || "As senhas não correspondem",
            }}
          />
          <S.ButtonsContainer>
            <FillButton
              text="Salvar"
              onPress={() => handleChangePassword()}
              style={{ marginVertical: 16 }}
              loading={loading}
            />
            <NoFillButton
              text="Cancelar"
              onPress={closeChangePasswordModal}
              loading={loading}
            />
          </S.ButtonsContainer>
        </S.ContentModal>
      </S.ContainerModal>
    </Modalize>
  );
}
