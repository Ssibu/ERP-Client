import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { getSalaryComponents, getEmployeeList } from '@/services/salary-service';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Spinner } from '@/components/ui/spinner';

import SalaryStructureForm from '@/components/payroll/SalaryStructureForm';
import {PERMISSIONS} from "@/config/permissions";
import useAuth from "@/hooks/useAuth";
import AccessDenied from "@/components/AccessDenied";

const SalaryStructurePage = () => {
    const [employees, setEmployees] = useState([]);
    const [salaryComponents, setSalaryComponents] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useAuth()



    const canViewPage = user?.is_master || user?.permissions.includes(PERMISSIONS.PAGES.SALARY_MANAGEMENT);
    const canUpdate = user?.is_master || user?.permissions.includes(PERMISSIONS.PAYROLL.SALARY_STRUCTURE.UPDATE);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [empData, compData] = await Promise.all([
                    getEmployeeList(),
                    getSalaryComponents()
                ]);
                setEmployees(empData);
                setSalaryComponents(compData);
            } catch (error) {
                toast.error("Failed to load initial data", { description: error.message });
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    if (isLoading) {
        return <div className="flex items-center justify-center h-96"><Spinner /></div>;
    }

    if(!canViewPage) return <AccessDenied/>

    return (
        <div>
{
  canUpdate ? (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Employee Salary Structure</CardTitle>
          <CardDescription>
            Select an employee to view or define their component-based salary structure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-xs">
            <Label>Select Employee</Label>
            <Select onValueChange={setSelectedEmployeeId}>
              <SelectTrigger>
                <SelectValue placeholder="Select an employee..." />
              </SelectTrigger>
              <SelectContent>
                {employees.map(emp => (
                  <SelectItem key={emp.id} value={String(emp.id)}>
                    {emp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4">
        {selectedEmployeeId && (
          <SalaryStructureForm
            key={selectedEmployeeId}
            employeeId={selectedEmployeeId}
            masterComponents={salaryComponents}
          />
        )}
      </div>
    </>
  ) : (
    <AccessDenied />
  )
}

        </div>
    );
};

export default SalaryStructurePage;