import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useSnackbar } from 'notistack';
import { css } from 'goober';

export default function EditBookingModal({ 
  open, 
  handleClose, 
  productId,
  setUserAppointments, 
  updateAppointments,
  serviceCenterName,
  showSuccessSnackbar,
  showRefreshSnackbar,
 }) {

  const [editData, setEditData] = useState({
    editProductName: "",
    editModelNo: "",
    editDateOfPurchase: "",
    editContactNumber: "",
    editProblem: "",
    editAppointmentDate: "",
    editProductId: productId, 
    editServiceCenterName: serviceCenterName,
  });

  const [errors, setErrors] = useState({
    editProductName: "",
    editModelNo: "",
    editateOfPurchase: "",
    editContactNumber: "",
    editProblem: "",
    editAppointmentDate: "",
  });

  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    //fetching data
    if(open){
      // fetch(`http://localhost:8080/admin/appointment/${productId}`)
      fetch(`http://localhost:8080/admin/appointment/${productId}`)
      .then((response) => {
        if(response.ok){
          return response.json();
        } else {
          throw new Error("Failed to fetch form data");
        }
      })
      .then((data) =>{
        setFetchedData(data);
        //Populate the editData state with fetched data
        setEditData({
          editProductName: data.productName,
          editModelNo: data.productModelNo,
          editDateOfPurchase: data.dateOfPurchase,
          editContactNumber: data.mobileNumber,
          editProblem: data.productDescription,
          editAppointmentDate: data.availableSlots,
          editProductId: productId,
          editServiceCenterName: serviceCenterName,
        });
      })
      .catch((error) => {
        console.log("Error fetching appointment data: ", error);
      });
    }
  }, [open, productId, serviceCenterName]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    setErrors({
      ...errors,
      [name]: "",
    });
  };  

  const handleModalSubmit = (event) => {
    event.preventDefault();

    let isValid = true;
    if (editData.editProductName.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        editProductName: "Please Fill the Above Field",
      }));
      isValid = false;
    }
    if (editData.editModelNo.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        editModelNo: "Please Fill the Above Field",
      }));
      isValid = false;
    }
    if (editData.editDateOfPurchase.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        editDateOfPurchase: "Please Fill the Above Field",
      }));
      isValid = false;
    }
    if (editData.editContactNumber.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        editContactNumber: "Please Fill the Above Field",
      }));
      isValid = false;
    }
    if (editData.editProblem.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        editProblem: "Please Fill the Above Field",
      }));
      isValid = false;
    }
    if (editData.editAppointmentDate.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        editAppointmentDate: "Please Fill the Above Field",
      }));
      isValid = false;
    }
    if (isValid) {
      console.log("No Errors");
      const updatedAppointment = {
        // object created with the updated appointment data
        productName: editData.editProductName,
        productModelNo: editData.editModelNo,
        dateOfPurchase: editData.editDateOfPurchase,
        mobileNumber: editData.editContactNumber,
        productDescription: editData.editProblem,
        availableSlots: editData.editAppointmentDate,
      };

      setUserAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.productId === productId ? updatedAppointment : appointment
      )
    );

      fetch(`http://localhost:8080/user/editappointment/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAppointment),
    })
    .then(async(response) => {
      if (response.ok) {
        console.log("Appointment updated successfully");
        handleClose();
        showSuccessSnackbar(); 
        // Call the callback to update the appointments in the parent component
        updateAppointments(updatedAppointment);
        await new Promise(resolve => setTimeout(resolve, 1000));
          showRefreshSnackbar();
      } else {
        console.error("Failed to update appointment");
      }
    })
    .catch((error) => {
      console.error("Error updating appointment:", error);
    });
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Appointment</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Enter the name of the Product"
          id="editProductName"
          name="editProductName"
          variant="outlined"
          margin="normal"
          value={editData.editProductName} 
          onChange={handleInputChange} 
          error={!!errors.editProductName}
          helperText={errors.editProductName}
          autoFocus
        />
        <TextField
          fullWidth
          label="Enter the Model Number of the Product"
          id="editModelNo"
          name="editModelNo"
          variant="outlined"
          margin="normal"
          value={editData.editModelNo} 
          onChange={handleInputChange}
          error={!!errors.editModelNo}
          helperText={errors.editModelNo}
        />
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Enter the Date of Purchase"
          id="editDateOfPurchase"
          name="editDateOfPurchase"
          variant="outlined"
          margin="normal"
          type="date"
          value={editData.editDateOfPurchase} 
          onChange={handleInputChange}
          error={!!errors.editDateOfPurchase}
          helperText={errors.editDateOfPurchase} 
        />
        <TextField
          fullWidth
          label="Enter the Contact Number"
          id="editContactNumber"
          name="editContactNumber"
          variant="outlined"
          margin="normal"
          value={editData.editContactNumber} 
          onChange={handleInputChange}
          error={!!errors.editContactNumber}
          helperText={errors.editContactNumber}
        />
        <TextField
          fullWidth
          label="Enter the Problem of the Product"
          id="editProblem"
          name="editProblem"
          variant="outlined"
          margin="normal"
          multiline // Enable multiline mode
          rows={3} // Set the number of rows
          value={editData.editProblem} 
          onChange={handleInputChange}
          error={!!errors.editProblem}
          helperText={errors.editProblem}
        />
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Select a Date for Appointment"
          id="date"
          name="editAppointmentDate"
          variant="outlined"
          margin="normal"
          type="date" 
          value={editData.editAppointmentDate} 
          onChange={handleInputChange}
          error={!!errors.editAppointmentDate}
          helperText={errors.editAppointmentDate}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleModalSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
