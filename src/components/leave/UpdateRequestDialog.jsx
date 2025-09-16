



// import React from 'react';
// import { useForm, Controller } from 'react-hook-form'; // Import Controller
// import * as z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { format } from 'date-fns';
// import { CalendarIcon } from 'lucide-react';
// import { cn } from "@/lib/utils";

// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Textarea } from '@/components/ui/textarea';
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { toast } from 'sonner';

// import { updateLeaveStatus } from '@/services/leave-service'; // Assuming you have this in your service

// const formSchema = z.object({
//   status: z.enum(['approved', 'rejected'], { required_error: 'You must select a status.' }),
//   manager_comments: z.string().optional(),
//   // Add the new end date to the schema, making it optional
//   new_end_date: z.date().optional(),
// });

// const UpdateRequestDialog = ({ request, open, onOpenChange, onUpdateSuccess }) => {
//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             status: request.status,
//             manager_comments: request.manager_comments || '',
//             // Initialize with the original end date
//             new_end_date: new Date(request.end_date),
//         }
//     });

//     const watchedStatus = form.watch("status");

//     const onSubmit = async (values) => {
//         try {
//             // The service function needs to be updated to handle the new data
//             await updateLeaveStatus(request.id, values);
//             toast.success("Leave request has been updated.");
//             onUpdateSuccess();
//             onOpenChange(false);
//         } catch (error) {
//             toast.error("Update Failed", { description: error.message });
//         }
//     };
    
//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Manage Leave Request</DialogTitle>
//                     <DialogDescription>
//                         Approve, reject, or partially approve this request.
//                     </DialogDescription>
//                 </DialogHeader>
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                         <FormField
//                             control={form.control}
//                             name="status"
//                             render={({ field }) => (
//                                 <FormItem className="space-y-3">
//                                     <FormLabel>Decision</FormLabel>
//                                     <FormControl>
//                                         <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
//                                             <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="approved" /></FormControl><FormLabel className="font-normal">Approve</FormLabel></FormItem>
//                                             <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="rejected" /></FormControl><FormLabel className="font-normal">Reject</FormLabel></FormItem>
//                                         </RadioGroup>
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         {/* --- NEW CONDITIONAL DATE PICKER --- */}
//                         {/* Only show this if the manager has selected "Approve" */}
//                         {watchedStatus === 'approved' && (
//                              <FormField
//                                 control={form.control}
//                                 name="new_end_date"
//                                 render={({ field }) => (
//                                     <FormItem className="flex flex-col">
//                                         <FormLabel>Approved End Date</FormLabel>
//                                         <p className="text-xs text-muted-foreground -mt-1 mb-1">
//                                             You can approve a shorter duration by selecting an earlier end date.
//                                         </p>
//                                         <Popover>
//                                             <PopoverTrigger asChild>
//                                                 <FormControl>
//                                                     <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
//                                                         {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
//                                                         <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                                                     </Button>
//                                                 </FormControl>
//                                             </PopoverTrigger>
//                                             <PopoverContent className="w-auto p-0" align="start">
//                                                 <Calendar
//                                                     mode="single"
//                                                     selected={field.value}
//                                                     onSelect={field.onChange}
//                                                     // Manager can only select dates between the original start and end date
//                                                     disabled={(date) =>
//                                                         date > new Date(request.end_date) || date < new Date(request.start_date)
//                                                     }
//                                                     initialFocus
//                                                 />
//                                             </PopoverContent>
//                                         </Popover>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                         )}

//                         <FormField
//                             control={form.control}
//                             name="manager_comments"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Comments</FormLabel>
//                                     <FormControl>
//                                         <Textarea placeholder="Add comments for the employee (optional)" {...field} />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                         <DialogFooter>
//                             <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
//                             <Button type="submit" disabled={form.formState.isSubmitting}>
//                                 {form.formState.isSubmitting ? 'Updating...' : 'Update Status'}
//                             </Button>
//                         </DialogFooter>
//                     </form>
//                 </Form>
//             </DialogContent>
//         </Dialog>
//     )
// }

// export default UpdateRequestDialog;








// import React from 'react';
// import { useForm, Controller } from 'react-hook-form'; // Import Controller
// import * as z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { format } from 'date-fns';

// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Textarea } from '@/components/ui/textarea';
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { toast } from 'sonner';
// import { calculateCalendarDays } from '@/lib/date-utils';

// import { updateLeaveStatus } from '@/services/leave-service'; // Assuming you have this in your service

// const formSchema = z.object({
//   status: z.enum(['approved', 'rejected']),
//   manager_comments: z.string().optional(),
//   new_start_date: z.date().optional(),
//   new_end_date: z.date().optional(),
// });

// const UpdateRequestDialog = ({ request, open, onOpenChange, onUpdateSuccess }) => {
//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             status: request.status,
//             manager_comments: request.manager_comments || '',
//             // Initialize with the original date range
//             new_start_date: new Date(request.start_date),
//             new_end_date: new Date(request.end_date),
//         }
//     });

//     const watchedStatus = form.watch("status");

//  const onSubmit = async (values) => {
//         try {
//             await updateLeaveStatus(request.id, values);
//             toast.success("Leave request has been updated.");
//             onUpdateSuccess();
//             onOpenChange(false);
//         } catch (error) {
//             toast.error("Update Failed", { description: error.message });
//         }
//     };
    
//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Manage Leave Request</DialogTitle>
//                     <DialogDescription>
//                         Approve, reject, or partially approve this request.
//                     </DialogDescription>
//                 </DialogHeader>
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        // <FormField
                        //     control={form.control}
                        //     name="status"
                        //     render={({ field }) => (
                        //         <FormItem className="space-y-3">
                        //             <FormLabel>Decision</FormLabel>
                        //             <FormControl>
                        //                 <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                        //                     <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="approved" /></FormControl><FormLabel className="font-normal">Approve</FormLabel></FormItem>
                        //                     <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="rejected" /></FormControl><FormLabel className="font-normal">Reject</FormLabel></FormItem>
                        //                 </RadioGroup>
                        //             </FormControl>
                        //             <FormMessage />
                        //         </FormItem>
                        //     )}
                        // />

//                         {/* --- NEW CONDITIONAL DATE PICKER --- */}
//                         {/* Only show this if the manager has selected "Approve" */}
//                        {watchedStatus === 'approved' && (
//                             <div className="p-4 border rounded-lg space-y-4">
//                                 <p className="text-sm font-medium">Modify Approved Dates</p>
//                                 {/* --- START DATE PICKER --- */}
//                                 <FormField control={form.control} name="new_start_date" render={({ field }) => (
//                                     <FormItem className="flex flex-col">
//                                         <FormLabel>Approved Start Date</FormLabel>
//                                         <Popover>
//                                             <PopoverTrigger asChild><FormControl><Button variant="outline">{format(field.value, "PPP")}</Button></FormControl></PopoverTrigger>
//                                             <PopoverContent>
//                                                 <Calendar
//                                                     mode="single" selected={field.value} onSelect={field.onChange}
//                                                     disabled={(date) => date > new Date(request.end_date) || date < new Date(request.start_date)}
//                                                 />
//                                             </PopoverContent>
//                                         </Popover>
//                                     </FormItem>
//                                 )}/>
//                                  {/* --- END DATE PICKER --- */}
//                                 <FormField control={form.control} name="new_end_date" render={({ field }) => (
//                                     <FormItem className="flex flex-col">
//                                         <FormLabel>Approved End Date</FormLabel>
//                                         <Popover>
//                                             <PopoverTrigger asChild><FormControl><Button variant="outline">{format(field.value, "PPP")}</Button></FormControl></PopoverTrigger>
//                                             <PopoverContent>
//                                                 <Calendar
//                                                     mode="single" selected={field.value} onSelect={field.onChange}
//                                                     disabled={(date) => date > new Date(request.end_date) || date < form.getValues('new_start_date')}
//                                                 />
//                                             </PopoverContent>
//                                         </Popover>
//                                     </FormItem>
//                                 )}/>
//                             </div>
//                         )}

                        // <FormField
                        //     control={form.control}
                        //     name="manager_comments"
                        //     render={({ field }) => (
                        //         <FormItem>
                        //             <FormLabel>Comments</FormLabel>
                        //             <FormControl>
                        //                 <Textarea placeholder="Add comments for the employee (optional)" {...field} />
                        //             </FormControl>
                        //         </FormItem>
                        //     )}
                        // />
                        // <DialogFooter>
                        //     <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
                        //     <Button type="submit" disabled={form.formState.isSubmitting}>
                        //         {form.formState.isSubmitting ? 'Updating...' : 'Update Status'}
                        //     </Button>
                        // </DialogFooter>
//                     </form>
//                 </Form>
//             </DialogContent>
//         </Dialog>
//     )
// }

// export default UpdateRequestDialog;


import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from 'sonner';

import { updateLeaveStatus } from '@/services/leave-service';

// Helper to format a Date object into a 'YYYY-MM-DD' string, crucial for timezone safety.
const toYYYYMMDD = (date) => {
    if (!date) return null;
    return format(date, 'yyyy-MM-dd');
};

const formSchema = z.object({
  status: z.enum(['approved', 'rejected']),
  manager_comments: z.string().optional(),
  new_start_date: z.date().optional(),
  new_end_date: z.date().optional(),
}).refine(data => {
    if (data.status === 'approved' && data.new_start_date && data.new_end_date) {
        return data.new_end_date >= data.new_start_date;
    }
    return true;
}, {
    message: "End date must be on or after the start date.",
    path: ["new_end_date"],
});

const UpdateRequestDialog = ({ request, open, onOpenChange, onUpdateSuccess }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: request.status,
            manager_comments: request.manager_comments || '',
            new_start_date: new Date(request.start_date),
            new_end_date: new Date(request.end_date),
        }
    });

    const watchedStatus = form.watch("status");
    const watchedStartDate = form.watch("new_start_date");

    const onSubmit = async (values) => {
        const payload = {
            ...values,
            new_start_date: toYYYYMMDD(values.new_start_date),
            new_end_date: toYYYYMMDD(values.new_end_date),    
        };

        try {
            await updateLeaveStatus(request.id, payload);
            toast.success("Leave request has been updated.");
            onUpdateSuccess();
            onOpenChange(false);
        } catch (error) {
            toast.error("Update Failed", { description: error.message });
        }
    };
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent  className="min-w-4xl" >
                <DialogHeader>
                    <DialogTitle>Manage Leave Request</DialogTitle>
                    <DialogDescription>Approve, reject, or modify the approved date range.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                               <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Decision</FormLabel>
                                    <FormControl>
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                                            <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="approved" /></FormControl><FormLabel className="font-normal">Approve</FormLabel></FormItem>
                                            <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="rejected" /></FormControl><FormLabel className="font-normal">Reject</FormLabel></FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        {watchedStatus === 'approved' && (
                            <div className="p-4 border rounded-lg space-y-4">
                                <p className="text-sm font-medium">Modify Approved Dates</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField control={form.control} name="new_start_date" render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Approved Start Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild><FormControl><Button variant="outline" className="font-normal">{format(field.value, "PPP")}</Button></FormControl></PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single" selected={field.value} onSelect={field.onChange}
                                                        disabled={(date) => date > new Date(request.end_date) || date < new Date(request.start_date)}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                    <FormField control={form.control} name="new_end_date" render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Approved End Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild><FormControl><Button variant="outline" className="font-normal">{format(field.value, "PPP")}</Button></FormControl></PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single" selected={field.value} onSelect={field.onChange}
                                                        disabled={(date) => date > new Date(request.end_date) || date < watchedStartDate}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                </div>
                            </div>
                        )}
                        
                                               <FormField
                            control={form.control}
                            name="manager_comments"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comments</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Add comments for the employee (optional)" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? 'Updating...' : 'Update Status'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateRequestDialog;