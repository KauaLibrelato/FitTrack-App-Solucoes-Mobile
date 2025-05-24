import { Modalize } from "react-native-modalize";

export interface IFriendSolicitaionsModalProps {
  readonly isVisible: React.RefObject<Modalize>;
  readonly setIsTabBarVisibility: (visible: boolean) => void;
  readonly closeFriendSolicitaionsModal: VoidFunction;
  readonly users: any;
  readonly handleDeclineFriendRequest: (id: string) => void;
  readonly handleAcceptFriendRequest: (id: string) => void;
}
