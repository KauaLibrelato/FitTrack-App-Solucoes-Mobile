export interface IExercisesList {
  id: string;
  name: string;
  description: string;
  initialDateTime: Date;
  finalDateTime: Date;
  createdAt: Date;
  workoutType: string;
  totalTime: number;
}
