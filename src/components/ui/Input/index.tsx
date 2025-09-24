import React from "react";
import { Input as RainInput, InputThemeProvider, InputProps as RainInputProps } from "@karya_app1/rain-js";
import theme from "./theme";

const Input: React.FC<RainInputProps> = (props) => {
  return (
    <InputThemeProvider theme={theme}>
      <RainInput {...props} />
    </InputThemeProvider>
  );
};
export default Input;
