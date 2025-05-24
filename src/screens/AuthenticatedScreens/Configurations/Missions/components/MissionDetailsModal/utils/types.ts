import { Modalize } from "react-native-modalize";
import { IMissionsData } from "../../../utils/types";

export interface IMissionDetailsModalProps {
  readonly isVisible: React.RefObject<Modalize>;
  readonly setIsTabBarVisibility: (visible: boolean) => void;
  readonly closeMissionDetailsModal: VoidFunction;
  readonly item: IMissionsData;
}
