import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {

  const { user, loading } = useAuth();

  // Wait for auth check
  if (loading) {

    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-white text-2xl">
        Loading...
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {

    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;