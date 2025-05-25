import * as yup from "yup";

export const validationSchemaFinishExercise = yup.object({
  description: yup.string().required("Campo obrigatório"),
});
