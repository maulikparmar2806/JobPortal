import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

export const StudentAccountDialog = ({ open, handleClose, user }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>My Account</DialogTitle>
      <DialogContent>
        <div className="d-flex align-items-center mb-3">
          <Avatar
            alt={user?.firstName}
            src={user?.profilePicture}
            sx={{ width: 56, height: 56 }}
          />
          <div className="ml-3">
            <h5>
              {user?.firstName} {user?.lastName}
            </h5>
            <p>{user?.email}</p>
          </div>
        </div>
        <div>
          <p>
            <strong>Gender:</strong> {user?.gender}
          </p>
          <p>
            <strong>Mobile Number:</strong> {user?.mobileNumber}
          </p>
          <p>
            <strong>Temporary Address:</strong> {user?.addressTemporary}
          </p>
          <p>
            <strong>Permanent Address:</strong> {user?.addressPermanent}
          </p>
          <p>
            <strong>City:</strong> {user?.city}
          </p>
          <p>
            <strong>Course:</strong> {user?.course}
          </p>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
