import React from 'react';
import TextField from '@mui/material/TextField';

export type TextAreaProps = {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  rows?: number;
  errorText?: string | null;
  sx?: any;
} & Omit<React.ComponentProps<typeof TextField>, 'onChange'>;

export default function TextArea({ value, onChange, rows = 4, errorText, sx, ...rest }: TextAreaProps) {
  return (
    <TextField
      multiline
      rows={rows}
      fullWidth
      value={value ?? ''}
      onChange={(e) => onChange && onChange(e.target.value)}
      error={!!errorText}
      helperText={errorText}
      sx={sx}
      {...rest}
    />
  );
}
