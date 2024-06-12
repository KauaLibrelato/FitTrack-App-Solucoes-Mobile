import { Modalize } from "react-native-modalize";

export interface IDeleteExerciseModalProps {
  isVisible: React.RefObject<Modalize>;
  setIsTabBarVisibility: (visible: boolean) => void;
  closeDeleteExerciseModal: () => void;
  title: string;
}
