import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (appointmentDetails) => {
  const doc = new jsPDF();
  const serviceCenterPrice= 9000;

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');

  doc.text('VacServ - Invoice', 10, 15);

  doc.setFontSize(12);
  doc.setFont('normal');
  const appointmentsData = [
    ['Product Name', 'Product Model No.', 'Service Center', 'Date', 'Price',],
    ...appointmentDetails.map((appointment) => [
      appointment.productName,
      appointment.productModelNo,
      appointment.serviceCenterName,
      appointment.availableSlots,
      serviceCenterPrice
    ]),
  ];

  doc.autoTable({
    startY: 80,
    head: appointmentsData.slice(0, 1), 
    body: appointmentsData.slice(1), 
    headStyles: { fillColor: [0, 51, 102] },
    theme: 'striped',
  });

  doc.save('bill.pdf');
};
