import * as yup from "yup";

export const validationSchemaLogin = yup.object({
  email: yup.string().email("Insira um email valido").required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
});
