import { useState } from "react";
import { IDateRange } from "../components/DatePickerInput";
import dayjs from "dayjs";

export interface IData {
  timestamp: string;
  kwh: number;
  tepm: number;
  pressure: number;
}
const useCsvFile = (dateRange: IDateRange ) => {
  const [csvDate, setCsvData] = useState<IData[] | []>([]);

  const filterData = csvDate.filter((row) =>
    dayjs(row.timestamp).isBetween(dateRange.from, dateRange.to, "day", "[]")
  );

  const handelCsvData = (data: IData[]) => {
    setCsvData(data);
  }

  return {filterData, handelCsvData }
};

export default useCsvFile;
