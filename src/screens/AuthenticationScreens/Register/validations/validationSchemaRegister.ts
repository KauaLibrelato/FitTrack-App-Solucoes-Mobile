import * as yup from "yup";

export const validationSchemaRegister = yup.object({
  username: yup.string().required("Campo obrigatório"),
  email: yup.string().email("Insira um email valido").required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
  confirmPassword: yup
    .string()
    .required("Campo obrigatório")
    .oneOf([yup.ref("password")], "As senhas não coincidem"),
});
