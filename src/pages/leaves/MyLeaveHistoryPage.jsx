import React, {useState, useEffect, useMemo } from 'react';
import { useDebounce } from 'use-debounce'; 
import { toast } from 'sonner';

import { getMyLeaveRequests } from '@/services/leave-service';
import { DataTable } from '@/components/DataTable'; 
import { columns } from '@/components/leave/my-history-columns';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MyLeaveHistoryPage = () => {
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [sorting, setSorting] = useState([{ id: 'start_date', desc: true }]);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Debounce search input
    const [statusFilter, setStatusFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState(""); 

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const params = {
                    page: pagination.pageIndex + 1,
                    pageSize: pagination.pageSize,
                    search: debouncedSearchTerm,
                     status: statusFilter === 'all' ? "" : statusFilter,
  is_unpaid: typeFilter === 'all' ? "" : typeFilter,
                    sortBy: sorting[0]?.id,
                    sortOrder: sorting[0]?.desc ? 'DESC' : 'ASC',
                };
                const result = await getMyLeaveRequests(params);
                setData(result.data);
                setPageCount(result.pageCount);
            } catch (error) {
                toast.error("Failed to fetch leave history", { description: error.message });
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [pagination, sorting, debouncedSearchTerm, statusFilter, typeFilter]);

    const tableColumns = useMemo(() => columns, []);

    return (
        <div>
            <header className="mb-6">
                <h1 className="text-xl font-bold tracking-tight">My Leave History</h1>
                <p className="text-muted-foreground">Search and filter your past and present leave requests.</p>
            </header>

            <div className="flex items-center gap-4 mb-4">
                <Input
                    placeholder="Search by ID or Reason..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="false">Paid</SelectItem>
                        <SelectItem value="true">Unpaid</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <DataTable
                    columns={tableColumns}
                    data={data}
                    pageCount={pageCount}
                    pagination={pagination}
                    setPagination={setPagination}
                    sorting={sorting}
                    setSorting={setSorting}
                />
            )}
        </div>
    );
};

export default MyLeaveHistoryPage;