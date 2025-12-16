// import { Navigate } from "react-router-dom";
// import useRole from "../hooks/useRole";

// const LibrarianRoute = ({ children }) => {
//   const { role, loading } = useRole();

//   if (loading) return <p>Checking role...</p>;
//   if (role !== "librarian") return <Navigate to="/" replace />;

//   return children;
// };

// export default LibrarianRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";

const LibrarianRoute = () => {
  const { role, loading } = useRole();

  if (loading) return <p>Checking role...</p>;
  if (role !== "librarian") return <Navigate to="/" replace />;

  return <Outlet />; // renders child routes
};

export default LibrarianRoute;
