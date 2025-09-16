import React, { useState } from 'react';
import apiClient from '../../api/axiosConfig';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {  Terminal } from "lucide-react";
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

const CreateTaskModal = ({ isOpen, onClose, onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleClose = () => {
        setTitle('');
        setDescription('');
        setError('');
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            await apiClient.post('/tasks', { title, description });
            toast.success("Task created successfully!");
            onTaskCreated();
            handleClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create task.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
       <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
                Fill in the details below to add a new task for today.
            </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
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
                <Button type="button" variant="outline" onClick={handleClose} disabled={submitting}>
                Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                {submitting && <Spinner />}
                {submitting ? "Creating..." : "Create Task"}
                </Button>
            </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    );
};

export default CreateTaskModal;