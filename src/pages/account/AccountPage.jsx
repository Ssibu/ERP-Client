import React, { useState, useEffect } from "react";
import apiClient from "@/api/axiosConfig";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {  UserCircle, Edit, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { calculateExperience } from "@/utils/calculateExperience";
import { formatDate } from "@/utils/dateFormat";
import { Spinner } from "@/components/ui/spinner";

const AccountDisplayPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get("/account/me");
        setProfile(res.data);
      } catch (error) {
        toast.error("Failed to load your profile.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center">Could not load profile information.</div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <UserCircle className="mr-2" />
              My Profile
            </CardTitle>
         <div   className="flex gap-3" >
             <Link to="/account/edit">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
                    <Link to="/account/settings">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
                <Link to="/signout">
              <Button variant="destructive" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </Link>
          </div>
          </div>
          <img
            className="w-32 h-32 rounded-full"
            src={profile.picture ? `${apiBaseUrl}${profile.picture}` : null}
            alt=""
          />
          <CardDescription>Your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm">
          <div className="grid grid-cols-[120px_1fr] items-center">
            <span className="font-semibold text-muted-foreground">
              Full Name
            </span>
            <span>{profile.name}</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center">
            <span className="font-semibold text-muted-foreground">Email</span>
            <span>{profile.email}</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center">
            <span className="font-semibold text-muted-foreground">Phone</span>
            <span>{profile.phone || "Not provided"}</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center">
            <span className="font-semibold text-muted-foreground">Joined</span>
            <span>{formatDate(profile.joined_at) || "Not provided"}</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center">
            <span className="font-semibold text-muted-foreground">
              Experience
            </span>
            <span>{calculateExperience(profile.joined_at)}</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center">
            <span className="font-semibold text-muted-foreground">Address</span>
            <span>{profile.address || "Not provided"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountDisplayPage;
