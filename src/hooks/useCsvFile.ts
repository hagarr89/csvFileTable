import { useState } from "react";
import { IDateRange } from "../components/DatePickerInput";
import dayjs from "dayjs";
import axios from "axios";

export interface IData {
  timestamp: string;
  kwh: number;
  tepm: number;
  pressure: number;
}
const useCsvFile = (dateRange?: IDateRange ) => {
  const [csvDate, setCsvData] = useState<IData[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const filterData = dateRange ? csvDate.filter((row) =>
    dayjs(row.timestamp).isBetween(dateRange.from, dateRange.to, "day", "[]") 
  ): [];

  const handelCsvChange = async(file:File)=>{
     try {
          setIsLoading(true);
        if (file) {
          const res = await axios.post(
            "/api/upload-csv-file",
            { file },
            {
              headers: { "content-type": "multipart/form-data" },
            }
          );
          setCsvData(()=>res.data.data);
          setFileName(file?.name);

        } else {
          setCsvData(()=> []);
         setFileName("");
        }
      } catch (error) {
        console.error(error);
      }finally{
        setIsLoading(false)
      }

  }


  return {filterData, handelCsvChange , isLoading , fileName}
};

export default useCsvFile;
