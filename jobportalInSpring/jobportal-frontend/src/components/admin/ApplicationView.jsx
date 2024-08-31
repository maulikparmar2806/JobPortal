import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { Visibility, CheckCircle, Info } from "@mui/icons-material";

export const ApplicationView = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/applications"
        );
        setApplications(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleResumeClick = (resumeUrl) => {
    setSelectedResume(resumeUrl);
    setOpenDialog(true);
  };

  const handleDetailsClick = (application) => {
    setSelectedApplication(application);
    setDetailsDialogOpen(true);
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/applications/${id}`, {
        status: "A",
      });
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === id ? { ...app, status: "A" } : app
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedResume(null);
  };

  const handleDetailsDialogClose = () => {
    setDetailsDialogOpen(false);
    setSelectedApplication(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Application List
      </Typography>
      <TableContainer style={{ width: "76vw" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Application ID</TableCell>
              <TableCell>Job Post</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Resume</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow
                key={
                  application.applicationId || `application-${Math.random()}`
                }
              >
                <TableCell>{application.applicationId}</TableCell>
                <TableCell>{application.jobPost.jobTitle}</TableCell>
                <TableCell>{application.jobPost.company.name}</TableCell>
                <TableCell>
                  {application.status === "P"
                    ? "Pending"
                    : application.status === "A"
                    ? "Approved"
                    : "Unknown"}
                </TableCell>
                <TableCell>
                  {application.resume && (
                    <Button
                      variant="outlined"
                      startIcon={<Visibility />}
                      onClick={() => handleResumeClick(application.resume)}
                    >
                      View
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<Info />}
                    onClick={() => handleDetailsClick(application)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Resume Preview</DialogTitle>
        <DialogContent>
          {selectedResume && (
            <img src={selectedResume} alt="Resume" style={{ width: "80vw" }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={detailsDialogOpen}
        onClose={handleDetailsDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Application Details</DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <>
              <Typography variant="h6">
                Name: {selectedApplication.name}
              </Typography>
              <Typography variant="body1">
                Email: {selectedApplication.email}
              </Typography>
              <Typography variant="body1">
                Contact: {selectedApplication.contact}
              </Typography>
              <Typography variant="body1">
                Job Post: {selectedApplication.jobPost.jobTitle}
              </Typography>
              <Typography variant="body1">
                Company: {selectedApplication.jobPost.company.name}
              </Typography>
              <Typography variant="body1">
                Application Date: {selectedApplication.applicationDate}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
