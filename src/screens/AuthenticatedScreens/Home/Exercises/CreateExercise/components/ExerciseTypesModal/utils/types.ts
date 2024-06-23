import { Modalize } from "react-native-modalize";

export interface IExerciseTypesModalProps {
  isVisible: React.RefObject<Modalize>;
  setIsTabBarVisibility: (visible: boolean) => void;
  closeExerciseTypesModal: () => void;
  types: {
    value: string;
    label: string;
  }[];
  callback: (type: { value: string; label: string }) => void;
}
