import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const UnauthorizedPage = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-[350px] p-6 text-center space-y-4">
        <h1 className="text-4xl font-bold text-destructive">403</h1>

        <h2 className="text-2xl font-semibold">Unauthorized</h2>
        <p className="text-muted-foreground">
          You do not have permission to view this page.
        </p>
        <Button asChild variant="default" className="w-full">
          <Link to="/dashboard">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;