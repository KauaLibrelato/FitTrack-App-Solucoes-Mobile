export interface IConfigurationsTabBarVisibilityProps {
  readonly setIsTabBarVisibility: (visible: boolean) => void;
}

export interface IUser {
  username: string;
  token: string;
}
