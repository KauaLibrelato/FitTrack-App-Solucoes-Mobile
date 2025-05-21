import React from "react";
import * as S from "./MainHeaderStyles";
import { IMainHeaderProps } from "./utils/types";

export function MainHeader({ title, iconLeft, iconRight, onPressLeft, onPressRight }: IMainHeaderProps) {
  return (
    <S.Container>
      <S.LeftContainer>
        {iconLeft && <S.LeftButton onPress={onPressLeft}>{iconLeft}</S.LeftButton>}
        <S.HeaderTitle iconLeft={!!iconLeft}>{title}</S.HeaderTitle>
      </S.LeftContainer>

      {iconRight && <S.RightButton onPress={onPressRight}>{iconRight}</S.RightButton>}
    </S.Container>
  );
}
