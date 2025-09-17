import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getSalaryComponents, deleteSalaryComponent } from '@/services/salary-service';
import { PERMISSIONS } from '@/config/permissions';
import useAuth from "@/hooks/useAuth";
import AccessDenied from "@/components/AccessDenied";
import { DataTable } from "@/components/DataTable";
import { useDebounce } from "@/hooks/useDebounce";
import { Search, Plus, Terminal } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SalaryComponentsPage = () => {
    const navigate = useNavigate();

    // --- STATE MANAGEMENT for Server-Side DataTable ---
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [sorting, setSorting] = useState([{ id: 'name', desc: false }]);
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    const { user } = useAuth();

    // --- PERMISSIONS ---
    const canViewPage = user?.is_master || user?.permissions.includes(PERMISSIONS.PAGES.SALARY_MANAGEMENT);
    const canRead = user?.is_master || user?.permissions.includes(PERMISSIONS.PAYROLL.SALARY_COMPONENT.READ);
    const canUpdate = user?.is_master || user?.permissions.includes(PERmissions.PAYROLL.SALARY_COMPONENT.UPDATE);
    const canCreate = user?.is_master || user?.permissions.includes(PERMISSIONS.PAYROLL.SALARY_COMPONENT.CREATE);
    const canDelete = user?.is_master || user?.permissions.includes(PERMISSIONS.PAYROLL.SALARY_COMPONENT.DELETE);

    // --- DATA FETCHING ---
    const fetchData = useCallback(async () => {
        if (!canRead) return;
        setLoading(true);
        try {
            const sortParams = sorting[0] ?? { id: 'name', desc: false };
            const params = {
                page: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
                sortBy: sortParams.id,
                sortOrder: sortParams.desc ? 'DESC' : 'ASC',
            };
            if (debouncedSearchTerm) params.search = debouncedSearchTerm;

            const response = await getSalaryComponents(params);
            setData(response.data);
            setPageCount(response.totalPages);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch salary components.");
        } finally {
            setLoading(false);
        }
    }, [pagination, sorting, debouncedSearchTerm, canRead, refetchTrigger]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // --- DELETE HANDLER ---
    const handleDelete = async (component) => {
        if (window.confirm(`Are you sure you want to delete "${component.name}"? This may affect existing employee salary structures.`)) {
            try {
                await deleteSalaryComponent(component.id);
                toast.success("Component deleted successfully.");
                setRefetchTrigger(c => c + 1); // Trigger a data refetch
            } catch (error) {
                toast.error("Deletion failed", { description: error.message });
            }
        }
    };

    // --- COLUMN DEFINITIONS for DataTable ---
    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Component Name',
            accessorKey: 'name',
        },
        {
            header: 'Type',
            accessorKey: 'type',
        },
        {
            header: 'Days Based',
            accessorKey: 'is_days_based',
            cell: ({ row }) => (row.original.is_days_based ? 'Yes' : 'No'),
        },
        {
            header: 'Base',
            accessorKey: 'is_base_component',
            cell: ({ row }) => (row.original.is_base_component ? 'Yes' : 'No'),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-center space-x-2">
                    {canUpdate && (
                        <Button variant="outline" size="sm" onClick={() => navigate(`/salary-components/edit/${row.original.id}`)}>
                            Edit
                        </Button>
                    )}
                    {canDelete && (
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original)}>
                            Delete
                        </Button>
                    )}
                </div>
            ),
        },
    ], [canUpdate, canDelete, navigate]); // Added navigate as a dependency

    if (!canViewPage) return <AccessDenied />;

    // --- RENDER JSX ---
    return (
        <div className="p-4 lg:p-6">
            <header className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Salary Components</h1>
                    <p className="text-muted-foreground">Manage the master list of salary components.</p>
                </div>
                {canCreate && (
                    <Button onClick={() => navigate('/salary-components/add')}>
                        <Plus className="mr-2 h-4 w-4" /> Add New Component
                    </Button>
                )}
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>All Components</CardTitle>
                    <div className="relative mt-2">
                        <Search className="absolute left-2.5 top-2.5 h-7 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by Name or Type..."
                            className="w-full pl-8 sm:w-1/3"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center h-64"><Spinner /></div>
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

export default SalaryComponentsPage;