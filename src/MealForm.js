import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { TextField, Button, Container, Grid } from "@mui/material";

const MealForm = ({ employeeName }) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [date, setDate] = useState(tomorrow.toISOString().substr(0, 10));
  const [breakfast, setBreakfast] = useState(0);
  const [lunch, setLunch] = useState(1);
  const [dinner, setDinner] = useState(0);
  const [existingEntryId, setExistingEntryId] = useState(null);

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
      // Check if a previous entry exists for the same employee on the same date
      const querySnapshot = await db
        .collection("meals")
        .where("employeeName", "==", employeeName)
        .where("date", "==", date)
        .get();

      if (!querySnapshot.empty) {
        // If a previous entry exists, log the Firestore entry code
        const entryId = querySnapshot.docs[0].id;
        console.log("Previous entry found. Firestore entry code:", entryId);
        // Implement the approval process with the manager here
      } else {
        // If no previous entry exists, add a new entry
        await db.collection("meals").add({
          date,
          employeeName,
          breakfast,
          lunch,
          dinner,
        });
        console.log("Meal added successfully");
      }
    } catch (error) {
      console.error("Error handling meal submission:", error);
    }
  };

  //   const handleSubmit = () => {
  //     if (existingEntryId) {
  //       // If a previous entry exists, update it
  //       // Implement the approval process with the manager here
  //       console.log("Previous entry found. Implement approval process.");
  //     } else {
  //       // If no previous entry exists, add a new entry
  //       db.collection("meals")
  //         .add({
  //           date,
  //           employeeName,
  //           breakfast,
  //           lunch,
  //           dinner,
  //         })
  //         .then(() => {
  //           console.log("Meal added successfully");
  //         })
  //         .catch((error) => {
  //           console.error("Error adding meal: ", error);
  //         });
  //     }
  //   };

  return (
    <Container>
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
            sx={{ height: "56px" }} // Adjusting height to match other inputs
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MealForm;