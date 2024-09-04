import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";
import MealFormManagerImage from "./assets/add-user-meal.jpg";

const MealFormManager = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    date: "",
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await db.collection("users").get();
        const usersData = querySnapshot.docs.map((doc) => doc.data().username);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const mealQuerySnapshot = await db
        .collection("meals")
        .where("employeeName", "==", formData.username)
        .where("date", "==", formData.date)
        .get();

      if (!mealQuerySnapshot.empty) {
        // Update existing document
        mealQuerySnapshot.forEach(async (doc) => {
          await db
            .collection("meals")
            .doc(doc.id)
            .update({
              breakfast: parseInt(formData.breakfast),
              lunch: parseInt(formData.lunch),
              dinner: parseInt(formData.dinner),
            });
        });
      } else {
        // Create new document
        await db.collection("meals").add({
          employeeName: formData.username,
          date: formData.date,
          breakfast: parseInt(formData.breakfast),
          lunch: parseInt(formData.lunch),
          dinner: parseInt(formData.dinner),
        });
      }

      // Reset form data
      setFormData({
        username: "",
        date: "",
        breakfast: "",
        lunch: "",
        dinner: "",
      });
    } catch (error) {
      console.error("Error submitting meal:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Grid container spacing={2} style={{ paddingBottom: "2rem" }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              src={MealFormManagerImage}
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
            Add User's Meal
          </Typography>
          <Typography>
            Add date wise breakfast, lunch, and dinner of specific user to the
            database.
          </Typography>
          <br />
          <Typography>
            These records will directly be added to your meals collection. Any
            previous record for the selected user on the selected date will be
            modified. So, add the recored carefully.
          </Typography>
        </Grid>
      </Grid>
      {/* <Typography variant="h5">Meal form Manager</Typography> */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>User</InputLabel>
              <Select
                value={formData.username}
                onChange={handleChange}
                name="username"
                required
              >
                {users.map((user, index) => (
                  <MenuItem key={index} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              name="date"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Breakfast"
              type="number"
              value={formData.breakfast}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{ inputProps: { min: 0 } }}
              name="breakfast"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Lunch"
              type="number"
              value={formData.lunch}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{ inputProps: { min: 0 } }}
              name="lunch"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Dinner"
              type="number"
              value={formData.dinner}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{ inputProps: { min: 0 } }}
              name="dinner"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "1rem", marginBottom: "1rem", height: "56px" }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default MealFormManager;
