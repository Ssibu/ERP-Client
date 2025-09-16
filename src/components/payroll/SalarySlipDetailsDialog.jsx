

// import React from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
// import { Separator } from "@/components/ui/separator";


// const SalarySlipDetailsDialog = ({ slip, open, onOpenChange }) => {
    
//   if (!slip) return null;

//   const structureBreakdown = slip.structure_breakdown || { breakdown: [] };
//   const attendanceBreakdown = slip.attendance_breakdown || {};

//   const earnings = structureBreakdown.breakdown?.filter(c => c.type === 'Earning') || [];
//   const deductions = structureBreakdown.breakdown?.filter(c => c.type === 'Deduction') || [];

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-5xl font-mono">
//         <DialogHeader>
//           <DialogTitle>Salary Slip Details</DialogTitle>
//           <DialogDescription>
//              <strong>EID: {slip.employee_id}</strong>
//           </DialogDescription>
//                <DialogDescription>
//              <strong>{slip.employee_name}</strong>
//           </DialogDescription>
//         </DialogHeader>
        
//         <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
//             <div className="space-y-1">
//                 <p className="text-muted-foreground">Gross Earnings (Potential)</p>
//                 <p className="font-semibold">{slip.gross_earnings}</p>
//             </div>
//             <div className="space-y-1 text-right">
//                 <p className="text-muted-foreground">Total Deductions</p>
//                 <p className="font-semibold">{slip.total_deductions}</p>
//             </div>
//              <div className="space-y-1 col-span-2 text-center border-t pt-2">
//                 <p className="text-muted-foreground">Net Salary Paid</p>
//                 <p className="font-bold text-lg">{slip.net_salary}</p>
//             </div>
//         </div>

//         <Separator className="my-4" />

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-1">
//                  <h4 className="font-semibold mb-2">Attendance Summary</h4>
//                  <Table>
//                     <TableBody>
//                         <TableRow>
//                             <TableCell className="text-muted-foreground">Days Present</TableCell>
//                             <TableCell className="text-right font-medium">{attendanceBreakdown.presentDays ?? 'N/A'}</TableCell>
//                         </TableRow>
//                          <TableRow>
//                             <TableCell className="text-muted-foreground">Paid Leave Days</TableCell>
//                             <TableCell className="text-right font-medium">{attendanceBreakdown.paidLeaveDays ?? 'N/A'}</TableCell>
//                         </TableRow>
//                         <TableRow className="font-bold bg-slate-50 dark:bg-slate-800">
//                             <TableCell>Total Payable Days</TableCell>
//                             <TableCell className="text-right">{slip.total_payable_days}</TableCell>
//                         </TableRow>
//                          <TableRow>
//                             <TableCell className="text-muted-foreground">Loss of pay</TableCell>
//                             <TableCell className="text-right font-medium">{attendanceBreakdown.unpaidDays ?? 'N/A'}</TableCell>
//                         </TableRow>
//                     </TableBody>
//                  </Table>
//             </div>

//             <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                     <h4 className="font-semibold mb-2">Earnings Breakdown</h4>
//                     <Table>
//                         <TableHeader><TableRow><TableHead>Component</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
//                         <TableBody>
//                             {earnings.map(item => (
//                                 <TableRow key={item.name}><TableCell>{item.name}</TableCell><TableCell className="text-right">{item.amount}</TableCell></TableRow>
//                             ))}
//                             <TableRow className="font-bold bg-slate-50 dark:bg-slate-800"><TableCell>Total Potential Earnings</TableCell><TableCell className="text-right">{slip.gross_earnings}</TableCell></TableRow>
//                         </TableBody>
//                     </Table>
//                 </div>
                
//                 <div>
//                     <h4 className="font-semibold mb-2">Deductions Breakdown</h4>
//                     <Table>
//                         <TableHeader><TableRow><TableHead>Component</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
//                         <TableBody>
//                             {deductions.map(item => (
//                                 <TableRow key={item.name}><TableCell>{item.name}</TableCell><TableCell className="text-right">{item.amount}</TableCell></TableRow>
//                             ))}
//                             <TableRow className="font-bold bg-slate-50 dark:bg-slate-800"><TableCell>Total Deductions</TableCell><TableCell className="text-right">{slip.total_deductions}</TableCell></TableRow>
//                         </TableBody>
//                     </Table>
//                 </div>
//             </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default SalarySlipDetailsDialog;





import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { generateSalarySlipPDF } from "@/utils/SalarySlip";
import { Button } from '../ui/button';
import { getMonthNameFromMonthNumber } from '@/utils/dateFormat';

const SalarySlipDetailsDialog = ({ slip, open, onOpenChange }) => {
    
  if (!slip) return null;

  const structureBreakdown = slip.structure_breakdown || { breakdown: [] };
  const attendanceBreakdown = slip.attendance_breakdown || {};

  const earnings = structureBreakdown.breakdown?.filter(c => c.type === 'Earning') || [];
  const deductions = structureBreakdown.breakdown?.filter(c => c.type === 'Deduction') || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl font-mono">
        <DialogHeader>
          <DialogTitle>Salary Slip Details</DialogTitle>
          <DialogDescription>
             <strong>EID: {slip.employee_id}</strong>
          </DialogDescription>
               <DialogDescription>
             <strong>{slip.employee_name}</strong>
          </DialogDescription>
            <DialogDescription>
             <p>{getMonthNameFromMonthNumber(slip.month)}, {slip.year}</p>
          </DialogDescription>
           
           
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div className="space-y-1">
                <p className="text-muted-foreground">Gross Earnings (Potential)</p>
                <p className="font-semibold">{slip.gross_earnings}</p>
            </div>
            <div className="space-y-1 text-right">
                <p className="text-muted-foreground">Total Deductions</p>
                <p className="font-semibold">{slip.total_deductions}</p>
            </div>
             <div className="space-y-1 col-span-2 text-center border-t pt-2">
                <p className="text-muted-foreground">Net Salary Paid</p>
                <p className="font-bold text-lg">{slip.net_salary}</p>
            </div>
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                 <h4 className="font-semibold mb-2">Attendance Summary</h4>
                 <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Days Present</TableCell>
                            <TableCell className="text-right font-medium">{attendanceBreakdown.presentDays ?? 'N/A'}</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell className="text-muted-foreground">Paid Leave Days</TableCell>
                            <TableCell className="text-right font-medium">{attendanceBreakdown.paidLeaveDays ?? 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow className="font-bold bg-slate-50 dark:bg-slate-800">
                            <TableCell>Total Payable Days</TableCell>
                            <TableCell className="text-right">{slip.total_payable_days}</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell className="text-muted-foreground">Loss of pay</TableCell>
                            <TableCell className="text-right font-medium">{attendanceBreakdown.unpaidDays ?? 'N/A'}</TableCell>
                        </TableRow>
                    </TableBody>
                 </Table>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold mb-2">Earnings Breakdown</h4>
                    <Table>
                        <TableHeader><TableRow><TableHead>Component</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {earnings.map(item => (
                                <TableRow key={item.name}><TableCell>{item.name}</TableCell><TableCell className="text-right">{item.amount}</TableCell></TableRow>
                            ))}
                            <TableRow className="font-bold bg-slate-50 dark:bg-slate-800"><TableCell>Total Potential Earnings</TableCell><TableCell className="text-right">{slip.gross_earnings}</TableCell></TableRow>
                        </TableBody>
                    </Table>
                </div>
                
                <div>
                    <h4 className="font-semibold mb-2">Deductions Breakdown</h4>
                    <Table>
                        <TableHeader><TableRow><TableHead>Component</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {deductions.map(item => (
                                <TableRow key={item.name}><TableCell>{item.name}</TableCell><TableCell className="text-right">{item.amount}</TableCell></TableRow>
                            ))}
                            <TableRow className="font-bold bg-slate-50 dark:bg-slate-800"><TableCell>Total Deductions</TableCell><TableCell className="text-right">{slip.total_deductions}</TableCell></TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
        <DialogFooter>
            <Button onClick={() => generateSalarySlipPDF(slip)} size="sm" variant="outline">
            Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SalarySlipDetailsDialog;
