import * as yup from "yup";

export const validationSchemaEditProfile = yup.object({
  email: yup.string().email("Insira um email valido").required("Campo obrigatório"),
  username: yup.string().required("Campo obrigatório"),
  height: yup.string().required("Campo obrigatório"),
  weight: yup.string().required("Campo obrigatório"),
});
