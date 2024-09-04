import React, { useState } from "react";
import { db } from "./firebase";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";
import ExpensesReportImage from "./assets/expense-report-2.jpg";

const ExpensesReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editExpense, setEditExpense] = useState({
    id: "",
    date: "",
    amount: "",
    notes: "",
  });

  const fetchExpenses = async () => {
    const expensesRef = db.collection("expenses");
    const snapshot = await expensesRef
      .where("date", ">=", startDate)
      .where("date", "<=", endDate)
      .get();
    const expensesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setExpenses(expensesData);
  };

  const handleEdit = (expense) => {
    setEditExpense(expense);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleUpdateExpense = () => {
    db.collection("expenses")
      .doc(editExpense.id)
      .set(editExpense)
      .then(() => {
        console.log("Expense updated successfully");
        handleCloseEditDialog();
        fetchExpenses(); // Refresh the table with updated data
      })
      .catch((error) => {
        console.error("Error updating expense: ", error);
      });
  };

  const handleDeleteExpense = () => {
    db.collection("expenses")
      .doc(editExpense.id)
      .delete()
      .then(() => {
        console.log("Expense deleted successfully");
        handleCloseEditDialog();
        fetchExpenses(); // Refresh the table after deletion
      })
      .catch((error) => {
        console.error("Error deleting expense: ", error);
      });
  };

  return (
    <Container>
      <Grid container spacing={2} style={{ paddingBottom: "2rem" }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              src={ExpensesReportImage}
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
            Expense Report
          </Typography>
          <Typography>
            Pick start and end dates and find all the records of expenditure
            within the mentioned date.
          </Typography>
          <br />
          <Typography>You can modify amounts of previous records.</Typography>
        </Grid>
      </Grid>
      {/* <Typography variant="h5">Expenses Report</Typography> */}
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
            onClick={fetchExpenses}
            fullWidth
            sx={{ height: "56px" }} // Adjusting height to match other inputs
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount (BDT)</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.notes}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(expense)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="date"
            value={editExpense.date}
            onChange={(e) =>
              setEditExpense({ ...editExpense, date: e.target.value })
            }
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          />
          <TextField
            label="Amount (BDT)"
            type="number"
            value={editExpense.amount}
            onChange={(e) =>
              setEditExpense({ ...editExpense, amount: e.target.value })
            }
            fullWidth
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Note"
            value={editExpense.notes}
            onChange={(e) =>
              setEditExpense({ ...editExpense, notes: e.target.value })
            }
            fullWidth
            style={{ marginBottom: "1rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteExpense}
            color="error"
            variant="outlined"
            style={{ marginRight: "auto" }}
          >
            Delete
          </Button>
          <Button
            onClick={handleCloseEditDialog}
            color="error"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateExpense}
            color="primary"
            variant="contained"
          >
            Modify
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ExpensesReport;

// import React, { useState } from "react";
// import { db } from "./firebase";
// import {
//   Button,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";

// const ExpensesReport = () => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [expenses, setExpenses] = useState([]);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [editExpense, setEditExpense] = useState({
//     id: "",
//     date: "",
//     amount: "",
//     notes: "",
//   });

//   const fetchExpenses = async () => {
//     const expensesRef = db.collection("expenses");
//     const snapshot = await expensesRef
//       .where("date", ">=", startDate)
//       .where("date", "<=", endDate)
//       .get();
//     const expensesData = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setExpenses(expensesData);
//   };

//   const handleEdit = (expense) => {
//     setEditExpense(expense);
//     setEditDialogOpen(true);
//   };

//   const handleCloseEditDialog = () => {
//     setEditDialogOpen(false);
//   };

//   const handleUpdateExpense = () => {
//     db.collection("expenses")
//       .doc(editExpense.id)
//       .set(editExpense)
//       .then(() => {
//         console.log("Expense updated successfully");
//         handleCloseEditDialog();
//       })
//       .catch((error) => {
//         console.error("Error updating expense: ", error);
//       });
//   };

//   const handleDeleteExpense = () => {
//     // Delete the document from the collection in Firestore
//     db.collection("expenses")
//       .doc(editExpense.id)
//       .delete()
//       .then(() => {
//         console.log("Expense deleted successfully");
//         handleCloseEditDialog(); // Close the dialog after deleting the expense
//       })
//       .catch((error) => {
//         console.error("Error deleting expense: ", error);
//       });
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
//             onClick={fetchExpenses}
//             fullWidth
//             sx={{ height: "56px" }} // Adjusting height to match other inputs
//           >
//             Submit
//           </Button>
//         </Grid>
//       </Grid>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Date</TableCell>
//               <TableCell>Amount (BDT)</TableCell>
//               <TableCell>Note</TableCell>
//               <TableCell>Edit</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {expenses.map((expense) => (
//               <TableRow key={expense.id}>
//                 <TableCell>{expense.date}</TableCell>
//                 <TableCell>{expense.amount}</TableCell>
//                 <TableCell>{expense.notes}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleEdit(expense)}
//                   >
//                     Edit
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
//         <DialogTitle>Edit Expense</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Date"
//             type="date"
//             value={editExpense.date}
//             onChange={(e) =>
//               setEditExpense({ ...editExpense, date: e.target.value })
//             }
//             fullWidth
//             InputLabelProps={{
//               shrink: true,
//             }}
//             style={{ marginTop: "1rem", marginBottom: "1rem" }}
//           />
//           <TextField
//             label="Amount (BDT)"
//             type="number"
//             value={editExpense.amount}
//             onChange={(e) =>
//               setEditExpense({ ...editExpense, amount: e.target.value })
//             }
//             fullWidth
//             style={{ marginBottom: "1rem" }}
//           />
//           <TextField
//             label="Note"
//             value={editExpense.notes}
//             onChange={(e) =>
//               setEditExpense({ ...editExpense, notes: e.target.value })
//             }
//             fullWidth
//             style={{ marginBottom: "1rem" }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleDeleteExpense}
//             color="error"
//             variant="outlined"
//             style={{ marginRight: "auto" }} // Align button to the bottom left
//           >
//             Delete
//           </Button>
//           <Button
//             onClick={handleCloseEditDialog}
//             color="error"
//             variant="outlined"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleUpdateExpense}
//             color="primary"
//             variant="contained"
//           >
//             Modify
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default ExpensesReport;
