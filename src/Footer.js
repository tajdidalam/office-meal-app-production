import React from "react";
import { Typography, Box } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        py: 2,
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ textSize: "10px" }}
      >
        © {currentYear} Tajdid Ul Alam. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
