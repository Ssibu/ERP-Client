import { useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext'; 
import {Spinner} from '@/components/ui/spinner';

const SignOutPage = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Spinner className="mb-4" />
      <p className="text-lg font-medium">Signing out...</p>
    </div>
  );
};

export default SignOutPage;
