import React, { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import SearchIcon from "../assets/icons/SearchIcon.icon";
import DownloadIcon from "../assets/icons/DownloadIcon.icon";
import PaymentsTable from "../components/Payments/PaymentsTable";
import {
  useAddTransactionMutation,
  useGetTransactionsQuery,
} from "../redux/apiSlice";
import { Transaction } from "../utils/types";

const getTotalOrderAmount = (data: Partial<Transaction>[]) => {
  const sum = data.reduce(
    (total, transaction) => total + (transaction?.orderAmount ?? 0),
    0
  );
  return sum.toLocaleString("en-IN");
};

const initialFormData: Partial<Transaction> = {
  orderId: "",
  orderAmount: undefined,
  orderDate: undefined,
  transactionFees: undefined,
};

const pagination = {
  page: 1,
  limit: 100,
};

const Payments: React.FC = () => {
  const [month, setMonth] = React.useState("lastMonth");
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] =
    useState<Partial<Transaction>>(initialFormData);
  const [searchQuery, setSearchQuery] = React.useState("");

  const [addTransaction] = useAddTransactionMutation();

  const {
    data: transactions = [],
    isLoading,
    isError,
    refetch,
  } = useGetTransactionsQuery({
    page: pagination.page,
    limit: pagination.limit,
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData(initialFormData);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.orderId.includes(searchQuery)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    try {
      await addTransaction(formData);
      await refetch();
    } catch (error: unknown) {
      if (error instanceof Error) console.error(error.message);
    }
    handleCloseModal();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };

  // const handlePagination = ({ page }: { page: number }) => {
  //   setPagination({ page, limit: 19 });
  //   setTimeout(() => {
  //     refetch();
  //   }, 1000);
  // };

  return (
    <div className="w-full h-full p-8 flex flex-col gap-8">
      <Box>
        <div className="flex items-center justify-between w-full mb-6">
          <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
            Overview
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={month}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="lastMonth">Last Month</MenuItem>
              <MenuItem value="thisMonth">This Month</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Card
            sx={{
              width: "100%",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <CardContent>
              <Typography sx={{ marginBottom: "16px" }}>
                Online orders
              </Typography>
              <Typography variant="h3" sx={{ fontSize: 32 }}>
                {transactions.length}
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: "100%",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <CardContent>
              <Typography sx={{ marginBottom: "16px" }}>
                Online orders
              </Typography>
              <Typography variant="h3" sx={{ fontSize: 32 }}>
                &#8377;{getTotalOrderAmount(transactions)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box className="flex flex-col gap-5">
        <Typography sx={{ fontSize: "20px" }}>
          Transactions | {month == "thisMonth" ? "This Month" : "Last Month"}
        </Typography>
        <Box className="rounded-lg shadow-md p-3 flex flex-col gap-3">
          <div className="flex w-full items-center justify-between">
            <TextField
              placeholder="Search by order ID..."
              variant="outlined"
              size="small"
              onChange={handleSearchInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ maxWidth: "248px" }}
            />

            <div className="flex gap-3">
              <Button
                variant="outlined"
                onClick={handleOpenModal}
                startIcon={<AddIcon />}
                sx={{
                  borderColor: "#a5acb3",
                  color: "#7d848a",
                  "&:hover": {
                    borderColor: "#a5acb3",
                    backgroundColor: "#0000001A",
                  },
                }}
              >
                Add Transaction
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#a5acb3",
                  color: "#7d848a",
                  "&:hover": {
                    borderColor: "#a5acb3",
                    backgroundColor: "#0000001A",
                  },
                }}
              >
                Sort
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#a5acb3",
                  color: "#7d848a",
                  "&:hover": {
                    borderColor: "#a5acb3",
                    backgroundColor: "#0000001A",
                  },
                }}
              >
                <DownloadIcon />
              </Button>
            </div>
          </div>

          <PaymentsTable
            rows={filteredTransactions}
            isLoading={isLoading}
            isError={isError}
            // handlePagination={handlePagination}
          />
        </Box>
      </Box>
      {/* Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="add-transaction-modal-title"
        aria-describedby="add-transaction-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography
            id="add-transaction-modal-title"
            variant="h6"
            gutterBottom
          >
            Add Transaction
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="orderId"
                label="Order ID"
                value={formData.orderId}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="orderAmount"
                label="Order Amount"
                type="number"
                value={formData.orderAmount}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="orderDate"
                type="date"
                value={formData.orderDate}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="transactionFees"
                label="Transaction Fee"
                type="number"
                value={formData.transactionFees}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button onClick={handleCloseModal} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button onClick={handleAdd} variant="contained" color="primary">
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Payments;
