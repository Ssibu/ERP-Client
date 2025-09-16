import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal, Star } from "lucide-react";
import { formatDate } from "@/utils/dateFormat";

// Helper functions for rendering cells
const getStatusBadge = (status) => {
    const config = {
        pending: { variant: "secondary", label: "Pending" },
        in_progress: { variant: "default", label: "In Progress" },
        paused: { variant: "outline", label: "Paused" },
        completed: { variant: "default", className: "bg-green-600 hover:bg-green-700", label: "Completed" }
    };
    const configOrDefault = config[status] || { variant: "secondary", label: status };
    return <Badge variant={configOrDefault.variant} className={configOrDefault.className}>{configOrDefault.label}</Badge>;
};

const getRatingDisplay = (rating) => {
    if (!rating) return <span className="text-muted-foreground">N/A</span>;
    return <div className="flex items-center gap-1">{rating} <Star className="h-4 w-4 text-amber-500 fill-amber-500" /></div>;
};

// This single function now generates columns for BOTH user types
export const createTaskColumns = ({ isMaster, handleStatusUpdate, openDeleteDialog }) => {
    const columns = [];

    // --- COMMON COLUMNS (for everyone) ---
    columns.push({
        id: "sl_no",
        header: "SL",
        cell: ({ row, table }) => {
            const { pageIndex, pageSize } = table.getState().pagination;
            return pageIndex * pageSize + row.index + 1;
        },
    });
    columns.push({ accessorKey: "id", header: "Task ID" });

    // --- MASTER-ONLY COLUMN ---
    if (isMaster) {
        columns.push({
            accessorKey: "Employee.name",
            header: "Employee",
            cell: ({ row }) => row.original.Employee?.name || 'N/A',
        });
    }

    // --- MORE COMMON COLUMNS ---
    columns.push(
        {
            accessorKey: "title",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Task Title <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => getStatusBadge(row.original.status),
        },
        {
            accessorKey: "completion_rating",
            header: "Rating",
            cell: ({ row }) => getRatingDisplay(row.original.completion_rating),
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Task Date <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => formatDate(row.original.createdAt),
        }
    );

    // --- EMPLOYEE-ONLY "ACTIONS" COLUMN ---
    if (!isMaster) {
        columns.push({
            id: "actions",
            header: <div className="text-right">Actions</div>,
            cell: ({ row }) => {
                const task = row.original;
                return (
                    <div className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger disabled={task.status === 'completed'}>Update Status</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem onClick={() => { const duration = prompt("Enter duration in minutes:"); if (duration) handleStatusUpdate(task.id, 'set_duration', parseInt(duration)); }} disabled={task.status !== 'pending'}>Set Duration</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusUpdate(task.id, 'start')} disabled={task.status !== 'pending' || !task.assigned_duration_minutes}>Start</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusUpdate(task.id, 'pause')} disabled={task.status !== 'in_progress'}>Pause</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusUpdate(task.id, 'resume')} disabled={task.status !== 'paused'}>Resume</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusUpdate(task.id, 'complete')} disabled={task.status !== 'in_progress'}>Complete</DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(task)}>Delete Task</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        });
    }
    
    return columns;
};