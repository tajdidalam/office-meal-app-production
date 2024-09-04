import React, { useState } from "react";
import { db } from "./firebase";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";
import AddMealFactorImage from "./assets/meal-factor-2.jpg";

const AddMealFactorForm = () => {
  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("");
  const [mealFactor, setMealFactor] = useState("");

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleMealTypeChange = (event) => {
    setMealType(event.target.value);
  };

  const handleMealFactorChange = (event) => {
    setMealFactor(event.target.value);
  };

  const handleSubmit = () => {
    if (date && mealType && mealFactor) {
      const mealFactorField =
        mealType === "Breakfast"
          ? "breakfastFactor"
          : mealType === "Lunch"
          ? "lunchFactor"
          : mealType === "Dinner"
          ? "dinnerFactor"
          : "";

      if (mealFactorField) {
        // Add meal factor to all entries for the specific date
        db.collection("meals")
          .where("date", "==", date)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.update({
                [mealFactorField]: parseFloat(mealFactor),
              });
            });
          })
          .then(() => {
            console.log("Meal factor added successfully");
            setDate("");
            setMealType("");
            setMealFactor("");
          })
          .catch((error) => {
            console.error("Error adding meal factor: ", error);
          });
      }
    }
  };

  return (
    <Container>
      <Grid container spacing={2} style={{ paddingBottom: "2rem" }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              src={AddMealFactorImage}
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
            Meal Factors
          </Typography>
          <Typography>
            Add date wise meal factors for breakfast, lunch, and dinner.
          </Typography>
          <br />
          <Typography>
            Default factor for breakfast is 0.5. For lunch and dinner default
            factors are 1.
          </Typography>
        </Grid>
      </Grid>
      {/* <Typography variant="h5">Add Meal Factor</Typography> */}
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <TextField
            id="date"
            label="Date"
            type="date"
            value={date}
            onChange={handleDateChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Select
            id="mealType"
            value={mealType}
            onChange={handleMealTypeChange}
            fullWidth
          >
            <MenuItem value="Breakfast">Breakfast</MenuItem>
            <MenuItem value="Lunch">Lunch</MenuItem>
            <MenuItem value="Dinner">Dinner</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            id="mealFactor"
            label={`${mealType} Factor`}
            type="text"
            value={mealFactor}
            onChange={handleMealFactorChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!date || !mealType || !mealFactor}
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

export default AddMealFactorForm;
