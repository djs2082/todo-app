import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiCheckbox from '@mui/material/Checkbox';

export type CheckboxProps = {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  sx?: any;
};

export default function Checkbox({ label, checked, onChange, sx }: CheckboxProps) {
  return (
    <FormControlLabel
      control={<MuiCheckbox checked={!!checked} onChange={(e) => onChange && onChange(e.target.checked)} sx={sx} />}
      label={label}
    />
  );
}
