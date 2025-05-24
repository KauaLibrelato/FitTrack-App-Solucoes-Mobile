import { Modalize } from "react-native-modalize";

export interface IExerciseTypesModalProps {
  readonly isVisible: React.RefObject<Modalize>;
  readonly setIsTabBarVisibility: (visible: boolean) => void;
  readonly closeExerciseTypesModal: VoidFunction;
  readonly types: ReadonlyArray<{
    readonly value: string;
    readonly label: string;
  }>;
  readonly callback: (type: { readonly value: string; readonly label: string }) => void;
}
