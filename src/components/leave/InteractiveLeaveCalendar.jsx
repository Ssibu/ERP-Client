
import React from "react";
import { DayPicker } from "react-day-picker";
import "@/styles/rdp.css";
import { parseISO, format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

const InteractiveLeaveCalendar = ({
  existingLeaves,
  selectedDates,
  setSelectedDates,
  pendingRequest,
}) => {
  const approvedLeaveRanges = existingLeaves
    .filter((l) => l.status === "approved")
    .map((l) => ({ from: parseISO(l.start_date), to: parseISO(l.end_date) }));

  const pendingLeaveRanges = existingLeaves
    .filter((l) => l.status === "pending")
    .map((l) => ({ from: parseISO(l.start_date), to: parseISO(l.end_date) }));

  const modifierStyles = {
    approved: { backgroundColor: "green", color: "white" },
    pending: { backgroundColor: "yellow", color: "black" },
  };

  let footer = (
    <p className="text-sm p-2 text-muted-foreground">
       Please select your leave start and end date. 
    </p>
  );
  if (selectedDates?.from) {
    if (!selectedDates.to) {
      footer = (
        <p className="text-sm p-2">
          {format(selectedDates.from, "PPP")} – (Select end date)
        </p>
      );
    } else if (selectedDates.to) {
      footer = (
        <p className="text-sm p-2">
          {format(selectedDates.from, "PPP")} –{" "}
          {format(selectedDates.to, "PPP")}
        </p>
      );
    }
  }

  return (
    <Card className="w-full mx-auto">
      <CardContent className="p-4">
        <div className="flex justify-center overflow-x-auto">
          {pendingRequest ? (
            "You should wait for the request being approved."
          ) : (
            <DayPicker
              navLayout="around"
              numberOfMonths={2}
              mode="range"
              selected={selectedDates}
              onSelect={setSelectedDates}
              modifiers={{
                approved: approvedLeaveRanges,
                pending: pendingLeaveRanges,
              }}
              modifiersStyles={modifierStyles}
              footer={footer}
              disabled={[
                { before: new Date() },
                ...approvedLeaveRanges,
                ...pendingLeaveRanges,
              ]}
              className="w-max"
              classNames={{
                months: "flex flex-col sm:flex-row gap-4 sm:gap-8",
                caption: "flex justify-center pt-1 relative items-center",
              }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveLeaveCalendar;
