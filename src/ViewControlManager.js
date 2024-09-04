import React, { useState } from "react";
import EmployeeMonthSummary from "./EmployeeMonthSummary";
import MealFormManager from "./MealFormManager";
import IndividualMealFactor from "./IndividualMealFactor";
import ManagerView from "./ManagerView";
import MealTable from "./MealTable";
import MealReport from "./MealReport";
import AddMealFactors from "./AddMealFactors";
import ExpensesForm from "./ExpensesForm";
import ExpensesReport from "./ExpensesReport";
import RocketIcon from "@mui/icons-material/Rocket";

import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DiningIcon from "@mui/icons-material/Dining";
const ViewControlManager = ({ handleLogout, username }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(<MealTable />);
  const [selectedItem, setSelectedItem] = useState("Meal Table");
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = (component, itemName) => {
    setSelectedLink(component);
    setSelectedItem(itemName);
    setIsSidebarOpen(false); // close sidebar when link is clicked
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open sidebar"
            onClick={toggleSidebar}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <RocketIcon fontSize="large" />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            Hello, {username}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
        <List>
          <IconButton onClick={toggleSidebar} sx={{ ml: "auto" }}>
            <CloseIcon />
          </IconButton>
          <ListItem
            button
            onClick={() => handleLinkClick(<MealTable />, "Meal Table")}
            sx={{ color: selectedItem === "Meal Table" ? "blue" : "inherit" }}
          >
            <ListItemText primary="Daily Orders" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleLinkClick(<ManagerView />, "Manager View")}
            sx={{ color: selectedItem === "Manager View" ? "blue" : "inherit" }}
          >
            <ListItemText primary="Order Approval" />
          </ListItem>
          <ListItem
            button
            onClick={() =>
              handleLinkClick(<MealFormManager />, "Meal Form Manager")
            }
            sx={{
              color: selectedItem === "Meal Form Manager" ? "blue" : "inherit",
            }}
          >
            <ListItemText primary="Add User's Meal" />
          </ListItem>
          <ListItem
            button
            onClick={() =>
              handleLinkClick(<AddMealFactors />, "Add Meal Factor")
            }
            sx={{
              color: selectedItem === "Add Meal Factor" ? "blue" : "inherit",
            }}
          >
            <ListItemText primary="Meal Factors" />
          </ListItem>
          <ListItem
            button
            onClick={() =>
              handleLinkClick(
                <IndividualMealFactor />,
                "Individual Meal Factor"
              )
            }
            sx={{
              color:
                selectedItem === "Individual Meal Factor" ? "blue" : "inherit",
            }}
          >
            <ListItemText primary="Individual Meal Factor" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleLinkClick(<ExpensesForm />, "Expense Form")}
            sx={{ color: selectedItem === "Expense Form" ? "blue" : "inherit" }}
          >
            <ListItemText primary="Add Expenses" />
          </ListItem>
          <ListItem
            button
            onClick={() =>
              handleLinkClick(<ExpensesReport />, "Expenses Report")
            }
            sx={{
              color: selectedItem === "Expenses Report" ? "blue" : "inherit",
            }}
          >
            <ListItemText primary="Expense Report" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleLinkClick(<MealReport />, "Meal Report")}
            sx={{ color: selectedItem === "Meal Report" ? "blue" : "inherit" }}
          >
            <ListItemText primary="Meal Report" />
          </ListItem>

          <ListItem
            button
            onClick={() =>
              handleLinkClick(
                <EmployeeMonthSummary />,
                "Employee Month Summary"
              )
            }
            sx={{
              color:
                selectedItem === "Employee Month Summary" ? "blue" : "inherit",
            }}
          >
            <ListItemText primary="Summary" />
          </ListItem>
        </List>
      </Drawer>
      <Box sx={{ p: 3 }}>
        {/* <Typography variant="h4" gutterBottom>
          Welcome to Manager View
        </Typography> */}
        {selectedLink}
      </Box>
    </>
  );
};

export default ViewControlManager;

// import React, { useState } from "react";
// import EmployeeMonthSummary from "./EmployeeMonthSummary";
// import MealFormManager from "./MealFormManager";
// import IndividualMealFactor from "./IndividualMealFactor";
// import Manager from "./Manager";
// import MealTable from "./MealTable";
// import MealReport from "./MealReport";
// import AddMealFactors from "./AddMealFactors";
// import ExpensesForm from "./ExpensesForm";
// import ExpensesReport from "./ExpensesReport";

// import {
//   AppBar,
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Typography,
//   IconButton,
//   Divider,
//   Button,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// const ViewControlManager = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [selectedLink, setSelectedLink] = useState(null);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleLinkClick = (component) => {
//     setSelectedLink(component);
//     setIsSidebarOpen(false); // close sidebar when link is clicked
//   };

//   const handleLogout = () => {
//     // Add your logout logic here
//     console.log("Logout clicked");
//   };

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open sidebar"
//             onClick={toggleSidebar}
//             edge="start"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Manager View
//           </Typography>
//           <IconButton color="inherit" onClick={handleLogout}>
//             <ExitToAppIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
//         <List>
//           <IconButton onClick={toggleSidebar} sx={{ ml: "auto" }}>
//             <CloseIcon />
//           </IconButton>
//           <ListItem
//             button
//             onClick={() => handleLinkClick(<EmployeeMonthSummary />)}
//           >
//             <ListItemText primary="Employee Month Summary" />
//           </ListItem>
//           <ListItem button onClick={() => handleLinkClick(<MealFormManager />)}>
//             <ListItemText primary="Meal Form Manager" />
//           </ListItem>
//           <ListItem
//             button
//             onClick={() => handleLinkClick(<IndividualMealFactor />)}
//           >
//             <ListItemText primary="Individual Meal Factor" />
//           </ListItem>
//           <ListItem button onClick={() => handleLinkClick(<Manager />)}>
//             <ListItemText primary="Manager" />
//           </ListItem>
//           <ListItem button onClick={() => handleLinkClick(<MealTable />)}>
//             <ListItemText primary="Meal Table" />
//           </ListItem>
//           <ListItem button onClick={() => handleLinkClick(<MealReport />)}>
//             <ListItemText primary="Meal Report" />
//           </ListItem>
//           <ListItem button onClick={() => handleLinkClick(<AddMealFactors />)}>
//             <ListItemText primary="Add Meal Factors" />
//           </ListItem>
//           <ListItem button onClick={() => handleLinkClick(<ExpensesForm />)}>
//             <ListItemText primary="Expenses Form" />
//           </ListItem>
//           <ListItem button onClick={() => handleLinkClick(<ExpensesReport />)}>
//             <ListItemText primary="Expenses Report" />
//           </ListItem>
//         </List>
//       </Drawer>
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           Welcome to Manager View
//         </Typography>
//         {selectedLink}
//       </Box>
//     </>
//   );
// };

// export default ViewControlManager;

// import React, { useState } from "react";
// import EmployeeMonthSummary from "./EmployeeMonthSummary";
// import MealFormManager from "./MealFormManager";
// import IndividualMealFactor from "./IndividualMealFactor";
// import Manager from "./Manager";
// import MealTable from "./MealTable";
// import MealReport from "./MealReport";
// import AddMealFactors from "./AddMealFactors";
// import ExpensesForm from "./ExpensesForm";
// import ExpensesReport from "./ExpensesReport";

// import {
//   AppBar,
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Typography,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";

// const ViewControlManager = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open sidebar"
//             onClick={toggleSidebar}
//             edge="start"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Manager View
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
//         <List>
//           <ListItem button>
//             <ListItemText primary="Employee Month Summary" />
//           </ListItem>
//           <ListItem button>
//             <ListItemText primary="Meal Form Manager" />
//           </ListItem>
//           <ListItem button>
//             <ListItemText primary="Individual Meal Factor" />
//           </ListItem>
//           <ListItem button>
//             <ListItemText primary="Manager" />
//           </ListItem>
//           <ListItem button>
//             <ListItemText primary="Meal Table" />
//           </ListItem>
//           <ListItem button>
//             <ListItemText primary="Meal Report" />
//           </ListItem>
//           <ListItem button>
//             <ListItemText primary="Add Meal Factors" />
//           </ListItem>
//           <ListItem button>
//             <ListItemText primary="Expenses Form" />
//           </ListItem>
//           <ListItem button>
//             <ListItemText primary="Expenses Report" />
//           </ListItem>
//         </List>
//       </Drawer>
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           Welcome to Manager View
//         </Typography>
//         {/* Content area for displaying components based on selected link */}
//       </Box>
//     </>
//   );
// };

// export default ViewControlManager;

// import React, { useState } from "react";
// import EmployeeMonthSummary from "./EmployeeMonthSummary";
// import MealFormManager from "./MealFormManager";
// import IndividualMealFactor from "./IndividualMealFactor";
// import ManagerView from "./ManagerView";
// import MealTable from "./MealTable";
// import MealReport from "./MealReport";
// import AddMealFactors from "./AddMealFactors";
// import ExpensesForm from "./ExpensesForm";
// import ExpensesReport from "./ExpensesReport";

// import {
//   AppBar,
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Typography,
//   IconButton,
//   Divider,
//   Button,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import DiningIcon from "@mui/icons-material/Dining";
// const ViewControlManager = ({ handleLogout, username }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [selectedLink, setSelectedLink] = useState(null);
// const [selectedItem, setSelectedItem] = useState(null);
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleLinkClick = (component, itemName) => {
//     setSelectedLink(component);
//     setIsSidebarOpen(false); // close sidebar when link is clicked
//   };

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open sidebar"
//             onClick={toggleSidebar}
//             edge="start"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <DiningIcon fontSize="large" />
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1 }}
//           ></Typography>
//           <Typography variant="subtitle1" sx={{ mr: 2 }}>
//             Hello, {username}
//           </Typography>
//           <IconButton color="inherit" onClick={handleLogout}>
//             <ExitToAppIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
//         <List>
//           <IconButton onClick={toggleSidebar} sx={{ ml: "auto" }}>
//             <CloseIcon />
//           </IconButton>
//           <ListItem button onClick={() => handleLinkClick(<MealTable />)}>
//             <ListItemText primary="Daily Orders" />
//           </ListItem>
//           <ListItem button onClick={() => handleLinkClick(<ManagerView />)}>
//             <ListItemText primary="Order Approval" />
//           </ListItem>
//           <ListItem button onClick={() => handleLinkClick(<MealFormManager />)}>
//             <ListItemText primary="Add User's Meal" />
//           </ListItem>
//           <ListItem button onClick={() => handleLinkClick(<AddMealFactors />)}>
//             <ListItemText primary="Meal Factors" />
//           </ListItem>
//           <ListItem
//             button
//             onClick={() => handleLinkClick(<IndividualMealFactor />)}
//           >
//             <ListItemText primary="Individual Meal Factor" />
//           </ListItem>
//           <ListItem button onClick={() => handleLinkClick(<ExpensesForm />)}>
//             <ListItemText primary="Add Expenses" />
//           </ListItem>
//           <ListItem button onClick={() => handleLinkClick(<ExpensesReport />)}>
//             <ListItemText primary="Expense Report" />
//           </ListItem>
//           <ListItem button onClick={() => handleLinkClick(<MealReport />)}>
//             <ListItemText primary="Meal Report" />
//           </ListItem>

//           <ListItem
//             button
//             onClick={() => handleLinkClick(<EmployeeMonthSummary />)}
//           >
//             <ListItemText primary="Summary" />
//           </ListItem>
//         </List>
//       </Drawer>
//       <Box sx={{ p: 3 }}>
//         {/* <Typography variant="h4" gutterBottom>
//           Welcome to Manager View
//         </Typography> */}
//         {selectedLink}
//       </Box>
//     </>
//   );
// };

// export default ViewControlManager;

// // import React, { useState } from "react";
// // import EmployeeMonthSummary from "./EmployeeMonthSummary";
// // import MealFormManager from "./MealFormManager";
// // import IndividualMealFactor from "./IndividualMealFactor";
// // import Manager from "./Manager";
// // import MealTable from "./MealTable";
// // import MealReport from "./MealReport";
// // import AddMealFactors from "./AddMealFactors";
// // import ExpensesForm from "./ExpensesForm";
// // import ExpensesReport from "./ExpensesReport";

// // import {
// //   AppBar,
// //   Box,
// //   Drawer,
// //   List,
// //   ListItem,
// //   ListItemIcon,
// //   ListItemText,
// //   Toolbar,
// //   Typography,
// //   IconButton,
// //   Divider,
// //   Button,
// // } from "@mui/material";
// // import MenuIcon from "@mui/icons-material/Menu";
// // import CloseIcon from "@mui/icons-material/Close";
// // import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// // const ViewControlManager = () => {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [selectedLink, setSelectedLink] = useState(null);

// //   const toggleSidebar = () => {
// //     setIsSidebarOpen(!isSidebarOpen);
// //   };

// //   const handleLinkClick = (component) => {
// //     setSelectedLink(component);
// //     setIsSidebarOpen(false); // close sidebar when link is clicked
// //   };

// //   const handleLogout = () => {
// //     // Add your logout logic here
// //     console.log("Logout clicked");
// //   };

// //   return (
// //     <>
// //       <AppBar position="static">
// //         <Toolbar>
// //           <IconButton
// //             color="inherit"
// //             aria-label="open sidebar"
// //             onClick={toggleSidebar}
// //             edge="start"
// //             sx={{ mr: 2 }}
// //           >
// //             <MenuIcon />
// //           </IconButton>
// //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// //             Manager View
// //           </Typography>
// //           <IconButton color="inherit" onClick={handleLogout}>
// //             <ExitToAppIcon />
// //           </IconButton>
// //         </Toolbar>
// //       </AppBar>
// //       <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
// //         <List>
// //           <IconButton onClick={toggleSidebar} sx={{ ml: "auto" }}>
// //             <CloseIcon />
// //           </IconButton>
// //           <ListItem
// //             button
// //             onClick={() => handleLinkClick(<EmployeeMonthSummary />)}
// //           >
// //             <ListItemText primary="Employee Month Summary" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleLinkClick(<MealFormManager />)}>
// //             <ListItemText primary="Meal Form Manager" />
// //           </ListItem>
// //           <ListItem
// //             button
// //             onClick={() => handleLinkClick(<IndividualMealFactor />)}
// //           >
// //             <ListItemText primary="Individual Meal Factor" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleLinkClick(<Manager />)}>
// //             <ListItemText primary="Manager" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleLinkClick(<MealTable />)}>
// //             <ListItemText primary="Meal Table" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleLinkClick(<MealReport />)}>
// //             <ListItemText primary="Meal Report" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleLinkClick(<AddMealFactors />)}>
// //             <ListItemText primary="Add Meal Factors" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleLinkClick(<ExpensesForm />)}>
// //             <ListItemText primary="Expenses Form" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleLinkClick(<ExpensesReport />)}>
// //             <ListItemText primary="Expenses Report" />
// //           </ListItem>
// //         </List>
// //       </Drawer>
// //       <Box sx={{ p: 3 }}>
// //         <Typography variant="h4" gutterBottom>
// //           Welcome to Manager View
// //         </Typography>
// //         {selectedLink}
// //       </Box>
// //     </>
// //   );
// // };

// // export default ViewControlManager;

// // import React, { useState } from "react";
// // import EmployeeMonthSummary from "./EmployeeMonthSummary";
// // import MealFormManager from "./MealFormManager";
// // import IndividualMealFactor from "./IndividualMealFactor";
// // import Manager from "./Manager";
// // import MealTable from "./MealTable";
// // import MealReport from "./MealReport";
// // import AddMealFactors from "./AddMealFactors";
// // import ExpensesForm from "./ExpensesForm";
// // import ExpensesReport from "./ExpensesReport";

// // import {
// //   AppBar,
// //   Box,
// //   Drawer,
// //   List,
// //   ListItem,
// //   ListItemIcon,
// //   ListItemText,
// //   Toolbar,
// //   Typography,
// //   IconButton,
// //   Divider,
// // } from "@mui/material";
// // import MenuIcon from "@mui/icons-material/Menu";

// // const ViewControlManager = () => {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// //   const toggleSidebar = () => {
// //     setIsSidebarOpen(!isSidebarOpen);
// //   };

// //   return (
// //     <>
// //       <AppBar position="static">
// //         <Toolbar>
// //           <IconButton
// //             color="inherit"
// //             aria-label="open sidebar"
// //             onClick={toggleSidebar}
// //             edge="start"
// //             sx={{ mr: 2 }}
// //           >
// //             <MenuIcon />
// //           </IconButton>
// //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// //             Manager View
// //           </Typography>
// //         </Toolbar>
// //       </AppBar>
// //       <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
// //         <List>
// //           <ListItem button>
// //             <ListItemText primary="Employee Month Summary" />
// //           </ListItem>
// //           <ListItem button>
// //             <ListItemText primary="Meal Form Manager" />
// //           </ListItem>
// //           <ListItem button>
// //             <ListItemText primary="Individual Meal Factor" />
// //           </ListItem>
// //           <ListItem button>
// //             <ListItemText primary="Manager" />
// //           </ListItem>
// //           <ListItem button>
// //             <ListItemText primary="Meal Table" />
// //           </ListItem>
// //           <ListItem button>
// //             <ListItemText primary="Meal Report" />
// //           </ListItem>
// //           <ListItem button>
// //             <ListItemText primary="Add Meal Factors" />
// //           </ListItem>
// //           <ListItem button>
// //             <ListItemText primary="Expenses Form" />
// //           </ListItem>
// //           <ListItem button>
// //             <ListItemText primary="Expenses Report" />
// //           </ListItem>
// //         </List>
// //       </Drawer>
// //       <Box sx={{ p: 3 }}>
// //         <Typography variant="h4" gutterBottom>
// //           Welcome to Manager View
// //         </Typography>
// //         {/* Content area for displaying components based on selected link */}
// //       </Box>
// //     </>
// //   );
// // };

// // export default ViewControlManager;
