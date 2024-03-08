import React, { useState } from "react";
import { Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
type Props<T> = {
  onChange(data: T[]): void;
};
const CSVSelector = <T extends { [x: string]: any }>({
  onChange,
}: Props<T>) => {
  const [fileName, setFileName] = useState<string>("");
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const file = e.target.files[0];
        setFileName(file?.name);

        if (file) {
          const res = await axios.post(
            "/api/upload-csv-file",
            { file },
            {
              headers: { "content-type": "multipart/form-data" },
            }
          );
          onChange(res.data.data);
        } else {
          onChange([]);
          setFileName("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="CSVSelector">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        data-testid="csvFileInput"
        id="csv-button-file"
      />
      <label className="CSVSelector-fake" htmlFor="csv-button-file">
        <Button
          component="div"
          classes={{ root: "csv-button" }}
          variant="contained"
        >
          <UploadFileIcon />
          <div>Upload File</div>
        </Button>
        <div className="FileNme">{fileName}</div>
      </label>
    </div>
  );
};

export default CSVSelector;
