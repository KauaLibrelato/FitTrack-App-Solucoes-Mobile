import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import * as S from './NoFillButtonStyles';
import {INoFillButtonProps} from './utils/types';

export function NoFillButton({
  text,
  disabled,
  loading,
  colorText,
  borderColor,
  ...rest
}: INoFillButtonProps & TouchableOpacityProps) {
  return (
    <S.Container {...rest} borderColor={borderColor} loading={loading} disabled={disabled}>
      {loading ? <S.Loading colorText={colorText}/> : <S.Text colorText={colorText}>{text}</S.Text>}
    </S.Container>
  );
}
