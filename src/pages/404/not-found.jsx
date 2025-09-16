import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="min-h-96 flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600">Page Not Found</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/" className="mt-4">
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}