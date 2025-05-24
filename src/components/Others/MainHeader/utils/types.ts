export interface IMainHeaderProps {
  readonly title: string;
  readonly iconLeft?: React.ReactNode;
  readonly iconRight?: React.ReactNode;
  readonly onPressLeft?: VoidFunction;
  readonly onPressRight?: VoidFunction;
}
