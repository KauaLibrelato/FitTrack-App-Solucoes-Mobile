export interface IButtonsDataProps {
  id: number;
  icon: JSX.Element;
  title: string;
  hasMission?: boolean;
  isExit?: boolean;
  function?: () => void;
}
