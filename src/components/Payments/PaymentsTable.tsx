import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";

import dayjs from "dayjs";
import InformationIcon from "../../assets/icons/InformationIcon.icon";
import { Transaction } from "../../utils/types";
import LoadingSpinner from "../../assets/icons/LoadingSpinner";
import CaretDownFilledIcon from "../../assets/icons/CaretDownFilledIcon.icon";

interface Column {
  id: "orderId" | "orderDate" | "orderAmount" | "transactionFees";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

interface Props {
  rows: Partial<Transaction>[];
  isLoading: boolean;
  isError: boolean;
  handlePagination?: ({ page }: { page: number }) => void;
}

const formatOrderDate = (dateString: string) => {
  const formattedDate = dayjs(dateString).format("D MMMM, YYYY");
  return formattedDate.toString();
};

const PaymentsTable: React.FC<Props> = ({ rows, isLoading }) => {
  const [page, setPage] = React.useState(0);
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  const rowsPerPage = 19;

  const handleChangePage = (_event: unknown, page: number) => {
    setPage(page - 1);
  };

  const handleOrderDateClick = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedRows = rows.slice().sort((a, b) => {
    const dateA = new Date(a.orderDate as Date)?.getTime();
    const dateB = new Date(b.orderDate as Date)?.getTime();
    return sortOrder === "asc"
      ? (dateA || 0) - (dateB || 0)
      : (dateB || 0) - (dateA || 0);
  });

  const columns: readonly Column[] = [
    { id: "orderId", label: "Order ID", minWidth: 170, align: "left" },
    { id: "orderDate", label: "Order date", minWidth: 100, align: "left" },
    { id: "orderAmount", label: "Order amount", minWidth: 170, align: "right" },
    {
      id: "transactionFees",
      label: "Transaction fees",
      minWidth: 170,
      align: "right",
    },
  ];

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#E5E5E5",
                  }}
                >
                  {column.id === "transactionFees" ? (
                    <span className="flex gap-1 items-center justify-end">
                      {column.label}
                      <InformationIcon />
                    </span>
                  ) : column.id === "orderDate" ? (
                    <span
                      className="flex gap-1 items-center justify-start cursor-pointer"
                      onClick={handleOrderDateClick}
                    >
                      {column.label}
                      <CaretDownFilledIcon
                        className={`w-3 h-3 ${
                          sortOrder === "desc" ? "transform rotate-180" : ""
                        }`}
                      />
                    </span>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <LoadingSpinner />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {sortedRows.length > 0 ? (
                sortedRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "orderDate" ? (
                              formatOrderDate(value as string)
                            ) : column.id === "orderId" ? (
                              <span style={{ color: "#146EB4" }}>
                                #{value as string}
                              </span>
                            ) : column.id === "orderAmount" ||
                              column.id === "transactionFees" ? (
                              <span>&#8377;{value as number}</span>
                            ) : null}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(rows.length / rowsPerPage)}
        onChange={handleChangePage}
        shape="rounded"
        sx={{ marginTop: "16px" }}
      />
    </Paper>
  );
};

export default PaymentsTable;
