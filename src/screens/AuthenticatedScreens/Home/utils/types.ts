export interface IHomeDataProps {
  missionsCompleted: number;
  userLevel: number;
  workoutsAverageTime: number;
  workoutsExecuted: number;
  experiencePoints: number;
  experiencePointsToNextLevel: number;
  consecutiveDays: number;
  hasMissionsToCollect: boolean;
}

export interface IRanking {
  level: number;
  username: string;
}
