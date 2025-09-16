
// import React, { useState, useEffect } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { toast } from 'sonner';
// // import {
// //   Card, CardContent, CardHeader, CardTitle, CardDescription
// // } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { ChevronsUpDown } from 'lucide-react';
// import { Spinner } from '@/components/ui/spinner';

// import { getEmployeeSalaryStructure, updateEmployeeSalaryStructure } from '@/services/salary-service';

// const SalaryStructureForm = ({ employeeId, masterComponents }) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [calculatedTotals, setCalculatedTotals] = useState({
//         totalEarnings: 0, totalDeductions: 0, netSalary: 0, 
//     });

//     const { register, control, handleSubmit, watch, setValue, getValues } = useForm({
//         defaultValues: {
//             structure: []
//         }
//     });

//     const structure = watch('structure');

//     useEffect(() => {
//         const fetchStructure = async () => {
//             setIsLoading(true);
//             try {
//                 const existingStructure = await getEmployeeSalaryStructure(employeeId);
//                 const formattedStructure = existingStructure.map(rule => ({
//                     ...rule,
//                     dependencies: typeof rule.dependencies === 'string' 
//                         ? JSON.parse(rule.dependencies) 
//                         : (rule.dependencies || []),
//                     is_daily_rate: rule.is_daily_rate || false,
//                 }));
//                 setValue('structure', formattedStructure);
//             } catch (error) {
//                 toast.error("Failed to load existing salary structure.", { description: error.message });
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchStructure();
//     }, [employeeId, setValue]);

//     useEffect(() => {
//         const calculate = () => {
//             const calculatedValues = new Map();
//             let totalEarnings = 0, totalDeductions = 0;
//             const currentStructure = structure || [];
//             const isCalculated = new Set();
//             let passes = 0;
// const now = new Date();

// const year = now.getFullYear();
// const month = now.getMonth(); 

// const daysInMonth = new Date(year, month + 1, 0).getDate();

//             while (isCalculated.size < currentStructure.length && passes < currentStructure.length + 1) {
//                 currentStructure.forEach((rule, index) => {
//                     if (isCalculated.has(index)) return;

//                     const componentId = parseInt(rule.component_id);
//                     if (!componentId) return;   

//                     if (rule.calculation_type === 'Flat') {
//                         let value = parseFloat(rule.value || 0);
//                         if (rule.is_days_based) {
//                             value *= daysInMonth;
//                         }
//                         calculatedValues.set(componentId, value);
//                         isCalculated.add(index);
//                     } else if (rule.calculation_type === 'Percentage') {
//                         const dependencyIds = rule.dependencies || [];
//                         const areDepsMet = dependencyIds.every(depId => calculatedValues.has(depId));
//                         if (areDepsMet) {
//                             const baseSum = dependencyIds.reduce((sum, depId) => sum + (calculatedValues.get(depId) || 0), 0);
//                             const calculatedAmount = (baseSum * parseFloat(rule.value || 0)) / 100;
//                             calculatedValues.set(componentId, calculatedAmount);
//                             isCalculated.add(index);
//                         }
//                     }
//                 });
//                 passes++;
//             }

//             currentStructure.forEach(rule => {
//                 const componentId = parseInt(rule.component_id);
//                 const component = masterComponents.find(c => c.id === componentId);
//                 const amount = calculatedValues.get(componentId) || 0;

//                 if (component?.type === 'Earning') totalEarnings += amount;
//                 else if (component?.type === 'Deduction') totalDeductions += amount;
//             });

//             setCalculatedTotals({
//                 totalEarnings,
//                 totalDeductions,
//                 netSalary: totalEarnings - totalDeductions,
//                 calculatedValues
//             });
//         };
//         calculate();
//     }, [structure, masterComponents]);

//     const handleComponentToggle = (checked, component) => {
//         const currentStructure = getValues('structure');
//         if (checked) {
//             setValue('structure', [...currentStructure, {
//                 component_id: component.id,
//                 calculation_type: 'Flat',
//                 value: 0,
//                 is_daily_rate: false,
//                 dependencies: []
//             }]);
//         } else {
//             setValue('structure', currentStructure.filter(rule => rule.component_id !== component.id));
//         }
//     };

//     const onSubmit = async (data) => {
//         try {
//             await updateEmployeeSalaryStructure(employeeId, data.structure);
//             toast.success("Salary structure saved successfully.");
//         } catch (error) {
//             toast.error("Failed to save structure.", { description: error.message });
//         }
//     };

//     if (isLoading) {
//         return <div className="flex items-center justify-center p-8"><Spinner /></div>;
//     }

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <Table className="w-full">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>SL NO</TableHead>
//                   <TableHead>Include</TableHead>
//                   <TableHead>Component Name</TableHead>
//                   <TableHead>Type</TableHead>
//                   <TableHead>Days</TableHead>
//                   <TableHead>Calculation Type</TableHead>
//                   <TableHead>Value</TableHead>
//                   <TableHead>Percentage Of</TableHead>
//                   <TableHead className="text-right">Amount</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {masterComponents.map((component, i) => {
//                   const ruleIndex = structure.findIndex(r => r.component_id === component.id);
//                   const isActive = ruleIndex !== -1;
//                   const rule = isActive ? structure[ruleIndex] : null;

//                   return (
//                     <TableRow key={component.id} data-state={isActive ? 'active' : 'inactive'}>
//                       <TableCell>{i + 1}</TableCell>
//                       <TableCell>
//                         <Checkbox
//                           id={`comp-${component.id}`}
//                           checked={isActive}
//                           onCheckedChange={(checked) => handleComponentToggle(checked, component)}
//                           className="border-3"
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Label htmlFor={`comp-${component.id}`} className="text-base font-medium">{component.name}</Label>
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant={component.type === 'Earning' ? 'default' : 'destructive'}>
//                           {component.type}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                          <Badge variant={component.is_days_based ? 'outline' : 'secondary'}>
//                           {component.is_days_based ? 'Yes' : 'No'}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         {(isActive && rule) ? (
//                           <Controller
//                             name={`structure.${ruleIndex}.calculation_type`}
//                             control={control}
//                             render={({ field }) => (
//                               <Select onValueChange={field.onChange} value={field.value}>
//                                 <SelectTrigger><SelectValue /></SelectTrigger>
//                                 <SelectContent>
//                                   <SelectItem value="Flat">Flat</SelectItem>
//                                   <SelectItem value="Percentage">Percentage</SelectItem>
//                                 </SelectContent>
//                               </Select>
//                             )}
//                           />
//                         )  : ("N/A") }
//                       </TableCell>
//                       <TableCell>
//                         {(isActive && rule) ? (
//                           <Input
//                             type="number"
//                             step="0.01"
//                             {...register(`structure.${ruleIndex}.value`)}
//                             placeholder={rule.calculation_type === 'Percentage' ? '(%)' : ''}
//                           />
//                         ) : ("N/A") }
//                       </TableCell>
                   
//                       <TableCell>
//                         {(isActive && rule?.calculation_type === 'Percentage') ? (
//                           <Controller
//                             name={`structure.${ruleIndex}.dependencies`}
//                             control={control}
//                             render={({ field }) => (
//                               <Popover>
//                                 <PopoverTrigger asChild>
//                                   <Button variant="outline" className="w-full justify-between font-normal">
//                                     {field.value?.length > 0 ? `${field.value.length} selected` : "Select..."}
//                                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                   </Button>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="p-2">
//                                   <div className="space-y-1">
//                                     {masterComponents
//                                       .filter(c => c.type === 'Earning' && c.id !== component.id)
//                                       .map(c => (
//                                         <div key={c.id} className="flex items-center space-x-2 p-1">
//                                           <Checkbox
//                                             id={`dep-${ruleIndex}-${c.id}`}
//                                             checked={field.value?.includes(c.id)}
//                                             onCheckedChange={(checked) => {
//                                               const newValue = checked
//                                                 ? [...(field.value || []), c.id]
//                                                 : (field.value || []).filter(id => id !== c.id);
//                                               field.onChange(newValue);
//                                             }}
//                                           />
//                                           <label htmlFor={`dep-${ruleIndex}-${c.id}`} className="text-sm font-medium">
//                                             {c.name}
//                                           </label>
//                                         </div>
//                                       ))}
//                                   </div>
//                                 </PopoverContent>
//                               </Popover>
//                             )}
//                           />
//                         )  : ("N/A") }
//                       </TableCell>
//                       <TableCell className="text-right font-medium">
//                         {calculatedTotals.calculatedValues.has(component.id)
//                         ? calculatedTotals.calculatedValues.get(component.id).toFixed(2)
//                         : "N/A"}
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//         {/*    <Card className="mt-6">
//                 <CardHeader>
//                     <CardTitle>Real-Time Salary Summary</CardTitle>
//                     <CardDescription>Based on a standard 30-day month for calculation preview.</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                      <Table>
//                         <TableBody>
//                             <TableRow><TableCell>Total Earnings</TableCell><TableCell className="text-right font-bold">₹ {calculatedTotals.totalEarnings.toFixed(2)}</TableCell></TableRow>
//                             <TableRow><TableCell>Total Deductions</TableCell><TableCell className="text-right font-bold">₹ {calculatedTotals.totalDeductions.toFixed(2)}</TableCell></TableRow>
//                             <TableRow className="text-lg bg-slate-50 dark:bg-slate-800"><TableCell className="font-semibold">Net Salary</TableCell><TableCell className="text-right font-bold">₹ {calculatedTotals.netSalary.toFixed(2)}</TableCell></TableRow>
//                         </TableBody>
//                     </Table>
//                 </CardContent>
//             </Card>*/}
//             <div className="flex justify-end mt-6">
//                 <Button type="submit">Submit</Button>
//             </div>
//         </form>
//     );
// };

// export default SalaryStructureForm;


import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronsUpDown } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

import { getEmployeeSalaryStructure, updateEmployeeSalaryStructure } from '@/services/salary-service';

const SalaryStructureForm = ({ employeeId, masterComponents }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [calculatedTotals, setCalculatedTotals] = useState({
        totalEarnings: 0, 
        totalDeductions: 0, 
        netSalary: 0,
        calculatedValues: new Map()
    });

    const {
 //     register, 
 // control,
  handleSubmit, watch, setValue, getValues } = useForm({
        defaultValues: {
            structure: []
        }
    });

    const structure = watch('structure');

    useEffect(() => {
        const fetchStructure = async () => {
            setIsLoading(true);
            try {
                const existingStructure = await getEmployeeSalaryStructure(employeeId);
                const formattedStructure = existingStructure.map(rule => ({
                    ...rule,
                    dependencies: typeof rule.dependencies === 'string' 
                        ? JSON.parse(rule.dependencies) 
                        : (rule.dependencies || []),
                    is_daily_rate: rule.is_daily_rate || false,
                }));
                setValue('structure', formattedStructure);
            } catch (error) {
                toast.error("Failed to load existing salary structure.", { description: error.message });
            } finally {
                setIsLoading(false);
            }
        };
        fetchStructure();
    }, [employeeId, setValue]);

    // Calculate totals whenever structure changes
    useEffect(() => {
        const calculate = () => {
            const calculatedValues = new Map();
            let totalEarnings = 0, totalDeductions = 0;
            const currentStructure = structure || [];
            const isCalculated = new Set();
            let passes = 0;
            
            // const now = new Date();
            // const year = now.getFullYear();
            // const month = now.getMonth(); 
            // const daysInMonth = new Date(year, month + 1, 0).getDate();

            while (isCalculated.size < currentStructure.length && passes < currentStructure.length + 1) {
                currentStructure.forEach((rule, index) => {
                    if (isCalculated.has(index)) return;

                    const componentId = parseInt(rule.component_id);
                    if (!componentId) return;   

                    if (rule.calculation_type === 'Flat') {
                        let value = parseFloat(rule.value || 0);
                        // const component = masterComponents.find(c => c.id === componentId);
                        // if (component?.is_days_based) {
                        //     value *= daysInMonth;
                        // }
                        calculatedValues.set(componentId, value);
                        isCalculated.add(index);
                    } else if (rule.calculation_type === 'Percentage') {
                        const dependencyIds = rule.dependencies || [];
                        const areDepsMet = dependencyIds.every(depId => calculatedValues.has(depId));
                        if (areDepsMet) {
                            const baseSum = dependencyIds.reduce((sum, depId) => sum + (calculatedValues.get(depId) || 0), 0);
                            const calculatedAmount = (baseSum * parseFloat(rule.value || 0)) / 100;
                            calculatedValues.set(componentId, calculatedAmount);
                            isCalculated.add(index);
                        }
                    }
                });
                passes++;
            }

            // Calculate totals
            currentStructure.forEach(rule => {
                const componentId = parseInt(rule.component_id);
                const component = masterComponents.find(c => c.id === componentId);
                const amount = calculatedValues.get(componentId) || 0;

                if (component?.type === 'Earning') totalEarnings += amount;
                else if (component?.type === 'Deduction') totalDeductions += amount;
            });

            setCalculatedTotals({
                totalEarnings,
                totalDeductions,
                netSalary: totalEarnings - totalDeductions,
                calculatedValues
            });
        };

        calculate();
    }, [structure, masterComponents]);

    const handleComponentToggle = (checked, component) => {
        const currentStructure = getValues('structure');
        if (checked) {
            const newRule = {
                component_id: component.id,
                calculation_type: 'Flat',
                value: 0,
                is_daily_rate: false,
                dependencies: []
            };
            setValue('structure', [...currentStructure, newRule]);
        } else {
            setValue('structure', currentStructure.filter(rule => rule.component_id !== component.id));
        }
    };

    const updateRuleField = (ruleIndex, field, value) => {
        const currentStructure = getValues('structure');
        const updatedStructure = [...currentStructure];
        updatedStructure[ruleIndex] = {
            ...updatedStructure[ruleIndex],
            [field]: value
        };
        setValue('structure', updatedStructure);
    };

    const onSubmit = async (data) => {
        try {
            await updateEmployeeSalaryStructure(employeeId, data.structure);
            toast.success("Salary structure saved successfully.");
        } catch (error) {
            toast.error("Failed to save structure.", { description: error.message });
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center p-8"><Spinner /></div>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>SL NO</TableHead>
                  <TableHead>Include</TableHead>
                  <TableHead>Component Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Calculation Type</TableHead>
                  <TableHead>Percentage Of</TableHead>
                  <TableHead>Value</TableHead>
                  
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {masterComponents.map((component, i) => {
                  const ruleIndex = structure.findIndex(r => r.component_id === component.id);
                  const isActive = ruleIndex !== -1;
                  const rule = isActive ? structure[ruleIndex] : null;
                  const calculatedAmount = calculatedTotals.calculatedValues.get(component.id) || 0;

                  return (
                    <TableRow key={component.id} data-state={isActive ? 'active' : 'inactive'}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        <Checkbox
                          id={`comp-${component.id}`}
                          checked={isActive}
                          onCheckedChange={(checked) => handleComponentToggle(checked, component)}
                          className="border-3"
                        />
                      </TableCell>
                      <TableCell>
                        <Label htmlFor={`comp-${component.id}`} className="text-base font-medium">{component.name}</Label>
                      </TableCell>
                      <TableCell>
                        <Badge variant={component.type === 'Earning' ? 'default' : 'destructive'}>
                          {component.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                         <Badge variant={component.is_days_based ? 'outline' : 'secondary'}>
                          {component.is_days_based ? 'Yes' : 'No'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {(isActive && rule) ? (
                          <Select 
                            value={rule.calculation_type} 
                            onValueChange={(value) => updateRuleField(ruleIndex, 'calculation_type', value)}
                          >
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Flat">Flat</SelectItem>
                              <SelectItem value="Percentage">Percentage</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : ("N/A")}
                      </TableCell>
                         <TableCell>
                        {(isActive && rule?.calculation_type === 'Percentage') ? (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-between font-normal">
                                {rule.dependencies?.length > 0 ? `${rule.dependencies.length} selected` : "Select..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-2">
                              <div className="space-y-1">
                                {masterComponents
                                  .filter(c => c.type === 'Earning' && c.id !== component.id)
                                  .map(c => (
                                    <div key={c.id} className="flex items-center space-x-2 p-1">
                                      <Checkbox
                                        id={`dep-${ruleIndex}-${c.id}`}
                                        checked={rule.dependencies?.includes(c.id)}
                                        onCheckedChange={(checked) => {
                                          const currentDeps = rule.dependencies || [];
                                          const newDeps = checked
                                            ? [...currentDeps, c.id]
                                            : currentDeps.filter(id => id !== c.id);
                                          updateRuleField(ruleIndex, 'dependencies', newDeps);
                                        }}
                                      />
                                      <label htmlFor={`dep-${ruleIndex}-${c.id}`} className="text-sm font-medium">
                                        {c.name}
                                      </label>
                                    </div>
                                  ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        ) : ("N/A")}
                      </TableCell>
                      <TableCell>
                        {(isActive && rule) ? (
                          <Input
                            type="number"
                            step="0.01"
                            value={rule.value || ''}
                            onChange={(e) => updateRuleField(ruleIndex, 'value', e.target.value)}
                            placeholder={rule.calculation_type === 'Percentage' ? '(%)' : ''}
                          />
                        ) : ("N/A")}
                      </TableCell>
                   
                   
                      <TableCell className="text-right font-medium">
                        {isActive ? calculatedAmount.toFixed(2) : "N/A"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Real-Time Salary Summary</CardTitle>
                    <CardDescription>Based on current month's days for calculation preview.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Total Earnings</TableCell>
                                <TableCell className="text-right font-bold">₹ {calculatedTotals.totalEarnings.toFixed(2)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total Deductions</TableCell>
                                <TableCell className="text-right font-bold">₹ {calculatedTotals.totalDeductions.toFixed(2)}</TableCell>
                            </TableRow>
                            <TableRow className="text-lg bg-slate-50 dark:bg-slate-800">
                                <TableCell className="font-semibold">Net Salary</TableCell>
                                <TableCell className="text-right font-bold">₹ {calculatedTotals.netSalary.toFixed(2)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex justify-end mt-6">
                <Button type="submit">Submit</Button>
            </div>
        </form>
    );
};

export default SalaryStructureForm;