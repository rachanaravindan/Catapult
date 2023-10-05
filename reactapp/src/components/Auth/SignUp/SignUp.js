import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Modal, MenuItem } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function SignUp() {
  const navigate = useNavigate();
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    userRole: "",
    email: "",
    username: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    userRole: "",
    email: "",
    username: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      // [name]: value,
      [name]: value.toLowerCase(),
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleConfirmation = () => {
    console.log("handleConfirmation called");
    setSuccessModalOpen(true);
    setTimeout(() => {
      setSuccessModalOpen(false);
      navigate("/login");
    }, 3500); 
  };

  const sendDataToDatabase = async () => {
    console.log("sendDataToDatabase called");
    let apiUrl = "";
    if (formData.userRole === "admin") {
      apiUrl = "http://localhost:8080/auth/admin/signup";
    } else if (formData.userRole === "user") {
      apiUrl = "http://localhost:8080/auth/user/signup";
    }
  
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status !== 200) {
        console.error(`HTTP error! Status: ${response.status}`);
        console.error("Response Text:", response.data.message);
        toast.error("Email already exists, please Log In or Sign Up with another account");
        return;
      }
  
      const data = response.data;
      // console.log("New User Added:", data);
      toast.success("Successful Registration, Redirecting to the login page", {
        onClose: () => {
          handleConfirmation();
          navigate("/login");
        }
      });
  
    } catch (error) {
      console.error("Error:", error);
      toast.error("Email already exists, please Log In or Sign Up with another account");
    }
  };

  const handleSubmit = async (event) => {
    console.log("handleSubmit called");
    event.preventDefault();

    let isValid = true;
    const userRoleLower = formData.userRole.toLowerCase();
    if (formData.userRole.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userRole: "Please Select Admin/User",
      }));
      isValid = false;
    }
    if (
      formData.userRole !== "admin" &&
      formData.userRole !== "user" &&
      formData.userRole !== "Admin" &&
      formData.userRole !== "User"
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userRole: "Please select either Admin or User",
      }));
      isValid = false;
    }
    if (formData.email.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      isValid = false;
    } else if (!formData.email.includes("@")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
      isValid = false;
    }
    if (formData.username.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username is required",
      }));
      isValid = false;
    }
    if (formData.mobileNumber.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobileNumber: "Mobile Number is required",
      }));
      isValid = false;
    }
    if (formData.mobileNumber.length < 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobileNumber: "Incorrect Mobile Number. Please enter 10 digits",
      }));
      isValid = false;
    }
    if (formData.password.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      isValid = false;
    }
    if (formData.password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long",
      }));
      isValid = false;
    }
    if (formData.confirmPassword.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Please retype your Password",
      }));
      isValid = false;
    }
    if (formData.confirmPassword !== formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Please re-enter the password",
      }));
      isValid = false;
    }
    if (formData.confirmPassword.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Password must be at least 6 characters long",
      }));
      isValid = false;
    }
    if (isValid) {
      sendDataToDatabase();
      //handleConfirmation();
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "110vh",
        height: "85vh", 
        marginTop: "auto", 
      }}
    >
      <Box
        sx={{
          // marginTop: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <div
          style={{
            maxHeight: "300px", 
            overflowY: "auto", 
          }}
        ></div>
        <form noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userRole"
            label="Enter Admin/User"
            name="userRole"
            autoComplete="userRole"
            autoFocus
            value={formData.userRole}
            onChange={handleChange}
            error={!!errors.userRole}
            helperText={errors.userRole}
          >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Enter Email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Enter Username"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="mobileNumber"
            label="Mobile Number"
            name="mobileNumber"
            autoComplete="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            error={!!errors.mobileNumber}
            helperText={errors.mobileNumber}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            autoComplete="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ backgroundColor: "black" }}
            onClick={handleSubmit}
          >
            Register
          </Button>

          <RouterLink to="/login">
            Already have an account? Login here
          </RouterLink>
        </form>
        
        <Modal
          open={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          aria-labelledby="successful-registration-modal"
          aria-describedby="successful-registration-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              boxShadow: 24,
              p: 4,
              maxWidth: "80%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column", 
              alignItems: "center", 
              color:"white",
              backgroundColor: '#79e63e', 
            }}
          >
            <Typography id="successful-registration-modal" variant="h4">
              <strong>Successful Registration</strong>
            </Typography>
            <Typography id="successful-registration-description" sx={{ mt: 2 }}>
              <strong>You have been successfully registered. Redirecting to login
              page...</strong>
            </Typography>
          </Box>
        </Modal>
      </Box>
      <ToastContainer />
    </Container>
  );
}
