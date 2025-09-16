

import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster richColors position='top-center' toastOptions={{
    style: {
      // color:'var(--popover-foreground)',
      // background: 'var(--popover)',

      boxShadow:"none",
      borderRadius:'var(--radius)'
    },
  }}
  
   expand visibleToasts={3}
   
  />
    </>
  );
}

export default App;