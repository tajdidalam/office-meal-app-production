import React, { useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MealFormUpdated from "./MealFormUpdated";
import MealTable from "./MealTable";
import EmployeeContribution from "./EmployeeContribution";
import MyMealOrders from "./MyMealOrders";
import EmployeeSummary from "./EmployeeSummary";

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const ViewControlUser = ({ handleLogout, username }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(
    <MealFormUpdated employeeName={username} />
  );

  const [selectedItem, setSelectedItem] = useState("Meal Form Updated");

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
          <RocketLaunchIcon fontSize="large" />
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
            onClick={() =>
              handleLinkClick(
                <MealFormUpdated employeeName={username} />,
                "Meal Form Updated"
              )
            }
            sx={{
              color: selectedItem === "Meal Form Updated" ? "blue" : "inherit",
            }}
          >
            <ListItemText primary="Meal Request" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleLinkClick(<MealTable />, "Meal Table")}
            sx={{ color: selectedItem === "Meal Table" ? "blue" : "inherit" }}
          >
            <ListItemText primary="Date Wise All Requests" />
          </ListItem>
          <ListItem
            button
            onClick={() =>
              handleLinkClick(
                <EmployeeContribution username={username} />,
                "Employee Contribution"
              )
            }
            sx={{
              color:
                selectedItem === "Employee Contribution" ? "blue" : "inherit",
            }}
          >
            <ListItemText primary="My Contribution" />
          </ListItem>
          <ListItem
            button
            onClick={() =>
              handleLinkClick(
                <MyMealOrders username={username} />,
                "My Meal Orders"
              )
            }
            sx={{
              color: selectedItem === "My Meal Orders" ? "blue" : "inherit",
            }}
          >
            <ListItemText primary="My Meal Requests" />
          </ListItem>
          <ListItem
            button
            onClick={() =>
              handleLinkClick(
                <EmployeeSummary username={username} />,
                "Employee Summary"
              )
            }
            sx={{
              color: selectedItem === "Employee Summary" ? "blue" : "inherit",
            }}
          >
            <ListItemText primary="Month Wise Summary" />
          </ListItem>
        </List>
      </Drawer>
      <Box sx={{ p: 3 }}>
        {/* <Typography variant="h4" gutterBottom>
          Welcome to User View
        </Typography> */}
        {/* {selectedLink === null ? (
          <Typography variant="h5">AAA</Typography>
        ) : (
          { selectedLink }
        )} */}
        {selectedLink}
      </Box>
    </>
  );
};

export default ViewControlUser;
