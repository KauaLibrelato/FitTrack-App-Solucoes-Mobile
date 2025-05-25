import * as yup from "yup";

export const validationSchemaChangePassword = yup.object({
  oldPassword: yup.string().required("Campo obrigatório"),
  newPassword: yup.string().required("Campo obrigatório"),
  confirmNewPassword: yup
    .string()
    .required("Campo obrigatório")
    .oneOf([yup.ref("newPassword")], "As senhas não coincidem"),
});
