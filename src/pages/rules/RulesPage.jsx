import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

import { getLeaveTypes, getCompanyRules } from '@/services/rules-service';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Spinner } from '@/components/ui/spinner';

import LeaveTypesManager from '@/components/rules/LeaveTypesManager';
import CompanyRulesManager from '@/components/rules/RulesManager';
import useAuth from '@/hooks/useAuth';
import { PERMISSIONS } from '@/config/permissions';
import AccessDenied from '@/components/AccessDenied';

const RulesManagerPage = () => {
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [companyRules, setCompanyRules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const{user} = useAuth()

    const canViewPage = user?.is_master || user?.permissions.includes(PERMISSIONS.PAGES.RULES_MANAGEMENT)


    const fetchData = useCallback(async () => {
        try {
            // Fetch both sets of data in parallel for efficiency
            const [leaveTypesData, companyRulesData] = await Promise.all([
                getLeaveTypes(),
                getCompanyRules()
            ]);
            setLeaveTypes(leaveTypesData);
            setCompanyRules(companyRulesData);
        } catch (error) {
            toast.error("Failed to load settings", { description: error.message });
        } finally {
            setIsLoading(false);
        }
    }, []);

    
    useEffect(() => {
        fetchData();
    }, [fetchData]);


    if(!canViewPage) return <AccessDenied/>


    if (isLoading) {
        return <div className="flex items-center justify-center h-96"><Spinner /></div>;
    }

    return (
        <div>
            <header className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Rules</h1>
                <p className="text-muted-foreground">Manage global rules and leave policies for the entire organization.</p>
            </header>

            <Tabs defaultValue="leave-types" className="w-full">
                <TabsList className="grid w-fit grid-cols-2">
                    <TabsTrigger value="leave-types">Leave Types</TabsTrigger>
                    <TabsTrigger value="company-rules">Company Rules</TabsTrigger>
                </TabsList>

                <TabsContent value="leave-types">
                    <Card>
                        <CardHeader>
                            <CardTitle>Leave Type Management</CardTitle>
                            <CardDescription>
                                Create, edit, or delete the types of leave employees can request. Define allowances and behaviors for each type.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <LeaveTypesManager leaveTypes={leaveTypes} onDataChange={fetchData} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="company-rules">
                    <CompanyRulesManager rules={companyRules} onDataChange={fetchData} />
                </TabsContent>

            </Tabs>
        </div>
    );
};

export default RulesManagerPage;