import { ExerciseType, exercisesTypes } from "./constants";

export function formatTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}`;
}

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
