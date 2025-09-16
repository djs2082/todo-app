import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

export type SelectFieldProps = Omit<SelectProps, 'onChange'> & {
  label?: string;
  value?: any;
  onChange?: (value: any) => void;
  options?: { value: string | number; label: string }[];
  errorText?: string | null;
  sx?: any;
};

export default function SelectField({ label, value, onChange, options = [], errorText, sx, ...rest }: SelectFieldProps) {
  return (
    <FormControl fullWidth size="small" error={!!errorText} sx={sx}>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiSelect
        value={value ?? ''}
        label={label}
        onChange={(e) => onChange && onChange((e.target as HTMLSelectElement).value)}
        {...rest}
      >
        <MenuItem value="">Select</MenuItem>
        {options.map((o) => (
          <MenuItem key={String(o.value)} value={o.value}>{o.label}</MenuItem>
        ))}
      </MuiSelect>
      {errorText && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
}
