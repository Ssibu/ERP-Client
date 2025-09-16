// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { Star, Edit, Play, Pause, Check, Clock, History, RotateCw } from "lucide-react";
// import apiClient from "../../api/axiosConfig";
// import EditTaskModal from "./EditTaskModal";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";
// import { Spinner } from '@/components/ui/spinner';


// const TaskCard = ({ task, onTaskUpdate }) => {
//   const [durationHours, setDurationHours] = useState("");
//   const [durationMinutes, setDurationMinutes] = useState("");
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isEstimating, setIsEstimating] = useState(!task.assigned_duration_minutes);
//   const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
//   const [isActionLoading, setIsActionLoading] = useState(false);

//   const handleStatusUpdate = async (status, duration = null) => {
//     setIsActionLoading(true);
//     try {
//         await apiClient.patch(`/tasks/${task.id}/status`, { status, duration_minutes: duration });
//         onTaskUpdate();
//     } catch (err) {
//         toast.error(err.response?.data?.message || "Failed to update task.");
//     } finally {
//         setIsActionLoading(false);
//     }
//   };

//   const handleSetEstimate = () => {
//     const totalMinutes = (parseInt(durationHours || 0) * 60) + parseInt(durationMinutes || 0);
//     if(totalMinutes <= 0) {
//         toast.error("Please enter a valid duration.");
//         return;
//     }
//     handleStatusUpdate('set_duration', totalMinutes);
//     setIsEstimating(false);
//   };

//   const formatDuration = (minutes) => {
//     if (minutes === null || minutes === undefined) return "N/A";
//     const h = Math.floor(minutes / 60);
//     const m = minutes % 60;
//     return `${h}h ${m}m`;
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       pending: { variant: "outline", label: "Pending", icon: <History className="mr-1 h-3 w-3" /> },
//       in_progress: { variant: "default", label: "In Progress", icon: <Clock className="mr-1 h-3 w-3" />, className: "bg-primary animate-pulse" },
//       paused: { variant: "secondary", label: "Paused", icon: <Pause className="mr-1 h-3 w-3" /> },
//       completed: { variant: "default", label: "Completed", icon: <Check className="mr-1 h-3 w-3" />, className: "bg-green-600" }
//     };
//     const config = statusConfig[status] || { variant: "outline", label: status, icon: null };
//     return <Badge variant={config.variant} className={cn(config.className)}>{config.icon}{config.label}</Badge>;
//   };

//   const renderActions = () => {
//     if (isActionLoading) return <div className="w-full flex justify-center"><Spinner  /></div>;
    
//     switch (task.status) {
//       case "pending":
//         return (
//           <div className="w-full space-y-4">
//             {isEstimating ? (
//               <div className="space-y-2">
//                 <p className="text-sm text-muted-foreground">Set estimated duration:</p>
//                 <div className="grid grid-cols-3 gap-2">
//                   <Input type="number" placeholder="Hours" value={durationHours} onChange={(e) => setDurationHours(e.target.value)} />
//                   <Input type="number" placeholder="Mins" value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value)} />
//                   <Button onClick={handleSetEstimate} variant="outline">Set</Button>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex justify-between items-center text-sm">
//                 <p className="text-muted-foreground">Est. Duration: <span className="font-bold text-foreground">{formatDuration(task.assigned_duration_minutes)}</span></p>
//                 <Button onClick={() => setIsEstimating(true)} variant="link" className="p-0 h-auto">Re-estimate</Button>
//               </div>
//             )}
//             <Button onClick={() => handleStatusUpdate("start")} disabled={!task.assigned_duration_minutes} className="w-full">
//               <Play className="mr-2 h-4 w-4" /> Start Task
//             </Button>
//           </div>
//         );
//       case "in_progress":
//         return (
//           <div className="grid grid-cols-2 gap-2 w-full">
//             <Button onClick={() => handleStatusUpdate("pause")} variant="secondary"><Pause className="mr-2 h-4 w-4" />Pause</Button>
//             <Button onClick={() => setCompleteDialogOpen(true)} className="bg-green-600 hover:bg-green-700"><Check className="mr-2 h-4 w-4" />Complete</Button>
//           </div>
//         );
//       case "paused":
//         return <Button onClick={() => handleStatusUpdate("resume")} className="w-full"><RotateCw className="mr-2 h-4 w-4" />Resume Task</Button>;
//       case "completed":
//         return <div className="w-full text-center text-green-600 font-semibold">Completed!</div>;
//       default: return null;
//     }
//   };

//   return (
//     <>
//       <EditTaskModal task={task} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onTaskUpdated={onTaskUpdate} />
//       <AlertDialog open={completeDialogOpen} onOpenChange={setCompleteDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader><AlertDialogTitle>Complete Task</AlertDialogTitle><AlertDialogDescription>Are you sure you want to mark this task as complete?</AlertDialogDescription></AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={() => handleStatusUpdate("complete")} className="bg-green-600 hover:bg-green-700">Complete</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       <Card className="h-full flex flex-col">
//         <CardHeader>
//           <div className="flex justify-between items-start gap-2">
//             <CardTitle className="flex-grow">{task.title}</CardTitle>
//             <div className="flex items-center gap-1 flex-shrink-0">
//               {task.status === "pending" && (
//                 <TooltipProvider><Tooltip><TooltipTrigger asChild>
//                     <Button onClick={() => setIsEditModalOpen(true)} variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-4 w-4" /></Button>
//                 </TooltipTrigger><TooltipContent><p>Edit Task</p></TooltipContent></Tooltip></TooltipProvider>
//               )}
//               {getStatusBadge(task.status)}
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="flex-grow space-y-3">
//           <CardDescription>{task.description}</CardDescription>
//           {task.status === "completed" && task.completion_rating && (
//             <div className="flex items-center gap-1 pt-2">
//               <p className="text-sm text-muted-foreground">Rating:</p>
//               <div className="flex items-center">{Array.from({ length: 5 }, (_, i) => <Star key={i} className={cn("h-4 w-4", i < task.completion_rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground")}/>)}</div>
//               <p className="text-sm font-bold">{task.completion_rating}/5</p>
//             </div>
//           )}
//         </CardContent>
//         <Separator />
//         <CardFooter className="p-4">{renderActions()}</CardFooter>
//       </Card>
//     </>
//   );
// };

// export default TaskCard;






import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Star, Edit, Play, Pause, Check, Clock, History, RotateCw, Timer } from "lucide-react";
import apiClient from "../../api/axiosConfig";
import EditTaskModal from "./EditTaskModal";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Spinner } from '@/components/ui/spinner';

const TaskCard = ({ task, onTaskUpdate }) => {
  const [durationHours, setDurationHours] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEstimating, setIsEstimating] = useState(!task.assigned_duration_minutes);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (task.status !== 'in_progress' || !task.assigned_duration_minutes || !task.last_resume_time) {
      setTimeLeft(null);
      return;
    }

    const updateTimeLeft = () => {
      const now = new Date();
      const resumeTime = new Date(task.last_resume_time);
      const elapsedSinceResume = Math.floor((now - resumeTime) / 1000); // seconds
      const totalElapsed = task.accumulated_duration_seconds + elapsedSinceResume;
      const totalAssignedSeconds = task.assigned_duration_minutes * 60;
      const remaining = totalAssignedSeconds - totalElapsed;
      
      setTimeLeft(remaining);
    };

    updateTimeLeft();
    
    const interval = setInterval(updateTimeLeft, 1000);
    
    return () => clearInterval(interval);
  }, [task.status, task.assigned_duration_minutes, task.last_resume_time, task.accumulated_duration_seconds]);

  const handleStatusUpdate = async (status, duration = null) => {
    setIsActionLoading(true);
    try {
        await apiClient.patch(`/tasks/${task.id}/status`, { status, duration_minutes: duration });
        onTaskUpdate();
    } catch (err) {
        toast.error(err.response?.data?.message || "Failed to update task.");
    } finally {
        setIsActionLoading(false);
    }
  };

  const handleSetEstimate = () => {
    const totalMinutes = (parseInt(durationHours || 0) * 60) + parseInt(durationMinutes || 0);
    if(totalMinutes <= 0) {
        toast.error("Please enter a valid duration.");
        return;
    }
    handleStatusUpdate('set_duration', totalMinutes);
    setIsEstimating(false);
  };

  const formatDuration = (minutes) => {
    if (minutes === null || minutes === undefined) return "N/A";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const formatTimeLeft = (seconds) => {
    if (seconds === null || seconds === undefined) return null;
    
    const isOvertime = seconds < 0;
    const absSeconds = Math.abs(seconds);
    const hours = Math.floor(absSeconds / 3600);
    const minutes = Math.floor((absSeconds % 3600) / 60);
    const secs = absSeconds % 60;
    
    const timeString = hours > 0 
      ? `${hours}h ${minutes}m ${secs}s`
      : `${minutes}m ${secs}s`;
    
    return { timeString, isOvertime };
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: "outline", label: "Pending", icon: <History className="mr-1 h-3 w-3" /> },
      in_progress: { variant: "default", label: "In Progress", icon: <Clock className="mr-1 h-3 w-3" />, className: "bg-primary animate-pulse" },
      paused: { variant: "secondary", label: "Paused", icon: <Pause className="mr-1 h-3 w-3" /> },
      completed: { variant: "default", label: "Completed", icon: <Check className="mr-1 h-3 w-3" />, className: "bg-green-600" }
    };
    const config = statusConfig[status] || { variant: "outline", label: status, icon: null };
    return <Badge variant={config.variant} className={cn(config.className)}>{config.icon}{config.label}</Badge>;
  };

  const renderTimeLeft = () => {
    if (task.status !== 'in_progress' || timeLeft === null) return null;
    
    const timeInfo = formatTimeLeft(timeLeft);
    if (!timeInfo) return null;
    
    return (
      <div className={cn(
        "flex items-center gap-2 p-2 rounded-md border",
        timeInfo.isOvertime 
          ? "bg-red-50 border-red-200 text-red-700" 
          : timeLeft <= 300 
            ? "bg-amber-50 border-amber-200 text-amber-700"
            : "bg-blue-50 border-blue-200 text-blue-700"
      )}>
        <Timer className="h-4 w-4" />
        <span className="text-sm font-medium">
          {timeInfo.isOvertime ? "Overtime: " : "Time Left: "}
          {timeInfo.timeString}
        </span>
      </div>
    );
  };

  const renderActions = () => {
    if (isActionLoading) return <div className="w-full flex justify-center"><Spinner  /></div>;
    
    switch (task.status) {
      case "pending":
        return (
          <div className="w-full space-y-4">
            {isEstimating ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Set estimated duration:</p>
                <div className="grid grid-cols-3 gap-2">
                  <Input type="number" placeholder="Hours" value={durationHours} onChange={(e) => setDurationHours(e.target.value)} />
                  <Input type="number" placeholder="Mins" value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value)} />
                  <Button onClick={handleSetEstimate} variant="outline">Set</Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center text-sm">
                <p className="text-muted-foreground">Est. Duration: <span className="font-bold text-foreground">{formatDuration(task.assigned_duration_minutes)}</span></p>
                <Button onClick={() => setIsEstimating(true)} variant="link" className="p-0 h-auto">Re-estimate</Button>
              </div>
            )}
            <Button onClick={() => handleStatusUpdate("start")} disabled={!task.assigned_duration_minutes} className="w-full">
              <Play className="mr-2 h-4 w-4" /> Start Task
            </Button>
          </div>
        );
      case "in_progress":
        return (
          <div className="w-full space-y-3">
            {renderTimeLeft()}
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => handleStatusUpdate("pause")} variant="secondary"><Pause className="mr-2 h-4 w-4" />Pause</Button>
              <Button onClick={() => setCompleteDialogOpen(true)} className="bg-green-600 hover:bg-green-700"><Check className="mr-2 h-4 w-4" />Complete</Button>
            </div>
          </div>
        );
      case "paused":
        return <Button onClick={() => handleStatusUpdate("resume")} className="w-full"><RotateCw className="mr-2 h-4 w-4" />Resume Task</Button>;
      case "completed":
        return <div className="w-full text-center text-green-600 font-semibold">Completed!</div>;
      default: return null;
    }
  };

  return (
    <>
      <EditTaskModal task={task} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onTaskUpdated={onTaskUpdate} />
      <AlertDialog open={completeDialogOpen} onOpenChange={setCompleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Complete Task</AlertDialogTitle><AlertDialogDescription>Are you sure you want to mark this task as complete?</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleStatusUpdate("complete")} className="bg-green-600 hover:bg-green-700">Complete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="flex-grow">{task.title}</CardTitle>
            <div className="flex items-center gap-1 flex-shrink-0">
              {task.status === "pending" && (
                <TooltipProvider><Tooltip><TooltipTrigger asChild>
                    <Button onClick={() => setIsEditModalOpen(true)} variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-4 w-4" /></Button>
                </TooltipTrigger><TooltipContent><p>Edit Task</p></TooltipContent></Tooltip></TooltipProvider>
              )}
              {getStatusBadge(task.status)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-3">
          <CardDescription>{task.description}</CardDescription>
          {task.status === "completed" && task.completion_rating && (
            <div className="flex items-center gap-1 pt-2">
              <p className="text-sm text-muted-foreground">Rating:</p>
              <div className="flex items-center">{Array.from({ length: 5 }, (_, i) => <Star key={i} className={cn("h-4 w-4", i < task.completion_rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground")}/>)}</div>
              <p className="text-sm font-bold">{task.completion_rating}/5</p>
            </div>
          )}
        </CardContent>
        <Separator />
        <CardFooter className="p-4">{renderActions()}</CardFooter>
      </Card>
    </>
  );
};

export default TaskCard;