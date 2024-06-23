import { DefaultTheme } from "styled-components";

export interface IMissionsData {
  id: string;
  isCompleted: boolean;
  mission: {
    id: string;
    title: string;
    description: string;
    experiencePoints: number;
    goal: number;
  };
  progress: number;
  isCollectible: boolean;
}

export interface IMissionItem {
  item: IMissionsData;
  theme: DefaultTheme;
  onCollect: (id: string) => void;
  onLongPress: (item: IMissionsData) => void;
}
