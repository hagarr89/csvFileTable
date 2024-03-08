import { useState } from "react";
import "./App.scss";
import CSVReader from "./components/CSVReader";
import CSVSelector from "./components/CSVSelector";
import DatePickerInput, { IDateRange } from "./components/DatePickerInput";
import dayjs from "dayjs";
import useCsvFile from "./hooks/useCsvFile";

export interface IData {
  timestamp: string;
  kwh: number;
  tepm: number;
  pressure: number;
}
const initalDate = dayjs(new Date());

function App() {
  const [dateRange, setDateRange] = useState<IDateRange>({
    to: initalDate,
    from: initalDate,
  });
  const { handelCsvData, filterData } = useCsvFile(dateRange);

  const onChangeCsvData = (data: IData[]) => {
    handelCsvData(data);
  };
  const handelDateRange = (date: IDateRange) => {
    setDateRange({ from: date.from, to: date.to });
  };
  return (
    <div className="App">
      <div className="filters">
        <DatePickerInput date={dateRange} onChangeDate={handelDateRange} />
        <CSVSelector onChange={onChangeCsvData} />
      </div>

      <CSVReader data={filterData} />
    </div>
  );
}

export default App;
