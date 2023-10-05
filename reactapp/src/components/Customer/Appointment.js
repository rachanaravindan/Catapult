import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import Navbar from "../Navbar";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditBookingModal from "./EditBookingModal";
import ReviewModal from "./ReviewModal";
import { generatePDF } from "./BillGenerator";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const tableContainerStyle = {
  marginTop: "50px",
  marginBottom: "20px", 
  maxWidth: "90%",
  textAlign: "center",
  marginLeft: "auto",
  marginRight: "auto", 
};

const columnWidths = {
  productId: "10%",
  name: "30%", 
  date: "20%", 
  timings: "20%",
  edit: "5%",
  delete: "5%",
  billGen: "5%",
  review: "5%", 
};


const handleGenerateBillClick = (appointmentDetails) => {
  generatePDF(appointmentDetails); 
};

export default function Appointment() {
  const params = useParams();
  const { userId, serviceCenterId } = useParams();
  console.log("User ID:", userId);
  const [open, setOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [userAppointments, setUserAppointments] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [refreshSnackbarOpen, setRefreshSnackbarOpen] = useState(false);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);

  const showSuccessSnackbar = () => {
    setSuccessSnackbarOpen(true);
  };

  const hideSuccessSnackbar = () => {
    setSuccessSnackbarOpen(false);
  };

  const handleOpenDeleteConfirmation = (productId) => {
    setDeletingProductId(productId);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    setDeletingProductId(null);
  };

  const handleOpen = (appointment) => {
    setEditProductId(appointment.productId); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReviewOpen = () => {
    setReviewOpen(true);
  };

  const handleReviewClose = () => {
    setReviewOpen(false);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/user/getappointments/${userId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch appointments");
        }
      })
      .then((data) => {
        console.log(data);
        setUserAppointments(data); 
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [userId]); //userId as dependency

  const handleCancelAppointment = (productId) => {
    fetch(`http://localhost:8080/user/cancelappointment/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Appointment canceled successfully");
          setUserAppointments((prevAppointments) =>
            prevAppointments.filter(
              (appointment) => appointment.productId !== productId
            )
          );
        } else {
          
          console.error("Failed to cancel appointment");
        }
      })
      .catch((error) => {
        console.error("Error canceling appointment:", error);
      });
  };

  const updateAppointments = (productId, updatedAppointment) => {
    setUserAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.productId === productId ? updatedAppointment : appointment
      )
    );
  };


  // Function to check if a date is greater than or equal to the current date
  const isDateValid = (dateStr) => {
    const currentDate = new Date();
    const inputDate = new Date(dateStr);
    return currentDate >= inputDate;
  };

  return (
    <div>
      <Navbar userId={userId} />
      <TableContainer component={Paper} style={tableContainerStyle}>
        <Table aria-label="basic table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: columnWidths.productId }}>
                Appointment ID
              </TableCell>
              <TableCell style={{ width: columnWidths.name }}>Name</TableCell>
              <TableCell style={{ width: columnWidths.date }}>
                Service Center
              </TableCell>
              <TableCell style={{ width: columnWidths.timings }}>
                Date of Appointment
              </TableCell>
              <TableCell style={{ width: columnWidths.edit }}>Edit</TableCell>
              <TableCell style={{ width: columnWidths.delete }}>
                Delete
              </TableCell>
              <TableCell style={{ width: columnWidths.billGen }}>
                Generated Bill
              </TableCell>
              <TableCell style={{ width: columnWidths.review }}>
                Review
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.productId}</TableCell>
                <TableCell>{appointment.productName}</TableCell>
                <TableCell>{appointment.serviceCenterName}</TableCell>
                <TableCell>{appointment.availableSlots}</TableCell>
                <TableCell>
                  {console.log(appointment)}
                  <Button
                    variant="outlined"
                    style={{ color: "black", borderColor: "black" }}
                    onClick={() => handleOpen(appointment)} 
                  >
                    <strong>Edit</strong>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    style={{ color: "red", borderColor: "red" }}
                    onClick={() =>
                      handleOpenDeleteConfirmation(appointment.productId)
                    } 
                  >
                    <strong>Delete</strong>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    style={{
                      color: "black",
                      borderColor: "#1111",
                      pointerEvents: isDateValid(appointment.availableSlots)
                        ? "auto"
                        : "auto",
                      backgroundColor: isDateValid(appointment.availableSlots)
                        ? "white"
                        : "#1111",
                    }}
                    disabled={!isDateValid(appointment.availableSlots)}
                    title={
                      isDateValid(appointment.availableSlots)
                        ? "Click to Generate Bill"
                        : "Generated bill will be provided only after service"
                    }
                    onClick={() => handleGenerateBillClick([appointment])}
                  >
                    <strong>Generate Bill</strong>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{
                      color: "fcde32",
                      borderColor: "#fcde32",
                      backgroundColor: isDateValid(appointment.availableSlots)
                        ? "#fcde32"
                        : "#1111",
                    }}
                    onClick={handleReviewOpen}
                    disabled={!isDateValid(appointment.availableSlots)}
                    title={
                      isDateValid(appointment.availableSlots)
                        ? "Click to Generate Bill"
                        : "Generated bill will be provided only after service"
                    }
                  >
                    <strong>Review</strong>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Render the Dialog component */}
      <EditBookingModal
        open={open}
        handleClose={handleClose}
        productId={editProductId}
        setUserAppointments={setUserAppointments}
        updateAppointments={updateAppointments}
        serviceCenterName={Appointment.serviceCenterName}
        showSuccessSnackbar={showSuccessSnackbar}
        hideSuccessSnackbar={hideSuccessSnackbar}
        // serviceCenterPrice={Appointment.serviceCenterPrice}
      />
      {/* Snackbar for "Edited successfully!" */}
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={hideSuccessSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={hideSuccessSnackbar}
          severity="success"
          style={{ backgroundColor: "#5EBA7D", color: "white" }}
        >
          Edited successfully! Kindly refresh page.
        </Alert>
      </Snackbar>

      {/* Snackbar for "Kindly refresh page" */}
      <ReviewModal reviewOpen={reviewOpen} handleClose={handleReviewClose} />
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this appointment?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleCancelAppointment(deletingProductId); 
              handleCloseDeleteConfirmation(); 
            }}
            color="primary"
            variant="contained"
            style={{ backgroundColor: "red", color: "white" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
