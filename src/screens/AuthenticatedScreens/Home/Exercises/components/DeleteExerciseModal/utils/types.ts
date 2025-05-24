import { Modalize } from "react-native-modalize";

export interface IDeleteExerciseModalProps {
  readonly isVisible: React.RefObject<Modalize>;
  readonly setIsTabBarVisibility: (visible: boolean) => void;
  readonly closeDeleteExerciseModal: VoidFunction;
  readonly title: string;
  readonly deleteExercise: VoidFunction;
}
