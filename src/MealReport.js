import React, { useState } from "react";
import { db } from "./firebase";
import PerMealCost from "./PerMealCost";
import {
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";
import MealReportImage from "./assets/meal-report-3.jpg";

const MealReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const [reportDataWithFactor, setReportDataWithFactor] = useState([]);

  const handleGenerateReport = async () => {
    try {
      const mealQuerySnapshot = await db
        .collection("meals")
        .where("date", ">=", startDate)
        .where("date", "<=", endDate)
        .get();

      const mealsData = mealQuerySnapshot.docs.map((doc) => doc.data());

      // Aggregate meal data by date
      const aggregatedData = {};
      mealsData.forEach((meal) => {
        const date = meal.date;
        if (aggregatedData[date]) {
          aggregatedData[date].breakfast += meal.breakfast;
          aggregatedData[date].lunch += meal.lunch;
          aggregatedData[date].dinner += meal.dinner;
        } else {
          aggregatedData[date] = {
            date: date,
            breakfast: meal.breakfast,
            lunch: meal.lunch,
            dinner: meal.dinner,
          };
        }
      });

      const aggregatedDataAfterFactor = {};
      mealsData.forEach((meal) => {
        const date = meal.date;
        if (aggregatedDataAfterFactor[date]) {
          aggregatedDataAfterFactor[date].breakfast +=
            meal.breakfast *
            (meal.breakfastFactor ? meal.breakfastFactor : 0.5);
          aggregatedDataAfterFactor[date].lunch +=
            meal.lunch * (meal.lunchFactor ? meal.lunchFactor : 1);
          aggregatedDataAfterFactor[date].dinner +=
            meal.dinner * (meal.dinnerFactor ? meal.dinnerFactor : 1);
        } else {
          aggregatedDataAfterFactor[date] = {
            date: date,
            breakfast:
              meal.breakfast *
              (meal.breakfastFactor ? meal.breakfastFactor : 0.5),
            lunch: meal.lunch * (meal.lunchFactor ? meal.lunchFactor : 1),
            dinner: meal.dinner * (meal.dinnerFactor ? meal.dinnerFactor : 1),
          };
        }
      });

      setReportData(Object.values(aggregatedData));
      setReportDataWithFactor(Object.values(aggregatedDataAfterFactor));
    } catch (error) {
      console.error("Error fetching meal data:", error);
    }
  };

  const getTotalMeal = (mealType) => {
    return reportData.reduce((total, meal) => total + meal[mealType], 0);
  };

  const getTotalMealWithFactors = (mealType) => {
    return reportDataWithFactor.reduce(
      (total, meal) => total + meal[mealType],
      0
    );
  };

  const totalConsideringFactor =
    getTotalMealWithFactors("breakfast") +
    getTotalMealWithFactors("lunch") +
    getTotalMealWithFactors("dinner");

  return (
    <>
      <Container>
        <Grid container spacing={2} style={{ paddingBottom: "2rem" }}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardMedia
                component="img"
                src={MealReportImage}
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
              Meal Report
            </Typography>
            <Typography>
              Generate meal report for specific month and calculate per meal
              cost.
            </Typography>
            <br />
            <Typography>
              Next, update month wise summary of all the users.
            </Typography>
          </Grid>
        </Grid>
        {/* <Typography variant="h5">Meal Report</Typography> */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              id="start-date"
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="end-date"
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateReport}
              fullWidth
              sx={{ height: "56px" }} // Adjusting height to match other inputs
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>

        {/* Table for displaying regular meal data */}
        <br />
        <br />
        <Typography align="center">Total meal by date 👇</Typography>
        <br />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Breakfast</TableCell>
                <TableCell>Lunch</TableCell>
                <TableCell>Dinner</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.map((meal, index) => (
                <TableRow key={index}>
                  <TableCell>{meal.date}</TableCell>
                  <TableCell>{meal.breakfast}</TableCell>
                  <TableCell>{meal.lunch}</TableCell>
                  <TableCell>{meal.dinner}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>{getTotalMeal("breakfast")}</TableCell>
                <TableCell>{getTotalMeal("lunch")}</TableCell>
                <TableCell>{getTotalMeal("dinner")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table for displaying factorized meal data */}
        {/* <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>BF Factor</TableCell>
              <TableCell>LF Factor</TableCell>
              <TableCell>DF Factor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportDataWithFactor.map((meal, index) => (
              <TableRow key={index}>
                <TableCell>{meal.date}</TableCell>
                <TableCell>{meal.breakfastFactor}</TableCell>
                <TableCell>{meal.lunchFactor}</TableCell>
                <TableCell>{meal.dinnerFactor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
        <br />
        <br />
        <Typography align="center">
          Total Meal After Multiplied By Factors👇
        </Typography>
        <br />
        {/* Table for displaying total meal data with factors */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>BXF</TableCell>
                <TableCell>LXF</TableCell>
                <TableCell>DXF</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportDataWithFactor.map((meal, index) => (
                <TableRow key={index}>
                  <TableCell>{meal.date}</TableCell>
                  <TableCell>
                    {meal.breakfast.toFixed(2)}
                    {/* {(meal.breakfast * meal.breakfastFactor).toFixed(2)} */}
                  </TableCell>
                  <TableCell>{meal.lunch.toFixed(2)}</TableCell>
                  <TableCell>{meal.dinner.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>{getTotalMealWithFactors("breakfast")}</TableCell>
                <TableCell>{getTotalMealWithFactors("lunch")}</TableCell>
                <TableCell>{getTotalMealWithFactors("dinner")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          variant="h5"
          align="center"
          padding={4}
          sx={{ color: "tale" }}
        >
          Total Meals after considering factor: {totalConsideringFactor}
        </Typography>
      </Container>
      <PerMealCost
        totalConsideringFactor={totalConsideringFactor}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
};

export default MealReport;

// import React, { useState } from "react";
// import { db } from "./firebase";
// import {
//   Button,
//   Container,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
// } from "@mui/material";

// const MealReport = () => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [reportData, setReportData] = useState([]);

//   const handleGenerateReport = async () => {
//     try {
//       const querySnapshot = await db
//         .collection("meals")
//         .where("date", ">=", startDate)
//         .where("date", "<=", endDate)
//         .get();

//       const mealsData = querySnapshot.docs.map((doc) => doc.data());

//       // Aggregate meal data by date
//       const aggregatedData = {};
//       mealsData.forEach((meal) => {
//         const date = meal.date;
//         if (aggregatedData[date]) {
//           aggregatedData[date].breakfast += meal.breakfast;
//           aggregatedData[date].lunch += meal.lunch;
//           aggregatedData[date].dinner += meal.dinner;
//         } else {
//           aggregatedData[date] = {
//             date: date,
//             breakfast: meal.breakfast,
//             lunch: meal.lunch,
//             dinner: meal.dinner,
//           };
//         }
//       });

//       setReportData(Object.values(aggregatedData));
//     } catch (error) {
//       console.error("Error fetching meal data:", error);
//     }
//   };

//   const getTotalMeal = (mealType) => {
//     return reportData.reduce((total, meal) => total + meal[mealType], 0);
//   };

//   return (
//     <Container>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item xs={6}>
//           <TextField
//             id="start-date"
//             label="Start Date"
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             fullWidth
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             id="end-date"
//             label="End Date"
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             fullWidth
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleGenerateReport}
//             fullWidth
//             sx={{ height: "56px" }} // Adjusting height to match other inputs
//           >
//             Generate Report
//           </Button>
//         </Grid>
//       </Grid>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Date</TableCell>
//               <TableCell>Breakfast</TableCell>
//               <TableCell>Lunch</TableCell>
//               <TableCell>Dinner</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {reportData.map((meal, index) => (
//               <TableRow key={index}>
//                 <TableCell>{meal.date}</TableCell>
//                 <TableCell>{meal.breakfast}</TableCell>
//                 <TableCell>{meal.lunch}</TableCell>
//                 <TableCell>{meal.dinner}</TableCell>
//               </TableRow>
//             ))}
//             <TableRow>
//               <TableCell>Total</TableCell>
//               <TableCell>{getTotalMeal("breakfast")}</TableCell>
//               <TableCell>{getTotalMeal("lunch")}</TableCell>
//               <TableCell>{getTotalMeal("dinner")}</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default MealReport;
