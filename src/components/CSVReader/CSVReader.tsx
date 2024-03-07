import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import { useState } from "react";

const CSVReader = <T extends { [x: string]: any }>({ data }: { data: T[] }) => {
  const headers = data?.length ? Object.keys(data[0]) : [];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<keyof T | null>(null);
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = data.sort((a, b) => {
    if (orderBy) {
      if (order === "asc") {
        return a[orderBy] < b[orderBy] ? -1 : 1;
      } else {
        return a[orderBy] > b[orderBy] ? -1 : 1;
      }
    }
    return 0;
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  if (!data.length) return <data>No Data was found</data>;
  return (
    <div>
      {sortedRows.length ? (
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {headers?.map((header, i) => (
                    <TableCell align="center" key={i}>
                      <TableSortLabel
                        active={orderBy === header}
                        direction={orderBy === header ? order : "asc"}
                        onClick={() => handleSort(header)}
                      ></TableSortLabel>
                      {header.replace("_", " ")}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      {headers?.map((col) => (
                        <TableCell align="center" key={col}>
                          {row[col as keyof T]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      ) : (
        <div>loading....</div>
      )}
    </div>
  );
};

export default CSVReader;
