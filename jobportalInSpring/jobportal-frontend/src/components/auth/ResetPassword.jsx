import React from "react";
import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Alert,
  AlertTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CardHeader,
} from "@mui/material";

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setAlert({
        show: true,
        type: "error",
        message: "Passwords do not match!",
      });
      return;
    }

    setAlert({
      show: true,
      type: "success",
      message: "Password reset successful!",
    });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    {
      /** history.push('/login');*/
    }
  };
  return (
    <>
      <Container sx={{ mt: 3, width: "600px" }}>
        <Card variant="outlined" sx={{ border: "1px solid green" }}>
          <CardHeader
            title="Reset Password"
            sx={{
              bgcolor: "green",
              color: "white",

              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          />
          <CardContent>
            <Box component="form" onSubmit={handleSubmit}>
              {alert.show && (
                <Alert severity={alert.type} sx={{ width: "100%", mb: 2 }}>
                  <AlertTitle>
                    {alert.type === "error" ? "Error" : "Success"}
                  </AlertTitle>
                  {alert.message}
                </Alert>
              )}
              <TextField
                label="New Password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                label="Confirm New Password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Reset Password
                </Button>
                <Button variant="outlined" color="secondary">
                  Back
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Password Reset Successful</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your password has been reset successfully. You will be redirected
              to the login page.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};
