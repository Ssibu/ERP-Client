

import React, { useState, useEffect } from 'react';
import apiClient from '@/api/axiosConfig';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {  Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ImageUploader } from '@/components/ImageUploader';
import { Spinner } from '@/components/ui/spinner';

const AccountEditPage = () => {
    const [profileData, setProfileData] = useState({ name: '', email: '', phone: '', address:'', picture: null });
    const [pictureFile, setPictureFile] = useState(null);
    const [shouldRemovePicture, setShouldRemovePicture] = useState(false);
    const [loading, setLoading] = useState({ page: true, saving: false });
    const navigate = useNavigate();
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

    useEffect(() => {
        apiClient.get('/account/me')
            .then(res => setProfileData(res.data))
            .catch(() => toast.error("Failed to load profile."))
            .finally(() => setLoading(prev => ({ ...prev, page: false })));
    }, []);

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
        if (pictureFile) {
            formData.append('picture', pictureFile);
        }
        if (shouldRemovePicture) {
            formData.append('removePicture', 'true');
        }

        try {
            await apiClient.put('/account/me/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success("Profile updated successfully!");
            navigate('/account');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile.");
        } finally {
            setLoading(prev => ({ ...prev, saving: false }));
        }
    };
    
    if (loading.page) {
        return <div className="flex justify-center items-center h-64"><Spinner/></div>;
    }

    return (
        <div className="container mx-auto max-w-2xl py-6">
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
                        <CardDescription>Make changes to your personal details below.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div>
                            <Label>Profile Picture</Label>
                            <div className="mt-2">
                                <ImageUploader defaultImage={profileData.picture ? `${apiBaseUrl}${profileData.picture}` : null} onFileSelect={handleFileSelected} />
                            </div>
                        </div>
                        <Separator />
                        <div className="grid gap-2"><Label htmlFor="name">Full Name</Label><Input id="name" name="name" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} required/></div>
                        <div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} required/></div>
                        <div className="grid gap-2"><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" value={profileData.phone || ''} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} /></div>
                    <div className="grid gap-2"><Label htmlFor="address">Address</Label><Input id="address" name="address" value={profileData.address} onChange={(e) => setProfileData({...profileData, address: e.target.value})} required/></div>

                    </CardContent>
                    <CardFooter className="border-t px-6 py-4 flex justify-between">
                        <Button type="button" variant="outline" onClick={() => navigate('/account')}><X className="mr-2 h-4 w-4" /> Cancel</Button>
                        <Button type="submit" disabled={loading.saving}>{loading.saving && <Spinner className="mr-2" />}<Save className="mr-2 h-4 w-4" /> Save Changes</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default AccountEditPage;