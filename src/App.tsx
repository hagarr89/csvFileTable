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
  const { filterData, handelCsvChange, isLoading, fileName } =
    useCsvFile(dateRange);

  const onChangeCsvData = (file: File) => {
    handelCsvChange(file);
  };
  const handelDateRange = (date: IDateRange) => {
    setDateRange({ from: date.from, to: date.to });
  };
  return (
    <div className="App">
      <div className="filters">
        <DatePickerInput date={dateRange} onChangeDate={handelDateRange} />
        <CSVSelector onChange={onChangeCsvData} fileName={fileName} />
      </div>

      <CSVReader data={filterData} isLoading={isLoading} />
    </div>
  );
}

export default App;
