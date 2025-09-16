import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const PayrollGeneratorForm = ({ onPreview, isLoading, isPolling }) => {
    const { handleSubmit, setValue } = useForm();

    const months = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: new Date(0, i).toLocaleString('default', { month: 'long' }) }));
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 3 }, (_, i) => currentYear - i);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Generate Monthly Payroll</CardTitle>
                <CardDescription>Select a pay period to preview the data before final generation.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onPreview)} className="flex items-end gap-4">
                    <div className="">
                        <Label>Month</Label>
                        <Select onValueChange={(v) => setValue('month', v)} required>
                            <SelectTrigger><SelectValue placeholder="Select month..." /></SelectTrigger>
                            <SelectContent>{months.map(m => <SelectItem key={m.value} value={String(m.value)}>{m.label}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                    <div className="">
                        <Label>Year</Label>
                        <Select onValueChange={(v) => setValue('year', v)} required>
                            <SelectTrigger><SelectValue placeholder="Select year..." /></SelectTrigger>
                            <SelectContent>{years.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" disabled={isLoading || isPolling}>
                        {/*{!isLoading ? 'Loading...' : 'Preview Payroll'}*/}
                        Generate preview
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};