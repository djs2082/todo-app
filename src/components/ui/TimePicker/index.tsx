import { TimePicker as RainTimePicker, TimePickerProps, TimePickerThemeProvider } from "@karya_app1/rain-js";
import theme from './theme';
const TimePicker: React.FC<TimePickerProps> = (props) => {
  return (
    <TimePickerThemeProvider theme={theme}>
      <RainTimePicker {...props} />
    </TimePickerThemeProvider>
  );
}

export default TimePicker;