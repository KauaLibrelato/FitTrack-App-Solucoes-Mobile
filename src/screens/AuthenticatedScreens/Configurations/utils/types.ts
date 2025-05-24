export interface IButtonsDataProps {
  id: number;
  icon: JSX.Element;
  title: string;
  hasMission?: boolean;
  isExit?: boolean;
  function?: VoidFunction;
}

export interface IUserDataProps {
  email: string;
  experiencePoints: number;
  experiencePointsToNextLevel: number;
  height: null;
  id: string;
  level: number;
  username: string;
  weight: null;
}
