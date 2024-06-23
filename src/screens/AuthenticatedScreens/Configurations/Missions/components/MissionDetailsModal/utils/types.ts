import { Modalize } from "react-native-modalize";
import { IMissionsData } from "../../../utils/types";

export interface IMissionDetailsModalProps {
  isVisible: React.RefObject<Modalize>;
  setIsTabBarVisibility: (visible: boolean) => void;
  closeMissionDetailsModal: () => void;
  item: IMissionsData;
}
