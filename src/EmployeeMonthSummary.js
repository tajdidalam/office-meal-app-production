import React, { useState } from "react";
import { db } from "./firebase";
import {
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  CardMedia,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Hidden,
} from "@mui/material";
import SummaryImage from "./assets/summary2.jpg";

const EmployeeMonthSummary = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [employeeSummaries, setEmployeeSummaries] = useState([]);

  const handleSearch = async () => {
    try {
      const querySnapshot = await db
        .collection("employeeSummary")
        .where("month", "==", selectedMonth)
        .where("year", "==", selectedYear)
        .get();

      const summariesData = querySnapshot.docs.map((doc) => doc.data());
      setEmployeeSummaries(summariesData);
    } catch (error) {
      console.error("Error fetching employee summaries:", error);
    }
  };

  return (
    <Container>
      <Grid container spacing={2} style={{ paddingBottom: "2rem" }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              src={SummaryImage}
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
            Summary
          </Typography>
          <Typography>Find summary of all users for selected month.</Typography>
          {/* <br />
          <Typography>
            Next, update month wise summary of all the users.
          </Typography> */}
        </Grid>
      </Grid>
      {/* <Typography variant="h5" gutterBottom>
        Employee Summary Search
      </Typography> */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            fullWidth
          >
            <MenuItem value="">Select Month</MenuItem>
            <MenuItem value="01">January</MenuItem>
            <MenuItem value="02">February</MenuItem>
            <MenuItem value="03">March</MenuItem>
            <MenuItem value="04">April</MenuItem>
            <MenuItem value="05">May</MenuItem>
            <MenuItem value="06">June</MenuItem>
            <MenuItem value="07">July</MenuItem>
            <MenuItem value="08">August</MenuItem>
            <MenuItem value="09">September</MenuItem>
            <MenuItem value="10">October</MenuItem>
            <MenuItem value="11">November</MenuItem>
            <MenuItem value="12">December</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            type="number"
            label="Year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            placeholder="Enter Year"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            fullWidth
            sx={{ marginTop: "1rem", marginBottom: "1rem", height: "56px" }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={2}>
        <Hidden mdUp>
          {employeeSummaries.map((summary, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="body2" gutterBottom>
                    {summary.month}-{summary.year}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {summary.username}
                  </Typography>
                  <Typography>
                    Total Meal: {summary.totalMeal.toFixed(2)}
                  </Typography>
                  <Typography>
                    Opening Balance: ৳ {summary.openingBalance.toFixed(2)}
                  </Typography>
                  <Typography>
                    Submitted Amount: ৳ {summary.submittedAmount.toFixed(2)}
                  </Typography>
                  <Typography>
                    Total Contribution: ৳ {summary.totalContribution.toFixed(2)}
                  </Typography>
                  <Typography>
                    Total Cost: ৳ {summary.totalCost.toFixed(2)}
                  </Typography>
                  <Typography>
                    Carry Forward: ৳ {summary.carryForward.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Hidden>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Hidden mdDown>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell align="right">Total Meal</TableCell>
                  <TableCell align="right">Opening Balance</TableCell>
                  <TableCell align="right">Submitted Amount</TableCell>
                  <TableCell align="right">Total Contribution</TableCell>
                  <TableCell align="right">Total Cost</TableCell>
                  <TableCell align="right">Carry Forward</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeSummaries.map((summary, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {summary.month}-{summary.year}
                    </TableCell>
                    <TableCell>{summary.username}</TableCell>
                    <TableCell align="right">
                      {summary.totalMeal.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      {summary.openingBalance.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      ৳ {summary.submittedAmount.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      ৳ {summary.totalContribution.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      ৳ {summary.totalCost.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      ৳ {summary.carryForward.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmployeeMonthSummary;

// import React, { useState } from "react";
// import { db } from "./firebase";
// import {
//   Button,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Select,
// } from "@mui/material";

// const EmployeeMonthSummary = () => {
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [employeeSummaries, setEmployeeSummaries] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const querySnapshot = await db
//         .collection("employeeSummary")
//         .where("month", "==", selectedMonth)
//         .where("year", "==", selectedYear)
//         .get();

//       const summariesData = querySnapshot.docs.map((doc) => doc.data());
//       setEmployeeSummaries(summariesData);
//     } catch (error) {
//       console.error("Error fetching employee summaries:", error);
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h5" gutterBottom>
//         Employee Summary Search
//       </Typography>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item xs={12} sm={4}>
//           <Select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//           >
//             <option value="">Select Month</option>
//             <option value="01">January</option>
//             <option value="02">February</option>
//             <option value="03">March</option>
//             <option value="04">April</option>
//             <option value="05">May</option>
//             <option value="06">June</option>
//             <option value="07">July</option>
//             <option value="08">August</option>
//             <option value="09">September</option>
//             <option value="10">October</option>
//             <option value="11">November</option>
//             <option value="12">December</option>
//           </Select>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <input
//             type="number"
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//             placeholder="Enter Year"
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Button variant="contained" color="primary" onClick={handleSearch}>
//             Search
//           </Button>
//         </Grid>
//       </Grid>
//       <br />
//       <br />
//       <Grid container spacing={2}>
//         {employeeSummaries.map((summary, index) => (
//           <Grid item xs={12} sm={6} key={index}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   Name: {summary.username}
//                 </Typography>
//                 <Typography>Total Meal: {summary.totalMeal}</Typography>
//                 <Typography>
//                   Submitted Amount: {summary.submittedAmount}
//                 </Typography>
//                 <Typography>
//                   Total Contribution: {summary.totalContribution}
//                 </Typography>
//                 <Typography>Total Cost: {summary.totalCost}</Typography>
//                 <Typography>Carry Forward: {summary.carryForward}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default EmployeeMonthSummary;
