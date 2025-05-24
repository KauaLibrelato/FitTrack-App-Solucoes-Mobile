import { ExerciseType, exercisesTypes } from "./constants";

const valueToLabel: { [key: string]: string } = exercisesTypes.reduce(
  (acc: { [key: string]: string }, item: ExerciseType) => {
    acc[item.value] = item.label;
    return acc;
  },
  {}
);

export function convertValueToLabel(value: string): string {
  return valueToLabel[value] || "Valor não encontrado";
}
