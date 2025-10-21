import React from "react"; 
import { PriorityBadge as RainPriorityBadge, PriorityBadgeProps, PriorityBadgeThemeProvider, type PriorityBadgeThemeOverride, } from "@karya_app1/rain-js";
import theme from "./theme";

const PriorityBadge: React.FC<PriorityBadgeProps> = (props) => (
  <PriorityBadgeThemeProvider theme={theme as PriorityBadgeThemeOverride}>
    <RainPriorityBadge {...props} />
  </PriorityBadgeThemeProvider>
);

export default PriorityBadge;

