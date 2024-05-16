import React from 'react';
import {Controller, FieldValues, UseControllerProps} from 'react-hook-form';
import {TextInputProps} from 'react-native';
import {Input} from './Input/Input';

export function ControlledTextInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  label,
  ...textInputProps
}: UseControllerProps<FormType> &
  TextInputProps & {label?: string; formatValue?: (value: string) => string}) {
  return (
    <Controller
      control={control}
      render={({field, fieldState}) => (
        <Input
          {...textInputProps}
          label={label}
          name={name}
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          value={field.value}
          errorMessage={fieldState.error?.message}
        />
      )}
      name={name}
      rules={rules}
    />
  );
}
