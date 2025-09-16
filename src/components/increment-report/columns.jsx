import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";

const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(amount);
};

export const createColumns = (t) => [
  {
    id: "sl_no",
    header: "SL NO",
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      return pageIndex * pageSize + row.index + 1;
    },
  },
  {
accessorKey:'id',
header: "Employee ID"
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
       Employee <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "days_of_service",
    header: "Service days",
  },
  {
    accessorKey: "average_rating",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
       Avg Rating <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.original.average_rating || "N/A",
  },
  {
    accessorKey: "current_salary",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Current Salary <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => formatCurrency(row.original.current_salary),
  },
  {
    accessorKey: "is_eligible",
    header: "Eligible",
    cell: ({ row }) => (
      <Badge variant={row.original.is_eligible ? "default" : "secondary"} className={row.original.is_eligible ? "bg-green-600" : ""}>
        {row.original.is_eligible ? 'Yes' : 'No'}
      </Badge>
    ),
  },
  {
    accessorKey: "increment_percentage",
    header: `Increment %`,
    cell: ({ row }) => `${row.original.increment_percentage}%`,
  },
  {
    accessorKey: "new_salary",
    header: "New Salary",
    cell: ({ row }) => formatCurrency(row.original.new_salary),
  },
];