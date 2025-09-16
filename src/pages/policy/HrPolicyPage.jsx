

import React, { useState, useEffect } from 'react';
import apiClient from '@/api/axiosConfig';
import useAuth from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarClock, Star, BadgePercent, Shield, Terminal } from "lucide-react";
import { PERMISSIONS } from '@/config/permissions';
import AccessDenied from '@/components/AccessDenied';

const PolicyPage = () => {
  const [incrementPolicyData, setIncrementPolicyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const canViewPolicy = user.is_master || user.permissions.includes(PERMISSIONS.PAGES.INCREMENT_POLICY);

  useEffect(() => {
    if (canViewPolicy) {
      const fetchPolicy = async () => {
        try {
          const res = await apiClient.get('/policy/increment');
          setIncrementPolicyData(res.data);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to load increment policy.');
        } finally {
          setLoading(false);
        }
      };
      fetchPolicy();
    } else {
      setLoading(false);
    }
  }, [canViewPolicy]);

  if (!canViewPolicy) {
    return <AccessDenied />;
  }

  return (
    <div className="container mx-auto max-w-4xl py-6 space-y-8">
     
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center">
          <Shield className="mr-3 h-8 w-8 text-primary" />
          Company Increment Policy
        </h1>
        <p className="text-muted-foreground">
          Our policy for calculating annual salary increments is based on performance and tenure.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><CalendarClock className="mr-2 h-5 w-5" />Eligibility Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            To be eligible for an annual increment, an employee must have completed a minimum of <strong className="text-primary">180 days of service</strong>.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Star className="mr-2 h-5 w-5" />Performance Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            The increment percentage is tied to the employee's <strong className="text-primary">average completion rating</strong> from all completed tasks, rounded to the nearest whole number.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><BadgePercent className="mr-2 h-5 w-5" />Increment Percentage Table</CardTitle>
          <CardDescription>
            The following table outlines the increment percentage awarded for each performance level.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-48"><Spinner /></div>
          ) : error ? (
            <Alert variant="destructive"><Terminal className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Average Rating (Rounded)</TableHead>
                  <TableHead>Performance Level</TableHead>
                  <TableHead className="text-right">Increment Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incrementPolicyData.map((item) => (
                  <TableRow key={item.rating}>
                    <TableCell className="font-medium flex items-center">
                      {item.rating} <Star className="ml-1 h-4 w-4 text-amber-400" />
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.level}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{item.percentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PolicyPage;