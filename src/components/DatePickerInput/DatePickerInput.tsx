import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IDateRange } from "./index";
import "./index.scss";

const DatePickerInput = ({
  date,
  onChangeDate,
}: {
  date: IDateRange;
  onChangeDate: (value: IDateRange) => void;
}) => {
  return (
    <div className="DatePicker">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="From Date"
          value={date.from}
          onChange={(value) => onChangeDate({ ...date, from: value })}
        />
        <DesktopDatePicker
          label="To Date"
          value={date.to}
          onChange={(value) => onChangeDate({ ...date, to: value })}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePickerInput;
