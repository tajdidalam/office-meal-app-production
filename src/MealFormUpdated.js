import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  TextField,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Snackbar,
} from "@mui/material";
import MealForm from "./assets/meal-form.jpg";

const MealFormUpdated = ({ employeeName }) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [date, setDate] = useState(tomorrow.toISOString().substr(0, 10));
  const [breakfast, setBreakfast] = useState(0);
  const [lunch, setLunch] = useState(1);
  const [dinner, setDinner] = useState(0);
  const [existingEntryId, setExistingEntryId] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Check if a previous entry exists for the same employee on the same date
    const checkExistingEntry = async () => {
      const querySnapshot = await db
        .collection("meals")
        .where("employeeName", "==", employeeName)
        .where("date", "==", date)
        .get();

      if (!querySnapshot.empty) {
        const entry = querySnapshot.docs[0].data();
        setExistingEntryId(querySnapshot.docs[0].id);
        setBreakfast(entry.breakfast);
        setLunch(entry.lunch);
        setDinner(entry.dinner);
      } else {
        setExistingEntryId(null);
        setBreakfast(0);
        setLunch(1);
        setDinner(0);
      }
    };

    checkExistingEntry();
  }, [date, employeeName]);

  const handleSubmit = async () => {
    try {
      const querySnapshot = await db
        .collection("meals")
        .where("employeeName", "==", employeeName)
        .where("date", "==", date)
        .get();

      if (!querySnapshot.empty) {
        const entryId = querySnapshot.docs[0].id;
        console.log("Previous entry found. Firestore entry code:", entryId);

        await db.collection("updatedMeals").add({
          date,
          employeeName,
          breakfast,
          lunch,
          dinner,
          previousEntry: entryId,
        });
        setPopupMessage("Update request sent for manager's approval");
        setIsPopupOpen(true);
      } else {
        await db.collection("meals").add({
          date,
          employeeName,
          breakfast,
          lunch,
          dinner,
        });
        setPopupMessage("Meal request successful");
        setIsPopupOpen(true);
      }
    } catch (error) {
      console.error("Error handling meal submission:", error);
    }
  };

  const handlePopupClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsPopupOpen(false);
  };

  return (
    <Container>
      <Grid container spacing={2} style={{ paddingBottom: "2rem" }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              src={MealForm}
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
            Request Meal
          </Typography>
          <Typography>
            Submit your meal request here. Don't forget to check the selected
            date carefully. Once requested, it can't be modified without
            manager's approval.
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="date"
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="breakfast"
            label="Breakfast"
            type="number"
            value={breakfast}
            onChange={(e) => setBreakfast(parseInt(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lunch"
            label="Lunch"
            type="number"
            value={lunch}
            onChange={(e) => setLunch(parseInt(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="dinner"
            label="Dinner"
            type="number"
            value={dinner}
            onChange={(e) => setDinner(parseInt(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ height: "56px" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={isPopupOpen}
        autoHideDuration={6000}
        onClose={handlePopupClose}
        message={popupMessage}
        action={
          <Button color="inherit" size="small" onClick={handlePopupClose}>
            Close
          </Button>
        }
      />
    </Container>
  );
};

export default MealFormUpdated;

// import React, { useState, useEffect } from "react";
// import { db } from "./firebase";
// import {
//   TextField,
//   Button,
//   Container,
//   Grid,
//   Card,
//   CardMedia,
//   Typography,
// } from "@mui/material";
// import MealForm from "./assets/meal-form.jpg";

// const MealFormUpdated = ({ employeeName }) => {
//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);

//   const [date, setDate] = useState(tomorrow.toISOString().substr(0, 10));
//   const [breakfast, setBreakfast] = useState(0);
//   const [lunch, setLunch] = useState(1);
//   const [dinner, setDinner] = useState(0);
//   const [existingEntryId, setExistingEntryId] = useState(null);

//   useEffect(() => {
//     // Check if a previous entry exists for the same employee on the same date
//     const checkExistingEntry = async () => {
//       const querySnapshot = await db
//         .collection("meals")
//         .where("employeeName", "==", employeeName)
//         .where("date", "==", date)
//         .get();

//       if (!querySnapshot.empty) {
//         const entry = querySnapshot.docs[0].data();
//         setExistingEntryId(querySnapshot.docs[0].id);
//         setBreakfast(entry.breakfast);
//         setLunch(entry.lunch);
//         setDinner(entry.dinner);
//       } else {
//         setExistingEntryId(null);
//         setBreakfast(0);
//         setLunch(1);
//         setDinner(0);
//       }
//     };

//     checkExistingEntry();
//   }, [date, employeeName]);

//   const handleSubmit = async () => {
//     try {
//       // Check if a previous entry exists for the same employee on the same date
//       const querySnapshot = await db
//         .collection("meals")
//         .where("employeeName", "==", employeeName)
//         .where("date", "==", date)
//         .get();

//       if (!querySnapshot.empty) {
//         // If a previous entry exists, log the Firestore entry code
//         const entryId = querySnapshot.docs[0].id;
//         console.log("Previous entry found. Firestore entry code:", entryId);

//         // If previous entry exists, add a new entry to new collection
//         await db.collection("updatedMeals").add({
//           date,
//           employeeName,
//           breakfast,
//           lunch,
//           dinner,
//           previousEntry: entryId,
//         });
//         // Implement the approval process with the manager here
//       } else {
//         // If no previous entry exists, add a new entry
//         await db.collection("meals").add({
//           date,
//           employeeName,
//           breakfast,
//           lunch,
//           dinner,
//         });
//         console.log("Meal added successfully");
//       }
//     } catch (error) {
//       console.error("Error handling meal submission:", error);
//     }
//   };

//   //   const handleSubmit = () => {
//   //     if (existingEntryId) {
//   //       // If a previous entry exists, update it
//   //       // Implement the approval process with the manager here
//   //       console.log("Previous entry found. Implement approval process.");
//   //     } else {
//   //       // If no previous entry exists, add a new entry
//   //       db.collection("meals")
//   //         .add({
//   //           date,
//   //           employeeName,
//   //           breakfast,
//   //           lunch,
//   //           dinner,
//   //         })
//   //         .then(() => {
//   //           console.log("Meal added successfully");
//   //         })
//   //         .catch((error) => {
//   //           console.error("Error adding meal: ", error);
//   //         });
//   //     }
//   //   };

//   return (
//     <Container>
//       <Grid container spacing={2} style={{ paddingBottom: "2rem" }}>
//         <Grid item xs={12} sm={6}>
//           <Card>
//             {/* Assuming this is your image */}
//             <CardMedia
//               component="img"
//               src={MealForm}
//               alt="Meal form"
//               sx={{
//                 height: "100%", // Cover the full height of the parent
//                 width: "100%", // Cover the full width of the parent
//                 objectFit: "cover", // Make sure the image covers the area
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
//             Request Meal
//           </Typography>
//           <Typography
//             variant="body2"
//             // sx={{
//             //   display: { xs: "none", sm: "block" }, // Hide on xs (small screens), show on sm (medium screens) and above
//             // }}
//           >
//             Submit your meal request here. Don't forget to check the selected
//             date carefully. Once requested, it can't be modified without
//             manager's approval.
//           </Typography>
//         </Grid>
//       </Grid>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             id="date"
//             label="Date"
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             fullWidth
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             id="breakfast"
//             label="Breakfast"
//             type="number"
//             value={breakfast}
//             onChange={(e) => setBreakfast(parseInt(e.target.value))}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             id="lunch"
//             label="Lunch"
//             type="number"
//             value={lunch}
//             onChange={(e) => setLunch(parseInt(e.target.value))}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             id="dinner"
//             label="Dinner"
//             type="number"
//             value={dinner}
//             onChange={(e) => setDinner(parseInt(e.target.value))}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             fullWidth
//             sx={{ height: "56px" }} // Adjusting height to match other inputs
//           >
//             Submit
//           </Button>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default MealFormUpdated;
