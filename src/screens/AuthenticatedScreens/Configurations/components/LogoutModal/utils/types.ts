import { Modalize } from "react-native-modalize";

export interface ILogoutModalProps {
  isVisible: React.RefObject<Modalize>;
  setIsTabBarVisibility: (visible: boolean) => void;
  closeLogoutModal: () => void;
  signout: () => void;
}
