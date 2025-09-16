

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/api/axiosConfig';
import { ImageUploader } from '@/components/ImageUploader';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import {  SendHorizonal, X } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

const AddEmployeePage = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    // current_salary: '',
    joined_at: '',
  });
  const [pictureFile, setPictureFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (pictureFile) {
      formData.append('picture', pictureFile);
    }

    try {
      const response = await apiClient.post('/employees', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success(response.data.message);
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while sending the invitation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-6">
      <form onSubmit={handleSubmit}>
        <div >
          <CardHeader>
            <CardTitle>Invite New Employee</CardTitle>
            <CardDescription>Fill out the form below to send an activation invitation to a new employee.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Profile Picture</Label>
              <div className="mt-2">
                <ImageUploader onFileSelect={setPictureFile} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" name="name" value={formState.name} onChange={handleInputChange} required /></div>
              <div className="space-y-2"><Label htmlFor="email">Email Address</Label><Input id="email" type="email" name="email" value={formState.email} onChange={handleInputChange} required /></div>
              <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" value={formState.phone} onChange={handleInputChange} /></div>
              {/*<div className="space-y-2"><Label htmlFor="current_salary">Current Salary</Label><Input type="number" id="current_salary" name="current_salary" value={formState.current_salary} onChange={handleInputChange} /></div>*/}
              <div className="space-y-2"><Label htmlFor="joined_at">Joining Date</Label><Input type="date" id="joined_at" name="joined_at" value={formState.joined_at} onChange={handleInputChange} required /></div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" name="address" value={formState.address} onChange={handleInputChange} />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="border-t px-6 py-4 flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigate('/employees')} disabled={loading}>
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Spinner color="white" size={20} />}
              <SendHorizonal /> Send invitation mail
            </Button>
          </CardFooter>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeePage;