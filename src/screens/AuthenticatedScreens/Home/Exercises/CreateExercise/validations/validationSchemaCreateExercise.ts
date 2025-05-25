import * as yup from "yup";

export const validationSchemaCreateExercise = yup.object({
  name: yup.string().required("Campo obrigatório"),
  description: yup.string().required("Campo obrigatório"),
});
