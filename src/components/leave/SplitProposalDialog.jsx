import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const SplitProposalDialog = ({
  isOpen,
  onCancel,
  onSubmit,
  isSubmitting,
  message,
  proposal,
  leaveTypes,
  onSecondaryTypeChange,
  limitingFactor
}) => {
  if (!isOpen || !proposal) return null;

  // //Exclude the primary leave type from the list of choices for the remainder
  // const alternativeLeaveTypes = leaveTypes.filter(
  //   (lt) => String(lt.id) !== String(proposal.primary.leave_type_id)
  // );


 const alternativeLeaveTypes = leaveTypes.filter(lt => {
    // Always exclude the primary leave type
    if (String(lt.id) === String(proposal.primary?.leave_type_id)) {
        return false;
    }
    // If the limit was the annual cap, ONLY show unpaid leave types as options
    if (limitingFactor === 'annual_cap') {
        return lt.is_unpaid;
    }
    // Otherwise (it was a monthly limit), show all other available types
    return true;
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent  className="min-w-3xl" >
        <DialogHeader>
          <DialogTitle>Insufficient Leave Balance</DialogTitle>
          <DialogDescription>
            You can split this request across multiple leave types.
          </DialogDescription>
        </DialogHeader>

        <Alert variant="warning" className="my-4">
          <AlertDescription>
            {message}
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
            <p className="text-sm font-medium">Proposed Split:</p>
            <div className="p-4 border rounded-lg space-y-2">
                {/* {proposal.primary.days > 0 && (
                     <p>The first <Badge variant="secondary">{proposal.primary.days }</Badge> day(s) will be applied as **{proposal.primary.leave_type_name}**.</p>
                )} */}
                {proposal.primary && proposal.primary.days > 0 && (
                     <p>The first <Badge variant="secondary">{proposal.primary.days}</Badge> day(s) will be applied as **{proposal.primary.leave_type_name}**.</p>
                )}
                <p>The remaining <Badge variant="secondary">{proposal.secondary.days}</Badge> day(s) need to be applied under a different leave type.</p>
            </div>
        </div>

        <div className="mt-4 space-y-2">
            <Label htmlFor="secondary-leave-type">Apply remaining days as:</Label>
            <Select onValueChange={onSecondaryTypeChange}>
                <SelectTrigger id="secondary-leave-type">
                    <SelectValue placeholder="Choose a leave type for the remainder..." />
                </SelectTrigger>
                <SelectContent>
                    {alternativeLeaveTypes.map(lt => (
                        <SelectItem key={lt.id} value={String(lt.id)}>
                            {lt.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onCancel} disabled={isSubmitting}>
            Cancel Request
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Confirm and Submit Split"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SplitProposalDialog;