import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { db } from "./firebase";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  Avatar,
  CardContent,
  Typography,
  TextField,
  CardActions,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import DownloadIcon from "@mui/icons-material/Download";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import breakfastImage from "./assets/Breakfast.png";
import lunchImage from "./assets/Lunch.png";
import dinnerImage from "./assets/Dinner.png";
import Download from "@mui/icons-material/Download";

const MealCard = ({ mealType, meals, total, date }) => {
  const downloadTableAsImage = () => {
    const table = document.getElementById(mealType);
    html2canvas(table).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, "meal-table.png");
      });
    });
  };

  return (
    <Card id={mealType}>
      <CardHeader
        avatar={
          mealType === "breakfast" ? (
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              B
            </Avatar>
          ) : mealType === "lunch" ? (
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              L
            </Avatar>
          ) : (
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              D
            </Avatar>
          )
        }
        action={
          <IconButton aria-label="settings" onClick={downloadTableAsImage}>
            <Download />
          </IconButton>
        }
        title={
          mealType === "breakfast" ? (
            <Typography>Breakfast Requests</Typography>
          ) : mealType === "lunch" ? (
            <Typography>Lunch Requests</Typography>
          ) : (
            <Typography>Dinner Requests</Typography>
          )
        }
        subheader={date}
      />
      <CardMedia
        component="img"
        height="194"
        image={
          mealType === "breakfast"
            ? breakfastImage
            : mealType === "lunch"
            ? lunchImage
            : dinnerImage
        }
        alt="meals"
      />
      <CardContent>
        {/* <Typography variant="h5" component="div">
          {mealType}
        </Typography> */}
        {meals.map((meal) => (
          <Typography variant="body2" color="text.secondary">
            {meal[mealType] > 0
              ? meal[mealType] > 1
                ? meal.employeeName + " - " + meal[mealType]
                : meal.employeeName
              : ""}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <IconButton>
          <Typography component="div" variant="h5">
            {total}
          </Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
};

const MealTable = () => {
  const [meals, setMeals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [totalBreakfast, setTotalBreakfast] = useState(0);
  const [totalLunch, setTotalLunch] = useState(0);
  const [totalDinner, setTotalDinner] = useState(0);

  useEffect(() => {
    fetchMeals(selectedDate);
  }, [selectedDate]);

  const fetchMeals = async (date) => {
    let mealsRef = db.collection("meals");

    if (date) {
      mealsRef = mealsRef.where("date", "==", date);
    }

    mealsRef = mealsRef.orderBy("date", "asc");

    const snapshot = await mealsRef.get();
    const mealData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMeals(mealData);

    // Calculate total breakfast, lunch, and dinner
    const totalBreakfast = mealData.reduce(
      (sum, meal) => sum + meal.breakfast,
      0
    );
    const totalLunch = mealData.reduce((sum, meal) => sum + meal.lunch, 0);
    const totalDinner = mealData.reduce((sum, meal) => sum + meal.dinner, 0);

    setTotalBreakfast(totalBreakfast);
    setTotalLunch(totalLunch);
    setTotalDinner(totalDinner);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <Container>
      <Grid item xs={12} sm={6} marginBottom={"2rem"}>
        <TextField
          id="date"
          label="Select Date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <MealCard
            mealType="breakfast"
            meals={meals}
            total={totalBreakfast}
            date={selectedDate}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MealCard
            mealType="lunch"
            meals={meals}
            total={totalLunch}
            date={selectedDate}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MealCard
            mealType="dinner"
            meals={meals}
            total={totalDinner}
            date={selectedDate}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MealTable;

// import React, { useState, useEffect } from "react";

// import html2canvas from "html2canvas";
// import { saveAs } from "file-saver";

// import { db } from "./firebase";
// import {
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
//   Typography,
//   Card,
//   CardMedia,
//   Button,
// } from "@mui/material";
// import MealTableImage from "./assets/meal-table2.jpg";

// const MealTable = () => {
//   const [meals, setMeals] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
//   const [totalBreakfast, setTotalBreakfast] = useState(0);
//   const [totalLunch, setTotalLunch] = useState(0);
//   const [totalDinner, setTotalDinner] = useState(0);

//   useEffect(() => {
//     fetchMeals(selectedDate);
//   }, [selectedDate]);

//   const fetchMeals = async (date) => {
//     let mealsRef = db.collection("meals");

//     if (date) {
//       mealsRef = mealsRef.where("date", "==", date);
//     }

//     mealsRef = mealsRef.orderBy("date", "asc");

//     const snapshot = await mealsRef.get();
//     const mealData = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setMeals(mealData);

//     // Calculate total breakfast, lunch, and dinner
//     const totalBreakfast = mealData.reduce(
//       (sum, meal) => sum + meal.breakfast,
//       0
//     );
//     const totalLunch = mealData.reduce((sum, meal) => sum + meal.lunch, 0);
//     const totalDinner = mealData.reduce((sum, meal) => sum + meal.dinner, 0);

//     setTotalBreakfast(totalBreakfast);
//     setTotalLunch(totalLunch);
//     setTotalDinner(totalDinner);
//   };

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   const downloadTableAsImage = () => {
//     const table = document.getElementById("meal-table");
//     html2canvas(table).then((canvas) => {
//       canvas.toBlob((blob) => {
//         saveAs(blob, "meal-table.png");
//       });
//     });
//   };

//   return (
//     <Container>
//       <Grid container spacing={2} style={{ paddingBottom: "2rem" }}>
//         <Grid item xs={12} sm={6}>
//           <Card>
//             <CardMedia
//               component="img"
//               src={MealTableImage}
//               alt="Meal form"
//               sx={{
//                 height: "100%",
//                 width: "100%",
//                 objectFit: "cover",
//               }}
//             />
//           </Card>
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           sm={6}
//           container
//           direction="column"
//           justifyContent="center"
//         >
//           <Typography
//             variant="h4"
//             sx={{ mb: 1.5, display: { xs: "none", sm: "block" } }}
//           >
//             Date Wise Meal Requests
//           </Typography>
//           <Typography>
//             Picketh a date, and beholdeth all the merry meal requests for that
//             day!
//           </Typography>
//         </Grid>
//       </Grid>

//       <Grid item xs={12} sm={6} marginBottom={"2rem"}>
//         <TextField
//           id="date"
//           label="Select Date"
//           type="date"
//           value={selectedDate}
//           onChange={handleDateChange}
//           fullWidth
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//       </Grid>

//       <TableContainer component={Paper}>
//         <Table id="meal-table">
//           {meals.length === 0 ? (
//             <></>
//           ) : (
//             <TableHead>
//               <TableRow>
//                 <TableCell>Breakfast</TableCell>
//                 <TableCell>Lunch</TableCell>
//                 <TableCell>Dinner</TableCell>
//               </TableRow>
//             </TableHead>
//           )}
//           <TableBody>
//             {meals.map((meal) => (
//               <TableRow key={meal.id}>
//                 <TableCell>
//                   {meal.breakfast > 0
//                     ? meal.breakfast > 1
//                       ? meal.employeeName + " - " + meal.breakfast
//                       : meal.employeeName
//                     : ""}
//                 </TableCell>
//                 <TableCell>
//                   {meal.lunch > 0
//                     ? meal.lunch > 1
//                       ? meal.employeeName + " - " + meal.lunch
//                       : meal.employeeName
//                     : ""}
//                 </TableCell>
//                 <TableCell>
//                   {meal.dinner > 0
//                     ? meal.dinner > 1
//                       ? meal.employeeName + " - " + meal.dinner
//                       : meal.employeeName
//                     : ""}
//                 </TableCell>
//               </TableRow>
//             ))}
//             {/* Add a new row for total counts */}
//             {meals.length === 0 ? (
//               <></>
//             ) : (
//               <TableRow>
//                 <TableCell style={{ fontWeight: "bold" }}>
//                   {totalBreakfast}
//                 </TableCell>
//                 <TableCell style={{ fontWeight: "bold" }}>
//                   {totalLunch}
//                 </TableCell>
//                 <TableCell style={{ fontWeight: "bold" }}>
//                   {totalDinner}
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {meals.length === 0 ? (
//         <></>
//       ) : (
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ marginTop: "1rem", marginBottom: "1rem", height: "56px" }}
//           onClick={downloadTableAsImage}
//         >
//           Download Table as Image
//         </Button>
//       )}
//     </Container>
//   );
// };

// export default MealTable;

// import React, { useState, useEffect } from "react";
// import { db } from "./firebase";
// import {
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
//   Typography,
//   Card,
//   CardMedia,
// } from "@mui/material";
// import MealTableImage from "./assets/meal-table2.jpg";

// const MealTable = () => {
//   const [meals, setMeals] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
//   const [totalBreakfast, setTotalBreakfast] = useState(0);
//   const [totalLunch, setTotalLunch] = useState(0);
//   const [totalDinner, setTotalDinner] = useState(0);

//   useEffect(() => {
//     fetchMeals(selectedDate);
//   }, [selectedDate]);

//   const fetchMeals = async (date) => {
//     let mealsRef = db.collection("meals");

//     if (date) {
//       mealsRef = mealsRef.where("date", "==", date);
//     }

//     mealsRef = mealsRef.orderBy("date", "asc");

//     const snapshot = await mealsRef.get();
//     const mealData = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setMeals(mealData);

//     // Calculate total breakfast, lunch, and dinner
//     const totalBreakfast = mealData.reduce(
//       (sum, meal) => sum + meal.breakfast,
//       0
//     );
//     const totalLunch = mealData.reduce((sum, meal) => sum + meal.lunch, 0);
//     const totalDinner = mealData.reduce((sum, meal) => sum + meal.dinner, 0);

//     setTotalBreakfast(totalBreakfast);
//     setTotalLunch(totalLunch);
//     setTotalDinner(totalDinner);
//   };

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   return (
//     <Container>
//       <Grid container spacing={2} style={{ paddingBottom: "2rem" }}>
//         <Grid item xs={12} sm={6}>
//           <Card>
//             <CardMedia
//               component="img"
//               src={MealTableImage}
//               alt="Meal form"
//               sx={{
//                 height: "100%",
//                 width: "100%",
//                 objectFit: "cover",
//               }}
//             />
//           </Card>
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           sm={6}
//           container
//           direction="column"
//           justifyContent="center"
//         >
//           <Typography
//             variant="h4"
//             sx={{ mb: 1.5, display: { xs: "none", sm: "block" } }}
//           >
//             Date Wise Meal Requests
//           </Typography>
//           <Typography>
//             Picketh a date, and beholdeth all the merry meal requests for that
//             day!
//           </Typography>
//         </Grid>
//       </Grid>

//       <Grid item xs={12} sm={6} marginBottom={"2rem"}>
//         <TextField
//           id="date"
//           label="Select Date"
//           type="date"
//           value={selectedDate}
//           onChange={handleDateChange}
//           fullWidth
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//       </Grid>

//       <TableContainer component={Paper}>
//         <Table>
//           {meals.length === 0 ? (
//             <></>
//           ) : (
//             <TableHead>
//               <TableRow>
//                 <TableCell>Breakfast</TableCell>
//                 <TableCell>Lunch</TableCell>
//                 <TableCell>Dinner</TableCell>
//               </TableRow>
//             </TableHead>
//           )}
//           <TableBody>
//             {meals.map((meal) => (
//               <TableRow key={meal.id}>
//                 <TableCell>
//                   {meal.breakfast > 0
//                     ? meal.breakfast > 1
//                       ? meal.employeeName + " - " + meal.breakfast
//                       : meal.employeeName
//                     : ""}
//                 </TableCell>
//                 <TableCell>
//                   {meal.lunch > 0
//                     ? meal.lunch > 1
//                       ? meal.employeeName + " - " + meal.lunch
//                       : meal.employeeName
//                     : ""}
//                 </TableCell>
//                 <TableCell>
//                   {meal.dinner > 0
//                     ? meal.dinner > 1
//                       ? meal.employeeName + " - " + meal.dinner
//                       : meal.employeeName
//                     : ""}
//                 </TableCell>
//               </TableRow>
//             ))}
//             {/* Add a new row for total counts */}
//             {meals.length === 0 ? (
//               <></>
//             ) : (
//               <TableRow>
//                 <TableCell style={{ fontWeight: "bold" }}>
//                   {totalBreakfast}
//                 </TableCell>
//                 <TableCell style={{ fontWeight: "bold" }}>
//                   {totalLunch}
//                 </TableCell>
//                 <TableCell style={{ fontWeight: "bold" }}>
//                   {totalDinner}
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default MealTable;
