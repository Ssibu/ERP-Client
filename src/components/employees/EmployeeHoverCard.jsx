import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  MapPin,
  IndianRupee,
  CalendarDays,
  Briefcase,
  LogIn,
  PenLine,
} from "lucide-react";
import { formatDate, formatDateTime } from "@/utils/dateFormat";
import { calculateExperience } from "@/utils/calculateExperience";
import { Badge } from "../ui/badge";

const EmployeeHoverCard = ({ employee, children }) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-96">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage
              src={employee.picture ? `${apiBaseUrl}${employee.picture}` : ""}
            />
            <AvatarFallback>
              {employee.name?.charAt(0).toUpperCase() || "E"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-grow">
            <h4 className="text-sm font-semibold">{employee.name}</h4>
            <p className="text-sm text-muted-foreground">{employee.email}</p>
          </div>
          {employee.is_master && <Badge className="w-fit h-fit">master</Badge>}
        </div>
        <Separator className="my-3" />
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Phone className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-muted-foreground">
              {employee.phone || "Not provided"}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-muted-foreground">
              {employee.address || "Not provided"}
            </span>
          </div>
          <div className="flex items-center">
            <IndianRupee className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-muted-foreground">
              {formatCurrency(employee.current_salary)}
            </span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-muted-foreground">
              Joined: {formatDate(employee.joined_at)}
            </span>
          </div>
          <div className="flex items-center">
            <Briefcase className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-muted-foreground">
              Experience: {calculateExperience(employee.joined_at)}
            </span>
          </div>
          <div className="flex items-center">
            <LogIn className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-muted-foreground">
              Last signin: {formatDateTime(employee.last_login)}
            </span>
          </div>
          <div className="flex items-center">
            <PenLine className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-muted-foreground">
              Last updated: {formatDateTime(employee.updatedAt)}
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default EmployeeHoverCard;
