import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { Hourglass } from "lucide-react";

const PendingRequestCard = ({ request }) => {
  if (!request) {
    return null; // Don't render anything if there's no pending request
  }

  const startDate = format(new Date(request.start_date), 'PPP');
  const endDate = format(new Date(request.end_date), 'PPP');

  return (
    <Card className="mb-6 border-amber-500 bg-amber-50/50 dark:bg-amber-900/10">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
                <Hourglass className="h-5 w-5 text-amber-600" />
                <span>Request Pending Approval</span>
            </CardTitle>
            <Badge variant="secondary">Leave application ID: {request.id}</Badge>
        </div>
        <CardDescription>
            Your leave request is awaiting a decision. You cannot submit a new request until this one is processed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
                <p className="font-semibold">Leave Type</p>
                <p className="text-muted-foreground">{request.LeaveType?.name || 'N/A'}</p>
            </div>
             <div>
                <p className="font-semibold">Dates</p>
               {
                (startDate === endDate) ? startDate :  <p className="text-muted-foreground">{startDate} to {endDate}</p>
               }
            </div>
            {request.reason && (
                <div className="col-span-2">
                    <p className="font-semibold">Reason Provided</p>
                    <p className="text-muted-foreground whitespace-pre-wrap">{request.reason}</p>
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingRequestCard;