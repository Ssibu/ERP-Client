import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import apiClient from "@/api/axiosConfig";
import useAuth from "@/hooks/useAuth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Terminal, Search } from "lucide-react";
import { PERMISSIONS } from "@/config/permissions";
import AccessDenied from "@/components/AccessDenied";
import { Spinner } from "@/components/ui/spinner";
import { createColumns } from "@/components/employees/columns";
import { DataTable } from "@/components/DataTable";
import { useDebounce } from "@/hooks/useDebounce"; 

const EmployeeManagementPage = () => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); 
  
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState([{ id: 'joined_at', desc: true }]); 
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const { user } = useAuth();
  
  const canRead = user.is_master || user.permissions.includes(PERMISSIONS.EMPLOYEE.READ);
  const canCreate = user.is_master || user.permissions.includes(PERMISSIONS.EMPLOYEE.CREATE);
  const canUpdate = user.is_master || user.permissions.includes(PERMISSIONS.EMPLOYEE.UPDATE);
  const canDelete = user.is_master || user.permissions.includes(PERMISSIONS.EMPLOYEE.DELETE);

  const fetchData = useCallback(async () => {
    if (!canRead) return;
    try {
      setLoading(true);
      const sortParams = sorting[0] ?? { id: 'joined_at', desc: true }; 
      const params = {
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        sortBy: sortParams.id,
        sortOrder: sortParams.desc ? 'DESC' : 'ASC',
      };
      if (debouncedSearchTerm) params.search = debouncedSearchTerm;

      const response = await apiClient.get("/employees", { params });
      setData(response.data.data);
      setPageCount(response.data.totalPages);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch employees.");
    } finally {
      setLoading(false);
    }
  }, [pagination, sorting, debouncedSearchTerm, canRead, refetchTrigger]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); 

  const openDeleteDialog = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    try {
      await apiClient.delete(`/employees/${employeeToDelete.id}`);
      toast.success(`Employee "${employeeToDelete.name}" has been deleted.`);
      setRefetchTrigger(c => c + 1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete employee.");
    } finally {
      setIsDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    }
  };

  const columns = useMemo(() => createColumns({ openDeleteDialog, canUpdate, canDelete, currentUser: user}), [canUpdate, canDelete, user]);

  if (!canRead) return <AccessDenied />;

  return (
    <>
      <div className="container mx-auto">
        {canCreate && (
          <div className="flex justify-end items-center mb-4">
            <Link to="/employees/add"><Button><Plus />Add New Employee</Button></Link>
          </div>
        )}
        <Card>
          <CardHeader>
            <CardTitle>All Employees</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-7 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by Name or Email..."
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
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the account for{" "}
              <span className="font-semibold">{employeeToDelete?.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Yes, delete employee</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EmployeeManagementPage;