

// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Plus, Star, Terminal, Search } from "lucide-react";
// import apiClient from "../api/axiosConfig";
// import useAuth from "../hooks/useAuth";
// import TaskCard from "../components/tasks/TaskCard";
// import CreateTaskModal from "../components/tasks/CreateTaskModal";
// import { formatDate } from "@/utils/dateFormat";
// import { Input } from "@/components/ui/input";
// import { Spinner } from '@/components/ui/spinner';


// const TasksPage = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const { user } = useAuth();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

//   useEffect(() => {
//     const timerId = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
//     return () => clearTimeout(timerId);
//   }, [searchTerm]);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const config = {};
//       if (debouncedSearchTerm) {
//         config.params = { search: debouncedSearchTerm };
//       }
//       const res = await apiClient.get("/tasks", config);
//       setTasks(res.data);
//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch tasks.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [debouncedSearchTerm]);

//   const formatDuration = (seconds) => {
//     if (seconds === null || seconds === undefined) return "N/A";
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     return `${h}h ${m}m`;
//   };

//   const getRatingDisplay = (rating) => {
//     if (!rating || rating === 0)
//       return <span className="text-muted-foreground">Not Rated</span>;
//     return (
//       <div className="flex items-center gap-1">
//         <span className="font-medium">{rating}</span>
//         <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
//       </div>
//     );
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       pending: { variant: "secondary", label: "Pending" },
//       in_progress: { variant: "default", label: "In Progress" },
//       paused: { variant: "outline", label: "Paused" },
//       completed: {
//         variant: "default",
//         className: "bg-green-600 hover:bg-green-700",
//         label: "Completed",
//       },
//     };
//     const config = statusConfig[status] || {
//       variant: "secondary",
//       label: status,
//     };
//     return (
//       <Badge variant={config.variant} className={config.className}>
//         {config.label}
//       </Badge>
//     );
//   };

//   if (error) {
//     return (
//       <div className="container mx-auto mt-4">
//         <Alert variant="destructive">
//           <Terminal className="h-4 w-4" />
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   const activeTasks = tasks.filter((task) => task.status !== "completed");
//   const completedTasks = tasks.filter((task) => task.status === "completed");

//   return (
//     <div className="container mx-auto">
//       <CreateTaskModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         onTaskCreated={fetchTasks}
//       />

//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-bold">
//           {user.is_master ? "All Employee Tasks" : "My Daily Tasks"}
//         </h1>
//         {!user.is_master && (
//           <Button onClick={() => setIsCreateModalOpen(true)}>
//             <Plus />
//             Create Task
//           </Button>
//         )}
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center min-h-[200px]">
//           <Spinner/>
//         </div>
//       ) : (
//         <>
//           {user.is_master ? (
//             <Card>
//               <CardContent>
//                 <div className="relative mb-4">
//                   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     type="search"
//                     placeholder={
//                       user.is_master
//                         ? "Search by task id, task, description, employee name or id..."
//                         : "Search by task id, task or description..."
//                     }
//                     className="w-full pl-8 sm:w-1/3"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <Table>
//                   <TableHeader>
//                     <TableRow  className="bg-muted" >
//                          <TableHead>SL NO.</TableHead>
//                              <TableHead>Task ID</TableHead>
//                             <TableHead>Employee ID</TableHead>  
//                       <TableHead>Employee</TableHead>
//                       <TableHead>Task Title</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>Time Taken</TableHead>
//                       <TableHead>Rating</TableHead>
//                       <TableHead>Task Date</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {tasks.map((task, i) => (
//                       <TableRow key={task.id}>
//                         <TableCell>{i+1}</TableCell>
//                         <TableCell>{task.id}</TableCell>
//                         <TableCell>{task.EmployeeId}</TableCell>
//                         <TableCell className="font-medium">
//                           {task.Employee?.name || "N/A"}
//                         </TableCell>
//                         <TableCell className="font-medium">
//                           {task.title}
//                         </TableCell>
//                         <TableCell>{getStatusBadge(task.status)}</TableCell>
//                         <TableCell className="text-muted-foreground">
//                           {formatDuration(task.accumulated_duration_seconds)}
//                         </TableCell>
//                         <TableCell>
//                           {getRatingDisplay(task.completion_rating)}
//                         </TableCell>
//                         <TableCell className="text-muted-foreground">
//                           {formatDate(task.createdAt)}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//                 {tasks.length === 0 && (
//                   <div className="text-center py-12">
//                     <p className="text-muted-foreground">No tasks found.</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="flex flex-col gap-8">
//               {activeTasks.length > 0 && (
//                 <div>
//                   <h2 className="text-2xl font-semibold mb-4">Active Tasks</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {activeTasks.map((task) => (
//                       <TaskCard
//                         key={task.id}
//                         task={task}
//                         onTaskUpdate={fetchTasks}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {completedTasks.length > 0 && (
//                 <div>
//                   <h2 className="text-xl font-semibold mb-4">
//                     Completed Tasks
//                   </h2>
//                   <Card>
//                     <CardContent>
//                     <Table>
//                       <TableHeader>
//                         <TableRow className="bg-muted">
//                              <TableHead>SL NO.</TableHead>
//                              <TableHead>Task ID</TableHead>
//                           <TableHead>Task Title</TableHead>
//                           <TableHead>Time Taken</TableHead>
//                           <TableHead>Rating</TableHead>
//                           <TableHead>Completed Date</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {completedTasks.map((task, i) => (
//                           <TableRow key={task.id}>
//                             <TableCell>{i+1}</TableCell>
//                              <TableCell>{task.id}</TableCell>
//                             <TableCell className="font-medium">
//                               {task.title}
//                             </TableCell>
//                             <TableCell className="text-muted-foreground">
//                               {formatDuration(
//                                 task.accumulated_duration_seconds
//                               )}
//                             </TableCell>
//                             <TableCell>
//                               {getRatingDisplay(task.completion_rating)}
//                             </TableCell>
//                             <TableCell className="text-muted-foreground">
//                               {task.actual_end_time
//                                 ? formatDate(task.actual_end_time)
//                                 : "N/A"}
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                     </CardContent>
//                   </Card>
//                 </div>
//               )}
//               {tasks.length === 0 && (
//                 <div className="text-center py-12 border-2 border-dashed rounded-lg">
//                   <p className="text-muted-foreground">
//                     You have no tasks. Click 'Create Task' to add one.
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default TasksPage;



import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Plus, Star, Terminal, Search } from "lucide-react";
import apiClient from "@/api/axiosConfig";
import useAuth from "@/hooks/useAuth";
import TaskCard from "@/components/tasks/TaskCard";
import CreateTaskModal from "@/components/tasks/CreateTaskModal";
import { formatDate } from "@/utils/dateFormat";
import { Input } from "@/components/ui/input";
import { Spinner } from '@/components/ui/spinner';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, totalPages: 1 });
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setPagination(p => ({ ...p, page: 1 })); 
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        pageSize: user.is_master ? 10 : 9, // Master table can fit 10, cards look better with 9 per page
      };
      if (debouncedSearchTerm) {
        params.search = debouncedSearchTerm;
      }

      const res = await apiClient.get("/tasks", { params });
      
      setTasks(res.data.data); // The data is inside the 'data' property
      setPagination(prev => ({
          ...prev,
          totalPages: res.data.totalPages,
      }));
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [debouncedSearchTerm, pagination.page, refetchTrigger]); // Refetch on page change or trigger

  const handleRefetch = () => {
    setRefetchTrigger(c => c + 1);
  };

  const formatDuration = (seconds) => {
    if (seconds === null || seconds === undefined) return "N/A";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const getRatingDisplay = (rating) => {
    if (!rating || rating === 0) return <span className="text-muted-foreground">Not Rated</span>;
    return <div className="flex items-center gap-1"><span className="font-medium">{rating}</span><Star className="h-4 w-4 text-amber-500 fill-amber-500" /></div>;
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { variant: "secondary", label: "Pending" },
      in_progress: { variant: "default", label: "In Progress" },
      paused: { variant: "outline", label: "Paused" },
      completed: { variant: "default", className: "bg-green-600 hover:bg-green-700", label: "Completed" },
    };
    const configOrDefault = config[status] || { variant: "secondary", label: status };
    return <Badge variant={configOrDefault.variant} className={configOrDefault.className}>{configOrDefault.label}</Badge>;
  };

  const activeTasks = tasks.filter((task) => task.status !== "completed");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  const paginationControls = (
     <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))} disabled={pagination.page <= 1}>Previous</Button>
        <span className="text-sm text-muted-foreground">Page {pagination.page} of {pagination.totalPages || 1}</span>
        <Button variant="outline" size="sm" onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))} disabled={pagination.page >= pagination.totalPages}>Next</Button>
    </div>
  );

  return (
    <div className="container mx-auto">
      <CreateTaskModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onTaskCreated={handleRefetch} />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{user.is_master ? "All Employee Tasks" : "My Daily Tasks"}</h1>
        {!user.is_master && (<Button onClick={() => setIsCreateModalOpen(true)}><Plus/>Create Task</Button>)}
      </div>
      
     

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]"><Spinner/></div>
      ) : error ? (
        <Alert variant="destructive"><Terminal className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>
      ) : (
        <>
          {user.is_master ? (
            <Card>
              
              <CardContent className="pt-4">
                 <div className="relative mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder={user.is_master ? "Search..." : "Search my tasks..."} className="w-full pl-8 sm:w-1/3" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SL NO.</TableHead>
                      <TableHead>Task ID</TableHead>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Task Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time Taken</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Task Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task, i) => (
                      <TableRow key={task.id}>
                        <TableCell>{(pagination.page - 1) * 10 + i + 1}</TableCell>
                        <TableCell>{task.id}</TableCell>
                        <TableCell>{task.EmployeeId}</TableCell>
                        <TableCell className="font-medium">{task.Employee?.name || "N/A"}</TableCell>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell className="text-muted-foreground">{formatDuration(task.accumulated_duration_seconds)}</TableCell>
                        <TableCell>{getRatingDisplay(task.completion_rating)}</TableCell>
                        <TableCell className="text-muted-foreground">{formatDate(task.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {paginationControls}
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-8">
              {tasks.length > 0 ? (
                <>
                  {activeTasks.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-semibold mb-4">Active Tasks</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activeTasks.map((task) => <TaskCard key={task.id} task={task} onTaskUpdate={handleRefetch} />)}
                      </div>
                    </div>
                  )}
                  {completedTasks.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Completed Tasks</h2>
                      <Card>
                        <CardContent className="pt-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>SL NO.</TableHead>
                                <TableHead>Task ID</TableHead>
                                <TableHead>Task Title</TableHead>
                                <TableHead>Time Taken</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Completed Date</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {completedTasks.map((task, i) => (
                                <TableRow key={task.id}>
                                  <TableCell>{i + 1}</TableCell>
                                  <TableCell>{task.id}</TableCell>
                                  <TableCell className="font-medium">{task.title}</TableCell>
                                  <TableCell className="text-muted-foreground">{formatDuration(task.accumulated_duration_seconds)}</TableCell>
                                  <TableCell>{getRatingDisplay(task.completion_rating)}</TableCell>
                                  <TableCell className="text-muted-foreground">{task.actual_end_time ? formatDate(task.actual_end_time) : "N/A"}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  {paginationControls}
                </>
              ) : (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">
                    {debouncedSearchTerm ? `No tasks found for "${debouncedSearchTerm}".` : "You have no tasks. Click 'Create Task' to add one."}
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TasksPage