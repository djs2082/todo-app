import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export type InputProps = Omit<TextFieldProps, 'onChange'> & {
  name?: string;
  value?: any;
  onChange?: (value: any) => void;
  errorText?: string | null;
  sx?: any;
};

export default function Input({ value, onChange, errorText, sx, ...rest }: InputProps) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      value={value ?? ''}
      onChange={(e) => onChange && onChange((e.target as HTMLInputElement).value)}
      error={!!errorText || !!rest.error}
      helperText={errorText ?? rest.helperText}
      sx={sx}
      {...rest}
    />
  );
}
