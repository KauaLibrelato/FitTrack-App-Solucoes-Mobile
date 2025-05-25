import * as yup from "yup";

export const validationSchemaForgotPassword = yup.object({
  email: yup.string().email("Insira um email valido").required("Campo obrigatório"),
});
