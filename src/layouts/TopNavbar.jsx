// import { UserNav } from "./TopNavUserMenu";
// import useAuth from "@/hooks/useAuth";
// import { Badge } from "@/components/ui/badge";
// import { ShieldUser } from "lucide-react";
// import { formatDateTime } from "@/utils/dateFormat";
// import { useT } from "@/hooks/useT";

// export function TopNavbar() {
//   const { user } = useAuth();
//   const t = useT();

//   return (
//     <header className="flex justify-end h-14 items-center gap-4 shadow bg-navbar text-navbar-foreground px-4 lg:h-[60px] lg:px-6">
//       <Badge variant="secondary">
//         Last signin: {formatDateTime(user.last_login)}{" "}
//       </Badge>

//        {user.is_master && (
//         <Badge>
//           {" "}
//           <ShieldUser /> {t("master-account")}
//         </Badge>
//       )}

           
//       <UserNav /> 
     
     
      
//     </header>
//   );
// }


import useAuth from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { ShieldUser } from "lucide-react";
import { formatDateTime } from "@/utils/dateFormat";

export function TopNavbar() {
  const { user } = useAuth();

  return (
    <header className="bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 shadow-lg relative">
      <div className="w-full mx-auto px-4 h-14 lg:h-[60px] flex items-center justify-end gap-4 text-white">
        
        <div className="text-sm text-white shadow-sm">
          Last signin: {formatDateTime(user.last_login)}{" "}
        </div>

     
      </div>
    </header>
  );
}
