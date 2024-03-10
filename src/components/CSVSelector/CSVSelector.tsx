import { Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
type Props = {
  onChange(file: File | null): void;
  fileName?: string;
};
const CSVSelector = ({ onChange, fileName }: Props) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    onChange(file);
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
        {fileName && <div className="FileNme">{fileName}</div>}
      </label>
    </div>
  );
};

export default CSVSelector;
