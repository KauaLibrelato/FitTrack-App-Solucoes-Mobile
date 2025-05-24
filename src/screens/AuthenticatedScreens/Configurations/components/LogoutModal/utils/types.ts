import { Modalize } from "react-native-modalize";

export interface ILogoutModalProps {
  readonly isVisible: React.RefObject<Modalize>;
  readonly setIsTabBarVisibility: (visible: boolean) => void;
  readonly closeLogoutModal: VoidFunction;
  readonly signout: VoidFunction;
}
