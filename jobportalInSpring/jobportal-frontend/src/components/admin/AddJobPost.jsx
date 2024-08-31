import React, { useState, useEffect } from "react";
import { Form} from "react-bootstrap";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { CustomLoader } from "../CustomLoader";

export const AddJobPost = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobPostImg, setJobPostImg] = useState(null); // State to store image file
  const [jobRequirementSkill, setJobRequirementSkill] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [jobVacancy, setJobVacancy] = useState(1);
  const [jobType, setJobType] = useState(""); // State for job type (full-time, part-time)
  const [jobSalary, setJobSalary] = useState(""); // State for job salary (LPA)
  const [companyId, setCompanyId] = useState("");
  const [lastApplicationDate, setLastApplicationDate] = useState(""); // State for last application date
  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/admin/dashboard/manage-company"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setServerError("Failed to fetch companies");
      }
    };

    fetchCompanies();
  }, []);

  const validate = () => {
    const errors = {};
    if (!jobTitle) errors.jobTitle = "Job title is required";
    if (!companyId) errors.company = "Company is required";
    if (!lastApplicationDate) {
      errors.lastApplicationDate = "Last application date is required";
    } else if (new Date(lastApplicationDate) < new Date()) {
      errors.lastApplicationDate =
        "Last application date cannot be before today";
    }
    return errors;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const fileType = file.type;
      if (!["image/jpeg", "image/jpg", "image/png"].includes(fileType)) {
        setErrors({ ...errors, jobPostImg: "File must be JPG, JPEG, or PNG" });
        setJobPostImg(null);
      } else {
        setJobPostImg(file);
        setErrors({ ...errors, jobPostImg: null });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const formData = new FormData();
    formData.append("jobTitle", jobTitle);
    formData.append("jobDescription", jobDescription);
    formData.append("jobRole", jobRole);
    formData.append("jobVacancy", jobVacancy);
    formData.append("jobRequirementSkill", jobRequirementSkill);
    formData.append("jobType", jobType);
    formData.append("jobSalary", jobSalary);
    formData.append("lastApplicationDate", lastApplicationDate);
    formData.append("companyId", companyId);
    if (jobPostImg) {
      formData.append("jobPostImg", jobPostImg);
    }

    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:8080/admin/dashboard/manage-jobPost",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        // setServerError(errorData.message || "Failed to add job post");
        setAlertMessage(errorData.message || "Failed to add job post");
        setAlertSeverity("error");
        setOpen(true);
        setLoading(false);
        return;
      }

      setAlertMessage("Data submitted successfully");
      setAlertSeverity("success");
      setOpen(true);
      setLoading(false);
      // alert("Job post added successfully");
      setJobTitle("");
      setJobDescription("");
      setJobPostImg(null);
      setJobRequirementSkill("");
      setJobRole("");
      setJobVacancy(1);
      setJobType("");
      setJobSalary("");
      setCompanyId("");
      setLastApplicationDate("");
    } catch (error) {
      console.error("Error adding job post:", error);
      // setServerError("Error adding job post");
      setAlertMessage("Error submitting data");
      setAlertSeverity("error");
      setOpen(true);
      setLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format
  const todayDate = new Date().toISOString().split("T")[0];

  const handleClose = () => {
    setOpen(false);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {serverError && (
        <div className="alert alert-danger" role="alert">
          <strong>{serverError}</strong>
        </div>
      )}
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="container-fluid">
          <div className="row justify-content-center mt-3">
            <div className="col-md-25">
              <div className="card shadow border border-secondary">
                <div className="card-header bg-secondary">
                  <h3 className="card-title text-white">Add Job Post</h3>
                </div>
                <div className="card-body">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="jobTitle">
                      <Form.Label>Job Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Job Title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        isInvalid={!!errors.jobTitle}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.jobTitle}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="jobDescription">
                      <Form.Label>Job Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter Job Description"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="jobPostImg">
                      <Form.Label>Job Post Image (JPG, JPEG, PNG)</Form.Label>
                      <Form.Control
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        isInvalid={!!errors.jobPostImg}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.jobPostImg}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="jobRequirementSkill"
                    >
                      <Form.Label>Job Requirement Skills</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Job Requirement Skills"
                        value={jobRequirementSkill}
                        onChange={(e) => setJobRequirementSkill(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="jobRole">
                      <Form.Label>Job Role</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Job Role"
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="jobVacancy">
                      <Form.Label>Job Vacancy</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Job Vacancy"
                        value={jobVacancy}
                        onChange={(e) =>
                          setJobVacancy(parseInt(e.target.value))
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="jobType">
                      <Form.Label>Job Type</Form.Label>
                      <Form.Control
                        as="select"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                      >
                        <option value="">Select Job Type</option>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="jobSalary">
                      <Form.Label>Job Salary (Lakh per annum)</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Job Salary (LPA)"
                        value={jobSalary}
                        onChange={(e) => setJobSalary(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="companyId">
                      <Form.Label>Select Company</Form.Label>
                      <Form.Control
                        as="select"
                        value={companyId}
                        onChange={(e) => setCompanyId(e.target.value)}
                        isInvalid={!!errors.company}
                      >
                        <option value="">Select a company</option>
                        {companies.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.company}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="lastApplicationDate"
                    >
                      <Form.Label>Last Application Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={lastApplicationDate}
                        min={todayDate} // Set the minimum date to today
                        onChange={(e) => setLastApplicationDate(e.target.value)}
                        isInvalid={!!errors.lastApplicationDate}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastApplicationDate}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Add Job Post
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="error" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};
