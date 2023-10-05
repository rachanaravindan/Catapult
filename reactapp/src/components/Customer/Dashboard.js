import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { cards } from "../GridCards";
import { useLocation } from "react-router-dom";
import { CardMedia } from "@mui/material";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";
import Navbar from "../Navbar";

const defaultTheme = createTheme();

export default function Dashboard() {
  const navigate = useNavigate();
  const params= useParams();
  const { userId, serviceCenterId } = useParams();
  console.log('User ID:', userId);
  console.log('Service Center ID: ', serviceCenterId);
  const location = useLocation();
  const cardData = location.state.cardData;

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [userData, setUserData] = useState({
    enterProductName: "",
    enterModelNo: "",
    enterDateOfPurchase: "",
    enterContactNumber: "",
    enterProblem: "",
    enterAppointmentDate: "",
  });

  const [errors, setErrors] = useState({
    enterProductName: "",
    enterModelNo: "",
    enteDateOfPurchase: "",
    enterContactNumber: "",
    enterProblem: "",
    enterAppointmentDate: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const currentDate = new Date();
  const selectedDate = new Date(userData.enterDateOfPurchase);
  const selectedApptDate = new Date(userData.enterAppointmentDate);

  const fiveDaysFromNow = new Date();
  fiveDaysFromNow.setDate(currentDate.getDate() + 5);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let isValid = true;
    if (userData.enterProductName.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        enterProductName: "Please Fill the Above Field",
      }));
      isValid = false;
    }
    if (userData.enterModelNo.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        enterModelNo: "Please Fill the Above Field",
      }));
      isValid = false;
    }
    if (userData.enterDateOfPurchase.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        enterDateOfPurchase: "Please Fill the Above Field",
      }));
      isValid = false;
    }
    if (selectedDate > currentDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        enterDateOfPurchase: "Date must be in the past or today",
      }));
      isValid = false;
    }
    if (userData.enterContactNumber.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        enterContactNumber: "Please Fill the Above Field",
      }));
      isValid = false;
    }
    if (userData.enterProblem.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        enterProblem: "Please Fill the Above Field",
      }));
      isValid = false;
    }
    if (userData.enterAppointmentDate.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        enterAppointmentDate: "Please Fill the Above Field",
      }));
      isValid = false;
    }
    if (selectedApptDate > fiveDaysFromNow) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        enterAppointmentDate: "Appointment must be scheduled within least 5 days from today",
      }));
      isValid = false;
    }

    if (isValid) {
      setIsConfirmationModalOpen(true);
      console.log("No Errors");
    }
  };

  const handleConfirmationModalClose = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navbar />
      <main>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Card on the left */}
            <Grid item xs={12} md={4}>
              <Card style={{ marginTop: "20%", marginRight: "10%" }}>
              {/* console.log("cardData in Dashboard:", cardData); */}

                <CardMedia
                  component="img"
                  alt={cardData ? cardData.serviceCenterName : "No Card Selected"}
                  height="140"
                  image={cardData ? cardData.serviceCenterImageUrl : ""}
                />
                <CardContent>
                  {/* Content of your card */}
                  <h2>{cardData ? cardData.serviceCenterName : "No Card Selected"}</h2>
                  <p>
                    <strong>Description: </strong>
                    {cardData ? cardData.serviceCenterDescription : ""}
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {cardData ? cardData.serviceCenterAddress : ""}
                  </p>
                  <p>
                    <strong>Phone Number: </strong>
                    {cardData ? cardData.serviceCenterPhone : ""}
                  </p>
                  <p>
                    <strong>Email ID: </strong>
                    {cardData ? cardData.serviceCenterEmailId : ""}
                  </p>
                  <p>
                    <strong>Timings: </strong>
                    {cardData ? cardData.serviceCenterTimings : ""}
                  </p>
                  <p>
                    <strong>Price: </strong> Rs.
                    {cardData ? cardData.serviceCenterPrice : ""}
                  </p>
                </CardContent>
              </Card>
            </Grid>
            {/* Input fields on the right */}
            <Grid item xs={12} md={8}>
              <Card style={{ marginTop: "5%" }}>
                <CardContent>
                  {/* Input fields */}
                  <h2>
                    <center>Enter the Details</center>
                  </h2>
                  <form>
                    <TextField
                      fullWidth
                      label="Enter the name of the Product"
                      id="enterProductName"
                      name="enterProductName"
                      variant="outlined"
                      margin="normal"
                      value={userData.enterProductName} 
                      onChange={handleInputChange} 
                      error={!!errors.enterProductName}
                      helperText={errors.enterProductName}
                      autoFocus
                    />
                    <TextField
                      fullWidth
                      label="Enter the Model Number of the Product"
                      id="enterModelNo"
                      name="enterModelNo"
                      variant="outlined"
                      margin="normal"
                      value={userData.enterModelNo} 
                      onChange={handleInputChange}
                      error={!!errors.enterModelNo}
                      helperText={errors.enterModelNo}
                    />
                    <TextField
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Enter the Date of Purchase"
                      id="enterDateOfPurchase"
                      name="enterDateOfPurchase"
                      variant="outlined"
                      margin="normal"
                      type="date"
                      value={userData.enterDateOfPurchase} 
                      onChange={handleInputChange}
                      error={!!errors.enterDateOfPurchase}
                      helperText={errors.enterDateOfPurchase} 
                    />
                    <TextField
                      fullWidth
                      label="Enter the Contact Number"
                      id="enterContactNumber"
                      name="enterContactNumber"
                      variant="outlined"
                      margin="normal"
                      value={userData.enterContactNumber} 
                      onChange={handleInputChange}
                      error={!!errors.enterContactNumber}
                      helperText={errors.enterContactNumber}
                    />
                    <TextField
                      fullWidth
                      label="Enter the Problem of the Product"
                      id="enterProblem"
                      name="enterProblem"
                      variant="outlined"
                      margin="normal"
                      multiline // Enable multiline mode
                      rows={3} // Set the number of rows
                      value={userData.enterProblem} 
                      onChange={handleInputChange}
                      error={!!errors.enterProblem}
                      helperText={errors.enterProblem}
                    />
                    <TextField
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Select a Date for Appointment"
                      id="date"
                      name="enterAppointmentDate"
                      variant="outlined"
                      margin="normal"
                      type="date" 
                      value={userData.enterAppointmentDate} 
                      onChange={handleInputChange}
                      error={!!errors.enterAppointmentDate}
                      helperText={errors.enterAppointmentDate}
                    />
                    
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      style={{ backgroundColor: "black" }}
                      onClick={handleFormSubmit}
                    >
                      Submit
                    </Button>
                    
                    <ConfirmationModal
                      open={isConfirmationModalOpen}
                      handleClose={handleConfirmationModalClose}
                      userData={userData}
                      userId={userId}
                      serviceCenterId={serviceCenterId}
                    />
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
