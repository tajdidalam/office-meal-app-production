import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { db } from "./firebase";
import MealFormUpdated from "./MealFormUpdated";
import MealTable from "./MealTable";
import ContributionForm from "./ContributionForm";
import EmployeeContribution from "./EmployeeContribution";
import MyMealOrders from "./MyMealOrders";
import EmployeeSummary from "./EmployeeSummary";
import EmployeeMonthSummary from "./EmployeeMonthSummary";
import MealFormManager from "./MealFormManager";
import IndividualMealFactor from "./IndividualMealFactor";
import Manager from "./Manager";
import MealReport from "./MealReport";
import ManagerView from "./ManagerView";
import AddMealFactors from "./AddMealFactors";
import ExpensesForm from "./ExpensesForm";
import ExpensesReport from "./ExpensesReport";
import ViewControlManager from "./ViewControlManager";
import ViewControlUser from "./ViewControlUser";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const userRef = db.collection("users");
      const snapshot = await userRef.where("email", "==", email).get();
      let foundUser = null;
      snapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.password === password) {
          foundUser = userData;
        }
      });
      if (!foundUser) {
        setError("Invalid email or password.");
      } else {
        setUsername(foundUser.username);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleLogout = () => {
    // Reset state variables and log out the user
    setEmail("");
    setPassword("");
    setError("");
    setUsername("");
    setIsLoggedIn(false);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <>
          <AppBar position="static">
            <Toolbar>
              <SatelliteAltIcon fontSize="large" />
              {/* <Typography variant="h5">
                Meal Ordering For Ground Station, Gazipur
              </Typography> */}
            </Toolbar>
          </AppBar>
          <Container maxWidth="sm">
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ marginTop: "2rem" }}
            >
              Login
            </Typography>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            {error && (
              <Typography
                variant="body1"
                color="error"
                align="center"
                gutterBottom
              >
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              sx={{ height: "56px" }} // Adjusting height to match other inputs
              style={{ marginTop: "20px" }}
            >
              Login
            </Button>
          </Container>
        </>
      ) : (
        <>
          {/* <Typography variant="h4" align="center" gutterBottom>
            Logged in as: {username}
          </Typography>
          <br />
          <br />
          <Container maxWidth="sm">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleLogout}
              fullWidth
              sx={{ height: "56px" }} // Adjusting height to match other inputs
            >
              Logout
            </Button>
          </Container> */}

          {username === "Manager" ? (
            <>
              <ViewControlManager
                username={username}
                handleLogout={handleLogout}
              />
              {/* <ManagerView />
              <EmployeeMonthSummary />
              <MealFormManager />
              <IndividualMealFactor />
              <Manager />
              <MealTable />
              <MealReport />
              <AddMealFactors />
              <ExpensesForm />
              <ExpensesReport /> */}
            </>
          ) : (
            <>
              <ViewControlUser
                username={username}
                handleLogout={handleLogout}
              />
              {/* <MealFormUpdated employeeName={username} />
              <br />
              <br />
              <MealTable />
              <br />
              <br />
              <h1>Contribution Form (will need to be deleted)</h1>
              <ContributionForm username={username} />
              <br />
              <br />
              <h1>Employee Contribution</h1>
              <EmployeeContribution username={username} />
              <br />
              <br />
              <h1>My Meal Orders</h1>
              <MyMealOrders username={username} />
              <br />
              <br />
              <h2>Employee Summary</h2>
              <EmployeeSummary username={username} />
              <br />
              <br /> */}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LoginForm;

// import React, { useState } from "react";
// import { Button, Container, TextField, Typography } from "@mui/material";
// import { db } from "./firebase";
// import MealFormUpdated from "./MealFormUpdated";
// import MealTable from "./MealTable";
// import ContributionForm from "./ContributionForm";
// import EmployeeContribution from "./EmployeeContribution";
// import MyMealOrders from "./MyMealOrders";
// import EmployeeSummary from "./EmployeeSummary";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [username, setUsername] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = async () => {
//     try {
//       const userRef = db.collection("users");
//       const snapshot = await userRef.where("email", "==", email).get();
//       let foundUser = null;
//       snapshot.forEach((doc) => {
//         const userData = doc.data();
//         if (userData.password === password) {
//           foundUser = userData;
//         }
//       });
//       if (!foundUser) {
//         setError("Invalid email or password.");
//       } else {
//         setUsername(foundUser.username);
//         setIsLoggedIn(true);
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       setError("An error occurred. Please try again.");
//     }
//   };

//   const handleLogout = () => {
//     // Reset state variables and log out the user
//     setEmail("");
//     setPassword("");
//     setError("");
//     setUsername("");
//     setIsLoggedIn(false);
//   };

//   return (
//     <div>
//       {!isLoggedIn ? (
//         <>
//           <Container maxWidth="sm">
//             <Typography variant="h4" align="center" gutterBottom>
//               Login
//             </Typography>
//             <TextField
//               label="Email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               fullWidth
//               margin="normal"
//               variant="outlined"
//             />
//             <TextField
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               fullWidth
//               margin="normal"
//               variant="outlined"
//             />
//             {error && (
//               <Typography
//                 variant="body1"
//                 color="error"
//                 align="center"
//                 gutterBottom
//               >
//                 {error}
//               </Typography>
//             )}
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               onClick={handleLogin}
//               sx={{ height: "56px" }} // Adjusting height to match other inputs
//             >
//               Login
//             </Button>
//           </Container>
//         </>
//       ) : (
//         <>
//           <Typography variant="h4" align="center" gutterBottom>
//             Logged in as: {username}
//           </Typography>
//           <br />
//           <br />
//           <Container maxWidth="sm">
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={handleLogout}
//               fullWidth
//               sx={{ height: "56px" }} // Adjusting height to match other inputs
//             >
//               Logout
//             </Button>
//           </Container>
//           <br />
//           <br />
//           <MealFormUpdated employeeName={username} />
//           <br />
//           <br />
//           <MealTable />
//           <br />
//           <br />
//           {/* <h1>Contribution Form (will need to be deleted)</h1>
//           <ContributionForm username={username} />
//           <br />
//           <br /> */}
//           <h1>Employee Contribution</h1>
//           <EmployeeContribution username={username} />
//           <br />
//           <br />
//           <h1>My Meal Orders</h1>
//           <MyMealOrders username={username} />
//           <br />
//           <br />
//           <h2>Employee Summary</h2>
//           <EmployeeSummary username={username} />
//           <br />
//           <br />
//         </>
//       )}
//     </div>
//   );
// };

// export default LoginForm;

// import React, { useState } from "react";
// import { Button, Container, TextField, Typography } from "@mui/material";
// import { db } from "./firebase";
// import MealFormUpdated from "./MealFormUpdated";
// import MealTable from "./MealTable";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [username, setUsername] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = async () => {
//     try {
//       const userRef = db.collection("users");
//       const snapshot = await userRef.where("email", "==", email).get();
//       let foundUser = null;
//       snapshot.forEach((doc) => {
//         const userData = doc.data();
//         if (userData.password === password) {
//           foundUser = userData;
//         }
//       });
//       if (!foundUser) {
//         setError("Invalid email or password.");
//       } else {
//         setUsername(foundUser.username);
//         setIsLoggedIn(true);
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       {!isLoggedIn ? (
//         <>
//           <Typography variant="h4" align="center" gutterBottom>
//             Login
//           </Typography>
//           <TextField
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             fullWidth
//             margin="normal"
//             variant="outlined"
//           />
//           <TextField
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             fullWidth
//             margin="normal"
//             variant="outlined"
//           />
//           {error && (
//             <Typography
//               variant="body1"
//               color="error"
//               align="center"
//               gutterBottom
//             >
//               {error}
//             </Typography>
//           )}
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={handleLogin}
//           >
//             Login
//           </Button>
//         </>
//       ) : (
//         <>
//           <Typography variant="h4" align="center" gutterBottom>
//             Logged in as: {username}
//           </Typography>
//           <br />
//           <br />
//           <MealFormUpdated employeeName={username} />
//           <br />
//           <br />
//           <MealTable />
//           <br />
//           <br />
//         </>
//       )}
//     </Container>
//   );
// };

// export default LoginForm;

// import React, { useState } from "react";
// import { Button, Container, TextField, Typography } from "@mui/material";
// import { db } from "./firebase";

// const LoginForm = ({ onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [username, setUsername] = useState("");

//   const handleLogin = async () => {
//     try {
//       const userRef = db.collection("users");
//       const snapshot = await userRef.where("email", "==", email).get();
//       let foundUser = null;
//       snapshot.forEach((doc) => {
//         const userData = doc.data();
//         if (userData.password === password) {
//           foundUser = userData;
//         }
//       });
//       if (!foundUser) {
//         setError("Invalid email or password.");
//       } else {
//         setUsername(foundUser.username);
//         onLogin(foundUser.username);
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <Container maxWidth="sm">
//         <Typography variant="h4" align="center" gutterBottom>
//           Login
//         </Typography>
//         <TextField
//           label="Email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//         />
//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//         />
//         {error && (
//           <Typography variant="body1" color="error" align="center" gutterBottom>
//             {error}
//           </Typography>
//         )}
//         {/* {username && (
//         <Typography variant="body1" align="center" gutterBottom>
//           Logged in as: {username}
//         </Typography>
//       )} */}
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleLogin}
//           sx={{ height: "56px" }} // Adjusting height to match other inputs
//         >
//           Login
//         </Button>
//       </Container>
//       <div>
//         {username && (
//           <Typography variant="body1" align="center" gutterBottom>
//             Logged in as: {username}
//           </Typography>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
