import { Modalize } from "react-native-modalize";

export interface IChangePasswordModalProps {
  readonly isVisible: React.RefObject<Modalize | null>;
  readonly setIsTabBarVisibility: (visibility: boolean) => void;
  readonly closeChangePasswordModal: VoidFunction;
}
