
// import { Navigate, useLocation } from 'react-router'
// import { useAuth } from '../context/AuthProvider'

// const PrivateRoute = ({ children }) => {
//   const { user } = useAuth()
//   const location = useLocation()

//   if (user) return children
//   return <Navigate to='/login' state={location.pathname} replace='true' />
// }

// export default PrivateRoute
// ProtectedRoute.jsx
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();  // ✅ use your hook instead

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
