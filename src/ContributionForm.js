import React, { useState } from "react";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";
import { db } from "./firebase";

const ContributionForm = ({ username }) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Today's date
  const [amount, setAmount] = useState(0);
  const [totalContribution, setTotalContribution] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract month from selected date
    const selectedMonth = new Date(date).getMonth() + 1;

    try {
      // Add new document to employeeContribution collection
      await db.collection("employeeContribution").add({
        username,
        date,
        amount,
      });

      // Query employeeContribution collection for current month
      const querySnapshot = await db
        .collection("employeeContribution")
        .where("username", "==", username)
        .where("date", ">=", `${new Date().getFullYear()}-${selectedMonth}-01`)
        .where("date", "<=", `${new Date().getFullYear()}-${selectedMonth}-31`)
        .get();

      // Calculate total contribution for the current month
      let total = 0;
      querySnapshot.forEach((doc) => {
        total += doc.data().amount;
      });
      setTotalContribution(total);

      // Query employeeSummary collection for current month
      const summarySnapshot = await db
        .collection("employeeSummary")
        .where("username", "==", username)
        .where("month", "==", selectedMonth)
        .get();

      // If no document found, create new document; otherwise, update existing document
      if (summarySnapshot.empty) {
        await db.collection("employeeSummary").add({
          username,
          month: selectedMonth,
          openingBalance: 0,
          submittedAmount: totalContribution,
          totalContribution,
          totalMeal: 0,
          totalCost: 0,
          carryForward: 0,
        });
      } else {
        const docRef = summarySnapshot.docs[0].ref;
        const docData = (await docRef.get()).data();
        await docRef.update({
          submittedAmount: totalContribution,
          totalContribution: docData.totalContribution + totalContribution,
        });
      }

      // Reset form fields
      setDate(new Date().toISOString().split("T")[0]);
      setAmount(0);
    } catch (error) {
      console.error("Error submitting contribution:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Contribution Form
      </Typography>
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
    </Container>
  );
};

export default ContributionForm;
