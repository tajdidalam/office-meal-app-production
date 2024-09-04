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
import IndividualMealFactorImage from "./assets/individual-factor-2.jpg";

const IndividualMealFactor = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    date: "",
    factorType: "",
    factorValue: "",
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
          const factorField = formData.factorType + "Factor";
          await db
            .collection("meals")
            .doc(doc.id)
            .update({
              [factorField]: parseFloat(formData.factorValue),
            });
        });
      }
    } catch (error) {
      console.error("Error updating meal factor:", error);
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
              src={IndividualMealFactorImage}
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
            Individual Meal Factor
          </Typography>
          <Typography>
            Add date wise meal factors for breakfast, lunch, and dinner for a
            specific user.
          </Typography>
          <br />
          <Typography>
            Default factor for breakfast is 0.5. For lunch and dinner default
            factors are 1.
          </Typography>
          <br />
          <Typography>
            It is recommended that you use this form to update specific factor
            for a specific user after the meal factor is modified using meal
            factor form.
          </Typography>
        </Grid>
      </Grid>
      {/* <Typography variant="h5">Individual Meal Factor</Typography> */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>User</InputLabel>
              <Select
                value={formData.username}
                onChange={handleChange}
                name="username"
                label="User"
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
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Factor Type</InputLabel>
              <Select
                label="Factor Type"
                value={formData.factorType}
                onChange={handleChange}
                name="factorType"
                required
              >
                <MenuItem value="breakfast">Breakfast Factor</MenuItem>
                <MenuItem value="lunch">Lunch Factor</MenuItem>
                <MenuItem value="dinner">Dinner Factor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Factor Value"
              type="number"
              value={formData.factorValue}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{ inputProps: { min: 0, step: "any" } }}
              name="factorValue"
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

export default IndividualMealFactor;
