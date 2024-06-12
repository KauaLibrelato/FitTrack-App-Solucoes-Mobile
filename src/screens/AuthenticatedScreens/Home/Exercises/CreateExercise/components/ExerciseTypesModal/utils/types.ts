import { Modalize } from "react-native-modalize";

export interface IExerciseTypesModalProps {
  isVisible: React.RefObject<Modalize>;
  setIsTabBarVisibility: (visible: boolean) => void;
  closeExerciseTypesModal: () => void;
  types: {
    id: number;
    name: string;
  }[];
  callback: (type: { id: number; name: string }) => void;
}
