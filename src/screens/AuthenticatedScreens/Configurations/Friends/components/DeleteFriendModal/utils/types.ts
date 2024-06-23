import { Modalize } from "react-native-modalize";

export interface IDeleteFriendModalProps {
  isVisible: React.RefObject<Modalize>;
  setIsTabBarVisibility: (visible: boolean) => void;
  closeDeleteFriendModal: () => void;
  name: string;
  handleDeleteFriend: () => void;
}
