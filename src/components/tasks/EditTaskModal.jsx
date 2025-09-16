import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import apiClient from '../../api/axiosConfig';
import {  Terminal } from 'lucide-react';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';


const EditTaskModal = ({ task, isOpen, onClose, onTaskUpdated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setError('');
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await apiClient.put(`/tasks/${task.id}`, { title, description });
      toast.success("Task updated!");
      onTaskUpdated?.();
      onClose?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg">
            <form onSubmit={handleSubmit}>
            <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </div>
                {error && (
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                )}
            </div>
            <DialogFooter>
                <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={submitting}
                >
                Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                {submitting && <Spinner />}
                {submitting ? "Saving..." : "Save Changes"}
                </Button>
            </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  );
};

export default EditTaskModal;