import { Modalize } from "react-native-modalize";

export interface IDeleteAccountModalProps {
  readonly sVisible: React.RefObject<Modalize>;
  readonly setIsTabBarVisibility: (visible: boolean) => void;
  readonly closeDeleteAccountModal: () => void;
  readonly deleteAccount: () => void;
}
