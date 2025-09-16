import React, { useState, useEffect, useCallback } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';

import { getManagedLeaveRequests } from '@/services/leave-service';

import LeaveRequestTable from '@/components/leave/LeaveRequestTable';
import UpdateRequestDialog from '@/components/leave/UpdateRequestDialog';
import {PERMISSIONS} from "@/config/permissions.js";
import useAuth from "@/hooks/useAuth"
import AccessDenied from "@/components/AccessDenied"

const LeaveManagementAdminPage = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const {user} = useAuth()

    const canViewPage = user?.is_master || user?.permissions.includes(PERMISSIONS.PAGES.LEAVE_MANAGEMENT);
    const canViewData = user?.is_master || user?.permissions.includes(PERMISSIONS.LEAVE_MANAGEMENT.READ_ALL)

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const reqData = await getManagedLeaveRequests();
            setRequests(reqData);
        } catch (error) {
            toast.error("Error fetching data", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleActionClick = (request) => {
        setSelectedRequest(request);
    };

    const handleDialogClose = () => {
        setSelectedRequest(null);
    };

  const renderActionSlot = (request) => (
        <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleActionClick(request)}
            disabled={request.status !== 'pending'}
        >
            Manage
        </Button>
    );

    return (
        <>
     {
  canViewPage ? (
    <>
      <Card className="m-4">
        <CardHeader>
          <CardTitle>Leave Management</CardTitle>
          <CardDescription>
            View and manage all employee leave requests.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button onClick={fetchData} className="m-3 float-end">
            <RefreshCw /> Refresh
          </Button>
          {isLoading ? (
            <p className="text-center">Loading requests...</p>
          ) : (
            canViewData ? (
              <LeaveRequestTable
                requests={requests}
                showEmployeeColumn={true}
                actionSlot={renderActionSlot}
              />
            ) : (
              <AccessDenied />
            )
          )}
        </CardContent>
      </Card>

      {selectedRequest && (
        <UpdateRequestDialog
          request={selectedRequest}
          open={!!selectedRequest}
          onOpenChange={handleDialogClose}
          onUpdateSuccess={fetchData}
        />
      )}
    </>
  ) : (
    <AccessDenied />
  )
}

        </>
    );
};

export default LeaveManagementAdminPage;