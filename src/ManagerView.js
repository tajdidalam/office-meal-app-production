import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Container,
  CardMedia,
} from "@mui/material";
import ManagerViewImage from "./assets/manager.jpg";

const ManagerView = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [updatedMeals, setUpdatedMeals] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchUpdatedMeals = async () => {
      const mealsRef = db.collection("updatedMeals");
      const snapshot = await mealsRef.get();
      const mealData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUpdatedMeals(mealData);
    };

    fetchUpdatedMeals();
  }, []);

  const handleAccept = async (id, meal) => {
    setIsProcessing(true);
    // Write values to the meals collection
    try {
      await db.collection("meals").add({
        date: meal.date,
        employeeName: meal.employeeName,
        breakfast: meal.breakfast,
        lunch: meal.lunch,
        dinner: meal.dinner,
      });

      console.log("Meal added successfully");

      // Delete the previous document from the meals collection
      if (meal.previousEntry) {
        await db.collection("meals").doc(meal.previousEntry).delete();
      }

      // Delete the document from the updatedMeals collection
      await db.collection("updatedMeals").doc(id).delete();

      console.log("Meal request accepted successfully");
    } catch (error) {
      console.error("Error accepting meal request: ", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (id) => {
    setIsProcessing(true);
    // Delete the document from the updatedMeals collection
    try {
      await db.collection("updatedMeals").doc(id).delete();
      console.log("Meal request rejected successfully");
    } catch (error) {
      console.error("Error rejecting meal request: ", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Container>
      <Grid container spacing={2} style={{ paddingBottom: "2rem" }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              src={ManagerViewImage}
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
            Order Approval
          </Typography>
          <Typography>
            When a user modifies their meal request, the updated request will
            appear for your review. If you approve the modification, the
            existing record in the 'meals' collection will be deleted, and a new
            record with the updated values will be added to the 'meals'
            collection.
          </Typography>

          <br />
          <Typography>
            However, if you reject the modification, the updated request data
            stored in the 'updated-meals' collection will be deleted without any
            changes made to the original record in the 'meals' collection.
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {updatedMeals.length > 0 ? (
          updatedMeals.map((meal) => (
            <Grid item key={meal.id} xs={isSmallScreen ? 12 : 6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {meal.employeeName}
                  </Typography>
                  <Typography variant="body2">
                    Date: {meal.date} | Breakfast: {meal.breakfast} | Lunch:{" "}
                    {meal.lunch} | Dinner: {meal.dinner}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleAccept(meal.id, meal)}
                    disabled={isProcessing}
                  >
                    Accept
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleReject(meal.id)}
                    disabled={isProcessing}
                  >
                    Reject
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              No meal request to approve.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ManagerView;
