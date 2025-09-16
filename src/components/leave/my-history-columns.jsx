import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

const getStatusVariant = (status) => {
    switch (status) {
        case 'approved': return 'success';
        case 'rejected': return 'destructive';
        default: return 'secondary';
    }
};

export const columns = [
    {
        accessorKey: "id",
        header: "Req ID",
    },
    {
        accessorKey: "LeaveType.name",
        header: "Leave Type",
    },
    {
        id: "dates",
        header: "Dates",
        cell: ({ row }) => {
  const startDate = format(new Date(row.original.start_date), "dd/MM/yy");
  const endDate = format(new Date(row.original.end_date), "dd/MM/yy");

  return startDate === endDate ? startDate : `${startDate} - ${endDate}`;
},

    },
    {
        accessorKey: "reason",
        header: "Reason",
        cell: ({ row }) => row.original.reason || "N/A",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return <Badge variant={getStatusVariant(status)}>{status}</Badge>;
        },
    },
    {
        accessorKey: "LeaveType.is_unpaid",
        header: "Type",
        cell: ({ row }) => {
             const isUnpaid = row.original.LeaveType?.is_unpaid;
             return isUnpaid ? <Badge variant="outline">Unpaid</Badge> : <Badge variant="outline">Paid</Badge>;
        }
    }
];