import { Modalize } from "react-native-modalize";

export interface IDeleteAccountModalProps {
  readonly isVisible: React.RefObject<Modalize | null>;
  readonly setIsTabBarVisibility: (visible: boolean) => void;
  readonly closeDeleteAccountModal: VoidFunction;
  readonly deleteAccount: VoidFunction;
}
