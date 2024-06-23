import React from "react";
import * as S from "./MainHeaderStyles";
import { IMainHeaderProps } from "./utils/types";

export function MainHeader(props: IMainHeaderProps) {
  return (
    <S.Container>
      <S.LeftContainer>
        {props.iconLeft && (
          <S.LeftButton onPress={props.onPressLeft}>
            {props.iconLeft}
          </S.LeftButton>
        )}
        <S.HeaderTitle iconLeft={!!props.iconLeft}>{props.title}</S.HeaderTitle>
      </S.LeftContainer>

      {props.iconRight && (
        <S.RightButton onPress={props.onPressRight}>
          {props.iconRight}
        </S.RightButton>
      )}
    </S.Container>
  );
}
