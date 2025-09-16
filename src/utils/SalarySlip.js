

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export function generateSalarySlipPDF(slip) {
  if (!slip) return;

  const structureBreakdown = slip.structure_breakdown || { breakdown: [] };
  const attendanceBreakdown = slip.attendance_breakdown || {};
  const earnings = structureBreakdown.breakdown?.filter(c => c.type === "Earning") || [];
  const deductions = structureBreakdown.breakdown?.filter(c => c.type === "Deduction") || [];

  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const pageWidth = doc.internal.pageSize.width;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Salary Slip", pageWidth / 2, 40, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 55, { align: "center" });

  const employeeInfo = [
    ["Employee ID:", slip.employee_id],
    ["Employee Name:", slip.employee_name],
    ["Total Payable Days:", slip.total_payable_days],
    ["Net Salary Paid:", slip.net_salary]
  ];

  autoTable(doc, {
    startY: 75,
    body: employeeInfo,
    theme: "plain",
    styles: { fontSize: 10, cellPadding: 3, lineColor: 200, lineWidth: 0.2 },
    columnStyles: { 0: { fontStyle: "bold", halign: "left" }, 1: { halign: "left" } }
  });

  let y = doc.lastAutoTable.finalY + 15;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Earnings", 40, y);
  autoTable(doc, {
    startY: y + 5,
    head: [["Component", "Amount"]],
    body: [
      ...earnings.map(e => [e.name, e.amount]),
      [{ content: "Total Potential Earnings", styles: { fontStyle: "bold" } }, slip.gross_earnings]
    ],
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 4, lineColor: 180, lineWidth: 0.5 },
    headStyles: { 
  fillColor: [245, 245, 245],  
  textColor: 0,                
  fontStyle: "bold"
}
,
    columnStyles: { 0: { halign: "left" }, 1: { halign: "right" } }
  });

  y = doc.lastAutoTable.finalY + 15;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Deductions", 40, y);
  autoTable(doc, {
    startY: y + 5,
    head: [["Component", "Amount"]],
    body: [
      ...deductions.map(d => [d.name, d.amount]),
      [{ content: "Total Deductions", styles: { fontStyle: "bold" } }, slip.total_deductions]
    ],
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 4, lineColor: 180, lineWidth: 0.5 },
    headStyles: { 
  fillColor: [245, 245, 245], 
  textColor: 0,                
  fontStyle: "bold"
}
,
    columnStyles: { 0: { halign: "left" }, 1: { halign: "right" } }
  });

  y = doc.lastAutoTable.finalY + 15;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Attendance Summary", 40, y);
  autoTable(doc, {
    startY: y + 5,
    head: [["Metric", "Days"]],
    body: [
      ["Days Present", attendanceBreakdown.presentDays ?? "N/A"],
      ["Paid Leave Days", attendanceBreakdown.paidLeaveDays ?? "N/A"],
      ["Loss of Pay", attendanceBreakdown.unpaidDays ?? "N/A"]
    ],
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 4, lineColor: 180, lineWidth: 0.5 },
   headStyles: { 
  fillColor: [245, 245, 245],  
  textColor: 0,                
  fontStyle: "bold"
}
,
    columnStyles: { 0: { halign: "left" }, 1: { halign: "right" } }
  });

  y = doc.lastAutoTable.finalY + 20;

  autoTable(doc, {
    startY: y,
    body: [
      [{ content: "Net Salary", styles: { fontStyle: "bold" } }, slip.net_salary]
    ],
    theme: "grid",
    styles: { fontSize: 11, cellPadding: 6, lineColor: 0, lineWidth: 0.7 },
    columnStyles: { 0: { halign: "left" }, 1: { halign: "right" } }
  });

  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(
    "This is a system-generated document and does not require a signature.",
    40,
    doc.internal.pageSize.height - 30
  );

  doc.save(`SalarySlip-${slip.employee_id}-${slip.employee_name}.pdf`);
}
