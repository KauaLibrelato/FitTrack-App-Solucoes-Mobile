import * as Icons from "phosphor-react-native";
import { useForm } from "react-hook-form";
import { Modalize } from "react-native-modalize";
import { useTheme } from "styled-components";
import { Toast } from "toastify-react-native";
import { ControlledTextInput, FillButton, NoFillButton } from "../../../../../../components";
import { useApiRequest } from "../../../../../../hooks/useApiRequest";
import { userService } from "../../../../../../services/userService";
import { createValidationRules } from "../../../../../../utils/validators";
import * as S from "./ChangePasswordModalStyles";
import type { IChangePasswordModalProps } from "./utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaChangePassword } from "./validations/validationSchemaChangePassword";

export function ChangePasswordModal({
  isVisible,
  setIsTabBarVisibility,
  closeChangePasswordModal,
}: IChangePasswordModalProps) {
  const theme = useTheme();
  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(validationSchemaChangePassword),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { loading, executeRequest } = useApiRequest({
    onSuccess: () => {
      Toast.success("Senha alterada com sucesso!", "bottom");
      closeChangePasswordModal();
    },
  });

  const newPassword = watch("newPassword");

  const handleChangePassword = handleSubmit(async (data) => {
    await executeRequest(() =>
      userService.updatePassword({
        password: data.oldPassword,
        newPassword: data.newPassword,
      })
    );
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
            rules={createValidationRules.required}
          />
          <ControlledTextInput
            control={control}
            name="newPassword"
            placeholder="Senha"
            secureTextEntry
            rules={createValidationRules.required}
          />

          <ControlledTextInput
            control={control}
            name="confirmNewPassword"
            placeholder="Confirmar senha"
            secureTextEntry
            rules={createValidationRules.passwordMatch(newPassword)}
          />
          <S.ButtonsContainer>
            <FillButton
              text="Salvar"
              onPress={() => handleChangePassword()}
              style={{ marginVertical: 16 }}
              loading={loading}
            />
            <NoFillButton text="Cancelar" onPress={closeChangePasswordModal} loading={loading} />
          </S.ButtonsContainer>
        </S.ContentModal>
      </S.ContainerModal>
    </Modalize>
  );
}
