import React from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';

export type AppButtonProps = ButtonProps & { sx?: any };

export default function Button(props: AppButtonProps) {
  return <MuiButton variant="contained" {...props} />;
}