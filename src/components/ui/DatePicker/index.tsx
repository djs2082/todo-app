import { DatePicker as RainDatePicker, DatePickerProps, DatePickerThemeProvider } from "@karya_app1/rain-js";
import theme from './theme';
const DatePicker: React.FC<DatePickerProps> = (props) => {
  return (
    <DatePickerThemeProvider theme={theme}>
      <RainDatePicker {...props} />
    </DatePickerThemeProvider>
  );
}

export default DatePicker;