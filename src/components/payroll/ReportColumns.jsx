// export const columns = [
//      {
//         id: 'sl_no', 
//         header: "SL NO",
//         cell: ({ row, table }) => {
//             const pageIndex = table.getState().pagination.pageIndex;
//             const pageSize = table.getState().pagination.pageSize;
            
//             const serialNumber = pageIndex * pageSize + row.index + 1;
            
//             return <span>{serialNumber}</span>;
//         },
//     },
//     {
//         accessorKey: "employee.id",
//         header: "Emp ID",
//     },
//     {
//         accessorKey: "employee.name",
//         header: "Employee Name",
//     },
//     {
//         accessorKey: "salaryDetails.grossSalary",
//         header: "Gross Salary",
//     },
//     {
//         accessorKey: "attendanceBreakdown.presentDays",
//         header: "Present",
//     },
//     {
//         accessorKey: "attendanceBreakdown.paidLeaveDays",
//         header: "Paid Leave",
//     },
//     {
//         accessorKey: "attendanceBreakdown.totalPayableDays",
//         header: "Payable Days",
//     },
//      {
//         accessorKey: "attendanceBreakdown.unpaidDays",
//         header: "Unpaid Days",
//     },
//     {
//         accessorKey: "salaryDetails.deductions",
//         header: "Deductions",
//     },
//     {
//         accessorKey: "salaryDetails.netSalary",
//         header: "Net Salary",
//     },
// ];

import { Button } from "../ui/button";

export const columns = [
    { accessorKey: "employee_name", header: "Employee Name" },
    { accessorKey: "gross_earnings", header: "Gross Earnings" },
    { accessorKey: "total_payable_days", header: "Payable Days" },
    { accessorKey: "total_deductions", header: "Total Deductions" },
    { accessorKey: "net_salary", header: "Net Salary" },
    // You can add a button here to view the detailed breakdown
    {
        id: 'actions',
        cell: ({ row }) => {
            const slip = row.original;
            // This button would open a modal displaying slip.structure_breakdown
            return <Button variant="ghost" size="sm">View Details</Button>
        }
    }
];