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
  Typography,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import MealOrdersImage from "./assets/meal-orders.jpg";

const MyMealOrders = ({ username }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState({ breakfast: 0, lunch: 0, dinner: 0 });
  const [factors, setFactors] = useState({ breakfast: 0, lunch: 0, dinner: 0 });
  const [mealsWithFactors, setMealsWithFactors] = useState({
    breakfastXFactor: 0,
    lunchXFactor: 0,
    dinnerXFactor: 0,
  });

  const fetchOrders = async () => {
    try {
      const querySnapshot = await db
        .collection("meals")
        .where("employeeName", "==", username)
        .where("date", ">=", startDate)
        .where("date", "<=", endDate)
        .get();

      const fetchedOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const calculateTotal = () => {
    let totalBreakfast = 0;
    let totalLunch = 0;
    let totalDinner = 0;

    orders.forEach((order) => {
      totalBreakfast += order.breakfast;
      totalLunch += order.lunch;
      totalDinner += order.dinner;
    });

    setTotal({
      breakfast: totalBreakfast,
      lunch: totalLunch,
      dinner: totalDinner,
    });
  };

  const calculateFactors = () => {
    let sumBreakfastFactor = 0;
    let sumLunchFactor = 0;
    let sumDinnerFactor = 0;

    orders.forEach((order) => {
      sumBreakfastFactor += order.breakfastFactor || 0.5;
      sumLunchFactor += order.lunchFactor || 1;
      sumDinnerFactor += order.dinnerFactor || 1;
    });

    setFactors({
      breakfast: sumBreakfastFactor,
      lunch: sumLunchFactor,
      dinner: sumDinnerFactor,
    });
  };

  const calculateMealsWithFactors = () => {
    let totalBreakfastXFactor = 0;
    let totalLunchXFactor = 0;
    let totalDinnerXFactor = 0;

    orders.forEach((order) => {
      totalBreakfastXFactor += order.breakfast * (order.breakfastFactor || 0.5);
      totalLunchXFactor += order.lunch * (order.lunchFactor || 1);
      totalDinnerXFactor += order.dinner * (order.dinnerFactor || 1);
    });

    setMealsWithFactors({
      breakfastXFactor: totalBreakfastXFactor,
      lunchXFactor: totalLunchXFactor,
      dinnerXFactor: totalDinnerXFactor,
    });
  };

  useEffect(() => {
    if (orders.length > 0) {
      calculateTotal();
      calculateFactors();
      calculateMealsWithFactors();
    }
  }, [orders]);

  const handleShowOrders = () => {
    fetchOrders();
  };

  return (
    <Container>
      <Grid container spacing={2} style={{ paddingBottom: "2rem" }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              src={MealOrdersImage}
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
            My Meal Requests
          </Typography>
          <Typography>
            Choose both a start and end date to view all your meal requests
            within the specified date range.
          </Typography>{" "}
          <br />
          <Typography>
            For viewing meal requests throughout the entire month, select the
            first date of the month as the start date and the last date as the
            end date. Three tables will be populated: the first will display all
            your requests, the second will contain meal factors, and the third
            will show your meal count after incorporating meal factors.
          </Typography>
          <br />
          <Typography>
            Let's get organized and keep track of those meals efficiently! 🗓️🍽️
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
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
        <Grid item xs={12} md={6}>
          <TextField
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
            onClick={handleShowOrders}
            fullWidth
            sx={{ marginTop: "1rem", marginBottom: "1rem", height: "56px" }}
          >
            Show Requests
          </Button>
        </Grid>
      </Grid>

      {orders.length === 0 ? (
        <></>
      ) : (
        <>
          <br />
          <Typography align="center">
            Summary of <span style={{ fontWeight: "bold" }}>{username}</span>{" "}
            from {startDate} to {endDate} ⬇️
          </Typography>
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
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.breakfast}</TableCell>
                    <TableCell>{order.lunch}</TableCell>
                    <TableCell>{order.dinner}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>{total.breakfast}</TableCell>
                  <TableCell>{total.lunch}</TableCell>
                  <TableCell>{total.dinner}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <br />
          <Typography align="center">
            Meal Factors from {startDate} to {endDate} ⬇️
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>BF</TableCell>
                  <TableCell>LF</TableCell>
                  <TableCell>DF</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.breakfastFactor}</TableCell>
                    <TableCell>{order.lunchFactor}</TableCell>
                    <TableCell>{order.dinnerFactor}</TableCell>
                  </TableRow>
                ))}
                {/* <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>{factors.breakfast}</TableCell>
              <TableCell>{factors.lunch}</TableCell>
              <TableCell>{factors.dinner}</TableCell>
            </TableRow> */}
              </TableBody>
            </Table>
          </TableContainer>

          <br />
          <br />
          <Typography align="center">
            Date Wise Total Meal After Considering Factors from {startDate} to{" "}
            {endDate} ⬇️
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>B X F</TableCell>
                  <TableCell>L X F</TableCell>
                  <TableCell>D X F</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      {order.breakfast * (order.breakfastFactor || 0.5)}
                    </TableCell>
                    <TableCell>
                      {order.lunch * (order.lunchFactor || 1)}
                    </TableCell>
                    <TableCell>
                      {order.dinner * (order.dinnerFactor || 1)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>{mealsWithFactors.breakfastXFactor}</TableCell>
                  <TableCell>{mealsWithFactors.lunchXFactor}</TableCell>
                  <TableCell>{mealsWithFactors.dinnerXFactor}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default MyMealOrders;

// import React, { useState, useEffect } from "react";
// import { db } from "./firebase";
// import {
//   Container,
//   TextField,
//   Button,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   Typography,
//   Grid,
// } from "@mui/material";

// const MyMealOrders = ({ username }) => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [total, setTotal] = useState({ breakfast: 0, lunch: 0, dinner: 0 });
//   const [factors, setFactors] = useState({ breakfast: 0, lunch: 0, dinner: 0 });

//   const fetchOrders = async () => {
//     try {
//       const querySnapshot = await db
//         .collection("meals")
//         .where("employeeName", "==", username)
//         .where("date", ">=", startDate)
//         .where("date", "<=", endDate)
//         .get();

//       const fetchedOrders = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setOrders(fetchedOrders);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   const calculateTotal = () => {
//     let totalBreakfast = 0;
//     let totalLunch = 0;
//     let totalDinner = 0;

//     orders.forEach((order) => {
//       totalBreakfast += order.breakfast;
//       totalLunch += order.lunch;
//       totalDinner += order.dinner;
//     });

//     setTotal({
//       breakfast: totalBreakfast,
//       lunch: totalLunch,
//       dinner: totalDinner,
//     });
//   };

//   const calculateFactors = () => {
//     let sumBreakfastFactor = 0;
//     let sumLunchFactor = 0;
//     let sumDinnerFactor = 0;

//     orders.forEach((order) => {
//       sumBreakfastFactor += order.breakfastFactor || 0.5; // Use 0.5 as default if breakfastFactor is not provided
//       sumLunchFactor += order.lunchFactor || 1; // Use 1 as default if lunchFactor is not provided
//       sumDinnerFactor += order.dinnerFactor || 1; // Use 1 as default if dinnerFactor is not provided
//     });

//     setFactors({
//       breakfast: sumBreakfastFactor,
//       lunch: sumLunchFactor,
//       dinner: sumDinnerFactor,
//     });
//   };

//   useEffect(() => {
//     if (orders.length > 0) {
//       calculateTotal();
//       calculateFactors();
//     }
//   }, [orders]);

//   const handleShowOrders = () => {
//     fetchOrders();
//   };

//   return (
//     <Container>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <TextField
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
//         <Grid item xs={12} md={6}>
//           <TextField
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
//             onClick={handleShowOrders}
//             fullWidth
//             sx={{ marginTop: "1rem", marginBottom: "1rem", height: "56px" }}
//           >
//             Show Orders
//           </Button>
//         </Grid>
//       </Grid>

//       <Typography variant="subtitle">
//         Summary Table from {startDate} to {endDate} for {username}
//       </Typography>
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
//             {orders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.date}</TableCell>
//                 <TableCell>{order.breakfast}</TableCell>
//                 <TableCell>{order.lunch}</TableCell>
//                 <TableCell>{order.dinner}</TableCell>
//               </TableRow>
//             ))}
//             <TableRow>
//               <TableCell>Total</TableCell>
//               <TableCell>{total.breakfast}</TableCell>
//               <TableCell>{total.lunch}</TableCell>
//               <TableCell>{total.dinner}</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Date</TableCell>
//               <TableCell>BF</TableCell>
//               <TableCell>LF</TableCell>
//               <TableCell>DF</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.date}</TableCell>
//                 <TableCell>{order.breakfastFactor}</TableCell>
//                 <TableCell>{order.lunchFactor}</TableCell>
//                 <TableCell>{order.dinnerFactor}</TableCell>
//               </TableRow>
//             ))}
//             <TableRow>
//               <TableCell>Total</TableCell>
//               <TableCell>{factors.breakfast}</TableCell>
//               <TableCell>{factors.lunch}</TableCell>
//               <TableCell>{factors.dinner}</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Date</TableCell>
//               <TableCell>B X F</TableCell>
//               <TableCell>L X F</TableCell>
//               <TableCell>D X F</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.date}</TableCell>
//                 <TableCell>
//                   {order.breakfast * (order.breakfastFactor || 0.5)}
//                 </TableCell>
//                 <TableCell>{order.lunch * (order.lunchFactor || 1)}</TableCell>
//                 <TableCell>
//                   {order.dinner * (order.dinnerFactor || 1)}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default MyMealOrders;

// import React, { useState, useEffect } from "react";
// import { db } from "./firebase";
// import {
//   Container,
//   TextField,
//   Button,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   Typography,
//   Grid,
// } from "@mui/material";

// const MyMealOrders = ({ username }) => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [total, setTotal] = useState({ breakfast: 0, lunch: 0, dinner: 0 });
//   const [factors, setFactors] = useState({ breakfast: 0, lunch: 0, dinner: 0 });

//   const fetchOrders = async () => {
//     try {
//       const querySnapshot = await db
//         .collection("meals")
//         .where("employeeName", "==", username)
//         .where("date", ">=", startDate)
//         .where("date", "<=", endDate)
//         .get();

//       const fetchedOrders = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setOrders(fetchedOrders);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   const calculateTotal = () => {
//     let totalBreakfast = 0;
//     let totalLunch = 0;
//     let totalDinner = 0;

//     orders.forEach((order) => {
//       totalBreakfast += order.breakfast;
//       totalLunch += order.lunch;
//       totalDinner += order.dinner;
//     });

//     setTotal({
//       breakfast: totalBreakfast,
//       lunch: totalLunch,
//       dinner: totalDinner,
//     });
//   };

//   const calculateFactors = () => {
//     let sumBreakfastFactor = 0;
//     let sumLunchFactor = 0;
//     let sumDinnerFactor = 0;

//     orders.forEach((order) => {
//       sumBreakfastFactor += order.breakfastFactor;
//       sumLunchFactor += order.lunchFactor;
//       sumDinnerFactor += order.dinnerFactor;
//     });

//     // const avgBreakfastFactor = sumBreakfastFactor / orders.length;
//     // const avgLunchFactor = sumLunchFactor / orders.length;
//     // const avgDinnerFactor = sumDinnerFactor / orders.length;

//     setFactors({
//       breakfast: sumBreakfastFactor,
//       lunch: sumLunchFactor,
//       dinner: sumDinnerFactor,
//     });
//   };

//   useEffect(() => {
//     if (orders.length > 0) {
//       calculateTotal();
//       calculateFactors();
//     }
//   }, [orders]);

//   const handleShowOrders = () => {
//     fetchOrders();
//   };

//   return (
//     <Container>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <TextField
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
//         <Grid item xs={12} md={6}>
//           <TextField
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
//             onClick={handleShowOrders}
//             fullWidth
//             sx={{ marginTop: "1rem", marginBottom: "1rem", height: "56px" }}
//           >
//             Show Orders
//           </Button>
//         </Grid>
//       </Grid>

//       <Typography variant="subtitle">
//         Summary Table from {startDate} to {endDate} for {username}
//       </Typography>
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
//             {orders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.date}</TableCell>
//                 <TableCell>{order.breakfast}</TableCell>
//                 <TableCell>{order.lunch}</TableCell>
//                 <TableCell>{order.dinner}</TableCell>
//               </TableRow>
//             ))}
//             <TableRow>
//               <TableCell>Total</TableCell>
//               <TableCell>{total.breakfast}</TableCell>
//               <TableCell>{total.lunch}</TableCell>
//               <TableCell>{total.dinner}</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Date</TableCell>
//               <TableCell>BF</TableCell>
//               <TableCell>LF</TableCell>
//               <TableCell>DF</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.date}</TableCell>
//                 <TableCell>{order.breakfastFactor}</TableCell>
//                 <TableCell>{order.lunchFactor}</TableCell>
//                 <TableCell>{order.dinnerFactor}</TableCell>
//               </TableRow>
//             ))}
//             <TableRow>
//               <TableCell>Total</TableCell>
//               <TableCell>{factors.breakfast}</TableCell>
//               <TableCell>{factors.lunch}</TableCell>
//               <TableCell>{factors.dinner}</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default MyMealOrders;

// import React, { useState, useEffect } from "react";
// import { db } from "./firebase";
// import {
//   Container,
//   TextField,
//   Button,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
// } from "@mui/material";

// const MyMealOrders = ({ username }) => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [total, setTotal] = useState({ breakfast: 0, lunch: 0, dinner: 0 });

//   const fetchOrders = async () => {
//     try {
//       const querySnapshot = await db
//         .collection("meals")
//         .where("employeeName", "==", username)
//         .where("date", ">=", startDate)
//         .where("date", "<=", endDate)
//         .get();

//       const fetchedOrders = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setOrders(fetchedOrders);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   useEffect(() => {
//     if (orders.length > 0) {
//       calculateTotal();
//     }
//   }, [orders]);

//   const handleShowOrders = () => {
//     fetchOrders();
//   };

//   const calculateTotal = () => {
//     let totalBreakfast = 0;
//     let totalLunch = 0;
//     let totalDinner = 0;

//     orders.forEach((order) => {
//       totalBreakfast += order.breakfast;
//       totalLunch += order.lunch;
//       totalDinner += order.dinner;
//     });

//     setTotal({
//       breakfast: totalBreakfast,
//       lunch: totalLunch,
//       dinner: totalDinner,
//     });
//   };

//   return (
//     <Container>
//       <TextField
//         label="Start Date"
//         type="date"
//         value={startDate}
//         onChange={(e) => setStartDate(e.target.value)}
//         fullWidth
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//       <TextField
//         label="End Date"
//         type="date"
//         value={endDate}
//         onChange={(e) => setEndDate(e.target.value)}
//         fullWidth
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleShowOrders}
//         fullWidth
//         sx={{ marginTop: "1rem", marginBottom: "1rem" }}
//       >
//         Show Orders
//       </Button>

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
//             {orders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.date}</TableCell>
//                 <TableCell>{order.breakfast}</TableCell>
//                 <TableCell>{order.lunch}</TableCell>
//                 <TableCell>{order.dinner}</TableCell>
//               </TableRow>
//             ))}
//             <TableRow>
//               <TableCell>Total</TableCell>
//               <TableCell>{total.breakfast}</TableCell>
//               <TableCell>{total.lunch}</TableCell>
//               <TableCell>{total.dinner}</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default MyMealOrders;

// import React, { useState } from "react";
// import { db } from "./firebase";
// import {
//   Container,
//   TextField,
//   Button,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   Grid,
// } from "@mui/material";

// const MyMealOrders = ({ username }) => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [total, setTotal] = useState({ breakfast: 0, lunch: 0, dinner: 0 });

//   const calculateTotal = () => {
//     let totalBreakfast = 0;
//     let totalLunch = 0;
//     let totalDinner = 0;

//     orders.forEach((order) => {
//       totalBreakfast += order.breakfast;
//       totalLunch += order.lunch;
//       totalDinner += order.dinner;
//     });

//     setTotal({
//       breakfast: totalBreakfast,
//       lunch: totalLunch,
//       dinner: totalDinner,
//     });
//   };

//   const fetchOrders = async () => {
//     try {
//       const querySnapshot = await db
//         .collection("meals")
//         .where("employeeName", "==", username)
//         .where("date", ">=", startDate)
//         .where("date", "<=", endDate)
//         .get();

//       const fetchedOrders = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setOrders(fetchedOrders);
//       calculateTotal(); // Calculate total after setting orders
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   const handleShowOrders = () => {
//     fetchOrders();
//     calculateTotal();
//   };

//   return (
//     <Container>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField
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
//         <Grid item xs={12} sm={6}>
//           <TextField
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
//             onClick={handleShowOrders}
//             fullWidth
//             sx={{ marginTop: "1rem", marginBottom: "1rem", height: "56px" }}
//           >
//             Show Orders
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
//             {orders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.date}</TableCell>
//                 <TableCell>{order.breakfast}</TableCell>
//                 <TableCell>{order.lunch}</TableCell>
//                 <TableCell>{order.dinner}</TableCell>
//               </TableRow>
//             ))}
//             <TableRow>
//               <TableCell>Total</TableCell>
//               <TableCell>{total.breakfast}</TableCell>
//               <TableCell>{total.lunch}</TableCell>
//               <TableCell>{total.dinner}</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default MyMealOrders;

// import React, { useState } from "react";
// import { db } from "./firebase";
// import {
//   Container,
//   TextField,
//   Button,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
// } from "@mui/material";

// const MyMealOrders = ({ username }) => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [total, setTotal] = useState({ breakfast: 0, lunch: 0, dinner: 0 });

//   const fetchOrders = async () => {
//     try {
//       const querySnapshot = await db
//         .collection("meals")
//         .where("employeeName", "==", username)
//         .where("date", ">=", startDate)
//         .where("date", "<=", endDate)
//         .get();

//       const fetchedOrders = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setOrders(fetchedOrders);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   const handleShowOrders = () => {
//     fetchOrders();
//   };

//   const calculateTotal = () => {
//     let totalBreakfast = 0;
//     let totalLunch = 0;
//     let totalDinner = 0;

//     orders.forEach((order) => {
//       totalBreakfast += order.breakfast;
//       totalLunch += order.lunch;
//       totalDinner += order.dinner;
//     });

//     setTotal({
//       breakfast: totalBreakfast,
//       lunch: totalLunch,
//       dinner: totalDinner,
//     });
//   };

//   return (
//     <Container>
//       <TextField
//         label="Start Date"
//         type="date"
//         value={startDate}
//         onChange={(e) => setStartDate(e.target.value)}
//         fullWidth
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//       <TextField
//         label="End Date"
//         type="date"
//         value={endDate}
//         onChange={(e) => setEndDate(e.target.value)}
//         fullWidth
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleShowOrders}
//         fullWidth
//         sx={{ marginTop: "1rem", marginBottom: "1rem" }}
//       >
//         Show Orders
//       </Button>

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
//             {orders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.date}</TableCell>
//                 <TableCell>{order.breakfast}</TableCell>
//                 <TableCell>{order.lunch}</TableCell>
//                 <TableCell>{order.dinner}</TableCell>
//               </TableRow>
//             ))}
//             <TableRow>
//               <TableCell>Total</TableCell>
//               <TableCell>{total.breakfast}</TableCell>
//               <TableCell>{total.lunch}</TableCell>
//               <TableCell>{total.dinner}</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default MyMealOrders;
