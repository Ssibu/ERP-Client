

import React, { useState, useEffect, useCallback , useMemo} from 'react';
import { toast } from 'sonner';

import { getLeaveConfig, getCalendarData } from '@/services/leave-service';

import LeaveBalanceIndicator from '@/components/leave/LeaveBalanceIndicator';
import InteractiveLeaveCalendar from '@/components/leave/InteractiveLeaveCalendar';
import LeaveSummaryPanel from '@/components/leave/LeaveSummaryPanel';
import PendingRequestCard from '@/components/leave/PendingRequestCard';

import { Spinner } from '@/components/ui/spinner';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from '@/components/ui/button';
import { RefreshCw, History } from 'lucide-react';
import { Link } from 'react-router-dom';

const RequestLeavePage = () => {
    const [balanceData, setBalanceData] = useState(null);
    const [calendarData, setCalendarData] = useState({ holidays: [], existingLeaves: [] });
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDates, setSelectedDates] = useState({ from: undefined, to: undefined });
const [formError, setFormError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const [config, calData] = await Promise.all([
                getLeaveConfig(),
                getCalendarData()
            ]);
            
            setBalanceData({
                annualBalance: config.annualBalance,
                balanceDetails: config.balanceDetails,
                unpaidLeaveBalance: config.unpaidLeaveBalance,
            });
            setCalendarData(calData);
            setLeaveTypes(config.leaveTypes);

        } catch (error) {
            toast.error("Failed to load leave data", { description: error.message });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const pendingRequest = useMemo(() => {
        return calendarData.existingLeaves.find(leave => leave.status === 'pending');
    }, [calendarData.existingLeaves]);

    if (isLoading) {
        return <div className="flex items-center justify-center h-96"> <Spinner/> </div>;
    }

    return (
        <div className="flex flex-col h-full">
            <header className="mb-6">
                <h1 className="text-xl font-bold tracking-tight">Leave Request</h1>
                <p className="text-muted-foreground">Visually select your leave dates below.</p>
                <Button  onClick={fetchData} className='m-3'  > <RefreshCw/> Refresh</Button>
               <Link to="history" >  
                <Button  > <History/> Leaves history</Button></Link>
                <LeaveBalanceIndicator 
    balanceDetails={balanceData.balanceDetails} 
    unpaidLeaveBalance={balanceData.unpaidLeaveBalance} 
    annualBalance={balanceData.annualBalance}
/>
            </header>

                <PendingRequestCard request={pendingRequest} />

            {formError && (
    <div className="mb-4">
        <Alert variant="warning">
            <AlertTitle>Failed</AlertTitle>
            <AlertDescription>{formError}</AlertDescription>
        </Alert>
    </div>
)}

           {
            pendingRequest ? null :
             <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
                <main className="lg:col-span-2">
                    <InteractiveLeaveCalendar
                        holidays={calendarData.holidays}
                        existingLeaves={calendarData.existingLeaves}
                        selectedDates={selectedDates}
                        setSelectedDates={setSelectedDates}
                        pendingRequest={pendingRequest}
                    />
                </main>

                <aside>
                    <LeaveSummaryPanel
                        selectedDates={selectedDates}
                        holidays={calendarData.holidays}
                        leaveTypes={leaveTypes}
                        onFormSubmit={() => {
                            // After a successful submission, clear selection and refetch all data
                            setSelectedDates({ from: undefined, to: undefined });
                            fetchData();
                        }}
                        onError={(msg) => setFormError(msg)}
                    />
                </aside>
            </div>
           } 
           
        </div>
    );
};

export default RequestLeavePage;