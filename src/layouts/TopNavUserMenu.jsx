// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import  useAuth  from "@/hooks/useAuth";
// import { Link } from "react-router-dom";
// import { CircleUser, Settings, LogOut } from "lucide-react";

// export function UserNav() {
//   const { user } = useAuth();
//   const apiBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api/v1", "");

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="relative h-8 w-8 ">
//        <Avatar
//   className={`h-8 w-8`}
// >
//   <AvatarImage src={user.picture ? `${apiBaseUrl}${user.picture}` : undefined} />
//   <AvatarFallback>
//     <CircleUser />
//   </AvatarFallback>
// </Avatar>

//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56" align="end" forceMount>
//         <DropdownMenuLabel className="font-normal">
//           <div className="flex flex-col space-y-1">
//             <p className="text-sm font-medium leading-none">{user.name}</p>
//             <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
//           </div>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuGroup>
//           <Link to="/account">
//             <DropdownMenuItem className="cursor-pointer"><CircleUser/>Profile</DropdownMenuItem>
//           </Link>
//           <Link to="/account/settings">
//             <DropdownMenuItem className="cursor-pointer"><Settings/>Settings</DropdownMenuItem>
//           </Link>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />
//           <Link to="/signout">
//             <DropdownMenuItem className="cursor-pointer"><LogOut/>Signout</DropdownMenuItem>
//           </Link>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { CircleUser, LogOut } from "lucide-react";
import {Badge} from "@/components/ui/badge"

export function UserNav() {
  const { user } = useAuth();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

  return (
    <Link to="/account" className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-xl shadow-md text-black">
      {/* Avatar */}
      <Avatar className="h-9 w-9 border-2 border-white shadow">
        <AvatarImage
          src={user.picture ? `${apiBaseUrl}${user.picture}` : undefined}
        />
        <AvatarFallback>
          <CircleUser className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>

      {/* User Info */}
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold">{user.name}</span>
           

        <span className="text-xs opacity-80">{user.email}</span>
      </div>
      {user.is_master && (
          <Badge className="bg-cyan-600 text-white shadow-sm flex items-center gap-1">
           Master
          </Badge>
        )}

    </Link>
  );
}
