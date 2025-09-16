
import React, { useState, useEffect } from 'react';
import apiClient from '@/api/axiosConfig';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {  Save, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ImageUploader } from '@/components/ImageUploader';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';


const EditEmployeePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({ name: '', email: '', phone: '', address:'', picture: null });
    const [pictureFile, setPictureFile] = useState(null);
     const [shouldRemovePicture, setShouldRemovePicture] = useState(false);
    const [loading, setLoading] = useState({ page: true, saving: false });
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await apiClient.get(`/employees/${id}`);
                setProfileData(res.data);
            } catch (error) {
                toast.error("Failed to load employee data for editing.", error);
                navigate('/employees');
            } finally {
                setLoading(prev => ({ ...prev, page: false }));
            }
        };
        fetchEmployee();
    }, [id, navigate]);

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleFileSelected = (file) => {
    if (file) {
        setPictureFile(file);
        setShouldRemovePicture(false);
    } else {
        setPictureFile(null);
        setShouldRemovePicture(true);
    }
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(prev => ({ ...prev, saving: true }));

        const formData = new FormData();
        formData.append('name', profileData.name);
        formData.append('email', profileData.email);
        formData.append('phone', profileData.phone || '');
          formData.append('address', profileData.address || '');
   if (pictureFile) formData.append('picture', pictureFile);
    if (shouldRemovePicture) formData.append('removePicture', 'true');
        
        try {
            await apiClient.put(`/employees/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("Employee profile updated successfully!");
            navigate('/employees');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update employee profile.");
        } finally {
            setLoading(prev => ({ ...prev, saving: false }));
        }
    };
    
    if (loading.page) {
        return <div className="flex justify-center items-center h-64"><Spinner  /></div>;
    }

    return (
        <div className="container mx-auto max-w-4xl py-6">
            <form onSubmit={handleSubmit}>
                <Card  >
                    <CardHeader>
                        <CardTitle>Edit Employee Profile</CardTitle>
                        <CardDescription>Update the details for {profileData.name}.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                            <div>
                                <Label>Profile Picture</Label>
                                <div className="mt-2">
                            <ImageUploader defaultImage={profileData.picture ? `${apiBaseUrl}${profileData.picture}` : null} onFileSelect={handleFileSelected} />

                                </div>
                            </div>
                            <Separator/>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" value={profileData.name} onChange={handleChange} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={profileData.email} onChange={handleChange} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" value={profileData.phone || ''} onChange={handleChange} />
                            </div>
                              <div className="grid gap-2">
                                <Label htmlFor="phone">Address</Label>
                                <Textarea id="address" name="address" value={profileData.address || ''} onChange={handleChange} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4 flex justify-between">
                        <Button type="button" variant="outline" onClick={() => navigate('/employees')}>
                            <X className="mr-2 h-4 w-4" /> Cancel
                        </Button>
                        <Button type="submit" disabled={loading.saving}>
                            {loading.saving && <Spinner  />}
                            <Save className="mr-2 h-4 w-4" /> Save Changes
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default EditEmployeePage;