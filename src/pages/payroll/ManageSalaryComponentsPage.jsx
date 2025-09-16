import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getSalaryComponents, createSalaryComponent, updateSalaryComponent, deleteSalaryComponent } from '@/services/salary-service';
import { PERMISSIONS } from '@/config/permissions'; 
import useAuth from "@/hooks/useAuth";
import AcessDenied from "@/components/AccessDenied";

const SalaryComponentsPage = () => {
    const [components, setComponents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
    const {user} = useAuth()

const canViewPage = user?.is_master || user?.permissions.includes(PERMISSIONS.PAGES.SALARY_MANAGEMENT);
const canRead = user?.is_master || (user?.permissions.includes(PERMISSIONS.PAGES.SALARY_MANAGEMENT) && user?.permissions.includes(PERMISSIONS.PAYROLL.SALARY_COMPONENT.READ)
)
const canUpdate = user?.is_master || (user?.permissions.includes(PERMISSIONS.PAGES.SALARY_MANAGEMENT) && user?.permissions.includes(PERMISSIONS.PAYROLL.SALARY_COMPONENT.READ)
&& user?.permissions.includes(PERMISSIONS.PAYROLL.SALARY_COMPONENT.UPDATE)
)
const canCreate = user?.is_master || user?.permissions.includes(PERMISSIONS.PAYROLL.SALARY_COMPONENT.CREATE);
const canDelete = user?.is_master || user?.permissions.includes(PERMISSIONS.PAYROLL.SALARY_COMPONENT.DELETE);
const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ASC' });

// This function will be called when a header is clicked
const requestSort = (key) => {
    let direction = 'ASC';
    // If clicking the same key, toggle the direction
    if (sortConfig.key === key && sortConfig.direction === 'ASC') {
        direction = 'DESC';
    }
    setSortConfig({ key, direction });
};

// This function adds a visual indicator to the sorted column header
const getSortIndicator = (key) => {
    if (sortConfig.key !== key) {
        return null;
    }
    return sortConfig.direction === 'ASC' ? ' ▲' : ' ▼';
}

    const fetchData = useCallback(async () => {
    try {
        // Pass the sort config to the service function
        const params = { sort: sortConfig.key, order: sortConfig.direction };
        const data = await getSalaryComponents(params);
        setComponents(data);
    } catch (error) {
        toast.error("Failed to load salary components", { description: error.message });
    } finally {
        setIsLoading(false);
    }
}, [sortConfig]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const openDialog = (component = null) => {
        setSelectedComponent(component);
        if (component) {
            reset(component);
        } else {
            reset({
                name: '',
                type: 'Earning',
                is_days_based: true,
                is_base_component: false
            });
        }
        setDialogOpen(true);
    };

    const onSubmit = async (data) => {
        data.is_base_component = !!data.is_base_component;

        try {
            if (selectedComponent) {
                await updateSalaryComponent(selectedComponent.id, data);
                toast.success("Component updated successfully.");
            } else {
                await createSalaryComponent(data);
                toast.success("Component created successfully.");
            }
            fetchData();
            setDialogOpen(false);
        } catch (error) {
        // This is the new, smarter error handling block
        if (error.response && error.response.data && error.response.data.message) {
            // If the server sends a specific message in the response body, display it
            toast.error("Creation Failed", {
                description: error.response.data.message,
            });
        } else {
            // Otherwise, fall back to a generic error message
            toast.error("Operation Failed", {
                description: "An unexpected error occurred. Please try again.",
            });
        }
    }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this component? This may affect existing employee salary structures.')) {
            try {
                await deleteSalaryComponent(id);
                toast.success("Component deleted successfully.");
                fetchData();
            } catch (error) {
                toast.error("Deletion failed", { description: error.message });
            }
        }
    };
    const handleReset = () => {
        // Ensure we are in edit mode before resetting
        if (selectedComponent) {
            reset(selectedComponent); // Resets the form to the original component's data
            toast.info("Form has been reset to its original values.");
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-96"><Spinner /></div>;
    }

    if(!canViewPage) return <AcessDenied/>

    return (
    <>

    

    <div className="p-4 lg:p-6">
            <header className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Salary Components</h1>
                    <p className="text-muted-foreground">Manage the master list of salary components.</p>
                </div>
                {canCreate && <Button onClick={() => openDialog()}>Add New Component</Button>}
            </header>

              {canRead ? (

            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
    <TableRow>
        <TableHead>SL NO</TableHead>
        <TableHead
            className="cursor-pointer hover:bg-muted"
            onClick={() => requestSort('id')}
        >
            Component ID{getSortIndicator('id')}
        </TableHead>
        
        <TableHead 
            className="cursor-pointer hover:bg-muted"
            onClick={() => requestSort('name')}
        >
            Component Name{getSortIndicator('name')}
        </TableHead>

        <TableHead 
            className="cursor-pointer hover:bg-muted"
            onClick={() => requestSort('type')}
        >
            Type{getSortIndicator('type')}
        </TableHead>

        <TableHead 
            className="cursor-pointer hover:bg-muted"
            onClick={() => requestSort('is_days_based')}
        >
            Days Based{getSortIndicator('is_days_based')}
        </TableHead>

        <TableHead 
            className="cursor-pointer hover:bg-muted"
            onClick={() => requestSort('is_base_component')}
        >
            Base{getSortIndicator('is_base_component')}
        </TableHead>

        <TableHead>Actions</TableHead>
    </TableRow>
</TableHeader>
                        <TableBody>
                            {components.map((comp, i) => (
                                <TableRow key={comp.id}>
                                     <TableCell>{i + 1}</TableCell>
                                     <TableCell>{comp.id}</TableCell>
                                    <TableCell className="font-medium">{comp.name}</TableCell>
                                    <TableCell>{comp.type}</TableCell>
                                     <TableCell>{comp.is_days_based ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>{comp.is_base_component ? 'Yes' : 'No'}</TableCell>
                                    {(canUpdate || canDelete) ? (<TableCell className="text-right space-x-2">
                                        {canUpdate && <Button variant="outline" size="sm" onClick={() => openDialog(comp)}>Edit</Button>
}
                                  {canDelete &&   <Button variant="destructive" size="sm" onClick={() => handleDelete(comp.id)}>Delete</Button>}
                                    </TableCell>) : "N/A" }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            )  : <AcessDenied/> }
{(canCreate || canUpdate) && 
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedComponent ? 'Edit' : 'Create'} Salary Component</DialogTitle>
                        <DialogDescription>Define a new building block for employee salaries.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                         <div>
        <Label htmlFor="name">Component Name</Label>
        <Input 
            id="name" 
            {...register("name", { 
                required: "Component name is required." // 1. Add a specific error message
            })} 
            placeholder="e.g., House Rent Allowance"
            // 2. Conditionally add a red border class if there's an error
            className={errors.name ? 'border-destructive' : ''}
        />
        {/* 3. Conditionally render the error message in red */}
        {errors.name && (
            <p className="text-sm text-destructive mt-1">
                {errors.name.message}
            </p>
        )}
    </div>
                        <div>
                            <Label>Component Type</Label>
                            <Controller
                                name="type"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Earning">Earning</SelectItem>
                                            <SelectItem value="Deduction">Deduction</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                          <div>
                            <Label>Days based</Label>

                            <Controller
    name="is_days_based"
    control={control}
    render={({ field }) => (
        <Select
            onValueChange={(val) => field.onChange(val === "true")}
            value={String(field.value)} 
        >
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
            </SelectContent>
        </Select>
    )}
/>

                        </div>



                        <div className="flex items-center space-x-2">
                            <Controller
                                name="is_base_component"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        id="is_base_component"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                            <Label htmlFor="is_base_component">Is Base for Percentage Calculations? (e.g., Basic Salary)</Label>
                        </div>
                        <DialogFooter>
    <Button type="button" variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button>
    
    {/* This button will only appear when selectedComponent is not null (i.e., in edit mode) */}
    {selectedComponent && (
        <Button type="button" variant="outline" onClick={handleReset}>
            Reset Changes
        </Button>
    )}
    
    <Button type="submit">Save Component</Button>
</DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>}

        </div>
 

</>

    );
};

export default SalaryComponentsPage;