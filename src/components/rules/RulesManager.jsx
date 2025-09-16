// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { toast } from 'sonner';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { updateCompanyRules } from '@/services/rules-service';
// import useAuth from '@/hooks/useAuth';
// import AccessDenied from '../AccessDenied';
// import { PERMISSIONS } from '@/config/permissions';

// const CompanyRulesManager = ({ rules, onDataChange }) => {
//     const { register, handleSubmit, formState: { isDirty } } = useForm({
//         defaultValues: rules.reduce((acc, rule) => ({ ...acc, [rule.rule_key]: rule.rule_value }), {})
//     });
//     const {user} = useAuth()

//  const canRead =
//         user.is_master ||
//         user.permissions.includes(PERMISSIONS.RULES_MANAGEMENT.READ);
//       const canUpdate =
//         user.is_master ||
//         user.permissions.includes(PERMISSIONS.RULES_MANAGEMENT.UPDATE);
 

//     const onSubmit = async (data) => {
//         const payload = Object.keys(data).map(key => ({
//             rule_key: key,
//             rule_value: data[key]
//         }));
        
//         try {
//             await updateCompanyRules(payload);
//             toast.success('Company rules updated successfully.');
//             onDataChange();
//         } catch (error) {
//             toast.error('Update failed', { description: error.message });
//         }
//     };

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Global Company Leave Rules</CardTitle>
//                 <CardDescription>These settings apply to all employees across the system.</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                     {rules.map(rule => (
//                         <div key={rule.rule_key}>
//                             <Label>{rule.description || rule.rule_key}</Label>
//                             <Input type="number" {...register(rule.rule_key)} />
//                         </div>
//                     ))}
//                     <Button type="submit" disabled={!isDirty}>Save Changes</Button>
//                 </form>
//             </CardContent>
//         </Card>
//     );
// };

// export default CompanyRulesManager;



import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateCompanyRules } from '@/services/rules-service';
import useAuth from '@/hooks/useAuth';
import AccessDenied from '../AccessDenied';
import { PERMISSIONS } from '@/config/permissions';

const CompanyRulesManager = ({ rules, onDataChange }) => {
    const { register, handleSubmit, formState: { isDirty } } = useForm({
        defaultValues: rules.reduce(
            (acc, rule) => ({ ...acc, [rule.rule_key]: rule.rule_value }),
            {}
        )
    });

    const { user } = useAuth();

    const canRead =
        user.is_master ||
        user.permissions.includes(PERMISSIONS.RULES_MANAGEMENT.READ);

    const canUpdate =
        user.is_master ||
        user.permissions.includes(PERMISSIONS.RULES_MANAGEMENT.UPDATE);

    if (!canRead) {
        return <AccessDenied />;
    }

    const onSubmit = async (data) => {
        const payload = Object.keys(data).map(key => ({
            rule_key: key,
            rule_value: data[key]
        }));

        try {
            await updateCompanyRules(payload);
            toast.success('Company rules updated successfully.');
            onDataChange();
        } catch (error) {
            toast.error('Update failed', { description: error.message });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Global Company Leave Rules</CardTitle>
                <CardDescription>
                    These settings apply to all employees across the system.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {rules.map(rule => (
                        <div key={rule.rule_key}>
                            <Label>{rule.description || rule.rule_key}</Label>
                            <Input
                                type="number"
                                disabled={!canUpdate}
                                {...register(rule.rule_key)}
                            />
                        </div>
                    ))}
                    {canUpdate && (
                        <Button type="submit" disabled={!isDirty}>
                            Save Changes
                        </Button>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};

export default CompanyRulesManager;
