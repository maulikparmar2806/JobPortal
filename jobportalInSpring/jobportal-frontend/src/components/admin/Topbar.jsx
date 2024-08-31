import React, { useContext, useState } from "react";
import logo from "../../assets/images/gvp_logo.jpg";
import "../../css/Topbar.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { MdMenuOpen } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import SecurityIcon from "@mui/icons-material/Security";
import Logout from "@mui/icons-material/Logout";
import { UserContext } from "../../context/UserContext";

export const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpenMyAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };
  const { user } = useContext(UserContext);
  // console.log("This is user", user.username);
  return (
    <>
      <header className="d-flex align-items-center w-100">
        <div className="container-fluid  w-100">
          <div className="row d-flex align-items-center logo">
            {/* Logo wrapper */}
            <div className="col-sm-2 part1 ">
              <Link
                to={"/admin/dashboard/"}
                className="d-flex align-items-center logo"
              >
                <img src={logo} alt="GVP Logo" />
                <span>GVP</span>
              </Link>
            </div>

            <div className="col-sm-3 d-flex align-items-center part2">
              <Button className="rounded-circle">
                <MdMenuOpen />
              </Button>
            
  
            </div>

            <div className="col-sm-7 d-flex align-items-center justify-content-end part-3">
              <div className="myAccWrapper">
                <Button
                  className="myAcc d-flex align-items-center"
                  onClick={handleOpenMyAccDrop}
                >
                  <div className="userImg">
                    <span className="rounded-circle">
                      <img
                        src={user?.profilePicture || logo}
                        alt="User Profile"
                      />
                    </span>
                  </div>

                  <div className="userInfo">
                    <h4>{user.username ? "Admin" : "Guest User"}</h4>
                    <p className="mb-0">{user?.username || "@guest"}</p>
                  </div>
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleCloseMyAccDrop}
                  onClick={handleCloseMyAccDrop}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <Avatar /> My account
                  </MenuItem>
                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <ListItemIcon>
                      <SecurityIcon fontSize="small" />
                    </ListItemIcon>
                    Reset Password
                  </MenuItem>
                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
