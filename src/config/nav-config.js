

import {
  MdDashboard,
  MdPeople,
  MdChecklist,
  MdTrendingUp,
  MdSecurity,
  MdEventAvailable,
  MdEventNote,
  MdPersonAddAlt,
  MdCurrencyRupee,
  MdArrowCircleUp,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdDescription,
  MdPostAdd,
} from "react-icons/md";

import { PERMISSIONS } from "@/config/permissions";

export const navItems = [
  { 
    href: "/dashboard", 
    icon: MdDashboard, 
    label: "Dashboard", 
    permission: null 
  },
  {
    href: "/employees",
    icon: MdPeople,
    label: "Employees",
    permission: PERMISSIONS.PAGES.EMPLOYEE_MANAGEMENT,
  },
  { 
    href: "/tasks", 
    icon: MdChecklist, 
    label: "Tasks", 
    permission: null 
  },
  
  {
    label: "Rules & Permissions",
    icon: MdPeople,
    permission: null,
    isSubmenu: true,
    subItems: [
      {
        href: "/manage-permissions",
        icon: MdPersonAddAlt,
        label: "Manage Permissions",
        permission: PERMISSIONS.PAGES.MANAGE_EMPLOYEE_PERMISSIONS,
      },
      {
        href: "/rules-manager",
        icon: MdSecurity,
        label: "Rules",
        permission: PERMISSIONS.PAGES.RULES_MANAGEMENT,
      }
    ]
  },

  {
    label: "Leaves",
    icon: MdEventNote,
    permission: null,
    isSubmenu: true,
    subItems: [
      {
        href: "/request-leave",
        icon: MdEventAvailable,
        label: "Request Leave",
        permission: null,
      },
  
      {
        href: "/manage-leaves",
        icon: MdEventNote,
        label: "Manage Leaves",
        permission: PERMISSIONS.PAGES.LEAVE_MANAGEMENT,
      }
    ]
  },
    {
    label: "Payroll",
    icon: MdCurrencyRupee,
    permission: null,
    isSubmenu: true,
    subItems: [
      {
        href: "/manage-salary-components",
        icon: MdCurrencyRupee,
        label: "Salary Components",
        permission: PERMISSIONS.PAGES.SALARY_MANAGEMENT,
      },
      {
        href: "/salary-structure",
        icon: MdCurrencyRupee,
        label: "Salary Structure",
        permission: PERMISSIONS.PAGES.SALARY_MANAGEMENT,
      },
      {
        href: "/payroll",
        icon: MdCurrencyRupee,
        label: "Payroll",
        permission: PERMISSIONS.PAGES.PAYROLL_MANAGEMENT,
      }
    ]
  },

  {
    label: "Reports",
    icon: MdDescription,
    permission: null,
    isSubmenu: true,
    subItems: [
      {
        href: "/increment-report",
        icon: MdPostAdd,
        label: "Increment Report",
        permission: PERMISSIONS.PAGES.INCREMENT_REPORT,
      },
      {
        href: "/increment-policy",
        icon: MdPostAdd,
        label: "Increment Policy",
        permission: PERMISSIONS.PAGES.INCREMENT_POLICY,
      }
    ]
  },


  
];
