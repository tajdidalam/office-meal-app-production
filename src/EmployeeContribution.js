import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  Container,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid,
  Card,
  CardMedia,
  Typography,
} from "@mui/material";
import Employee from "./Employee";
import MyContribution from "./assets/employee-contribution.jpg";

const EmployeeContribution = ({ username }) => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [contributions, setContributions] = useState([]);

  const fetchContributions = async () => {
    try {
      const selectedMonth = new Date(date).getMonth() + 1;
      const formattedMonth = String(selectedMonth).padStart(2, "0");

      const querySnapshot = await db
        .collection("employeeContribution")
        .where("username", "==", username)
        .where("date", ">=", `${new Date().getFullYear()}-${formattedMonth}-01`)
        .where("date", "<=", `${new Date().getFullYear()}-${formattedMonth}-31`)
        .get();

      const contributionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContributions(contributionsData);
    } catch (error) {
      console.error("Error fetching contributions:", error);
    }
  };

  useEffect(() => {
    if (date !== "") {
      fetchContributions();
    }
  }, [date]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await db.collection("employeeContribution").add({
        date,
        amount: parseFloat(amount),
        username,
      });

      setDate("");
      setAmount("");
    } catch (error) {
      console.error("Error submitting contribution:", error);
    }
  };

  const handleUpdate = () => {
    fetchContributions(); // Trigger re-fetching of contributions
  };

  return (
    <Container>
      <Grid container spacing={2} style={{ paddingBottom: "2rem" }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              src={MyContribution}
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
            My Contribution
          </Typography>
          <Typography>
            Select a date and carefully enter the amount. Once done, hit the
            submit button to add your contribution record for this month's meals
            to the manager.
          </Typography>{" "}
          <br />
          <Typography>
            Choose the date and click on the "See Records" button to view all
            the contributors' records for the selected month.
          </Typography>
          <br />
          <Typography>
            Let's keep the database up-to-date and running smoothly! 📅💰
          </Typography>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              required
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ height: "56px" }} // Adjusting height to match other inputs
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

      <TableContainer
        component={Paper}
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contributions.map((contribution) => (
              <TableRow key={contribution.id}>
                <TableCell>{contribution.date}</TableCell>
                <TableCell>{contribution.amount}</TableCell>
                <TableCell>{contribution.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        fullWidth
        sx={{ height: "56px" }} // Adjusting height to match other inputs
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        See Records
      </Button>
    </Container>
  );
};

export default EmployeeContribution;
