import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

const SalarySlip = ({ slipData }) => {
    if (!slipData) return null;

    const { employee, payPeriod, salaryDetails, attendanceBreakdown } = slipData;

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Salary Slip</CardTitle>
                <CardDescription>
                    For {employee.name} (ID: {employee.id}) for the period of {payPeriod.month}/{payPeriod.year}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold mb-2">Calculation Summary</h3>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Gross Salary</TableCell>
                                    <TableCell className="text-right font-medium">  {salaryDetails.grossSalary}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Deductions ({attendanceBreakdown.unpaidDays} days)</TableCell>
                                    <TableCell className="text-right font-medium">- {salaryDetails.deductions}</TableCell>
                                </TableRow>
                                <TableRow className="bg-slate-100 dark:bg-slate-800">
                                    <TableCell className="font-bold">Net Salary Payable</TableCell>
                                    <TableCell className="text-right font-bold">{salaryDetails.netSalary}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>



                    <div>
                        <h3 className="font-semibold mb-2">Attendance Breakdown</h3>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Total Days in Month</TableCell>
                                    <TableCell className="text-right">{salaryDetails.totalDaysInMonth}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Days Present</TableCell>
                                    <TableCell className="text-right">{attendanceBreakdown.presentDays}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Paid Leave Days</TableCell>
                                    <TableCell className="text-right">{attendanceBreakdown.paidLeaveDays}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">Total Payable Days</TableCell>
                                    <TableCell className="text-right font-semibold">{salaryDetails.totalPayableDays}</TableCell>
                                </TableRow>
                                <Separator />
                                <TableRow>
                                    <TableCell className="text-muted-foreground">Unpaid / Absent Days</TableCell>
                                    <TableCell className="text-right font-semibold">{attendanceBreakdown.unpaidDays}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SalarySlip;