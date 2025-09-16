
import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';

import { getRecentReports, initiatePayrollGeneration, getReportStatus, getPayrollReport, getPayrollPreview } from '@/services/payroll-service';
import { DataTable } from '@/components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Eye, ReceiptText, ArrowRight } from 'lucide-react';

import SalarySlipDetailsDialog from '@/components/payroll/SalarySlipDetailsDialog';
import { PayrollGeneratorForm } from '@/components/payroll/PayrollGeneratorForm';
import { PayrollPreview } from '@/components/payroll/PayrollPreview';
import {PERMISSIONS} from "@/config/permissions"
import useAuth from "@/hooks/useAuth";
import AccessDenied from "@/components/AccessDenied";

const PayrollPage = () => {
    const [previewData, setPreviewData] = useState(null);
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);
    const [payPeriod, setPayPeriod] = useState(null);

    const [recentReports, setRecentReports] = useState([]);
    const [activeReport, setActiveReport] = useState(null); 
    const [isGenerating, setIsGenerating] = useState(false);
    const [isPolling, setIsPolling] = useState(false);
    
    const [selectedSlip, setSelectedSlip] = useState(null);
    const [reportPagination, setReportPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const {user} = useAuth()

    const canViewPage = user?.is_master || user?.permissions.includes(PERMISSIONS.PAGES.PAYROLL_MANAGEMENT);
    const canUpdate = user?.is_master || user?.permissions.includes(PERMISSIONS.PAYROLL.GENERATE_REPORT);

    const fetchRecent = async () => {
        try {
            const reports = await getRecentReports();
            setRecentReports(reports);
        } catch (error) {
            toast.error("Failed to load recent reports.", { description: error.message });
        }
    };

    useEffect(() => { fetchRecent(); }, []);

    useEffect(() => {
        if (!isPolling || !activeReport?.id) return;
        const intervalId = setInterval(async () => {
            try {
                const statusData = await getReportStatus(activeReport.id);
                if (statusData.status === 'completed' || statusData.status === 'failed') {
                    setIsPolling(false);
                    clearInterval(intervalId);
                    const message = statusData.status === 'completed' ? `Payroll for ${activeReport.month}/${activeReport.year} is ready!` : `Payroll generation failed.`;
                    toast[statusData.status === 'completed' ? 'success' : 'error'](message, { description: statusData.error_log });
                    const finalReport = await getPayrollReport(activeReport.id);
                    setActiveReport(finalReport);
                }
            } catch (error) {
                setIsPolling(false);
                clearInterval(intervalId);
                toast.error("Failed to get report status.", { description: error.message });
            }
        }, 5000);
        return () => clearInterval(intervalId);
    }, [isPolling, activeReport]);

    const handlePreview = async (data) => {
        setIsPreviewLoading(true);
        setPreviewData(null);
        setActiveReport(null);
        setPayPeriod(data);
        try {
            const previewResult = await getPayrollPreview(data);
            setPreviewData(previewResult);
        } catch (error) {
            toast.error("Failed to generate preview.", { description: error.message });
        } finally {
            setIsPreviewLoading(false);
        }
    };
    
    const handleConfirmGeneration = async () => {
        if (!payPeriod) return;
        setIsGenerating(true);
        setPreviewData(null);
        try {
            const result = await initiatePayrollGeneration(payPeriod);
            toast.info("Payroll generation started.", { description: "Report will appear when ready." });
            setActiveReport({ id: result.reportId, status: 'processing', ...payPeriod });
            setIsPolling(true);
        } catch (error) {
            toast.error("Failed to initiate generation.", { description: error.message });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleViewReport = async (reportId) => {
        setPreviewData(null);
        setActiveReport({ id: reportId, status: 'loading' });
        try {
            const reportData = await getPayrollReport(reportId);
            setActiveReport(reportData);
        } catch (error) {
            toast.error("Failed to load report.", { description: error.message });
            setActiveReport(null);
        }
    };
    
    const reportTableColumns = useMemo(() => [
        { id: 'sl_no', header: "SL NO", cell: ({ row, table }) => <span>{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + row.index + 1}</span> },
        { accessorKey: "employee_id", header: "EID" },
        { accessorKey: "employee_name", header: "Name" },
        { accessorKey: "net_salary", header: "Net Salary", cell: ({row}) => `₹${row.original.net_salary}` },
        { id: 'actions', header: "Slip", cell: ({ row }) => <Button variant="ghost" size="icon" onClick={() => setSelectedSlip(row.original)}><ReceiptText/></Button> }
    ], []);

    const getStatusBadge = (status) => {
        const variants = { completed: 'success', processing: 'secondary', failed: 'destructive', loading: 'outline' };
        const text = { completed: 'Completed', processing: 'Processing...', failed: 'Failed', loading: 'Loading...' };
        return <Badge variant={variants[status] || 'default'}>{text[status]}</Badge>;
    };

    if(!canViewPage) return <AccessDenied/>

    return (
      <div>
  {
    canUpdate ? (
      <>
        <PayrollGeneratorForm 
          onPreview={handlePreview} 
          isLoading={isPreviewLoading} 
          isPolling={isPolling} 
        />

        {previewData && (
          <PayrollPreview 
            previewData={previewData}
            payPeriod={payPeriod}
            onConfirm={handleConfirmGeneration}
            onCancel={() => setPreviewData(null)}
            isLoading={isGenerating || isPolling}
          />
        )}

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-4">
          <Card className="xl:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Reports</CardTitle>
              <Button size="sm" variant="secondary" onClick={fetchRecent}>
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recentReports.length > 0 ? (
                  recentReports.map(report => (
                    <li key={report.id} className="flex justify-between items-center p-2">
                      <span>{report.month}/{report.year}</span>
                      {getStatusBadge(report.status)}
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleViewReport(report.id)} 
                        disabled={report.status !== 'completed'}
                      >
                        <ArrowRight />
                      </Button>
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">No reports available</li>
                )}
              </ul>
            </CardContent>
          </Card>
          
          <div className="xl:col-span-3">
            {activeReport && activeReport.status === 'completed' && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Payroll Report for {activeReport.month}/{activeReport.year}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={reportTableColumns}
                    data={activeReport.SalarySlips || []}
                    pageCount={Math.ceil((activeReport.SalarySlips?.length || 0) / reportPagination.pageSize)}
                    pagination={reportPagination}
                    setPagination={setReportPagination}
                  />
                </CardContent>
              </Card>
            )}
            {(isPolling || isGenerating || activeReport?.status === 'loading') && (
              <div className="h-full flex flex-col items-center justify-center p-8 border rounded-lg">
                <Spinner />
                <p className="font-semibold mt-2">
                  {activeReport?.status === 'loading' 
                    ? 'Loading Report...' 
                    : 'Payroll generation in progress...'}
                </p>
                <p className="text-sm text-muted-foreground">This may take a moment.</p>
              </div>
            )}
          </div>
        </div>

        <SalarySlipDetailsDialog
          slip={selectedSlip}
          open={!!selectedSlip}
          onOpenChange={(isOpen) => !isOpen && setSelectedSlip(null)}
        />
      </>
    ) : (
      <AccessDenied/>
    )
  }
</div>

    );
};

export default PayrollPage;