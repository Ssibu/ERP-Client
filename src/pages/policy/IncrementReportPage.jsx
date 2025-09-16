
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Terminal, TrendingUp, Search } from "lucide-react";
import apiClient from '@/api/axiosConfig';
import { useDebounce } from "@/hooks/useDebounce";
import { DataTable } from "@/components/DataTable";
import { createColumns } from "@/components/increment-report/columns";

const IncrementReportPage = () => {
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [sorting, setSorting] = useState([{ id: 'average_rating', desc: true }]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const sortParams = sorting[0] ?? { id: 'average_rating', desc: true };
            const params = {
                page: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
                sortBy: sortParams.id,
                sortOrder: sortParams.desc ? 'DESC' : 'ASC',
            };
            if (debouncedSearchTerm) params.search = debouncedSearchTerm;

            const res = await apiClient.get('/increment-report', { params });
            setData(res.data.data);
            setPageCount(res.data.totalPages);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate report.');
        } finally {
            setLoading(false);
        }
    }, [pagination, sorting, debouncedSearchTerm]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const columns = useMemo(() => createColumns(), []);

    return (
        <div className="container mx-auto">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div>
                            <CardTitle className="flex items-center"><TrendingUp className="mr-2 h-6 w-6" />Annual Increment Report</CardTitle>
                            <CardDescription>Performance-based salary increment eligibility.</CardDescription>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-6 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search by employee name..."
                                className="w-full sm:w-96 pl-8 border-3"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center h-[400px]"><Spinner /></div>
                    ) : error ? (
                        <Alert variant="destructive"><Terminal className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={data}
                            pageCount={pageCount}
                            pagination={pagination}
                            setPagination={setPagination}
                            sorting={sorting}
                            setSorting={setSorting}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default IncrementReportPage;