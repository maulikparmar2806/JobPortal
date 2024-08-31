import React, { useState } from "react";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import { CustomLoader } from "../CustomLoader";

export const AddCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [email, setEmail] = useState("");
  const [specializing, setSpecializing] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const validate = () => {
    const errors = {};
    if (!companyName) errors.companyName = "Company name is required";
    if (!companyDescription)
      errors.companyDescription = "Description is required";
    if (!email) errors.email = "Email is required";
    if (!street) errors.street = "Street is required";
    if (!landmark) errors.landmark = "Landmark is required";
    if (!area) errors.area = "Area is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!pincode) errors.pincode = "Pincode is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const formData = new FormData();
    formData.append("name", companyName);
    formData.append("description", companyDescription);
    formData.append("email", email);
    formData.append("street", street);
    formData.append("landmark", landmark);
    formData.append("area", area);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pincode", pincode);
    if (logoFile) formData.append("logo", logoFile);
    if (linkedinLink) formData.append("linkedin", linkedinLink);
    if (websiteLink) formData.append("website", websiteLink);
    if (specializing) formData.append("specializing", specializing);

    try {
      const response = await fetch(
        "http://localhost:8080/admin/dashboard/manage-company",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        // setServerError(errorData.message);
        setAlertMessage(errorData.message || "Error submitting data");
        setAlertSeverity("error");
        setOpen(true);
        setLoading(false);
        return;
      }

      const result = await response.json();
      console.log("Success:", result);
      setAlertMessage("Data submitted successfully");
      setAlertSeverity("success");
      setOpen(true);
      setLoading(false);

      // Reset form fields after submission
      setCompanyName("");
      setCompanyDescription("");
      setLinkedinLink("");
      setWebsiteLink("");
      setEmail("");
      setSpecializing("");
      setStreet("");
      setLandmark("");
      setArea("");
      setCity("");
      setState("");
      setPincode("");
      setLogoFile(null);
    } catch (error) {
      console.error("Error:", error);
      // setServerError("Error submitting data");
      setAlertMessage("Error submitting data");
      setAlertSeverity("error");
      setOpen(true);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* {serverError && (
        <div className="alert alert-danger" role="alert">
          <strong>{serverError}</strong>
        </div>
      )} */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <CustomLoader />
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row justify-content-center mt-3">
            <div className="col-md-25">
              <div className="card shadow border border-secondary">
                <div className="card-header bg-secondary">
                  <h3 className="card-title text-white">Add Company Details</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group row mb-3">
                      <label
                        htmlFor="companyName"
                        className="col-sm-3 col-form-label"
                      >
                        Company Name
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.companyName && "is-invalid"
                          }`}
                          id="companyName"
                          name="companyName"
                          placeholder="Enter Company Name"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                        {errors.companyName && (
                          <div className="invalid-feedback">
                            {errors.companyName}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label
                        htmlFor="companyDescription"
                        className="col-sm-3 col-form-label"
                      >
                        Company Description
                      </label>
                      <div className="col-sm-9">
                        <textarea
                          className={`form-control ${
                            errors.companyDescription && "is-invalid"
                          }`}
                          id="companyDescription"
                          name="companyDescription"
                          placeholder="Enter Company Description"
                          rows="3"
                          value={companyDescription}
                          onChange={(e) =>
                            setCompanyDescription(e.target.value)
                          }
                        ></textarea>
                        {errors.companyDescription && (
                          <div className="invalid-feedback">
                            {errors.companyDescription}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label
                        htmlFor="linkedinLink"
                        className="col-sm-3 col-form-label"
                      >
                        LinkedIn Link
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="url"
                          className={`form-control ${
                            errors.linkedinLink && "is-invalid"
                          }`}
                          id="linkedinLink"
                          name="linkedinLink"
                          placeholder="Enter LinkedIn Link"
                          value={linkedinLink}
                          onChange={(e) => setLinkedinLink(e.target.value)}
                        />
                        {errors.linkedinLink && (
                          <div className="invalid-feedback">
                            {errors.linkedinLink}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label
                        htmlFor="websiteLink"
                        className="col-sm-3 col-form-label"
                      >
                        Website Link
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="url"
                          className={`form-control ${
                            errors.websiteLink && "is-invalid"
                          }`}
                          id="websiteLink"
                          name="websiteLink"
                          placeholder="Enter Website Link"
                          value={websiteLink}
                          onChange={(e) => setWebsiteLink(e.target.value)}
                        />
                        {errors.websiteLink && (
                          <div className="invalid-feedback">
                            {errors.websiteLink}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label
                        htmlFor="email"
                        className="col-sm-3 col-form-label"
                      >
                        Email
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="email"
                          className={`form-control ${
                            errors.email && "is-invalid"
                          }`}
                          id="email"
                          name="email"
                          placeholder="Enter Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label
                        htmlFor="specializing"
                        className="col-sm-3 col-form-label"
                      >
                        Specializing In
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.specializing && "is-invalid"
                          }`}
                          id="specializing"
                          name="specializing"
                          placeholder="Enter Specialization"
                          value={specializing}
                          onChange={(e) => setSpecializing(e.target.value)}
                        />
                        {errors.specializing && (
                          <div className="invalid-feedback">
                            {errors.specializing}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label
                        htmlFor="street"
                        className="col-sm-3 col-form-label"
                      >
                        Street
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.street && "is-invalid"
                          }`}
                          id="street"
                          name="street"
                          placeholder="Enter Street"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                        />
                        {errors.street && (
                          <div className="invalid-feedback">
                            {errors.street}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label
                        htmlFor="landmark"
                        className="col-sm-3 col-form-label"
                      >
                        Landmark
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.landmark && "is-invalid"
                          }`}
                          id="landmark"
                          name="landmark"
                          placeholder="Enter Landmark"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                        />
                        {errors.landmark && (
                          <div className="invalid-feedback">
                            {errors.landmark}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label htmlFor="area" className="col-sm-3 col-form-label">
                        Area
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.area && "is-invalid"
                          }`}
                          id="area"
                          name="area"
                          placeholder="Enter Area"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                        />
                        {errors.area && (
                          <div className="invalid-feedback">{errors.area}</div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label htmlFor="city" className="col-sm-3 col-form-label">
                        City
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.city && "is-invalid"
                          }`}
                          id="city"
                          name="city"
                          placeholder="Enter City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                        {errors.city && (
                          <div className="invalid-feedback">{errors.city}</div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label
                        htmlFor="state"
                        className="col-sm-3 col-form-label"
                      >
                        State
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.state && "is-invalid"
                          }`}
                          id="state"
                          name="state"
                          placeholder="Enter State"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                        {errors.state && (
                          <div className="invalid-feedback">{errors.state}</div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label
                        htmlFor="pincode"
                        className="col-sm-3 col-form-label"
                      >
                        Pincode
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.pincode && "is-invalid"
                          }`}
                          id="pincode"
                          name="pincode"
                          placeholder="Enter Pincode"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                        />
                        {errors.pincode && (
                          <div className="invalid-feedback">
                            {errors.pincode}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label
                        htmlFor="logoFile"
                        className="col-sm-3 col-form-label"
                      >
                        Company Logo
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="file"
                          className="form-control"
                          id="logoFile"
                          name="logoFile"
                          onChange={(e) => setLogoFile(e.target.files[0])}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-9 offset-sm-3">
                        <button type="submit" className="btn btn-primary">
                          Add Company
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
