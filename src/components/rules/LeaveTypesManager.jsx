import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createLeaveType,
  updateLeaveType,
  deleteLeaveType,
} from "@/services/rules-service";
import { PERMISSIONS } from "@/config/permissions";
import useAuth from "@/hooks/useAuth";
import AccessDenied from "../AccessDenied";
import { Pencil, Trash, Plus } from "lucide-react";

const LeaveTypesManager = ({ leaveTypes, onDataChange }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const { register, handleSubmit, reset, control } = useForm();
  const { user } = useAuth();

  const canRead =
    user.is_master ||
    user.permissions.includes(PERMISSIONS.RULES_MANAGEMENT.READ);
  const canCreate =
    user.is_master ||
    user.permissions.includes(PERMISSIONS.RULES_MANAGEMENT.CREATE);
  const canUpdate =
    user.is_master ||
    user.permissions.includes(PERMISSIONS.RULES_MANAGEMENT.UPDATE);
  const canDelete =
    user.is_master ||
    user.permissions.includes(PERMISSIONS.RULES_MANAGEMENT.DELETE);

  const openDialog = (leaveType = null) => {
    setSelectedLeaveType(leaveType);
    if (leaveType) {
      reset(leaveType);
    } else {
      reset({
        name: "",
        annual_allowance_days: null,
        monthly_allowance_days: null,
        max_days_per_request: null,
        is_unpaid: false,
        // allow_retroactive_application: false,
        fallback_leave_type_id: null,
      });
    }
    setDialogOpen(true);
  };

  const onSubmit = async (data) => {
    const numericFields = [
      "annual_allowance_days",
      "monthly_allowance_days",
      "max_days_per_request",
      // "fallback_leave_type_id",
    ];
    numericFields.forEach((field) => {
      const value = data[field];
      if (
        value === "" ||
        value === null ||
        value === "null" ||
        isNaN(parseInt(value))
      ) {
        data[field] = null;
      } else {
        data[field] = parseInt(value);
      }
    });

    data.is_unpaid = !!data.is_unpaid;
    // data.allow_retroactive_application = !!data.allow_retroactive_application;

    try {
      if (selectedLeaveType) {
        await updateLeaveType(selectedLeaveType.id, data);
        toast.success("Leave type updated successfully.");
      } else {
        await createLeaveType(data);
        toast.success("Leave type created successfully.");
      }
      onDataChange();
      setDialogOpen(false);
    } catch (error) {
      toast.error("Operation failed", { description: error.message });
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this leave type? This action cannot be undone."
      )
    ) {
      try {
        await deleteLeaveType(id);
        toast.success("Leave type deleted successfully.");
        onDataChange();
      } catch (error) {
        toast.error("Deletion failed", { description: error.message });
      }
    }
  };

    if (!canRead) return <div><div><AccessDenied /></div></div>;
  

  return (
    <div>
      {canCreate && (
        <div className="flex justify-end mb-4">
          <Button onClick={() => openDialog()}> <Plus/> Add New Leave Type</Button>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SL NO</TableHead>
              <TableHead>Name</TableHead>
           
              <TableHead className="text-center">
                Monthly allowance (days)
              </TableHead>
                <TableHead className="text-center">
                Max allowance per request (days)
              </TableHead>
              <TableHead className="text-center">Unpaid</TableHead>
              {(canUpdate || canDelete) && (
                <TableHead className="text-center">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaveTypes.map((lt, i) => (
              <TableRow key={lt.id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell className="font-medium">{lt.name}</TableCell>
            
                <TableCell className="text-center">
                  {lt.monthly_allowance_days ?? "—"}
                </TableCell>
                <TableCell className="text-center">
                  {lt.max_days_per_request ?? "—"}
                </TableCell>
                <TableCell className="text-center">
                  {lt.is_unpaid ? "Yes" : "No"}
                </TableCell>
                <TableCell className="text-center space-x-2">
                  {canUpdate && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDialog(lt)}
                    >
                        <Pencil/>
                      Edit
                    </Button>
                  )}
                  {canDelete && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(lt.id)}
                    >
                        <Trash/>
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="min-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedLeaveType ? "Edit" : "Create"} Leave Type
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name", { required: true })} />
            </div>
            <div>
              
              <div>
                <Label htmlFor="monthly_allowance_days">
                  Monthly Allowance Days
                </Label>
                <Input
                  id="monthly_allowance_days"
                  type="number"
                  {...register("monthly_allowance_days")}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="max_days_per_request">Max Days Per Request</Label>
              <Input
                id="max_days_per_request"
                type="number"
                {...register("max_days_per_request")}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Controller
                name="is_unpaid"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="is_unpaid"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="is_unpaid">
                Is Unpaid? (Deducts from salary)
              </Label>
            </div>

            
{/* 
            <div>
              <Label>Fallback Leave Type (When balance is exhausted)</Label>
              <Controller
                name="fallback_leave_type_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ? String(field.value) : "null"} // Default to "null" string
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a fallback type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">None</SelectItem>
                      {leaveTypes
                        .filter((lt) => lt.id !== selectedLeaveType?.id)
                        .map((lt) => (
                          <SelectItem key={lt.id} value={String(lt.id)}>
                            {lt.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div> */}
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaveTypesManager;
