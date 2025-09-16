import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setIsSubmitted(false);

    // Simulate an API call to send a password reset link
    try {
      // Replace with your actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Assuming the API call is successful
      toast.success('Password reset link has been sent to your email.');
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="flex w-full max-w-4xl bg-white shadow-lg overflow-hidden">
        {/* Left side image */}
        <div className="w-1/2 hidden md:block">
          <img
            src="/assets/login-image.avif" 
            alt="Forgot Password"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right side card */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <Card className="w-full max-w-md border-none shadow-none">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="text-xl">Forgot Your Password?</CardTitle>
                <CardDescription className="mb-3">
                  Enter your email, phone, or employee ID below to receive a password reset link.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {isSubmitted ? (
                  <p className="text-sm text-green-600">
                    If an account with that identifier exists, a password reset link has been sent. Please check your inbox.
                  </p>
                ) : (
                  <>
                    <div className="grid gap-4">
                      <Label htmlFor="identifier">Email, Phone, or Employee ID</Label>
                      <Input
                        id="identifier"
                        type="text"
                        placeholder="m@example.com"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                      />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                  </>
                )}
              </CardContent>
              <CardFooter className="mt-4 flex flex-col items-center">
                {!isSubmitted && (
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Spinner color="white" size={20} />}
                    <Mail className="mr-2 h-4 w-4" />
                    Send Reset Link
                  </Button>
                )}
                <Link to="/login" className="mt-4 text-sm text-blue-500 hover:underline">
                  Back to Login
                </Link>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
// ----
// （IPMsg Delayed Send: 13:08 ）