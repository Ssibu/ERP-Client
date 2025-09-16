import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from '@/api/axiosConfig';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';
import useAuth from "@/hooks/useAuth"


const ActivateAccountPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [token, setToken] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
const {isAuthenticated} = useAuth()

 if(isAuthenticated) navigate("/dashboard")
    useEffect(() => {
        const activationToken = searchParams.get('token');
        if (!activationToken) {
            setError('Activation token is missing. Please use the link from your email.');
        }
        setToken(activationToken);
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);
        try {
            const response = await apiClient.post('/auth/activate-account', { token, password });
            toast.success(response.data.message);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to activate account.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-sm">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="text-2xl">Activate Your Account</CardTitle>
                        <CardDescription>
                            Welcome! Please set a password to continue.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </CardContent>
                    <CardFooter className="mt-4" >
                        <Button type="submit" className="w-full" disabled={loading || !token}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Set Password & Activate
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default ActivateAccountPage;