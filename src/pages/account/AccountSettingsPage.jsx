import React, { useState } from 'react';
import apiClient from '@/api/axiosConfig';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spinner } from '@/components/ui/spinner';

const ChangePasswordTab = () => {
    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await apiClient.put('/account/me/password', passwordData);
            toast.success("Password changed successfully!");
            setPasswordData({ oldPassword: '', newPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to change password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Enter your old password and a new one. Your new password must be at least 6 characters long.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="oldPassword">Old Password</Label>
                        <Input id="oldPassword" name="oldPassword" type="password" value={passwordData.oldPassword} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" name="newPassword" type="password" value={passwordData.newPassword} onChange={handleChange} required />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={loading}>
                        {loading && <Spinner  />}
                        Update Password
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}

const AccountSettingsPage = () => {
    return (
        <div className="container mx-auto max-w-4xl py-6">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <Tabs defaultValue="password">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="password">Password</TabsTrigger>
                    {/* <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger> */}
                </TabsList>
                <TabsContent value="password">
                    <ChangePasswordTab />
                </TabsContent>
                {/* <TabsContent value="notifications">
                </TabsContent> */}
            </Tabs>
        </div>
    );
};

export default AccountSettingsPage;