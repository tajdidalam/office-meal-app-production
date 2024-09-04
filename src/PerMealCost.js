import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import UpdateEmployeeSummary from "./UpdateEmployeeSummary";

const PerMealCost = ({ totalConsideringFactor, startDate, endDate }) => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [perMealCost, setPerMealCost] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenseQuerySnapshot = await db
          .collection("expenses")
          .where("date", ">=", startDate)
          .where("date", "<=", endDate)
          .get();

        const totalAmount = expenseQuerySnapshot.docs.reduce(
          (acc, doc) => acc + parseFloat(doc.data().amount),
          0
        );

        setTotalExpense(totalAmount);
        setPerMealCost(totalAmount / totalConsideringFactor);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, [startDate, endDate, totalConsideringFactor]);

  return (
    <Container>
      <Typography align="center">Per meal cost👇</Typography>
      <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date Range</TableCell>
              <TableCell>Total Meal After Factor</TableCell>
              <TableCell>Total Expense</TableCell>
              <TableCell>Per Meal Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{`${startDate} - ${endDate}`}</TableCell>
              <TableCell>{totalConsideringFactor}</TableCell>
              <TableCell>{totalExpense}</TableCell>
              <TableCell>{perMealCost.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateEmployeeSummary
        perMealCost={perMealCost}
        startDate={startDate}
        endDate={endDate}
      />
    </Container>
  );
};

export default PerMealCost;
