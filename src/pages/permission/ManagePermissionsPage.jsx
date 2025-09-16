import React, { useState, useEffect } from "react";
import apiClient from "@/api/axiosConfig";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {  Users, Search, RefreshCw, CircleUser } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { PERMISSIONS } from "@/config/permissions";
import useAuth from "@/hooks/useAuth";
import AccessDenied from "@/components/AccessDenied";
import { Spinner } from '@/components/ui/spinner';


const ManagePermissionsPage = () => {
  const [employees, setEmployees] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeePermissionIds, setEmployeePermissionIds] = useState(new Set());
  const [loading, setLoading] = useState({
    page: true,
    permissions: false,
    saving: false,
  });
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

 const canRead =
  user?.is_master ||
(  user?.permissions?.includes(PERMISSIONS.PAGES.MANAGE_EMPLOYEE_PERMISSIONS) &&
   user?.permissions?.includes(PERMISSIONS.EMPLOYEE_PERMISSIONS_MANAGE.READ)) ;

const canUpdate =
  user?.is_master ||
  user?.permissions?.includes(PERMISSIONS.EMPLOYEE_PERMISSIONS_MANAGE.UPDATE);


  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    const fetchManageableEmployees = async () => {
      setLoading((prev) => ({ ...prev, page: true }));
      try {
        const config = {};
        if (debouncedSearchTerm) {
          config.params = { search: debouncedSearchTerm };
        }
        if (canRead) {
          const res = await apiClient.get("/employees/manageable", config);
          setEmployees(res.data);
          if (
            selectedEmployee &&
            !res.data.some((e) => e.id === selectedEmployee.id)
          ) {
            setSelectedEmployee(null);
          }
        }
      } catch (error) {
        toast.error("Failed to fetch manageable employees.", error);
      } finally {
        setLoading((prev) => ({ ...prev, page: false }));
      }
    };

    const fetchAllPermissions = async () => {
      try {
        if (canRead) {
          const res = await apiClient.get("/permissions/all");
          setAllPermissions(res.data);
        }
      } catch (error) {
        toast.error("Failed to load permissions list.", error);
      }
    };

    fetchManageableEmployees();
    if (allPermissions.length === 0) {
      fetchAllPermissions();
    }
  }, [debouncedSearchTerm]);

  const handleSelectEmployee = async (employee) => {
    setSelectedEmployee(employee);
    setLoading((prev) => ({ ...prev, permissions: true }));
    try {
      const res = await apiClient.get(`/permissions/employee/${employee.id}`);
      const idSet = new Set(res.data.map((p) => p.id));
      setEmployeePermissionIds(idSet);
    } catch (error) {
      toast.error(`Failed to fetch permissions for ${employee.name}.`, error);
    } finally {
      setLoading((prev) => ({ ...prev, permissions: false }));
    }
  };

  const handlePermissionChange = (permissionId, isChecked) => {
    const newSet = new Set(employeePermissionIds);
    if (isChecked) newSet.add(permissionId);
    else newSet.delete(permissionId);
    setEmployeePermissionIds(newSet);
  };

  const handleSaveChanges = async () => {
    if (!selectedEmployee) return;
    setLoading((prev) => ({ ...prev, saving: true }));
    try {
      const payload = { permissionIds: Array.from(employeePermissionIds) };
      await apiClient.put(
        `/permissions/employee/${selectedEmployee.id}`,
        payload
      );
      toast.success(`Permissions updated for ${selectedEmployee.name}.`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save changes.");
    } finally {
      setLoading((prev) => ({ ...prev, saving: false }));
    }
  };

  if (loading.page) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner  />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {canRead ? (
        <>
          {" "}
          <h1 className="text-lg font-bold mb-4">Employee Permissions</h1>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" /> Employees
                </CardTitle>
                <div className="relative mt-2">
                  <Search className="absolute left-2.5 top-2.5 h-7 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search employees..."
                    className="w-full pl-8 shadow-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[650px] px-4">
                  {employees.map((emp) => (
                    <div key={emp.id}>
                   <Card
  onClick={() => handleSelectEmployee(emp)}
  className={cn(
    "w-full cursor-pointer bg-background hover:bg-muted px-2 py-3 mb-2 border ",
    selectedEmployee?.id === emp.id && "bg-accent/50 border border-accent"
  )}
>
  <CardHeader className="flex items-center space-x-3 p-0">
    <Avatar className="h-10 w-10">
      <AvatarImage
        src={emp.picture ? `${apiBaseUrl}${emp.picture}` : ""}
        alt={emp.name}
      />
      <AvatarFallback> <CircleUser/> </AvatarFallback>
    </Avatar>
    <div className="flex flex-col justify-center space-y-0.5">
      <p className="text-xs text-muted-foreground">
        Emp ID:{" "}
        <span className="font-semibold text-foreground">{emp.id}</span>
      </p>
      <p className="text-sm text-foreground">{emp.name}</p>
      <p className="text-sm text-muted-foreground">{emp.email}</p>
    </div>
  </CardHeader>
</Card>

                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  {selectedEmployee
                    ? `Permissions for ${selectedEmployee.name}`
                    : "Select an Employee"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedEmployee ? (
                  loading.permissions ? (
                    <div className="flex justify-center items-center h-96">
                      <Spinner  />
                    </div>
                  ) : (
                    <>
                      <ScrollArea className="h-[40rem]">
                        <div className="space-y-4 py-1 px-5">
                          {allPermissions.map((perm) => (
                            <div
                              key={perm.id}
                              className="flex items-center space-x-3 px-8 py-2 border hover:bg-accent rounded-md"
                            >
                              <Checkbox
                              className="shadow-xl bg-input h-8 w-8"
                                id={`perm-${perm.id}`}
                                checked={employeePermissionIds.has(perm.id)}
                                onCheckedChange={(checked) =>
                                  handlePermissionChange(perm.id, checked)
                                }
                                disabled={!canUpdate}
                              />
                              <div className="grid gap-1.5 leading-none">
                                <Label
                                  htmlFor={`perm-${perm.id}`}
                                  className="cursor-pointer font-medium"
                                >
                                  {perm.code_name}
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                  {perm.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <Separator className="my-4" />
                {canUpdate &&       <Button
                        onClick={handleSaveChanges}
                        disabled={loading.saving}
                        className="float-end"
                      >
                        {loading.saving && (
                          <Spinner color="white" size={20}  />
                        )}
                        <RefreshCw/>
                        Sync changes
                      </Button>}
                      {!canUpdate && (
                        <p className="text-xs text-destructive mt-2">
                          You do not have permission to modify these settings.
                        </p>
                      )}
                    </>
                  )
                ) : (
                  <div className="flex items-center justify-center h-96 text-muted-foreground">
                    <p>
                      Select an employee from the list to manage their
                      permissions.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      ) :(<AccessDenied/>) }
    </div>
  );
};

export default ManagePermissionsPage;
