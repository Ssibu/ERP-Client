
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Spinner } from '@/components/ui/spinner';

const ProtectedRoute = ({ children, permission }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Spinner className="h-12 w-12 text-white" color="white" />
    </div>
    ); 
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasPermission = () => {
    if (!permission) {
      return true;
    }
    if (user?.is_master) {
      return true;
    }
    return user?.permissions?.includes(permission);
  };

  if (!hasPermission()) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;