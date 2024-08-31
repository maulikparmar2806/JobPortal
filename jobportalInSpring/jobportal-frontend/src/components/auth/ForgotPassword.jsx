import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60); // 60 seconds timer
  const navigate = useNavigate();


  // Start the OTP timer when OTP is sent
  useEffect(() => {
    let interval;
    if (otpSent && !otpVerified) {
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpVerified]);

  const handleSendOtp = () => {
    setLoading(true);
    // Mock API call to send OTP
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setTimer(60); // Reset the timer
    }, 1000);
  };

  const handleVerifyOtp = () => {
    // Mock OTP verification
    if (otp === '123456') { // Replace with real OTP verification logic
      setOtpVerified(true);
    } else {
      alert('Invalid OTP');
    }
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Mock API call to reset the password
    alert('Password has been reset successfully');
     navigate('/');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Card sx={{
          width: 400,
          border: '1px solid',
          borderColor: 'success.main'
        }}
          
          >
        <CardHeader
          title="Forgot Password"
          sx={{ textAlign: 'center', bgcolor: 'success.main', color: 'white' }}
        />
        <CardContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <SecurityIcon color="success" style={{ fontSize: 80 }} />
          </Box>

          {!otpSent && !otpVerified && (
            <>
              <Typography variant="h6" textAlign="center" gutterBottom>
                Enter your email to receive an OTP
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handleSendOtp}
                disabled={loading} // Disable the button while loading
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </>
          )}

          {otpSent && !otpVerified && (
            <>
              <Typography variant="h6" textAlign="center" gutterBottom>
                Enter the OTP sent to your email
              </Typography>
              <Grid container spacing={1} justifyContent="center">
                {[...Array(6)].map((_, i) => (
                  <Grid item xs={2} key={i}>
                    <TextField
                      inputProps={{ maxLength: 1 }}
                      value={otp[i] || ''}
                      onChange={(e) => {
                        const newOtp = otp.split('');
                        newOtp[i] = e.target.value;
                        setOtp(newOtp.join(''));
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Typography
                textAlign="center"
                color="error"
                sx={{ mt: 1 }}
              >
                Time left: {timer} seconds
              </Typography>
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleVerifyOtp}
                disabled={otp.length < 6}
              >
                Verify OTP
              </Button>
            </>
          )}

          {otpVerified && (
            <>
              <Typography variant="h6" textAlign="center" gutterBottom>
                Reset Your Password
              </Typography>
              <TextField
                label="New Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handleResetPassword}
              >
                Reset Password
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};