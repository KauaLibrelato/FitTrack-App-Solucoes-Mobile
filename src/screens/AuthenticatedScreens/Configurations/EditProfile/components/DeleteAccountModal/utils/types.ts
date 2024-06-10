import { Modalize } from "react-native-modalize";

export interface IDeleteAccountModalProps {
  isVisible: React.RefObject<Modalize>;
  setIsTabBarVisibility: (visible: boolean) => void;
  closeDeleteAccountModal: () => void;
}
