import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import * as S from './FillButtonStyles';
import {IFillButtonProps} from './utils/types';

export function FillButton({
  text,
  bgColor,
  disabled,
  loading,
  colorText,
  ...rest
}: IFillButtonProps & TouchableOpacityProps) {
  return (
    <S.Container {...rest} bgColor={bgColor} loading={loading} disabled={disabled}>
      {loading ? <S.Loading colorText={colorText}/> : <S.Text colorText={colorText}>{text}</S.Text>}
    </S.Container>
  );
}
