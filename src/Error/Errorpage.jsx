
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Typography, Container } from "@mui/material";

function ErrorPage() {
  return (
    <Container style={{ textAlign: "center", marginTop: "2rem" }}>
      <ErrorIcon style={{ fontSize: "4rem", color: "red" }} />
      <Typography variant="h4" gutterBottom>
        Access Denied
      </Typography>
      <Typography variant="body1">
        You don't have permission to access this page.
      </Typography>
    </Container>
  );
}

export default ErrorPage;
