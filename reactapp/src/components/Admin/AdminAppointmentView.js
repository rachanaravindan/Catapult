import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AdminNavbar from "./AdminNavBar";
import { Typography, Fab, Modal, Box, TextField, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { saveAs } from "file-saver";
import "jspdf-autotable";
import jsPDF from "jspdf";
import AddIcon from "@mui/icons-material/Add";
import Footer from "../Footer";
import Axios from "axios";

const columns = [
  { field: "productId", headerName: "Appointment ID", width: 100 },
  { field: "productName", headerName: "Product Name", width: 200 },
  { field: "productModelNo", headerName: "Product Model No", width: 200 },
  { field: "availableSlots", headerName: "Available Slots", width: 150 },
  { field: "serviceCenterName", headerName: "Service Center", width: 300 },
  { field: "dateOfPurchase", headerName: "Date of Purchase", width: 150 },
  { field: "mobileNumber", headerName: "Mobile Number", width: 150 },
  {
    field: "productDescription",
    headerName: "Problem Description",
    width: 400,
  },
];

const AdminAppointmentView = () => {
  const [appointments, setAppointments] = useState([]);
  const [dateAppointments, setDateAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const handleGenerateReport = async () => {
    // Check if both start and end dates are selected
    if (selectedStartDate && selectedEndDate) {
      const formattedStartDate = new Date(selectedStartDate).toISOString().split('T')[0];
      const formattedEndDate = new Date(selectedEndDate).toISOString().split('T')[0];
      console.log(formattedStartDate);
      console.log(formattedEndDate);
      try{
        const response = await Axios.get(`http://localhost:8080/admin/getAppointmentsByDateRange`, {
          params:{
            startDate: formattedStartDate,
            endDate: formattedEndDate
          }
        });
        console.log(response.data);
        const appointmentData = response.data;
        createPdf(appointmentData);

        //createPdf(dateAppointments);
      } catch (error) {
        console.error("Error fetching the appointments: ", error);
      }
      setIsModalOpen(false);
    } else {
      alert("Please select both start and end dates.");
    }
  };

  useEffect(() => {
    //fetch(`https://8080-beacfdbedeedadecdcbbcffffdccbe.premiumproject.examly.io/admin/appointment`)
    fetch(`http://localhost:8080/admin/appointment`)
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  const getRowId = (row) => row.productId;

  const createPdf = (appointmentData) => {
    const pdf = new jsPDF();
    pdf.text("VacServ - Appointments", 10, 10);
    const headers = columns.map((column) => column.headerName);
    const tableData = appointmentData.map((appointment) =>
      columns.map((column) => appointment[column.field])
    );
    pdf.autoTable({
      head: [headers],
      body: tableData,
      startY: 20,
    });
    pdf.save("appointments.pdf");
  };

  return (
    <div>
      <AdminNavbar />
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
        style={{ marginTop: "3%" }}
      >
        Appointments
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <div style={{ height: 400, width: "90%" }}>
          <DataGrid
            rows={appointments}
            columns={columns}
            pageSize={5}
            checkboxSelection
            getRowId={getRowId}
            style={{ marginBottom: "60px" }}
          />
        </div>
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              width: 400,
              backgroundColor: "white",
              boxShadow: 24,
              p: 2,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="From Date of Appointments"
              id="fromDateOfAppointment"
              name="fromDateOfAppointment"
              variant="outlined"
              margin="normal"
              type="date"
              value={selectedStartDate}
              onChange={(e) => setSelectedStartDate(e.target.value)}
            />
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="To Date of Appointments"
              id="toDateOfAppointment"
              name="toDateOfAppointment"
              variant="outlined"
              margin="normal"
              type="date"
              value={selectedEndDate}
              onChange={(e) => setSelectedEndDate(e.target.value)}
            />
            <Button onClick={handleGenerateReport}>Generate Report</Button>
          </Box>
        </Modal>

        <Fab
          color="primary"
          aria-label="Generate Report"
          style={{
            position: "fixed",
            backgroundColor: "black",
            bottom: "20px",
            right: "20px",
            width: "100px",
            height: "90px",
            borderRadius: "10px",
            transition: "transform 0.2s, font-size 0.2s",
            boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.8)", // adding drop shadow
          }}
          onClick={() => setIsModalOpen(true)}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.fontSize = "14px";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.fontSize = "14px";
          }}
        >
          Generate Report
        </Fab>
      </div>
      {/* <Footer style={{ marginBottom: '30px' }} /> */}
    </div>
  );
};

export default AdminAppointmentView;
