import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
  CardMedia,
  Divider,
} from "@mui/material";
import January from "./assets/January.png";
import February from "./assets/February.png";
import March from "./assets/March.png";
import April from "./assets/April.png";
import May from "./assets/May.png";
import June from "./assets/June.png";
import July from "./assets/July.png";
import August from "./assets/August.png";
import September from "./assets/September.png";
import October from "./assets/October.png";
import November from "./assets/November.png";
import December from "./assets/December.png";
import MonthSummary from "./assets/month-summary.jpeg";

const EmployeeSummary = ({ username }) => {
  const [employeeSummaries, setEmployeeSummaries] = useState([]);

  const getMonthName = (monthNumber) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthNumber - 1];
  };

  useEffect(() => {
    const fetchEmployeeSummaries = async () => {
      try {
        const querySnapshot = await db
          .collection("employeeSummary")
          .where("username", "==", username)
          .orderBy("month", "desc")
          .get();

        const summariesData = querySnapshot.docs.map((doc) => doc.data());
        setEmployeeSummaries(summariesData);
      } catch (error) {
        console.error("Error fetching employee summaries:", error);
      }
    };

    fetchEmployeeSummaries();
  }, [username]);

  const getImageForMonth = (monthName) => {
    switch (monthName) {
      case "January":
        return January;
      case "February":
        return February;
      case "March":
        return March;
      case "April":
        return April;
      case "May":
        return May;
      case "June":
        return June;
      case "July":
        return July;
      case "August":
        return August;
      case "September":
        return September;
      case "October":
        return October;
      case "November":
        return November;
      case "December":
        return December;
      default:
        return null;
    }
  };

  return (
    <div>
      <Container>
        <Grid container spacing={2} style={{ paddingBottom: "2rem" }}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardMedia
                component="img"
                src={MonthSummary}
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
              Month Wise Summary
            </Typography>
            <Typography>
              Your opening balance is carried forward from the previous month.
              Make sure your total contributions match the sum of submitted
              amounts and opening balance.
            </Typography>{" "}
            <br />
            <Typography>
              Adjusted meal totals account for manager-implemented factors.
              Determine any excess (contributions exceed total meal cost) or
              deficit (contributions fall short). Excess carries over, deficit
              needs covering next month.
            </Typography>
            <br />
            <Typography>
              Track contributions and meal consumption for accurate financial
              management. Let's maintain balance and financial clarity! 📊🍽️
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h5" align="center">
          Month Wise Summary of {username}
        </Typography>
        <br />
        <br />
        <Grid container spacing={2}>
          {employeeSummaries.map((summary, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card style={{ marginBottom: "16px" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    // height="200"
                    image={getImageForMonth(getMonthName(summary.month))}
                    alt="Month Image"
                    // style={{ objectFit: "cover" }}s
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      style={{ marginBottom: "2rem" }}
                    >
                      {getMonthName(summary.month)}, {summary.year}
                    </Typography>
                    {/* <Typography>Username: {summary.username}</Typography> */}
                    <Grid container spacing={2} alignItems="center">
                      <Grid
                        item
                        xs={6}
                        style={{
                          textAlign: "left",
                          fontSize: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        Opening Balance
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          textAlign: "right",
                          fontSize: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        {summary.openingBalance.toFixed(2)}
                      </Grid>
                    </Grid>
                    <Divider
                      style={{ marginBottom: "4px", marginTop: "4px" }}
                    />
                    <Grid container spacing={2} alignItems="center">
                      <Grid
                        item
                        xs={6}
                        style={{
                          textAlign: "left",
                          fontSize: "1rem",
                          marginBottom: "1rem",
                          marginTop: "1rem",
                        }}
                      >
                        Submitted Amount
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          textAlign: "right",
                          fontSize: "1rem",
                          marginBottom: "1rem",
                          marginTop: "1rem",
                        }}
                      >
                        {summary.submittedAmount.toFixed(2)}
                      </Grid>
                    </Grid>
                    <Divider
                      style={{ marginBottom: "4px", marginTop: "4px" }}
                    />
                    <Grid container spacing={2} alignItems="center">
                      <Grid
                        item
                        xs={6}
                        style={{
                          textAlign: "left",
                          fontSize: "1rem",
                          marginBottom: "1rem",
                          marginTop: "1rem",
                        }}
                      >
                        Total Contribution
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          textAlign: "right",
                          fontSize: "1rem",
                          marginBottom: "1rem",
                          marginTop: "1rem",
                        }}
                      >
                        {summary.totalContribution.toFixed(2)}
                      </Grid>
                    </Grid>
                    <Divider
                      style={{ marginBottom: "4px", marginTop: "4px" }}
                    />
                    <Grid container spacing={2} alignItems="center">
                      <Grid
                        item
                        xs={6}
                        style={{
                          textAlign: "left",
                          fontSize: "1rem",
                          marginBottom: "1rem",
                          marginTop: "1rem",
                        }}
                      >
                        Total Meal
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          textAlign: "right",
                          fontSize: "1rem",
                          marginBottom: "1rem",
                          marginTop: "1rem",
                        }}
                      >
                        {summary.totalMeal.toFixed(2)}
                      </Grid>
                    </Grid>
                    <Divider
                      style={{ marginBottom: "4px", marginTop: "4px" }}
                    />
                    <Grid container spacing={2} alignItems="center">
                      <Grid
                        item
                        xs={6}
                        style={{
                          textAlign: "left",
                          fontSize: "1rem",
                          marginBottom: "1rem",
                          marginTop: "1rem",
                        }}
                      >
                        Total Cost
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          textAlign: "right",
                          fontSize: "1rem",
                          marginBottom: "1rem",
                          marginTop: "1rem",
                        }}
                      >
                        {summary.totalCost.toFixed(2)}
                      </Grid>
                    </Grid>
                    <Divider
                      style={{ marginBottom: "4px", marginTop: "4px" }}
                    />
                    <Grid container spacing={2} alignItems="center">
                      <Grid
                        item
                        xs={6}
                        style={{
                          textAlign: "left",
                          fontSize: "1rem",
                          marginBottom: "1rem",
                          marginTop: "1rem",
                        }}
                      >
                        Carry Forward
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          textAlign: "right",
                          fontSize: "1rem",
                          marginBottom: "1rem",
                          marginTop: "1rem",
                        }}
                      >
                        {summary.carryForward.toFixed(2)}
                      </Grid>
                    </Grid>

                    {/* <Typography>
                      Submitted Amount: {summary.submittedAmount}
                    </Typography>
                    <Typography>
                      Opening Balance: {summary.openingBalance}
                    </Typography>
                    <Typography>
                      Total Contribution: {summary.totalContribution}
                    </Typography>
                    <Typography>Total Meal: {summary.totalMeal}</Typography>
                    <Typography>Total Cost: {summary.totalCost}</Typography> */}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default EmployeeSummary;

// import React, { useState, useEffect } from "react";
// import { db } from "./firebase";
// import {
//   Card,
//   CardActionArea,
//   CardContent,
//   Container,
//   Grid,
//   Typography,
//   CardMedia,
// } from "@mui/material";
// import January from "./assets/January.png";
// import February from "./assets/February.png";
// import March from "./assets/March.png";
// import April from "./assets/April.png";
// import June from "./assets/June.png";
// import July from "./assets/July.png";
// import August from "./assets/August.png";
// import September from "./assets/September.png";
// import October from "./assets/October.png";
// import November from "./assets/November.png";
// import December from "./assets/December.png";

// const EmployeeSummary = ({ username }) => {
//   const [employeeSummaries, setEmployeeSummaries] = useState([]);

//   // Function to convert month number to month name
//   const getMonthName = (monthNumber) => {
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     return months[monthNumber - 1]; // Adjusting index since months array is zero-based
//   };

//   useEffect(() => {
//     const fetchEmployeeSummaries = async () => {
//       try {
//         const querySnapshot = await db
//           .collection("employeeSummary")
//           .where("username", "==", username)
//           .orderBy("month", "desc")
//           .get();

//         const summariesData = querySnapshot.docs.map((doc) => doc.data());
//         setEmployeeSummaries(summariesData);
//       } catch (error) {
//         console.error("Error fetching employee summaries:", error);
//       }
//     };

//     fetchEmployeeSummaries();
//   }, [username]);

//   return (
//     <div>
//       <Container>
//         <Typography variant="h5">Meal Summary of {username}</Typography>
//         <br />
//         <br />
//         <Grid container spacing={2}>
//           {employeeSummaries.map((summary, index) => (
//             <Grid item xs={12} sm={6}>
//               <Card key={index} style={{ marginBottom: "16px" }}>
//                 <CardActionArea>
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     image={January}
//                     alt="green iguana"
//                   />
//                   <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                       Employee Summary - {getMonthName(summary.month)},{" "}
//                       {summary.year}
//                     </Typography>
//                     <Typography>Username: {summary.username}</Typography>
//                     <Typography>
//                       Submitted Amount: {summary.submittedAmount}
//                     </Typography>
//                     <Typography>
//                       Opening Balance: {summary.openingBalance}
//                     </Typography>
//                     <Typography>
//                       Total Contribution: {summary.totalContribution}
//                     </Typography>
//                     <Typography>Total Meal: {summary.totalMeal}</Typography>
//                     <Typography>Total Cost: {summary.totalCost}</Typography>
//                   </CardContent>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </div>
//   );
// };

// export default EmployeeSummary;
