import { Dayjs } from "dayjs";
import DatePickerInput from "./DatePickerInput";

export interface IDateRange {
    from:Dayjs | null;
    to:Dayjs | null;
}
export default DatePickerInput;