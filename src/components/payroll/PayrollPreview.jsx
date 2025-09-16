// import React, { useState, useMemo } from 'react';
// import { DataTable } from '@/components/DataTable';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { BreakdownCell } from './BreakdownCell'; 

// export const PayrollPreview = ({ previewData, payPeriod, onConfirm, onCancel, isLoading }) => {
//     const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

//     // const previewTableColumns = useMemo(() => [
//     //     {
//     //         id: 'employee',
//     //         header: () => <div className="text-center w-full">Employee</div>,
//     //         columns: [
//     //             {
//     //                 accessorKey: 'employee_name',
//     //                 header: 'Name',
//     //                 cell: ({ row }) => (
//     //                     <div className="font-medium">
//     //                         {row.original.employee_name}
//     //                         {row.original.error && <Badge variant="destructive" className="mt-1 whitespace-nowrap">{row.original.error}</Badge>}
//     //                     </div>
//     //                 ),
//     //             },
//     //         ]
//     //     },
//     //     {
//     //         id: 'attendance',
//     //         header: () => <div className="text-center w-full">Attendance Info</div>,
//     //         columns: [
//     //              {
//     //                 header: 'Present',
//     //                 accessorKey: 'attendance_summary.present_days',
//     //                 cell: info => <div className="text-center">{info.getValue() ?? 'N/A'}</div>
//     //             },
//     //             {
//     //                 header: 'Paid Leave',
//     //                 accessorKey: 'attendance_summary.paid_leave_days',
//     //                 cell: info => <div className="text-center">{info.getValue() ?? 'N/A'}</div>
//     //             },
//     //             {
//     //                 header: 'Unpaid Leave',
//     //                 accessorKey: 'attendance_summary.unpaid_leave_days',
//     //                 cell: info => <div className="text-center">{info.getValue() ?? 'N/A'}</div>
//     //             },
//     //         ]
//     //     },
//     //     {
//     //         id: 'salary',
//     //         header: () => <div className="text-center w-full">Base Salary Structure (Full Month)</div>,
//     //         columns: [
//     //             {
//     //                 header: 'Earnings',
//     //                 cell: ({ row }) => (
//     //                     <BreakdownCell 
//     //                         details={row.original.base_earnings} 
//     //                         total={row.original.total_base_earnings || 0}
//     //                     />
//     //                 ),
//     //             },
//     //             {
//     //                 header: 'Deductions',
//     //                 cell: ({ row }) => (
//     //                      <BreakdownCell 
//     //                         details={row.original.base_deductions} 
//     //                         total={row.original.total_base_deductions || 0}
//     //                     />
//     //                 ),
//     //             },
//     //             {
//     //                 header: 'Net Salary',
//     //                 accessorKey: 'base_net_salary',
//     //                 cell: ({ row }) => (
//     //                     <div className="text-base text-center p-4">
//     //                         {row.original.base_net_salary !== undefined ? `₹${row.original.base_net_salary.toFixed(2)}` : 'N/A'}
//     //                     </div>
//     //                 ),
//     //             },
//     //         ]
//     //     }
//     // ], []);



// const previewTableColumns = useMemo(() => [
//     {
//         id: 'employee',
//         header: () => <div className="text-center w-full">Employee</div>,
//         columns: [
//             {
//                 accessorKey: 'employee_name',
//                 header: 'Name',
//                 size: 200, // fixed width
//                 cell: ({ row }) => (
//                     <div className="font-medium truncate">
//                         {row.original.employee_name}
//                         {row.original.error && (
//                             <Badge variant="destructive" className="mt-1 whitespace-nowrap">
//                                 {row.original.error}
//                             </Badge>
//                         )}
//                     </div>
//                 ),
//             },
//         ]
//     },
//     {
//         id: 'attendance',
//         header: () => <div className="text-center w-full">Attendance Info</div>,
//         columns: [
//             {
//                 header: 'Present',
//                 accessorKey: 'attendance_summary.present_days',
//                 size: 100,
//                 cell: info => <div className="text-center">{info.getValue() ?? 'N/A'}</div>
//             },
//             {
//                 header: 'Paid Leave',
//                 accessorKey: 'attendance_summary.paid_leave_days',
//                 size: 100,
//                 cell: info => <div className="text-center">{info.getValue() ?? 'N/A'}</div>
//             },
//             {
//                 header: 'Unpaid Leave',
//                 accessorKey: 'attendance_summary.unpaid_leave_days',
//                 size: 100,
//                 cell: info => <div className="text-center">{info.getValue() ?? 'N/A'}</div>
//             },
//         ]
//     },
//     {
//         id: 'salary',
//         header: () => <div className="text-center w-full">Base Salary Structure (Full Month)</div>,
//         columns: [
//             {
//                 header: 'Earnings',
//                 size: 250,
//                 cell: ({ row }) => (
//                     <BreakdownCell 
//                         details={row.original.base_earnings} 
//                         total={row.original.total_base_earnings || 0}
//                     />
//                 ),
//             },
//             {
//                 header: 'Deductions',
//                 size: 200,
//                 cell: ({ row }) => (
//                     <BreakdownCell 
//                         details={row.original.base_deductions} 
//                         total={row.original.total_base_deductions || 0}
//                     />
//                 ),
//             },
//             {
//                 header: 'Net Salary',
//                 accessorKey: 'base_net_salary',
//                 size: 150,
//                 cell: ({ row }) => (
//                     <div className="text-base text-center p-4">
//                         {row.original.base_net_salary !== undefined
//                             ? `₹${row.original.base_net_salary.toFixed(2)}`
//                             : 'N/A'}
//                     </div>
//                 ),
//             },
//         ]
//     }
// ], []);


//     return (
//         <Card className="mt-4">
//             <CardHeader>
//                 <div className="flex justify-between items-center">
//                     <div>
//                         <CardTitle>Payroll Preview for {payPeriod.month}/{payPeriod.year}</CardTitle>
//                         <CardDescription>Verify the base salary structure and attendance data before final generation.</CardDescription>
//                     </div>
//                     <div className="flex gap-2">
//                         <Button variant="outline" onClick={onCancel}>Cancel</Button>
//                         <Button onClick={onConfirm} disabled={isLoading}>
//                             {isLoading ? 'Initiating...' : 'Confirm & Generate'}
//                         </Button>
//                     </div>
//                 </div>
//             </CardHeader>
//             <CardContent>
//                 <DataTable
//                     columns={previewTableColumns}
//                     data={previewData}
//                     pageCount={Math.ceil(previewData.length / pagination.pageSize)}
//                     pagination={pagination}
//                     setPagination={setPagination}
//                 />
//             </CardContent>
//         </Card>
//     );
// };


import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BreakdownCell } from './BreakdownCell';
import { PayrollPreviewTable } from './PayrollPreviewTable'; 

export const PayrollPreview = ({ previewData, payPeriod, onConfirm, onCancel, isLoading }) => {
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    const previewTableColumns = useMemo(() => [
                   {
            id: 'sl_no',
            header: () => <div className="font-semibold ">#</div>,
            columns: [
                 {
                    accessorKey: 'sl_no',
                    header: 'SL NO',
                    size: 20, 
                    cell: ({ row }) => (
                        <div className="font-medium text-sm py-2">
                            {row.index + 1}
                            {row.original.error && <Badge variant="destructive" className="mt-1 whitespace-nowrap">{row.original.error}</Badge>}
                        </div>
                    ),
                }
                
            ]
        },
                     {
            id: 'employee_group',
            header: () => <div className="font-semibold text-center">Employee</div>,
            columns: [
                 {
                    accessorKey: 'employee_id',
                    header: 'EID',
                    size: 80, 
                    cell: ({ row }) => (
                        <div className="font-medium text-sm py-2">
                            {row.original.employee_id}
                            {row.original.error && <Badge variant="destructive" className="mt-1 whitespace-nowrap">{row.original.error}</Badge>}
                        </div>
                    ),
                },
                {
                    accessorKey: 'employee_name',
                    header: 'Name',
                    size: 200, 
                    cell: ({ row }) => (
                        <div className="font-medium text-sm py-2">
                            {row.original.employee_name}
                            {row.original.error && <Badge variant="destructive" className="mt-1 whitespace-nowrap">{row.original.error}</Badge>}
                        </div>
                    ),
                },
            ]
        },
        {
            id: 'attendance_group',
            header: () => <div className="text-center font-semibold ">Attendance Info (in days) </div>,
            columns: [
                  {
                    header: 'Total',
                    accessorKey: 'attendance_summary.totalDaysInMonth',
                    size: 30, 
                    cell: info => <div className="text-center py-2">{info.getValue() ?? 'N/A'}</div>
                },
                 {
                    header: 'Present',
                    accessorKey: 'attendance_summary.present_days',
                    size: 30, 
                    cell: info => <div className="text-center py-2">{info.getValue() ?? 'N/A'}</div>
                },
                {
                    header: 'Paid Leave',
                    accessorKey: 'attendance_summary.paid_leave_days',
                    size: 30, 
                    cell: info => <div className="text-center py-2">{info.getValue() ?? 'N/A'}</div>
                },
              
                {
                    header: 'Loss of pay',
                    accessorKey: 'attendance_summary.unpaid_leave_days',
                    size: 30, 
                    cell: info => <div className="text-center py-2">{info.getValue() ?? 'N/A'}</div>
                },
            ]
        },
        {
            id: 'salary_group',
            header: () => <div className="text-center font-semibold">Salary Structure (Month)</div>,
            columns: [
                {
                    header: 'Earnings',
                    size: 350, 
                    cell: ({ row }) => (
                        <div className="p-2">
                            <BreakdownCell 
                                details={row.original.base_earnings} 
                                total={row.original.total_base_earnings || 0}
                            />
                        </div>
                    ),
                },
                {
                    header: 'Deductions',
                    size: 350, 
                    cell: ({ row }) => (
                         <div className="p-2">
                            <BreakdownCell 
                                details={row.original.base_deductions} 
                                total={row.original.total_base_deductions || 0}
                            />
                        </div>
                    ),
                },
                {
                    header: 'Net Salary',
                    accessorKey: 'base_net_salary',
                    size: 50, 
                    cell: ({ row }) => (
                        <div className="text-center p-4">
                            {row.original.base_net_salary !== undefined ? `₹${row.original.base_net_salary.toFixed(2)}` : ''}
                        </div>
                    ),
                },
            ]
        }
    ], []);

    return (
        <Card className="mt-4">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Payroll Preview for {payPeriod.month}/{payPeriod.year}</CardTitle>
                        <CardDescription>Verify the base salary structure and attendance data before final generation.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onCancel}>Cancel</Button>
                        <Button onClick={onConfirm} disabled={isLoading}>
                            {isLoading ? 'Initiating...' : 'Confirm & Generate'}
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <PayrollPreviewTable

                    columns={previewTableColumns}
                    data={previewData}
                    pagination={pagination}
                    setPagination={setPagination}
                />
            </CardContent>
        </Card>
    );
};