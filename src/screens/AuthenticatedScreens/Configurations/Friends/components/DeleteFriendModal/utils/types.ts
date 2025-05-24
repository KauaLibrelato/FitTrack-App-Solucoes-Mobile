import { Modalize } from "react-native-modalize";

export interface IDeleteFriendModalProps {
  readonly isVisible: React.RefObject<Modalize>;
  readonly setIsTabBarVisibility: (visible: boolean) => void;
  readonly closeDeleteFriendModal: VoidFunction;
  readonly name: string;
  readonly handleDeleteFriend: VoidFunction;
}
