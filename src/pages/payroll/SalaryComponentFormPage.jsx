import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { getSalaryComponentById, createSalaryComponent, updateSalaryComponent } from '@/services/salary-service';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from '@/components/ui/spinner';
import { Save, X } from 'lucide-react';

const SalaryComponentFormPage = () => {
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate();
    const isEditMode = !!id; // If an ID exists, we are in "Edit" mode

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: '',
            type: 'Earning',
            is_days_based: true,
            is_base_component: false
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pageLoading, setPageLoading] = useState(isEditMode); // Only show page loader in edit mode

    // --- Data Fetching Effect (only runs in Edit mode) ---
    useEffect(() => {
        if (isEditMode) {
            const fetchComponent = async () => {
                try {
                    const componentData = await getSalaryComponentById(id);
                    reset(componentData); // Populate the form with fetched data
                } catch (error) {
                    toast.error("Failed to load component data for editing.");
                    navigate('/salary-components');
                } finally {
                    setPageLoading(false);
                }
            };
            fetchComponent();
        }
    }, [id, isEditMode, navigate, reset]);

    // --- Form Submission Handler ---
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        data.is_base_component = !!data.is_base_component;
        
        try {
            const successMessage = isEditMode ? "Component updated successfully." : "Component created successfully.";
            
            if (isEditMode) {
                await updateSalaryComponent(id, data);
            } else {
                await createSalaryComponent(data);
            }
            
            toast.success(successMessage);
            navigate('/salary-components'); // Navigate back to the list
        } catch (error) {
            const action = isEditMode ? "Update" : "Creation";
            if (error.response?.data?.message) {
                toast.error(`${action} Failed`, { description: error.response.data.message });
            } else {
                toast.error(`${action} Failed`, { description: "An unexpected error occurred." });
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // --- Render Loading Spinner for Edit Mode Fetch ---
    if (pageLoading) {
        return <div className="flex justify-center items-center h-64"><Spinner /></div>;
    }

    // --- Render the Form ---
    return (
        <div className="container mx-auto max-w-2xl py-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>{isEditMode ? 'Edit Salary Component' : 'Add New Salary Component'}</CardTitle>
                        <CardDescription>
                            {isEditMode ? 'Update the details for this component.' : 'Define a new building block for employee salaries.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* THE FORM IS IDENTICAL FOR BOTH MODES */}
                        <div>
                            <Label htmlFor="name">Component Name</Label>
                            <Input id="name" {...register("name", { required: "Component name is required." })} className={errors.name ? 'border-destructive' : ''} />
                            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <Label>Component Type</Label>
                            <Controller name="type" control={control} render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent><SelectItem value="Earning">Earning</SelectItem><SelectItem value="Deduction">Deduction</SelectItem></SelectContent>
                                </Select>
                            )} />
                        </div>
                         <div>
                            <Label>Is this component pro-rated based on attendance days?</Label>
                            <Controller name="is_days_based" control={control} render={({ field }) => (
                                <Select onValueChange={(val) => field.onChange(val === 'true')} value={String(field.value)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent><SelectItem value="true">Yes</SelectItem><SelectItem value="false">No</SelectItem></SelectContent>
                                </Select>
                            )} />
                        </div>
                        <div className="flex items-center space-x-2 pt-2">
                            <Controller name="is_base_component" control={control} render={({ field }) => (
                                <Checkbox id="is_base_component" checked={field.value} onCheckedChange={field.onChange} />
                            )} />
                            <Label htmlFor="is_base_component">Is Base for Percentage Calculations?</Label>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4 flex justify-between">
                        <Button type="button" variant="outline" onClick={() => navigate('/salary-components')} disabled={isSubmitting}>
                            <X className="mr-2 h-4 w-4" /> Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Spinner className="mr-2 h-4 w-4" />}
                            <Save className="mr-2 h-4 w-4" /> {isEditMode ? 'Save Changes' : 'Save Component'}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default SalaryComponentFormPage;