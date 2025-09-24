import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export type InputProps = Omit<TextFieldProps, 'onChange'> & {
  name?: string;
  value?: any;
  onChange?: (value: any) => void;
  errorText?: string | null;
  onClear?: () => void;
  sx?: any;
};

export default function Input({ value, onChange, errorText, sx, ...rest }: InputProps) {
  return (
    
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      value={value ?? ''}
      onChange={(e) => {
        const v = (e.target as HTMLInputElement).value;
        onChange && onChange(v);
        // if a dedicated onClear prop was passed in rest, call it
        const maybeOnClear = (rest as any).onClear as (() => void) | undefined;
        if (errorText && typeof maybeOnClear === 'function') maybeOnClear();
      }}
      error={!!errorText || !!rest.error}
      helperText={errorText ?? rest.helperText}
      sx={sx}
      {...rest}
    />
  );
}
