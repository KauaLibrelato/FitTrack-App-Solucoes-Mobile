import { Modalize } from "react-native-modalize";

export interface IChangePasswordModalProps {
  isVisible: React.RefObject<Modalize>;
  setIsTabBarVisibility: (visible: boolean) => void;
  closeLogoutModal: () => void;
}
