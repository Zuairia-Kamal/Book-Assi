
// import { useState } from 'react';
// import ChooseUser from '../components/ChooseUser';

// export default function DashboardPage() {
//   const [role, setRole] = useState('');

//   return (
//     <div>
//       {!role && (
//         <>
//           <h1>Choose your role</h1>
//           <ChooseUser onSelect={setRole} />
//         </>
//       )}

//       {role === 'admin' && <div>Admin Dashboard</div>}
//       {role === 'librarian' && <div>Librarian Dashboard</div>}
//       {role === 'customer' && <div>Customer Jobs</div>}
//     </div>
//   );
// }
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

// Dashboards
import UserDashboard from "../dashboard/user/UserDashboard";
import LibrarianDashboard from "../dashboard/librarian/LibrarianDashboard";
import AdminDashboard from "../dashboard/admin/AdminDashboard";

const DashboardPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Loading dashboard...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = user.role || "customer";

  if (role === "admin") return <AdminDashboard />;
  if (role === "librarian") return <LibrarianDashboard />;
  return <UserDashboard />;
};

export default DashboardPage;
