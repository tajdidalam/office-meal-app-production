import React, { useState } from "react";
import { db } from "./firebase";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";
import ExpensesFormImage from "./assets/add-expense-2.jpg";

const ExpensesForm = () => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSubmit = () => {
    if (date && amount) {
      db.collection("expenses")
        .add({
          date,
          amount: parseFloat(amount),
          notes,
        })
        .then(() => {
          console.log("Expenses added successfully");
          setDate("");
          setAmount("");
          setNotes("");
        })
        .catch((error) => {
          console.error("Error adding expenses: ", error);
        });
    }
  };

  return (
    <Container>
      <Grid container spacing={2} style={{ paddingBottom: "2rem" }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              src={ExpensesFormImage}
              alt="Meal form"
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          direction="column"
          justifyContent="center"
        >
          <Typography
            variant="h4"
            sx={{ mb: 1.5, display: { xs: "none", sm: "block" } }}
          >
            Add Expenses
          </Typography>
          <Typography>
            You can add your expenditures to the database using this form.
          </Typography>
          <br />
          <Typography>
            Add individual expenses of sum of all the expenses of the month.
            This data is necessary to calculate meal costs.
          </Typography>
        </Grid>
      </Grid>
      {/* <Typography variant="h5">Expenses Form</Typography> */}
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <TextField
            id="date"
            label="Date"
            type="date"
            value={date}
            onChange={handleDateChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            id="amount"
            label="Amount (BDT)"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            id="notes"
            label="Notes"
            type="text"
            value={notes}
            onChange={handleNotesChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!date || !amount}
            fullWidth
            sx={{ height: "56px" }} // Adjusting height to match other inputs
          >
            Add Expenses
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExpensesForm;
