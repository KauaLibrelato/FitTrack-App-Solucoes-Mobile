import React from "react";
import * as S from "./ExercisesStyles";
import * as Icons from "phosphor-react-native";
import { MainHeader } from "../../../../components";
import { useTheme } from "styled-components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { IConfigurationsTabBarVisibilityProps } from "../../../../utils/types";

export function Exercises({
  setIsTabBarVisibility,
}: IConfigurationsTabBarVisibilityProps) {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  return (
    <S.Container>
      <MainHeader
        title="Treinos"
        iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
        onPressLeft={() => navigation.navigate("Configurations")}
      />
    </S.Container>
  );
}
