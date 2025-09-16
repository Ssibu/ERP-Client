import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { ShieldAlert } from "lucide-react"
import { Link } from "react-router-dom"

export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center ">
      <Alert className="max-w-md border-none bg-background "  >
        <ShieldAlert className="h-5 w-5 text-destructive" />
        <AlertTitle className="text-destructive">Access Denied</AlertTitle>
        <AlertDescription   >
          You do not have sufficient permissions. Please contact your administrator.
    <div className="flex items-center gap-3" >
            <Link to="/dashboard"  className="text-primary hover:underline" >Return home</Link>
          <Link to="#" onClick={window.location.reload}  className="text-primary hover:underline" >Refresh</Link>
        </div>
        </AlertDescription>
      </Alert>
      
    </div>
  )
}
