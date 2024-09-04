import React, { useState } from "react";
import { db } from "./firebase";
import { Button, Card, CardContent, Typography } from "@mui/material";

const UpdateEmployeeSummary = ({ perMealCost, startDate, endDate }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to format month as two-digit number
  const formatMonth = (month) => {
    return month < 10 ? `0${month}` : `${month}`;
  };

  const getPreviousMonth = (currentMonth) => {
    if (currentMonth === "01") {
      return 12; // Previous month is December
    } else {
      return currentMonth - 1; // Subtract 1 for the previous month
    }
  };

  const handleUpdateSummary = async () => {
    setLoading(true);
    try {
      // Query all usernames from users collection
      const usersSnapshot = await db.collection("users").get();
      const usernames = usersSnapshot.docs.map((doc) => doc.data().username);

      // Loop through each user
      for (const username of usernames) {
        let totalMeal = 0;
        let totalCost = 0;

        // Query meals for the current user within the date range
        const mealsSnapshot = await db
          .collection("meals")
          .where("employeeName", "==", username)
          .where("date", ">=", startDate)
          .where("date", "<=", endDate)
          .get();

        // Calculate total meal and total cost
        mealsSnapshot.forEach((meal) => {
          // const mealData = meal.data();
          totalMeal +=
            meal.data().breakfast *
              (meal.data().breakfastFactor
                ? meal.data().breakfastFactor
                : 0.5) +
            meal.data().lunch *
              (meal.data().lunchFactor ? meal.data().lunchFactor : 1) +
            meal.data().dinner *
              (meal.data().dinnerFactor ? meal.data().dinnerFactor : 1);
        });
        totalCost = totalMeal.toFixed(2) * perMealCost.toFixed(2);

        // Query employeeContribution to find submitted amount
        const contributionsSnapshot = await db
          .collection("employeeContribution")
          .where("username", "==", username)
          .where("date", ">=", startDate)
          .where("date", "<=", endDate)
          .get();

        let submittedAmount = 0;
        contributionsSnapshot.forEach((contribution) => {
          submittedAmount += contribution.data().amount;
        });

        // Convert date range into month value
        const [startYear, startMonth] = startDate.split("-");
        const [endYear, endMonth] = endDate.split("-");
        const month = startMonth === endMonth ? startMonth : "M"; // Handle different months
        const year = startYear === endYear ? startYear : "Y";
        const formattedMonth = month;
        const previousYear = formattedMonth === "01" ? year - 1 : year;

        // Query employeeSummary for previous month to get carryForward
        let openingBalance = 0;
        const prevMonthSummarySnapshot = await db
          .collection("employeeSummary")
          .where("username", "==", username)
          .where("month", "==", formatMonth(getPreviousMonth(formattedMonth)))
          .where("year", "==", previousYear)
          .get();

        prevMonthSummarySnapshot.forEach((doc) => {
          openingBalance = doc.data().carryForward;
        });

        // Update or add new document in employeeSummary for current month
        const currentMonthSummarySnapshot = await db
          .collection("employeeSummary")
          .where("username", "==", username)
          .where("month", "==", formattedMonth)
          .where("year", "==", year)
          .get();

        if (currentMonthSummarySnapshot.empty) {
          await db.collection("employeeSummary").add({
            month: formattedMonth,
            year: year,
            username,
            submittedAmount,
            openingBalance,
            totalContribution: openingBalance + submittedAmount,
            totalMeal,
            totalCost,
            carryForward: openingBalance + submittedAmount - totalCost,
          });
        } else {
          currentMonthSummarySnapshot.forEach((doc) => {
            doc.ref.update({
              year: year,
              submittedAmount,
              openingBalance,
              totalContribution: openingBalance + submittedAmount,
              totalMeal,
              totalCost,
              carryForward: openingBalance + submittedAmount - totalCost,
            });
          });
        }
      }
      setMessage("Employee summaries updated successfully.");
    } catch (error) {
      console.error("Error updating employee summaries:", error);
      setMessage("Failed to update employee summaries. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Card align="center">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Update Employee Summary
        </Typography>
        <Typography variant="body2" padding={2} sx={{ color: "red" }}>
          Updating employee summary will modify records across all users. Please
          check your carlcuation carefully before updating.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateSummary}
          disabled={loading}
          sx={{ height: "56px" }}
        >
          Update Employee Summary
        </Button>

        {message && <Typography color="textSecondary">{message}</Typography>}
      </CardContent>
    </Card>
  );
};

export default UpdateEmployeeSummary;
