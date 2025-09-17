import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { PERMISSIONS } from "../config/permissions";
import { Layout } from "@/layouts/Layout";
import DashboardPage from "../pages/DashboardPage";
import EmployeeManagementPage from "../pages/employee/EmployeeManagementPage";
import AddEmployeePage from "../pages/employee/AddEmployeePage";
import EditEmployeePage from "../pages/employee/EditEmployeePage";
import TasksPage from "@/pages/task/TaskPage";
import IncrementReportPage from "../pages/policy/IncrementReportPage";
import ManagePermissionsPage from "../pages/permission/ManagePermissionsPage";
import UnauthorizedPage from "../pages/auth/UnauthorizedPage";
import AccountDisplayPage from "../pages/account/AccountPage";
import AccountEditPage from "../pages/account/AccountEditPage";
import AccountSettingsPage from "../pages/account/AccountSettingsPage";
import PolicyPage from "@/pages/policy/HrPolicyPage";
import LeaveManagementAdminPage from "@/pages/leaves/LeaveManagementPage";
import RequestLeavePage from "../pages/leaves/RequestLeavePage";
import RulesManagerPage from "@/pages/rules/RulesPage";
import MyLeaveHistoryPage from "@/pages/leaves/MyLeaveHistoryPage";
import SignOutPage from "@/pages/auth/SignOutPage";
import PayrollPage from "@/pages/payroll/PayrollPage";
import SalaryStructurePage from "@/pages/payroll/SalaryStructurePage";
import SalaryComponentsPage from "@/pages/payroll/ManageSalaryComponentsPage";
import SalaryComponentFormPage from "@/pages/payroll/SalaryComponentFormPage";


const ProtectedPage = ({ children, permission }) => (
  <ProtectedRoute permission={permission}>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

const PrivateRoutes = () => {
  return (
      <Routes>
        <Route path="/unauthorized" element={<ProtectedPage><UnauthorizedPage /></ProtectedPage>} />
        <Route path="/signout" element={<SignOutPage />} />
    
        <Route
          path="/dashboard"
          element={
            <ProtectedPage>
              <DashboardPage />
            </ProtectedPage>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedPage>
              <TasksPage />
            </ProtectedPage>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedPage permission={PERMISSIONS.PAGES.EMPLOYEE_MANAGEMENT}>
              <EmployeeManagementPage />
            </ProtectedPage>
          }
        />
        <Route
          path="/employees/add"
          element={
            <ProtectedPage permission={PERMISSIONS.PAGES.EMPLOYEE_MANAGEMENT}>
              <AddEmployeePage />
            </ProtectedPage>
          }
        />
        <Route
          path="/employees/:id/edit"
          element={
            <ProtectedPage permission={PERMISSIONS.PAGES.EMPLOYEE_MANAGEMENT}>
              <EditEmployeePage />
            </ProtectedPage>
          }
        />
        <Route
          path="/increment-policy"
          element={
            <ProtectedPage>
              <PolicyPage />
            </ProtectedPage>
          }
        />
        <Route
          path="/increment-report"
          element={
            <ProtectedPage permission={PERMISSIONS.PAGES.INCREMENT_REPORT}>
              <IncrementReportPage />
            </ProtectedPage>
          }
        />

        <Route
          path="/manage-permissions"
          element={
            <ProtectedPage
              permission={PERMISSIONS.PAGES.MANAGE_EMPLOYEE_PERMISSIONS}
            >
              <ManagePermissionsPage />
            </ProtectedPage>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedPage>
              <AccountDisplayPage />
            </ProtectedPage>
          }
        />
        <Route
          path="/account/edit"
          element={
            <ProtectedPage>
              <AccountEditPage />
            </ProtectedPage>
          }
        />
        <Route
          path="/account/settings"
          element={
            <ProtectedPage>
              <AccountSettingsPage />
            </ProtectedPage>
          }
        />
        <Route
          path="/request-leave"
          element={
            <ProtectedPage>
              <RequestLeavePage />
            </ProtectedPage>
          }
        />
        <Route
          path="/request-leave/history"
          element={
            <ProtectedPage>
              <MyLeaveHistoryPage />
            </ProtectedPage>
          }
        />
        <Route
          path="/manage-leaves"
          element={
            <ProtectedPage permission={PERMISSIONS.PAGES.LEAVE_MANAGEMENT}>
              <LeaveManagementAdminPage />
            </ProtectedPage>
          }
        />
        <Route
          path="/rules-manager"
          element={
            <ProtectedPage permission={PERMISSIONS.PAGES.RULES_MANAGEMENT}>
              <RulesManagerPage />
            </ProtectedPage>
          }
        />
        <Route 
    path="/payroll"
    element={
        <ProtectedPage permission={PERMISSIONS.PAGES.PAYROLL_MANAGEMENT}>
            <PayrollPage />
        </ProtectedPage>
    }
/>
  <Route 
        path="/salary-structure"
        element={
            <ProtectedPage /* permission={PERMISSIONS.PAGES.SALARY_MANAGEMENT} */>
                <SalaryStructurePage />
            </ProtectedPage>
        }
    />
  <Route 
    path="/manage-salary-components" // Renamed path for the list page
    element={
        <ProtectedPage permission={PERMISSIONS.PAGES.SALARY_MANAGEMENT}>
            <SalaryComponentsPage />
        </ProtectedPage>
    }
/>
<Route 
    path="/salary-components/add" // Route for the "add" form
    element={
        <ProtectedPage permission={PERMISSIONS.PAGES.SALARY_MANAGEMENT}>
            <SalaryComponentFormPage />
        </ProtectedPage>
    }
/>
<Route 
    path="/salary-components/edit/:id" // Route for the "edit" form
    element={
        <ProtectedPage permission={PERMISSIONS.PAGES.SALARY_MANAGEMENT}>
            <SalaryComponentFormPage />
        </ProtectedPage>
    }
/>

      </Routes>
  );
};

export default PrivateRoutes;
